/**
 * Structured data — the machine-readable half of the site.
 *
 * Nothing here is visible. It exists so that search engines and answer engines
 * (Google's AI Overviews, ChatGPT Search, Perplexity, Claude) can read Saanso
 * as an *entity* — a manufacturer, at an address, with named capabilities and
 * stated capacities — rather than having to infer all of that from prose.
 *
 * Every value is derived from `site.ts`. Nothing is written twice and nothing
 * is invented: if the page cannot say it, this file does not claim it either.
 * That matters more here than anywhere else on the site, because a wrong claim
 * in JSON-LD is a wrong claim quoted by a machine, without the page around it
 * to qualify what it meant.
 *
 * Note in particular that the standards below are phrased as *built to*, never
 * as *certified by* — that is what the source documents support.
 */

import {
  anaestheticAgents,
  articles,
  certifications,
  company,
  contact,
  formats,
  pairing,
  totalUnits,
  type Article,
} from "./site";

export const SITE_URL = "https://saansopharma.com";

/** Stable @ids, so every graph in the site points at one set of entities. */
export const ID = {
  organisation: `${SITE_URL}/#organisation`,
  website: `${SITE_URL}/#website`,
  plant: `${SITE_URL}/#plant`,
  headOffice: `${SITE_URL}/#head-office`,
} as const;

const million = (n: number) => `${Math.round((n / 1_000_000) * 10) / 10}M`;

const headOfficeAddress = {
  "@type": "PostalAddress",
  streetAddress: "1st Floor Q2, Cyber Towers, Hitech City",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  postalCode: "500081",
  addressCountry: "IN",
} as const;

const plantAddress = {
  "@type": "PostalAddress",
  streetAddress: "Denduluru Road",
  addressLocality: "Eluru",
  addressRegion: "Andhra Pradesh",
  addressCountry: "IN",
} as const;

/**
 * What the company is competent in. This is the one place a keyword list is
 * legitimate — `knowsAbout` exists precisely so an entity can declare its
 * subject matter, and answer engines read it when deciding whether a company
 * is a candidate answer to "who fills volatile anaesthetics in India".
 */
const knowsAbout = [
  "Contract development and manufacturing (CDMO)",
  "Sterile fill–finish",
  "Ampoule filling",
  "Vial filling, liquid and lyophilised",
  "Lyophilisation",
  "Blow-fill-seal (BFS)",
  "Volatile inhalation anaesthetics",
  "Sevoflurane, Isoflurane, Desflurane and Halothane filling",
  "Critical care injectables",
  "Aseptic processing and terminal sterilisation",
  "Cleaning validation and cross-contamination control",
  "Schedule M, U.S. FDA and EU GMP manufacturing standards",
  "Pharmaceutical manufacturing in Andhra Pradesh, India",
];

/** The four fill–finish formats, as a service catalogue. */
const offerCatalogue = {
  "@type": "OfferCatalog",
  name: "Fill–finish services",
  itemListElement: formats.map((format) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: `${format.name} fill–finish`,
      serviceType: "Contract pharmaceutical manufacturing",
      description: format.description,
      provider: { "@id": ID.organisation },
      areaServed: { "@type": "Country", name: "India" },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Fill range",
          value: format.fillRange,
        },
        ...(format.units
          ? [
              {
                "@type": "PropertyValue",
                name: "Installed capacity",
                value: `${million(format.units)} ${format.unitLabel} per annum`,
              },
            ]
          : []),
        {
          "@type": "PropertyValue",
          name: "Container",
          value: format.attribute,
        },
      ],
    },
  })),
};

/** The company itself — the anchor entity for the whole site. */
export const organisationSchema = {
  "@type": "Organization",
  "@id": ID.organisation,
  name: company.legalName,
  alternateName: [company.name, company.wordmark],
  legalName: company.legalName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo.png`,
    width: 300,
    height: 95,
  },
  image: `${SITE_URL}/images/facility.jpeg`,
  foundingDate: String(company.founded),
  foundingLocation: { "@type": "Place", name: "Andhra Pradesh, India" },
  slogan: company.tagline,
  description: company.positioning,
  email: contact.general,
  sameAs: [contact.social.linkedin],
  address: [headOfficeAddress, plantAddress],
  location: { "@id": ID.plant },
  areaServed: { "@type": "Country", name: "India" },
  knowsAbout,
  hasOfferCatalog: offerCatalogue,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Business enquiries",
      email: contact.general,
      areaServed: "IN",
      availableLanguage: ["en", "te", "hi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "Careers",
      email: contact.careers,
      areaServed: "IN",
      availableLanguage: ["en"],
    },
  ],
  subOrganization: {
    "@type": "Organization",
    name: "Saanso Life Sciences",
    description:
      "Wholly owned marketing and distribution subsidiary in Hyderabad, with a network of roughly 190 distributors.",
    parentOrganization: { "@id": ID.organisation },
  },
};

/** The Eluru plant as a place in its own right. */
export const plantSchema = {
  "@type": "Factory",
  "@id": ID.plant,
  name: "Saanso Pharma manufacturing facility, Eluru",
  description: `${company.claim} Installed capacity of ${million(totalUnits)}+ units a year across ampoule, vial, blow-fill-seal and volatile anaesthetic lines.`,
  address: plantAddress,
  image: `${SITE_URL}/images/facility.jpeg`,
  url: `${SITE_URL}/#capacity`,
  parentOrganization: { "@id": ID.organisation },
  amenityFeature: certifications.map((c) => ({
    "@type": "LocationFeatureSpecification",
    name: `Built to ${c.name} standards`,
    value: true,
  })),
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE_URL,
  name: company.name,
  description: company.positioning,
  publisher: { "@id": ID.organisation },
  inLanguage: "en-IN",
};

