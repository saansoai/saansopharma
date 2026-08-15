import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { company, contact } from "@/content/site";
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

const SITE_URL = "https://saansopharma.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Saanso Pharma — Working for a healthier world",
    template: "%s | Saanso Pharma",
  },
  description:
    "Saanso Pharma is a sterile and specialty CDMO at Eluru, Andhra Pradesh — ampoule, vial, blow-fill-seal and volatile anaesthetics under one quality system, built to Schedule M, U.S. FDA and EU GMP standards.",
  keywords: [
    "Saanso Pharma",
    "pharmaceutical manufacturer India",
    "sterile injectables",
    "blow fill seal",
    "critical care medicines",
    "respiratory inhalers",
    "Eluru Andhra Pradesh",
    "generic medicines India",
  ],
  authors: [{ name: company.legalName }],
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
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

/** Organisation schema so search engines can read the company as an entity. */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  foundingDate: String(company.founded),
  slogan: company.tagline,
  description: company.positioning,
  email: contact.general,
  sameAs: [contact.social.linkedin],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "1st Floor Q2, Cyber Towers, Hitech City",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500081",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Denduluru Road",
      addressLocality: "Eluru",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <PowderCursor />
        {children}
      </body>
    </html>
  );
}
