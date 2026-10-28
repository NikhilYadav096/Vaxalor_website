import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { serviceOptions } from "@/data/services";

export const runtime = "nodejs";

// Sends the enquiry by email through Resend (https://resend.com), the provider named in the privacy policy.
// Required env vars: RESEND_API_KEY. Optional: CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL. See .env.example.

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance rate limit. Use a shared store (Redis, Upstash) if you need a hard limit.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = str("name");
  const email = str("email");
  const phone = str("phone");
  const service = str("service");
  const message = str("message");

  // Honeypot: pretend success so bots learn nothing.
  if (str("company")) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 120) errors.name = "Please enter your name.";
  if (!emailRe.test(email) || email.length > 200) errors.email = "Enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 7 || phone.length > 40) errors.phone = "Enter a valid phone number.";
  if (message.length > 4000) errors.message = "Please keep your message under 4,000 characters.";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return NextResponse.json({ message: "Too many requests." }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact] RESEND_API_KEY is not set; enquiry was not sent.");
    return NextResponse.json({ message: "Email is not configured." }, { status: 503 });
  }

  const svc = serviceOptions.includes(service) ? service : "Other";
  const to = process.env.CONTACT_TO_EMAIL || site.generalEmail;
  const from = process.env.CONTACT_FROM_EMAIL || "Vaxalor Website <onboarding@resend.dev>";

  const html = `
    <h2>New enquiry from vaxalor.com</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Phone:</strong> ${esc(phone)}</p>
    <p><strong>Service:</strong> ${esc(svc)}</p>
    <p><strong>Message:</strong></p>
    <p>${esc(message).replace(/\n/g, "<br>") || "(none)"}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry: ${svc} (${name})`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json({ message: "We couldn't send your message. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] network error", err);
    return NextResponse.json({ message: "We couldn't send your message. Please try again." }, { status: 502 });
  }
}
