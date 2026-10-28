export type Project = {
  slug: string;
  name: string;
  type: string;
  text: string;
  image: string;
  width: number;
  height: number;
  note?: string;
  tone: "mist" | "brand" | "sky" | "night";
};

// Names, categories and one-line descriptions come from vaxalor.com.
// No metrics or client quotes are listed because none are published.
export const projects: Project[] = [
  {
    slug: "cosmo-green-energy",
    name: "Cosmo Green Energy",
    type: "Website",
    text: "A website for a clean energy company that matches its mission.",
    image: "/images/cosmo-green-enegry.jpg",
    width: 1200,
    height: 587,
    tone: "mist",
  },
  {
    slug: "ideationx",
    name: "IdeationX",
    type: "Website",
    text: "A founder and investor connection platform.",
    note: "Shipped in 45 days.",
    image: "/images/ideationx.jpg",
    width: 1200,
    height: 675,
    tone: "brand",
  },
  {
    slug: "decalion-in",
    name: "Decalion",
    type: "Website",
    text: "A website for a social media management agency.",
    image: "/images/decalion-in.jpg",
    width: 1200,
    height: 675,
    tone: "sky",
  },
  {
    slug: "laspore-com",
    name: "Laspore",
    type: "E-commerce",
    text: "A fashion e-commerce store for a premium brand.",
    image: "/images/laspore-com.jpg",
    width: 1200,
    height: 675,
    tone: "night",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

// Titles, dates, categories and excerpts are from vaxalor.com/blog. Posts still live on the current site.
export const posts = [
  {
    slug: "how-much-does-a-website-cost-2026",
    title: "How Much Does a Website Cost in 2026?",
    date: "2026-04-10",
    category: "Business",
    excerpt:
      "A candid look at website pricing, from template sites to custom builds, covering what the price includes and how to avoid overpaying.",
  },
  {
    slug: "why-we-ship-in-20-days",
    title: "Why We Ship in 20 Days (And How)",
    date: "2026-04-05",
    category: "Strategy",
    excerpt:
      "How we deliver projects in about 20 days, the process and trade-offs involved, and why faster delivery doesn't mean cutting corners.",
  },
  {
    slug: "ai-chatbots-hype-vs-reality",
    title: "AI Chatbots: Hype vs. Reality for Small Businesses",
    date: "2026-03-28",
    category: "Tips",
    excerpt: "Do AI chatbots deliver real value for small businesses? What our testing found.",
  },
];

// Summarised from vaxalor.com/faq.
export const faqGroups = [
  {
    group: "Services & process",
    items: [
      {
        q: "What services do you offer?",
        a: "Custom websites, iOS and Android apps, AI chatbots, ERP/CRM systems, MVPs, and design and branding. No templates.",
      },
      {
        q: "How long does a project take?",
        a: "We launch within 20 days at most, usually in 14 to 18, covering design, development, testing and deployment.",
      },
      {
        q: "What's your development process?",
        a: "Four phases: discovery, design (approved by you before any code), development with daily updates, then testing and launch.",
      },
      {
        q: "What technologies do you use?",
        a: "A range of tools including React, Node.js, Python, Flutter and AWS, chosen per project.",
      },
      {
        q: "Do you work with startups?",
        a: "Yes. Our MVP program offers a 50% development discount, 20-day delivery and investor-ready output.",
      },
      {
        q: "Can you work with my existing codebase?",
        a: "Yes. After an initial honest assessment we can take over, refactor or extend existing code.",
      },
    ],
  },
  {
    group: "Pricing & payment",
    items: [
      {
        q: "How much does a website cost?",
        a: "Websites start around $3K, apps around $5K, chatbots around $2K and MVPs around $1.5K. Every quote depends on scope.",
      },
      {
        q: "Do you require an upfront payment?",
        a: "Half is due before kickoff and half on completion, before final handover.",
      },
      {
        q: "What if I have a limited budget?",
        a: "We'll help shape a smaller scope, often starting with an MVP to test the idea before expanding.",
      },
      {
        q: "Are there any hidden costs?",
        a: "The quote covers design, development, testing and deployment. Hosting, domains and third-party API fees are extra but disclosed upfront.",
      },
    ],
  },
  {
    group: "Quality & support",
    items: [
      {
        q: "What if I don't like the design?",
        a: "You approve designs before development. If you reject the first draft, we redo it at no charge.",
      },
      { q: "How many revisions do I get?", a: "Up to three rounds of design and functionality revisions. More are quoted separately." },
      {
        q: "Do you provide post-launch support?",
        a: "Bug fixes are guaranteed for 30 days after launch. Ongoing maintenance or ad-hoc help is available afterwards.",
      },
      { q: "What if the project is delayed on your end?", a: "A missed deadline earns you a 10% discount on the total." },
    ],
  },
  {
    group: "Security & data",
    items: [
      {
        q: "How do you protect my data?",
        a: "Data is encrypted in transit and at rest, hosted on secure cloud providers, and admin access uses JWT authentication. We don't share data for marketing.",
      },
      {
        q: "Who owns the code after the project?",
        a: "You do, once paid in full. Open-source components keep their original licenses.",
      },
      { q: "Do you sign NDAs?", a: "Yes. A mutual NDA can be signed before project discussions." },
      {
        q: "Are you GDPR compliant?",
        a: "We follow GDPR principles and can provide detailed compliance documentation on request.",
      },
    ],
  },
];

// Summaries of vaxalor.com/privacy and /terms (both last updated 16 April 2026).
// Replace with the canonical text after legal review.
export const legalUpdated = "16 April 2026";

export const privacy = [
  {
    h: "Information we collect",
    p: "Contact details (name, email, phone) from forms and enquiries; project details you share through forms or the chatbot; automatic usage data such as pages visited and device type; and cookies for admin login and preferences.",
  },
  {
    h: "How we use it",
    p: "To respond to enquiries and provide estimates, deliver and improve our services, send updates only if you've opted in, run anonymised analytics and prevent spam. We never sell, rent or share your personal information with third parties for marketing purposes.",
  },
  {
    h: "Storage and security",
    p: "Data is held on Neon PostgreSQL and media on Cloudinary. Admin authentication uses JWT tokens, data is encrypted in transit, and payment data is not stored on our systems.",
  },
  {
    h: "Third-party services",
    p: "Vercel (hosting and analytics), Neon (database), Cloudinary (media), Resend (email) and OpenAI (chatbot responses, which means conversation data is sent to OpenAI).",
  },
  {
    h: "Your rights",
    p: "You can ask to access, correct or delete your data, opt out of marketing, or export your data. Send requests to official@vaxalor.com.",
  },
  {
    h: "Cookies",
    p: "An authentication cookie for the admin panel, session storage for chatbot continuity, and local storage for popup and theme preferences. No advertising cookies or tracking pixels are used.",
  },
];

export const terms = [
  { h: "Services", p: "Custom software development including websites, mobile apps, AI solutions, ERP/CRM systems, MVPs and design. These terms apply unless a separate written agreement exists." },
  { h: "Project timeline", p: "Delivery is typically 20 days from kickoff, which starts when the client provides all required inputs. Delays from late feedback, scope changes or third-party dependencies don't count against the timeline." },
  { h: "Payments", p: "50% is due before kickoff and 50% before final handover. MVP projects receive a 50% discount through the startup program. Prices exclude applicable taxes unless stated otherwise." },
  { h: "Intellectual property", p: "The client owns all custom code and deliverables after full payment. We may showcase the project in our portfolio unless the client objects in writing. Open-source components keep their original licenses." },
  { h: "Revisions and scope", p: "Up to three rounds of design and functionality revisions are included. Additional changes are quoted separately. A rejected first design draft is redone at no cost, once." },
  { h: "Confidentiality", p: "Client information is kept confidential and not disclosed without written consent, except where required by law or needed for delivery, such as sharing hosting credentials with deployment platforms." },
  { h: "Limitation of liability", p: "Our total liability is capped at the amount the client paid for the specific project. Indirect or consequential damages, including lost profits, data loss and business interruption, are excluded." },
  { h: "Termination", p: "Either party may terminate with 7 days' written notice. If the client terminates, they pay for completed work. If we terminate, we refund payments for undelivered work." },
  { h: "Warranties and guarantees", p: "Deliverables are guaranteed free of critical bugs for 30 days after launch. A missed deadline earns the client a 10% discount. Specific business outcomes such as traffic or revenue are not guaranteed unless included in the scope." },
  { h: "Governing law", p: "The laws of India apply. Disputes go to arbitration under the Arbitration and Conciliation Act, 1996." },
];