/**
 * The questions a buyer actually types, answered in the words the site uses.
 *
 * This is the answer-engine surface: an assistant asked "who can fill both
 * sterile injectables and volatile anaesthetics in India" reads these pairs
 * directly. Every answer is traceable to `site.ts`.
 */
export const faqSchema = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      question: "What does Saanso Pharma manufacture?",
      answer: `Saanso Pharma is a sterile and specialty CDMO running four fill–finish formats at one site in Eluru, Andhra Pradesh: ${formats
        .map((f) => f.name.toLowerCase())
        .join(", ")}. More than 300 products are in market across those formats.`,
    },
    {
      question: "Where is Saanso Pharma's manufacturing facility?",
      answer:
        "The facility is on Denduluru Road, Eluru, Andhra Pradesh, India. The head office is at Cyber Towers, Hitech City, Hyderabad, Telangana 500081.",
    },
    {
      question: "What is Saanso Pharma's annual manufacturing capacity?",
      answer: `Installed capacity is ${million(totalUnits)}+ units a year: ${formats
        .filter((f) => f.units)
        .map((f) => `${million(f.units as number)} ${f.unitLabel}`)
        .join(", ")}.`,
    },
    {
      question:
        "Can one supplier fill both sterile injectables and inhalation anaesthetics?",
      answer: pairing.body,
    },
    {
      question: "Which volatile anaesthetic agents does Saanso Pharma fill?",
      answer: `${anaestheticAgents
        .map((a) => a.name)
        .join(", ")} — halogenated ethers filled in solvent-compatible lines with agent-specific fillers and closures, in ${formats.find((f) => f.id === "anaesthetics")?.fillRange} bottles.`,
    },
    {
      question: "Which manufacturing standards is the Eluru facility built to?",
      answer: `The facility is built to ${certifications
        .map((c) => c.name)
        .join(", ")} standards, with in-house microbiology and QC, and qualification, validation and QMS documentation maintained for audit batch by batch.`,
    },
    {
      question: "What fill volumes can Saanso Pharma run?",
      answer: formats
        .map((f) => `${f.name}: ${f.fillRange}`)
        .join(". ")
        .concat("."),
    },
    {
      question: "When was Saanso Pharma founded?",
      answer: `Saanso Pharma was incorporated in ${company.founded}, broke ground at Eluru in ${company.foundationStone}, and brought the facility online in 2024 on a ₹58.48 crore investment.`,
    },
  ].map((qa) => ({
    "@type": "Question",
    name: qa.question,
    acceptedAnswer: { "@type": "Answer", text: qa.answer },
  })),
};

/** The four formats as an explicit, ordered list of capabilities. */
export const formatsListSchema = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#formats`,
  name: "Fill–finish formats",
  numberOfItems: formats.length,
  itemListElement: formats.map((format, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: format.name,
    description: `${format.description} Fill range ${format.fillRange}.`,
    url: `${SITE_URL}/#format-${format.id}`,
  })),
};

/** Breadcrumbs. `trail` excludes Home, which is prepended here. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

/** "12 min read" → "PT12M", which is what schema.org wants. */
const readingTimeToDuration = (readingTime: string) => {
  const minutes = readingTime.match(/\d+/)?.[0];
  return minutes ? `PT${minutes}M` : undefined;
};

export function articleSchema(article: Article) {
  const url = `${SITE_URL}/insights/${article.slug}`;

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    timeRequired: readingTimeToDuration(article.readingTime),
    inLanguage: "en-IN",
    author: { "@id": ID.organisation },
    publisher: { "@id": ID.organisation },
    image: article.image ? `${SITE_URL}${article.image}` : `${SITE_URL}/images/facility.jpeg`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": ID.website },
  };
}

/** Every article, so the Insights index reads as a real publication. */
export const insightsListSchema = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#insights-list`,
  name: "Saanso Pharma Insights",
  numberOfItems: articles.length,
  itemListElement: articles.map((article, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/insights/${article.slug}`,
    name: article.title,
  })),
};

/** Wraps a set of nodes into one `@graph`, which is cheaper than one tag each. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
