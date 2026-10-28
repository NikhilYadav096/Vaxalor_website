export const SITE_URL = "https://www.vaxalor.com";

export const site = {
  name: "Vaxalor",
  tagline: "We build digital products with soul.",
  description:
    "Vaxalor is a digital studio building websites, apps, AI solutions and business systems, shipped in 20 days and built to last.",
  email: "anshul@vaxalor.com",
  generalEmail: "official@vaxalor.com",
  phone: "+91 94702 18939",
  phoneHref: "tel:+919470218939",
  contactPerson: "Anshul Shekhar",
  founded: 2025,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/vaxalor-ai/" },
    { label: "X", href: "https://x.com/VaxalorAI" },
    { label: "Instagram", href: "https://www.instagram.com/vaxalor.ai/" },
    { label: "Facebook", href: "https://www.facebook.com/people/Vaxalor/61586723278901/" },
  ],
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Listed on the current site's services page.
export const toolkit = [
  "React", "Next.js", "Node.js", "Python", "Flutter", "React Native", "PostgreSQL", "MongoDB",
  "AWS", "OpenAI", "Tailwind CSS", "TypeScript", "Figma", "Docker", "Redis", "Vercel",
];

// Shown on vaxalor.com (About page, 2026).
export const facts = [
  { value: 20, suffix: "", label: "Day delivery" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 2025, suffix: "", label: "Founded", plain: true },
];

export const team = [
  { name: "Anshul Shekhar", role: "Founder & CEO", note: "Leads go-to-market strategy, brand partnerships and growth." },
  { name: "Durgesh Chandra", role: "Business Head", note: "Oversees daily business development and project delivery." },
  { name: "Abhinav Rastogi", role: "Backend & Infrastructure", note: "If it scales, it ships." },
  { name: "Mohak Lakra", role: "UI/UX Design", note: "Believes every pixel has a purpose." },
];

export const values = [
  { title: "Soul in the code", text: "Every line of code we write has intention. We don't cut corners." },
  { title: "Speed without compromise", text: "20 days maximum. But we never sacrifice quality for speed." },
  { title: "Radical honesty", text: "We'll tell you if your idea needs tweaking. We're partners, not yes-men." },
];

export const commitments = [
  { title: "Shipped in 20 days", text: "Fixed delivery window. No drawn-out timelines, no surprise scope creep." },
  { title: "Fixed-scope pricing", text: "Quote upfront, no hourly surprises. You know exactly what you're paying for." },
  { title: "Daily progress updates", text: "Slack/email standups. You're never left wondering what's happening." },
  { title: "Code & assets are yours", text: "Full IP transfer on delivery. No vendor lock-in, no ongoing royalties." },
];

export const process = [
  { n: "01", title: "Discovery", days: "Days 1–2", text: "We learn your business, your audience and your goals." },
  { n: "02", title: "Design", days: "Days 3–7", text: "Wireframes and visual designs, approved by you before any code is written." },
  { n: "03", title: "Develop", days: "Days 8–17", text: "We build with modern tech and send daily progress updates." },
  { n: "04", title: "Ship", days: "Days 18–20", text: "Testing, polish and launch." },
];

export const testimonial = {
  quote: "The redesign doubled our lead generation.",
  name: "Priyanshu Garg",
  company: "Pictor",
};
