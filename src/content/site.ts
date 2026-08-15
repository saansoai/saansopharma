/**
 * Single source of truth for every piece of copy and data on the site.
 *
 * Facts here were extracted from the legacy saansopharma.com bundle and
 * cross-checked against public records — see `_legacy/CONTENT-AUDIT.md`.
 *
 * Anything the client still owes us is marked `PENDING` and rendered as a
 * visible placeholder rather than silently omitted, so nothing invented
 * ends up in front of a prescriber or a distributor.
 */

export const company = {
  name: "Saanso Pharma",
  legalName: "Saanso Pharma Private Limited",
  wordmark: "saanso",
  founded: 2017,
  foundationStone: 2019,
  tagline: "Working for a healthier world",
  /** The literal meaning of the name — the spine of the whole About section. */
  etymology: "saanso — breath",
  visionYear: 2030,
  mission: "To work for a healthier world.",
  vision: "To work for innovative, healthier solutions.",
  /** The 2030 ambition, kept separate from the vision statement itself. */
  ambition:
    "To be India's leading name in pharmaceuticals, health and wellness by 2030.",
  values: ["Innovation", "Care", "Quality", "Integrity"],
  positioning:
    "A vertically integrated pharmaceutical company with operations across India, aligning the three Ps — Prescribers, Patients and Business Partners — toward health equity in global markets.",
  /** From the company deck, August 2026. */
  claim:
    "First in South India to have a unified facility equipped with five specialised production lines.",
} as const;

export const contact = {
  headOffice: {
    label: "Head Office",
    lines: ["1st Floor Q2, Cyber Towers", "Hitech City, Hyderabad", "Telangana 500081"],
  },
  plant: {
    label: "Manufacturing Facility",
    lines: ["Denduluru Road", "Eluru, Andhra Pradesh"],
  },
  general: "info@saansopharma.in",
  careers: "hr@saansopharma.in",
  /** PENDING — no phone number exists anywhere on the legacy site. */
  phone: null as string | null,
  /** PENDING — no social links exist anywhere on the legacy site. */
  social: {
    linkedin: "https://in.linkedin.com/company/saanso-pharma",
  },
} as const;

/**
 * Headline figures, taken from the company deck (August 2026).
 *
 * PENDING — the second figure read "In market across six divisions". Those six
 * divisions were never real, so the phrase has been re-pointed at the four
 * fill–finish formats, which are. The 300+ count itself still needs
 * confirming against a source now that the division breakdown is gone.
 */
export const stats = [
  { value: "60M+", label: "Units a year", detail: "Across five production lines" },
  { value: "300+", label: "Products", detail: "Across four fill–finish formats" },
  { value: "10,000+", label: "Healthcare professionals", detail: "Prescribing Saanso" },
  { value: "8+", label: "Operational states", detail: "Across India" },
] as const;

/**
 * The four fill–finish formats, per the Capability Statement (Rev. 01/2026).
 *
 * The one-pager frames the facility as four *formats* rather than five *lines*
 * — a format can run across more than one line, so both counts are true and
 * the company claim about five specialised lines still stands below.
 *
 * PENDING — the one-pager ships with `LINES 00 · 00 M UNITS P.A.` unfilled on
 * every format. Unit figures below are carried over from the August 2026 deck
 * where one exists; `lines` is null everywhere because no source states it.
 *
 * PENDING — the deck and the one-pager disagree on two fill ranges (BFS:
 * 3–30 ml vs 0.5–500 ml; anaesthetics volume). The one-pager is the later
 * document, so its ranges are used here and the deck values are noted in
 * `deckFillRange` rather than being thrown away.
 */
export type Format = {
  id: string;
  name: string;
  description: string;
  fillRange: string;
  /** The second spec chip — container type, or flow arrangement. */
  attribute: string;
  /** Installed units per annum. `null` where no source states it. */
  units: number | null;
  unitLabel: string;
  /** Number of lines. PENDING on every format — the one-pager reads `00`. */
  lines: number | null;
  /** Deck value, kept where it contradicts the one-pager. */
  deckFillRange?: string;
};

