# Saanso Pharma — Legacy Site Content Audit

Source: `saansopharma.com` (Create React App SPA). All content extracted from the JS bundle
`main.f78e6194.js` — the served HTML is an empty shell, so nothing was crawlable normally.
Captured 2026-08-04.

---

## 1. Brand

- **Name:** saanso (lowercase wordmark) / Saanso Pharma Private Limited
- **Logo:** `assets/logo.dd712458cb0ee939dd14.png` — lowercase black wordmark + blue "breath"
  swoosh (double-helix / lung-like ribbon). Two blues: deep royal (~#2A6DB0) and light cyan (~#4FC0E8).
- **Signage tagline (on plant render):** "Working for a healthier world"
- **Legacy accent color used in code:** `#3286C7` (buttons), `#f7f7f5` (light chips)
- **Meaning note:** "saanso" = breath (Hindi). Ties directly to the respiratory origin of the business.

## 2. Company facts

| Field | Value |
|---|---|
| Founded | 2017 (LinkedIn company page lists 2016; site says 2017) |
| Type | South Indian pharma — affordable generics, critical care + specialty |
| Head Office | 1st Floor Q2, Cyber Towers, Hitech City, Hyderabad, Telangana |
| Manufacturing Plant | Denduluru Rd, Eluru, Andhra Pradesh |
| Other locations named | Vizag, Vijayawada, Hyderabad |
| Employees | 250+ (site) / 201–500 (LinkedIn) |
| Operational States | 8+ |
| Therapy areas | 10+ |
| Emails | info@saansopharma.in, hr@saansopharma.in |
| Subsidiary | Saanso Life Sciences Pvt Ltd (est. Nov 2022, Hyderabad — marketing/distribution, ~190 distributors) |

**No phone number and no social links exist anywhere on the legacy site.** Needs to be supplied.

### Mission / Vision / Values (verbatim)
- **Values:** "Innovation, Care, and Quality drive sustainable, ethical healthcare solutions."
  Also stated as: "Integrity, Innovation, Excellence and…" (sentence is truncated on the live site)
- **Mission:** "Ensure High-Quality, Innovative medicines are Accessible, Affordable & Available Globally."
- **Vision:** "Aspires to be India's leading name in pharmaceuticals, health, and wellness by 2030."
- **Positioning line:** "Saanso is a vertically integrated pharmaceutical company with operations
  strategically located across India. With access to cutting-edge therapeutics, We align the
  3Ps — Prescribers, Patients, and Business Partners — to drive our efforts towards achieving
  Health Equity in global markets."

## 3. The five divisions

| Division | Code | Focus | Headline used |
|---|---|---|---|
| Saanso Respiro Sciences | SRS | Inhalers, nasal sprays, respiratory antibiotics; asthma, COPD, bronchodilators | "With a range of products providing optimal treatment and prevention of respiratory diseases." |
| Cardiovascular Sciences | CVS | Anti-hypertensives, oral anti-diabetics, diabetic neuropathic pain, hyperacidity, nutraceuticals, immunity boosters | "For improving Cardiometabolic health and quality of life in hypertensives." |
| Saanso Neuro Sciences | SNS | Epilepsy, Parkinson's, migraine, mental health / CNS | "For improving mental health in neuropsychiatric patients" |
| Saanso Pharma Division | SPD | GI, pain management, immunity boosters, bone-health nutrients | "Optimizing joint & nutritional health and general well being of patients." |
| Saanso Critical Care | SCC | Life-saving injectables for ICU / emergency | "For Better Critical Care and Improved Quality of Life in Patients" |

SCC is the newest division — its launch is written up as a milestone event.

### Sample products named on site
Meropenem & Sulbactam 1.5gm · Piperacillin Tazobactam 2.25gm · Cerebroprotein Hydrolysate 90mg ·
Dabigatran Etexilate 150mg · Cholecalciferol 60000 IU Softgel · Fluticasone Furoate 27.5mcg ·
Glycopyrrolate 25mcg + Formoterol Fumarate 6/12mcg · Oxymetazoline HCl Nasal Spray 0.05% ·
Saline Nasal Spray 0.65% w/v 20ml

Brand names (via 1mg/Apollo listings): Telmivaz series, Rozuvadil, Esomeez, Rabizod, Cepojet,
Azeclopara, Naproxy D, Vildazyt M, Olancare, Dapacin, Dabitan, RIVAAxa.

## 4. Manufacturing (Eluru plant)

- **Liquid Injections (Glass Vials & Ampoules)** — Capacity: **60 million vials per annum**.
  Combined output of the first two lines; fill volumes 2 ml to 100 ml.
- **BFS (Blow Fill Seal) Vials** — Capacity: **14 million vials per annum**. Dedicated third line.
- Product formats presented as: VIALS / AMPOULES / RESPULES
- Equipment referenced in job posts: Vial Washing Machines, Depyrogenation Tunnels, Vial &
  Ampoule Filling/Sealing, BFS Machines, Autoclaves, HVAC, Water System, QMS.
- External record (CARE Ratings, Aug 2024): injectables project, total cost ₹58.48 crore
  (₹30 cr debt + ₹28.48 cr promoter contribution); planned range 10,000 to 10 lakh vials.

> **Gap:** no certifications (WHO-GMP, ISO, Schedule M) are stated anywhere on the legacy site.
> This is the single biggest credibility hole for a "trustworthy" redesign. Needs client input.

## 5. R&D (verbatim)

"Saanso has one of the best R&D infrastructures, combining Development Excellence and
manufacturing science, which form the backbone of its manufacturing operations. The Research and
Development team possesses wide ranging expertise in Formulation development, Analytical Research
and Niche segment development."

Pipeline items mentioned in content:
- Sub-50nm nanoparticles to cross the blood-brain barrier for Alzheimer's treatment
- Nanoparticles for more effective drug delivery in COPD
- Improving medication intake for patients with xerostomia

## 6. Events (the raw material for the roadmap section)

| Event | Date | Route |
|---|---|---|
| AOI APCON, Bhimavaram | 13–15 Sep 2024 | `bhimavaram-conference` |
| AP APICON, Visakhapatnam | 20–22 Sep 2024 | `vizag-conference` |
| Launch of new SCC (Critical Care) Division | — (2024/25) | `ssc-launch` |
| TOSACON 2025, HICC Novotel Hyderabad | 14–16 Feb 2025 | `tosacon-2025` |
| Annual Budget Meeting 2025–26 | 2025 | `budget-2025` |

**Known timeline anchors for a year-on-year progress bar:**
2017 founded → 2022 Saanso Life Sciences subsidiary → 2024 Eluru injectables project (₹58.48 cr)
+ conference circuit → 2025 SCC division launch, TOSACON → **2030 vision target**.
Everything between 2025 and 2030 must be supplied by the client.

## 7. Articles / blog (existing)

Three real, long-form pharma articles already written — genuinely usable:
1. **"The Lifecycle of a Drug: From Concept to Consumer"** — discovery → preclinical → clinical
   phases → FDA/NDA review → post-marketing surveillance. Includes tables.
2. **"Optimizing the Pharmaceutical Supply Chain for Efficiency"** — COVID disruption, forecasting,
   IoT/RFID, cold chain, warehouse robotics, blockchain, sustainable logistics.
3. **Pharma industry growth trends 2025** — AI in drug discovery, biotech & personalized medicine,
   aging population, digital health/telemedicine, regulatory reform.

Also present but **junk from the purchased template — delete**: "Baby flat head pillow", study-abroad
/ visa consulting posts, "Exploring Emerging Trends in Software Development", "How Our Software
Solutions Drive Insights".

## 8. Careers content (real, reusable)

Roles posted: Head of Marketing (10–15 LPA), Sales Executive – Nutrition, Executive Microbiology
(2–4 yrs), Technical Assistants/Executives – Sterile Manufacturing (0–4 yrs, 1.2–5 LPA).
All at Denduluru, Eluru. Applications to hr@saansopharma.in.
Culture copy exists on open-door policy, L&D, work-life balance, DEI, sustainability.

## 9. Legacy sitemap

`/` `/home` `/about` `/manufacturing` `/research-development` `/contact` `/careers`
`/respiro` `/cardio` `/neuro` `/pharma` `/critical-care`
`/events` + 5 event pages · `/blogs` + `/blog1` `/blog2` `/blog3`
`/head-of-marketing` `/sales-executive` `/executive-microbiology` `/technical-assistants-execuitves` *(sic — typo in legacy route)*

## 10. Assets saved to `_legacy/assets/`

| File | What it is | Verdict |
|---|---|---|
| `section-1-1...png` (1700×1100) | **Architectural render of the Eluru plant** — clean, modern, branded signage, blue sky | **Hero candidate. Best asset on the site.** |
| `logo...png` | Wordmark + swoosh, 12KB, small | Reusable, but need a vector/SVG from client |
| `Presence...png` | India map, 8 red pins | Concept is right; red pins are the "cheap" element — rebuild as SVG in brand blues |
| `respiro/cardio/nuero/pharma/critical...png` | Division icons — navy + cyan dot-art (lungs, heart, brain…) | **On-brand and good.** Keep, convert to SVG |
| `homeabout...png`, `Section-1-2...png` | Generic Western stock lab photos | Off-brand for an Indian pharma. Replace with real plant/team photography |
| `homebg...png`, `banner...png` | Hexagon-pattern backgrounds, sky-blue gradient | The "cheap" look. Drop |
| `down1/down2...png` | Manufacturing line diagrams | Useful reference for the manufacturing section |
| `team...png`, `desktop...png` | Small/low-value | Skip |

Full list of all 321 referenced media files: `_legacy/asset-list.txt`

## 11. What's wrong with the legacy site (why the redesign is justified)

1. **It's a repurposed software-agency template.** The bundle still ships `icon_react_js.svg`,
   `icon_python.svg`, `vuejs.svg`, `portfolio_item_image_*.webp`, and blog posts about visa
   consulting and baby pillows. Footer credit: "Powered by Infosage Digital."
2. **Zero SEO / zero crawlability.** CSR-only React, `<title>` is literally "saanso",
   meta description is "SAANSO Pharma". No OG tags, no sitemap, no structured data.
   Google cannot index a word of the real content.
3. **1.3 MB JS + 1.0 MB CSS on first paint**, and 321 unoptimized PNGs. No WebP/AVIF, no
   responsive images, no lazy loading.
4. **Inline styles everywhere** (`style={{paddingTop:"75px"}}`) — no design system, inconsistent
   spacing and type scale across pages.
5. **No trust signals.** No certifications, no leadership team, no regulatory/quality page,
   no phone number, no social presence, no privacy policy.
6. **Typo in a live route** (`technical-assistants-execuitves`) and a truncated values sentence —
   signals of low care to any visiting distributor or partner.
