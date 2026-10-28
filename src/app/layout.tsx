import type { Metadata, Viewport } from "next";
import { Sora, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import PageTransition from "@/components/layout/PageTransition";
import MotionProvider from "@/components/motion/MotionProvider";
import { SITE_URL, site } from "@/data/site";

const display = Sora({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Vaxalor | Digital products with soul", template: "%s | Vaxalor" },
  description: site.description,
  applicationName: "Vaxalor",
  openGraph: {
    type: "website",
    siteName: "Vaxalor",
    locale: "en_IN",
    url: SITE_URL,
    title: "Vaxalor | Digital products with soul",
    description: site.description,
  },
  twitter: { card: "summary_large_image", site: "@VaxalorAI" },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0a1020",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // lets the layout account for phone notches and home bars via env(safe-area-inset-*)
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vaxalor",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: site.description,
  foundingDate: String(site.founded),
  email: site.generalEmail,
  telephone: site.phone,
  sameAs: site.socials.map((s) => s.href),
};

// Runs before first paint: marks motion as available (unless reduced motion is requested) and decides whether the
// loading screen shows. Timeouts release everything if scripts stall, so content can never stay hidden.
const bootScript =
  "(function(){var r=document.documentElement;try{" +
  "if(!matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('js-anim');setTimeout(function(){r.classList.remove('js-anim')},9000)}" +
  "if(sessionStorage.getItem('vx-loaded')){r.classList.add('loader-skip')}else{r.classList.add('loader-lock');setTimeout(function(){r.classList.remove('loader-lock');r.classList.add('loader-skip')},7000)}" +
  "}catch(e){}})();";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{".loader,.curtain{display:none!important}html.loader-lock,html.loader-lock body{overflow:auto!important}"}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <LoadingScreen />
        <PageTransition />
        <MotionProvider />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