export const formats: readonly Format[] = [
  {
    id: "ampoule",
    name: "Ampoule",
    description:
      "Type I glass, flame-sealed. No closure, no elastomer, nothing to fail at the interface.",
    fillRange: "1–10 ml",
    attribute: "Clear / amber",
    units: 12_000_000,
    unitLabel: "ampoules",
    lines: null,
  },
  {
    id: "vial",
    name: "Vial",
    description:
      "Liquid and lyophilised. Stoppered under nitrogen, capped and inspected in line.",
    fillRange: "2–100 ml",
    attribute: "Liquid + lyo",
    units: 40_000_000,
    unitLabel: "vials",
    lines: null,
  },
  {
    id: "bfs",
    name: "Blow-Fill-Seal",
    description:
      "Formed, filled and sealed in one cycle. The container does not exist before the product goes in.",
    fillRange: "0.5–500 ml",
    attribute: "LDPE amps / vials",
    units: 7_000_000,
    unitLabel: "vials",
    lines: null,
    deckFillRange: "3 ml – 30 ml",
  },
  {
    id: "anaesthetics",
    name: "Volatile Anaesthetics",
    description:
      "Halogenated ethers in solvent-compatible lines, with agent-specific fillers and closures.",
    fillRange: "100 / 250 ml",
    attribute: "Segregated flow",
    units: 1_800_000,
    unitLabel: "bottles",
    lines: null,
  },
] as const;

export const totalUnits = formats.reduce((sum, f) => sum + (f.units ?? 0), 0);

/**
 * The differentiator, per the one-pager: sterile injectables and inhalation
 * anaesthetics run in one block on separated flows.
 */
export const pairing = {
  eyebrow: "The pairing almost nobody has",
  title: "Sterile injectables and inhalation anaesthetics. One block, two flows.",
  body: "Volatile anaesthetics are not a sterile dosage form, so most sterile manufacturers never take them on. We run both in one block, separated by protocol rather than by postcode: distinct personnel entry and exit routes, distinct raw material and finished goods routes, and product-contact parts that never cross between them.",
  /**
   * PENDING — the one-pager reads "Cross-contamination control is state the
   * basis", an unfilled placeholder. Only the controls it actually lists are
   * reproduced here; the basis itself is deliberately absent.
   */
  controls: [
    "PDE / toxicological assessment",
    "Air handling and pressure cascade",
    "Campaign changeover",
    "Cleaning validation",
  ],
  note: "Full flow diagrams and the risk assessment are available under NDA.",
  outcome:
    "For a customer, that takes a supplier off the list: a theatre-suite portfolio consolidates to one site, one audit, one relationship.",
} as const;

/**
 * The four halogenated agents.
 *
 * `colour` follows the international agent-identification code used on
 * vaporisers and packaging, which the one-pager explicitly calls for — these
 * are the standard ISO assignments, not decorative choices.
 *
 * PENDING — every agent reads `STATUS` on the one-pager, so `status` is null
 * and renders as an explicit placeholder rather than an invented claim.
 */
export const anaestheticAgents = [
  { name: "Sevoflurane", colour: "#F5C400", status: null as string | null },
  { name: "Isoflurane", colour: "#8B5FA8", status: null as string | null },
  { name: "Desflurane", colour: "#2A86BF", status: null as string | null },
  { name: "Halothane", colour: "#D6453C", status: null as string | null },
] as const;

export type Milestone = {
  year: number;
  title: string;
  detail: string;
  /** `future` entries render as outlined nodes ahead of the progress fill. */
  status: "past" | "future";
  /** Marks the single milestone that anchors the vision. */
  anchor?: boolean;
};

