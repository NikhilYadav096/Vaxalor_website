"use client";

import { useRef, useState, type FormEvent } from "react";
import { serviceOptions } from "@/data/services";
import { site } from "@/data/site";

type Fields = { name: string; email: string; phone: string; service: string; message: string; company: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!emailRe.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a phone number with at least 7 digits.";
  if (v.message.length > 4000) e.message = "Please keep your message under 4,000 characters.";
  return e;
}

export default function ContactForm({ idPrefix = "cf" }: { idPrefix?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const d = new FormData(ev.currentTarget);
    const values: Fields = {
      name: String(d.get("name") ?? ""),
      email: String(d.get("email") ?? ""),
      phone: String(d.get("phone") ?? ""),
      service: String(d.get("service") ?? ""),
      message: String(d.get("message") ?? ""),
      company: String(d.get("company") ?? ""), // honeypot, should stay empty
    };

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        return;
      }
      if (res.status === 400 && data.errors) setErrors(data.errors);
      setServerMsg(
        res.status === 503
          ? `The form isn't connected to email yet. Please write to ${site.generalEmail} instead.`
          : res.status === 429
            ? "Too many messages from this connection. Please try again in a few minutes."
            : data.message || "Something went wrong sending your message."
      );
      setStatus("error");
    } catch {
      setServerMsg(`We couldn't reach the server. Check your connection or write to ${site.generalEmail}.`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-done" role="status">
        <h3>Message sent.</h3>
        <p>Thank you. We&apos;ll get back to you within 24 hours.</p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof Fields) => ({
    id: `${idPrefix}-${name}`,
    name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${idPrefix}-${name}-err` : undefined,
  });
  const err = (name: keyof Fields) =>
    errors[name] ? (
      <span className="field-err" id={`${idPrefix}-${name}-err`} role="alert">
        {errors[name]}
      </span>
    ) : null;

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor={`${idPrefix}-name`}>Name <span aria-hidden="true">*</span></label>
          <input {...field("name")} autoComplete="name" required />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-email`}>Email <span aria-hidden="true">*</span></label>
          <input {...field("email")} type="email" autoComplete="email" required />
          {err("email")}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor={`${idPrefix}-phone`}>Phone <span aria-hidden="true">*</span></label>
          <input {...field("phone")} type="tel" autoComplete="tel" required />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor={`${idPrefix}-service`}>What do you need?</label>
          <select {...field("service")} defaultValue={serviceOptions[0]}>
            {serviceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-message`}>Tell us about your project</label>
        <textarea {...field("message")} rows={5} />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company`}>Company</label>
        <input id={`${idPrefix}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Let's talk →"}
        </button>
        <p className="form-note" aria-live="polite">
          {status === "error" ? <span className="form-error">{serverMsg}</span> : "We'll get back within 24 hours."}
        </p>
      </div>
    </form>
  );
}
