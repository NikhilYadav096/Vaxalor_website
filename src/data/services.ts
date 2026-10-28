export type Category = { name: string; items: string[] };

export type Pillar = {
  slug: string;
  n: string;
  title: string;
  short: string;
  description: string;
  cta: string;
  services: number;
  categories: Category[];
};

// Copy and service names are taken from vaxalor.com/services (2026).
export const pillars: Pillar[] = [
  {
    slug: "technology-and-software",
    n: "01",
    title: "Technology & Software Development",
    short: "Websites, apps and enterprise systems.",
    description:
      "From corporate websites to enterprise-grade SaaS, we engineer the digital backbone of your business.",
    cta: "Start a technology project",
    services: 13,
    categories: [
      {
        name: "Web & App Development",
        items: [
          "Corporate Websites",
          "Mobile Apps (Native/Hybrid)",
          "Full-Stack JS (MERN)",
          "Progressive Web Apps (PWA)",
          "E-commerce Storefronts (Shopify/Magento)",
        ],
      },
      {
        name: "Enterprise Systems",
        items: ["SaaS Product Architecture", "ERP Systems", "CRM Portals", "Custom Business Management Tools"],
      },
      {
        name: "Backend & Integration",
        items: [
          "Custom API Development",
          "Database Architecture (SQL/Vector)",
          "Legacy System Modernization",
          "No-Code/Low-Code Development",
        ],
      },
    ],
  },
  {
    slug: "data-ai-and-automation",
    n: "02",
    title: "Data, AI & Automation",
    short: "AI, automation and data you can act on.",
    description:
      "Harness the power of artificial intelligence and data-driven automation to work smarter, not harder.",
    cta: "Start a data & AI project",
    services: 9,
    categories: [
      {
        name: "Artificial Intelligence",
        items: ["AI Chatbots", "LLM Fine-tuning", "RAG Pipelines", "AI Visuals & Creative Assets", "Machine Learning Models"],
      },
      {
        name: "Automation & Data",
        items: [
          "Workflow Automation (n8n/Zapier)",
          "CRM Data Hygiene & Migration",
          "Business Intelligence Dashboards",
          "Predictive Analytics",
        ],
      },
    ],
  },
  {
    slug: "design-and-creative",
    n: "03",
    title: "Design & Creative Services",
    short: "Design that communicates, converts and lasts.",
    description:
      "Beautiful design that doesn't just look good. It communicates, converts, and builds lasting brand loyalty.",
    cta: "Start a design project",
    services: 13,
    categories: [
      {
        name: "User Experience",
        items: ["UI/UX Design (Figma)", "Wireframing & Prototyping", "User Research", "Digital Accessibility (WCAG) Auditing"],
      },
      {
        name: "Visual Branding",
        items: [
          "Logo Design",
          "Brand Identity & Strategy",
          "Digital Graphics (Social/Ad Assets)",
          "Interactive Content (Quizzes/Calculators)",
        ],
      },
      {
        name: "Video & Motion",
        items: [
          "Motion Graphics",
          "High-End Video/Reel Production",
          "Short-Form Video (TikTok/Reels)",
          "Podcast Production",
          "AR/VR Filter Design",
        ],
      },
    ],
  },
  {
    slug: "digital-marketing-and-growth",
    n: "04",
    title: "Digital Marketing & Growth",
    short: "Marketing that reaches the right people.",
    description: "Data-driven marketing that puts your brand in front of the right people at the right time.",
    cta: "Start a marketing project",
    services: 13,
    categories: [
      {
        name: "Search Optimization",
        items: [
          "Technical SEO",
          "Content Engine (Blogging/Copywriting)",
          "Generative Engine Optimization (GEO)",
          "Voice Search Optimization",
          "Hyper-Local SEO",
        ],
      },
      {
        name: "Growth Marketing",
        items: [
          "Performance Marketing (Google/Meta Ads)",
          "Programmatic & CTV Advertising",
          "Affiliate Program Management",
          "Conversion Funnel Optimization (CRO)",
        ],
      },
      {
        name: "Social & Outreach",
        items: [
          "Social Media Growth",
          "Community Management (Discord/Slack)",
          "Influencer Campaign Management",
          "B2B Cold Outreach Systems",
        ],
      },
    ],
  },
  {
    slug: "strategy-and-consulting",
    n: "05",
    title: "Strategy, Consulting & Support",
    short: "Guidance for founders and growing teams.",
    description:
      "Expert guidance for founders and businesses navigating the complexities of digital transformation.",
    cta: "Start a strategy project",
    services: 9,
    categories: [
      {
        name: "Founder Support",
        items: [
          "Startup Roadmapping",
          "Pitch Deck Mastery",
          "Capital/Investor Strategy",
          "Market Intelligence",
          "GTM (Go-To-Market) Strategy",
        ],
      },
      {
        name: "Advisory",
        items: [
          "Digital Transformation",
          "Digital Reputation Management",
          "Loyalty & Gamification Strategy",
          "Technical Feasibility Studies",
        ],
      },
    ],
  },
];

export const getPillar = (slug: string) => pillars.find((p) => p.slug === slug);

// Options match the contact form on vaxalor.com.
export const serviceOptions = [
  "Web & App Development",
  "Enterprise Systems (SaaS/ERP/CRM)",
  "Backend & Integration",
  "AI & Machine Learning",
  "Automation & Data",
  "UI/UX Design",
  "Visual Branding",
  "Video & Motion",
  "SEO & Content",
  "Growth Marketing & Ads",
  "Social Media & Outreach",
  "Founder & Startup Support",
  "Advisory & Consulting",
  "MVP Development",
  "Other",
];

// Business systems showcase: names come from the Enterprise Systems and Backend categories above.
// Descriptions explain what each kind of system is for. They are not claims about specific client results.
export const systems = [
  {
    id: "saas",
    name: "SaaS Product Architecture",
    text: "The foundations of a software product: accounts, plans, an API-first core and room to grow.",
    nodes: ["Accounts", "Plans", "API", "Admin", "Data"],
  },
  {
    id: "erp",
    name: "ERP Systems",
    text: "One connected system for the operations that usually live in separate spreadsheets and tools.",
    nodes: ["Finance", "Inventory", "People", "Orders", "Reports"],
  },
  {
    id: "crm",
    name: "CRM Portals",
    text: "A shared view of customers, conversations and pipeline, so nothing slips between teams.",
    nodes: ["Leads", "Contacts", "Deals", "Tasks", "Inbox"],
  },
  {
    id: "tools",
    name: "Custom Business Management Tools",
    text: "Internal tools shaped around how your team actually works, not how a template expects.",
    nodes: ["Workflows", "Approvals", "Roles", "Alerts", "Export"],
  },
  {
    id: "legacy",
    name: "Legacy System Modernization",
    text: "Move ageing software onto a modern stack, step by step, without stopping the business.",
    nodes: ["Old system", "Bridge", "New core", "Migrate", "Retire"],
  },
];