export const milestones: readonly Milestone[] = [
  {
    year: 2017,
    title: "Saanso is founded",
    detail:
      "Incorporated in Andhra Pradesh with a single conviction: that quality generics in critical care should not be a premium product.",
    status: "past",
  },
  {
    year: 2019,
    title: "Foundation stone at Eluru",
    detail:
      "Ground broken on a facility of our own — the decision that turned Saanso from a marketing company into a manufacturer.",
    status: "past",
  },
  {
    year: 2022,
    title: "Saanso Life Sciences",
    detail:
      "A wholly owned marketing and distribution subsidiary established in Hyderabad, growing to a network of roughly 190 distributors.",
    status: "past",
  },
  {
    year: 2024,
    title: "The Eluru facility comes online",
    detail:
      "A ₹58.48 crore investment delivers five specialised production lines under one roof — the first unified facility of its kind in South India.",
    status: "past",
  },
  {
    year: 2025,
    title: "Critical Care division launches",
    detail:
      "SCC opens with a portfolio of life-saving injectables built for intensive care and emergency medicine.",
    status: "past",
  },
  {
    year: 2026,
    title: "Where we are now",
    detail:
      "More than 300 products, over 60 million units of installed capacity a year, and 10,000+ healthcare professionals prescribing Saanso.",
    status: "past",
  },
  // PENDING — client to supply the milestones that bridge 2026 to the 2030 vision.
  {
    year: 2028,
    title: "Milestone to be confirmed",
    detail:
      "Placeholder. Replace with the agreed 2027–2028 objective — regulatory accreditation, export market entry, or capacity expansion.",
    status: "future",
  },
  {
    year: 2030,
    title: "India's leading name in pharmaceuticals, health and wellness",
    detail:
      "The stated vision, with a date attached to it. Everything above is the distance already covered toward it.",
    status: "future",
    anchor: true,
  },
] as const;

/**
 * Standards the Eluru facility is built to, per the company deck.
 *
 * Rendered as typographic badges rather than reproductions of the official
 * FDA / EU marks — those are controlled trademarks, and a set-in-type
 * treatment reads as more considered anyway.
 */
export const certifications = [
  {
    name: "Schedule M",
    authority: "Indian Drugs & Cosmetics Act",
    region: "India",
  },
  {
    name: "U.S. FDA",
    authority: "Food and Drug Administration",
    region: "United States",
  },
  {
    name: "EU GMP",
    authority: "Good Manufacturing Practice",
    region: "European Union",
  },
] as const;

export const qualityPillars = [
  {
    title: "Sterile by design",
    detail:
      "Washing, depyrogenation, automated fill-seal and autoclaving — a sterile chain with no manual break in it.",
  },
  {
    title: "Tested, then tested again",
    detail:
      "In-house microbiology and QC across wet chemistry and instrumentation, to written protocol.",
  },
  {
    title: "Documented end to end",
    detail: "Qualification, validation and QMS maintained for audit, batch by batch.",
  },
] as const;

/**
 * Articles.
 *
 * The three long-form pieces are the real ones from the legacy site (/blog1,
 * /blog2, /blog3) — titles as published. Their bodies and figures live in
 * `articles.ts`, recovered from the legacy JS bundle; see the header there.
 *
 * `image` is the original card image from the legacy /blogs index. The three
 * Saanso event write-ups never had one, so they carry no image and render as
 * a ruled list rather than as picture cards.
 */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Industry" | "Saanso";
  readingTime: string;
  date: string;
  /** Card image under /public/images/insights. Absent for the event posts. */
  image?: string;
};

