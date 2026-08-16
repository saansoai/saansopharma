import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { company } from "@/content/site";
import {
  SITE_URL,
  graph,
  organisationSchema,
  plantSchema,
  websiteSchema,
} from "@/content/schema";
import { JsonLd } from "@/components/JsonLd";
import { PowderCursor } from "@/components/PowderCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

/**
 * The `<title>` leads with the brand and then says what the company does — the
 * result has to answer "who are they" for someone who has never heard the name.
 * The tagline still carries the brand line into `openGraph`, where there is
 * room for both.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saanso Pharma — Sterile Injectables & Anaesthetics CDMO",
    template: "%s | Saanso Pharma",
  },
  description:
    "Saanso Pharma is a sterile and specialty CDMO at Eluru, Andhra Pradesh — ampoule, vial, blow-fill-seal and volatile anaesthetics under one quality system, built to Schedule M, U.S. FDA and EU GMP standards. 60M+ units a year across 300+ products.",
  applicationName: company.name,
  category: "Pharmaceutical manufacturing",
  keywords: [
    "Saanso Pharma",
    "sterile injectables manufacturer India",
    "CDMO India",
    "contract pharmaceutical manufacturing",
    "fill finish CDMO",
    "ampoule filling",
    "lyophilised vials",
    "blow fill seal",
    "volatile anaesthetics manufacturer",
    "sevoflurane isoflurane desflurane halothane",
    "critical care injectables",
    "Eluru Andhra Pradesh pharmaceutical facility",
    "Schedule M EU GMP manufacturing",
    "generic medicines India",
  ],
  authors: [{ name: company.legalName, url: SITE_URL }],
  creator: company.legalName,
  publisher: company.legalName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: company.name,
    title: "Saanso Pharma — Working for a healthier world",
    description:
      "Ampoule, vial, blow-fill-seal and volatile anaesthetic fill\u2013finish at Eluru, Andhra Pradesh. Four formats, one facility, 60M+ units a year.",
    images: [
      {
        url: "/images/facility.jpeg",
        width: 1600,
        height: 919,
        alt: "The Saanso Pharma manufacturing facility at Eluru, Andhra Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saanso Pharma — Working for a healthier world",
    description:
      "Sterile injectables, inhalers and specialty generics manufactured in Eluru, Andhra Pradesh.",
    images: ["/images/facility.jpeg"],
  },
  /**
   * The `max-*` values matter for answer engines as much as for search — they
   * are what allows a full snippet to be quoted rather than a clipped one.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL, "x-default": SITE_URL },
  },
};

/**
 * The entity graph every page inherits: the company, the site, and the plant
 * as a place. Page-level graphs (`Article`, `FAQPage`, breadcrumbs) reference
 * these by `@id` rather than restating them.
 */
const siteGraph = graph(organisationSchema, websiteSchema, plantSchema);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      // The inline script below strips `no-js` before React hydrates, so the
      // server and client class lists legitimately differ on this element.
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} no-js h-full antialiased`}
    >
      <head>
        {/*
          Strips `no-js` before first paint so reveal animations can run. If it
          never executes, `.no-js [data-reveal]` keeps every section visible —
          the page degrades to plain readable HTML rather than a blank screen.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
        <JsonLd data={siteGraph} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <PowderCursor />
        {children}
      </body>
    </html>
  );
}