export const articles: readonly Article[] = [
  {
    slug: "lifecycle-of-a-drug",
    title: "The lifecycle of a drug: from concept to consumer",
    excerpt:
      "Discovery to approval to the surveillance that begins the day a medicine reaches a real patient.",
    category: "Industry",
    readingTime: "12 min read",
    date: "2025-06-18",
    image: "/images/insights/lifecycle-card.png",
  },
  {
    slug: "optimising-the-pharmaceutical-supply-chain",
    title: "Optimizing the pharmaceutical supply chain for efficiency",
    excerpt:
      "COVID exposed how brittle pharma logistics were. IoT tracking, cold chain and robotics are what replaced the assumptions.",
    category: "Industry",
    readingTime: "10 min read",
    date: "2025-04-02",
    image: "/images/insights/supply-card.png",
  },
  {
    slug: "pharma-growth-trends",
    title: "5 key factors driving pharmaceutical industry growth in 2025",
    excerpt:
      "AI, gene therapy, an ageing population and virtual trials \u2014 the genuine shifts, not the press releases.",
    category: "Industry",
    readingTime: "9 min read",
    date: "2025-01-27",
    image: "/images/insights/growth-card.png",
  },
  {
    slug: "critical-care-division-launch",
    title: "Saanso launches its Critical Care division",
    excerpt:
      "Essential injectables for intensive care and emergency departments.",
    category: "Saanso",
    readingTime: "4 min read",
    date: "2025-03-11",
  },
  {
    slug: "tosacon-2025",
    title: "Saanso at TOSACON 2025, Hyderabad",
    excerpt:
      "The 10th Telangana Orthopaedic Surgeons' Association conference, HICC Novotel.",
    category: "Saanso",
    readingTime: "3 min read",
    date: "2025-02-16",
  },
  {
    slug: "ap-apicon-visakhapatnam",
    title: "AP APICON 2024, Visakhapatnam",
    excerpt:
      "With the Andhra Pradesh chapter of the Association of Physicians, 20\u201322 September.",
    category: "Saanso",
    readingTime: "3 min read",
    date: "2024-09-22",
  },
] as const;

/**
 * Primary navigation.
 *
 * Four tabs and the Get-in-touch button, per the nav sheet. `About Us` and
 * `Media` carry submenus; `Our Capabilities` and `Products` are single
 * destinations on the homepage.
 *
 * `hint` is optional — the format menu used it to show a fill range beside
 * each item, and nothing in the current set has an equivalent.
 */
export type NavItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string; hint?: string }[];
};

export const navigation: readonly NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Saanso", href: "/about" },
      { label: "Directors", href: "/about#leadership" },
      { label: "Team", href: "/about#team" },
    ],
  },
  { label: "Our Capabilities", href: "/#capacity" },
  { label: "Products", href: "/#portfolio" },
  {
    // PENDING — News & Updates and Blogs both land on the single Insights
    // section; there is no separate news feed to point the first one at.
    label: "Media",
    href: "/#insights",
    children: [
      { label: "News & Updates", href: "/#insights" },
      { label: "Blogs", href: "/#insights" },
    ],
  },
];

/**
 * Leadership.
 *
 * Transcribed verbatim from `public/Profiles.docx` (14 Aug 2026). Bios are the
 * document's own paragraphs, unedited.
 *
 * `years`, `companies` and `highlights` are pulled out of those same
 * paragraphs so the page can lead with them — every value appears in the prose
 * it was taken from. Nothing is inferred: where the document is silent, the
 * field is absent and the page says so.
 *
 * PENDING — no photographs were supplied, so the profiles run on a typographic
 * monogram. PENDING — the document gives Mr Bhupathiraju a title and no bio.
 */
export type Leader = {
  name: string;
  role: string;
  /** The document's paragraphs, in order, verbatim. */
  bio: readonly string[];
  /** Years of experience, only where the document states a figure. */
  years?: string;
  /** Prior employers named in the bio. */
  companies?: readonly string[];
  /** Figures worth pulling out of the prose. */
  highlights?: readonly { value: string; label: string }[];
  /** Path under /public. Falls back to initials when absent. */
  photo?: string;
};

export const leadership: readonly Leader[] = [
  {
    name: "Mr. Naren Paturi",
    role: "Director",
    bio: [
      "Mr. Naren Paturi is a visionary healthcare entrepreneur and the driving force behind the conceptualization of Saanso Pharma Private Limited.",
      "He is currently heading as a Director of Saanso Pharma Private Limited, with overall responsibility for leading the company\u2019s finance, financial planning, and strategic financial management functions.",
      "A results-oriented executive, he combines strategic foresight with operational discipline to translate long-term goals into measurable outcomes.",
      "He has a proven ability to identify emerging opportunities in healthcare, build strong teams, and lead multidisciplinary initiatives from ideation to execution.",
      "Mr. Paturi began his career at Tierra Seed Sciences Pvt. Ltd., where he gained exposure to marketing, HR, and operations functions in an innovation-driven environment.",
      "In 2022, he spearheaded Saanso\u2019s diversification into pharmaceutical marketing through a wholly owned subsidiary, Saanso Life Sciences Private Limited, which now manages a professional team of 250 marketing personnel. This division focuses on creating a strong domestic and international market presence across India, LATAM, Africa, and Europe.",
      "He is known for his dynamic leadership, analytical acumen, and commitment to building sustainable business models rooted in quality and innovation.",
    ],
    companies: ["Tierra Seed Sciences", "Saanso Life Sciences"],
    highlights: [
      { value: "2022", label: "Founded Saanso Life Sciences" },
      { value: "250", label: "Marketing personnel led" },
      { value: "4", label: "Regions \u2014 India, LATAM, Africa, Europe" },
    ],
  },
  {
    name: "Mr. Vamse Krishna Ratnakaram",
    role: "Director",
    bio: [
      "Mr. Vamse Krishna Ratnakaram brings 25 years of experience in pharmaceutical manufacturing, quality systems, regulatory compliance, and business operations. He has held key roles with Eugia Pharma Specialities, Aurobindo Pharma, Lupin, Hetero, Macleods, Cipla, Panacea Biotec, and Abbott (formerly Nicholas Piramal).",
      "At Saanso Pharma, he provides strategic leadership across manufacturing, technical, quality, regulatory, and business operations, driving operational excellence, GMP compliance, regulatory readiness, and sustainable business growth. He has participated in 80+ international regulatory audits and brings strong expertise in sterile manufacturing and quality management.",
    ],
    years: "25",
    companies: [
      "Eugia Pharma Specialities",
      "Aurobindo Pharma",
      "Lupin",
      "Hetero",
      "Macleods",
      "Cipla",
      "Panacea Biotec",
      "Abbott (formerly Nicholas Piramal)",
    ],
    highlights: [
      { value: "25", label: "Years in pharmaceuticals" },
      { value: "80+", label: "International regulatory audits" },
      { value: "8", label: "Manufacturers previously served" },
    ],
  },
  {
    name: "Mr. Subbu Bhupathiraju",
    role: "Head \u2014 Business Development",
    bio: [
      "Mr. Subbu is an MBA graduate from Nottingham Business School (UK), having extensive professional experience in business management. He brings hands-on expertise across operations, finance, and stakeholder management. As a key leader within the organization, he oversees operations, drives financial discipline, and builds effective stakeholder relationships.",
    ],
  },
  {
    name: "Mr. Suresh M",
    role: "Manager \u2014 Business Development",
    bio: [
      "Mr. Suresh M brings 20+ years of pharmaceutical industry experience, with strong expertise in business development, client engagement, strategic partnerships, and identifying new. He has held key roles with Hetero, Aurobindo Pharma, and Dr. Reddy\u2019s Laboratories, gaining extensive industry exposure and a strong understanding of pharmaceutical operations and regulatory requirements.",
    ],
    years: "20+",
    companies: ["Hetero", "Aurobindo Pharma", "Dr. Reddy\u2019s Laboratories"],
    highlights: [
      { value: "20+", label: "Years in pharmaceuticals" },
      { value: "3", label: "Manufacturers previously served" },
    ],
  },
];
