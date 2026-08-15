/**
 * Product portfolio.
 *
 * Generated from the client's workbook (`Website thoughts.xlsx`, 13 Aug 2026),
 * which carries two sheets: Commercial — what is in market today — and
 * Pipeline — what is in development. Category headings are the yellow-filled
 * rows in column A; the three/six split comes straight from the source.
 *
 * Strengths are rendered the way Excel displays them. Several of those cells
 * are percentages stored as decimals, so a raw read gives "0.001" where the
 * client sees "0.10%" — the generator applies each cell's number format.
 *
 * No development stages or launch dates are recorded here: the workbook states
 * none, and a pipeline product's status is not something to invent.
 */

export type PortfolioProduct = {
  name: string;
  therapy: string;
  strength: string;
  presentation: string;
};

export type PortfolioCategory = {
  id: string;
  name: string;
  /** Which container drawing represents this category. */
  vessel: "vial" | "ampoule" | "bfs" | "anaesthetics" | "infusion" | "ophthalmic";
  products: readonly PortfolioProduct[];
};

export type PortfolioStage = {
  id: "commercial" | "pipeline";
  label: string;
  blurb: string;
  categories: readonly PortfolioCategory[];
};

const commercial: readonly PortfolioCategory[] = [
  {
    id: "vials-liquid-injections",
    name: "Vials (Liquid Injections)",
    vessel: "vial",
    products: [
      { name: "Ketorolac Tromethamine Injection", therapy: "NSAID Analgesic", strength: "15 mg/mL, 30 mg/mL", presentation: "15 mg/1 mL, 30 mg/1 mL, 60 mg/2 mL" },
      { name: "Cyanocobalamin Injection", therapy: "Vitamin B12 Replacement", strength: "1000 mcg/mL", presentation: "1000 mcg/1 mL" },
      { name: "Tranexamic Acid Injection", therapy: "Antifibrinolytic", strength: "100 mg/mL", presentation: "500 mg/5 mL, 1000 mg/10 mL" },
      { name: "Glycopyrrolate Injection", therapy: "Anticholinergic / Anaesthesia", strength: "0.2 mg/mL", presentation: "0.2 mg/1 mL, 0.4 mg/2 mL, 1 mg/5 mL, 4 mg/20 mL" },
      { name: "Ondansetron Injection", therapy: "Antiemetic", strength: "2 mg/mL", presentation: "4 mg/2 mL, 8 mg/4 mL" },
      { name: "Ropivacaine Injection", therapy: "Local Anaesthetic", strength: "0.20%, 0.50%, 0.75%, 1.00%", presentation: "20 mg/10 mL, 50 mg/10 mL, 75 mg/10 mL, 100 mg/10 mL, 100 mg/20 mL, 200 mg/20 mL, 60 mg/30 mL, 150 mg/30 mL, 225 mg/30 mL, 300 mg/30 mL" },
      { name: "Bupivacaine Injection", therapy: "Local Anaesthetic", strength: "0.25%, 0.50%, 0.75%", presentation: "25 mg/10 mL, 50 mg/10 mL, 75 mg/10 mL, 75 mg/30 mL, 125 mg/50 mL, 150 mg/30 mL, 225 mg/30 mL, 250 mg/50 mL" },
      { name: "Dexmedetomidine HCl Injection", therapy: "Sedative", strength: "100 mcg/mL", presentation: "200 mcg/2 mL, 400 mcg/4 mL, 1000 mcg/10 mL" },
      { name: "Verapamil HCl Injection", therapy: "Antiarrhythmic", strength: "2.5 mg/mL", presentation: "5 mg/2 mL, 10 mg/4 mL" },
      { name: "Milrinone Lactate Injection", therapy: "Cardiac Inotrope", strength: "1 mg/mL", presentation: "20 mg/10 mL, 50 mg/50 mL" },
      { name: "Gentamicin Injection", therapy: "Aminoglycoside Antibiotic", strength: "10 mg/mL, 40 mg/mL", presentation: "20 mg/2 mL, 80 mg/2 mL, 800 mg/20 mL" },
      { name: "Etomidate Injection", therapy: "General Anaesthetic", strength: "2 mg/mL", presentation: "20 mg/10 mL, 40 mg/20 mL" },
      { name: "Lidocaine Injection", therapy: "Local Anaesthetic", strength: "1.00%", presentation: "20 mg/2 mL, 50 mg/5 mL, 300 mg/30 mL" },
      { name: "Furosemide Injection", therapy: "Loop Diuretic", strength: "10 mg/mL", presentation: "20 mg/2 mL, 40 mg/4 mL, 100 mg/10 mL" },
      { name: "Palonosetron HCl Injection", therapy: "Antiemetic", strength: "0.05 mg/mL", presentation: "0.25 mg/5 mL" },
    ],
  },
  {
    id: "infusion-liquid-injections",
    name: "Infusion (Liquid Injections)",
    vessel: "infusion",
    products: [
      { name: "Paracetamol Injection", therapy: "Analgesic / Antipyretic", strength: "10 mg/mL", presentation: "1000 mg/100 mL" },
      { name: "Zoledronic Acid Injection", therapy: "Bisphosphonate / Osteoporosis", strength: "0.05 mg/mL", presentation: "5 mg/100 mL" },
    ],
  },
  {
    id: "ampoules-liquid-injections",
    name: "Ampoules (Liquid Injections)",
    vessel: "ampoule",
    products: [
      { name: "Ketorolac Tromethamine Injection", therapy: "NSAID Analgesic", strength: "15 mg/mL, 30 mg/mL", presentation: "15 mg/1 mL, 30 mg/1 mL, 60 mg/2 mL" },
      { name: "Cyanocobalamin Injection", therapy: "Vitamin B12 Replacement", strength: "1000 mcg/mL", presentation: "1000 mcg/1 mL" },
      { name: "Tranexamic Acid Injection", therapy: "Antifibrinolytic", strength: "100 mg/mL", presentation: "500 mg/5 mL" },
      { name: "Glycopyrrolate Injection", therapy: "Anticholinergic / Anaesthesia", strength: "0.2 mg/mL", presentation: "0.2 mg/1 mL, 0.4 mg/2 mL" },
      { name: "Ondansetron Injection", therapy: "Antiemetic", strength: "2 mg/mL", presentation: "4 mg/2 mL, 8 mg/4 mL" },
      { name: "Ropivacaine Injection", therapy: "Local Anaesthetic", strength: "0.20%, 0.75%", presentation: "40 mg/20 mL, 150 mg/20 mL" },
      { name: "Bupivacaine Injection", therapy: "Local Anaesthetic", strength: "0.25%, 0.50%, 0.75%", presentation: "25 mg/10 mL, 50 mg/10 mL, 75 mg/10 mL" },
      { name: "Dexmedetomidine HCl Injection", therapy: "Sedative", strength: "100 mcg/mL", presentation: "200 mcg/2 mL, 400 mcg/4 mL" },
      { name: "Verapamil HCl Injection", therapy: "Antiarrhythmic", strength: "2.5 mg/mL", presentation: "5 mg/2 mL, 10 mg/4 mL" },
      { name: "Milrinone Lactate Injection", therapy: "Cardiac Inotrope", strength: "1 mg/mL", presentation: "10 mg/10 mL" },
      { name: "Chlorpromazine HCl Injection", therapy: "Antipsychotic", strength: "25 mg/mL", presentation: "25 mg/mL, 50 mg/2 mL" },
      { name: "Gentamicin Injection", therapy: "Aminoglycoside Antibiotic", strength: "10 mg/mL, 40 mg/mL", presentation: "20 mg/2 mL, 80 mg/2 mL" },
      { name: "Lidocaine Injection", therapy: "Local Anaesthetic", strength: "1.00%", presentation: "20 mg/2 mL, 50 mg/5 mL" },
    ],
  },
];

const pipeline: readonly PortfolioCategory[] = [
  {
    id: "vials-liquid-injections",
    name: "Vials (Liquid Injections)",
    vessel: "vial",
    products: [
      { name: "Nimodipine Injection for Infusion", therapy: "Calcium Channel Blocker / Neuroprotective", strength: "0.02%", presentation: "10 mg/50 mL, 10 mg/5 mL" },
      { name: "Edaravone Injection", therapy: "Free Radical Scavenger / Neuroprotective", strength: "0.3 mg/mL", presentation: "30 mg/100 mL" },
      { name: "Adenosine Injection", therapy: "Antiarrhythmic", strength: "3.0 mg/mL", presentation: "60 mg/20 mL, 90 mg/30 mL, 6 mg/2 mL, 12 mg/4 mL" },
      { name: "Lacosamide Injection", therapy: "Antiepileptic", strength: "10 mg/mL", presentation: "200 mg/20 mL, 100 mg/10 mL" },
      { name: "Sugammadex Injection", therapy: "Neuromuscular Block Reversal Agent", strength: "100 mg/mL", presentation: "200 mg/2 mL" },
      { name: "Esmolol Hydrochloride Injection", therapy: "Beta-Blocker / Antiarrhythmic", strength: "10 mg/mL", presentation: "100 mg/10 mL" },
      { name: "Phenylephrine HCl Injection", therapy: "Vasopressor / Decongestant", strength: "1.00%", presentation: "10 mg/1 mL, 50 mg/5 mL, 100 mg/10 mL" },
      { name: "Mefentamine Sulphate Injection", therapy: "Vasopressor / Hypotension Management", strength: "30 mg/mL", presentation: "300 mg/10 mL" },
      { name: "Heparin Injection", therapy: "Anticoagulant", strength: "5000 IU/mL", presentation: "25000 IU/5 mL" },
      { name: "Ferric Carboxymaltose Injection", therapy: "Iron Replacement", strength: "50 mg/mL", presentation: "500 mg/10 mL, 1000 mg/20 mL" },
      { name: "Acetylcysteine Injection", therapy: "Antidote / Mucolytic", strength: "200 mg/mL", presentation: "6 g/30 mL" },
      { name: "Phytomenadione (Vitamin K1) Injection", therapy: "Vitamin K Replacement", strength: "10 mg/mL, 25 mg/mL", presentation: "10 mg/1 mL, 50 mg/2 mL" },
      { name: "Propofol Injection", therapy: "General Anaesthetic / Sedative", strength: "10 mg/mL", presentation: "100 mg/10 mL, 200 mg/20 mL, 500 mg/50 mL, 1000 mg/100 mL" },
    ],
  },
  {
    id: "ampoules-liquid-injections",
    name: "Ampoules (Liquid Injections)",
    vessel: "ampoule",
    products: [
      { name: "Bupivacaine Injection HEAVY", therapy: "Local Anaesthetic", strength: "0.75%", presentation: "15 mg/2 mL" },
      { name: "Adrenaline (Epinephrine) Injection", therapy: "Vasopressor / Bronchodilator / Anaphylaxis Management", strength: "1 mg/1 mL", presentation: "1 mg/1 mL" },
      { name: "Clindamycin Injection", therapy: "Lincosamide Antibiotic", strength: "150 mg/mL", presentation: "300 mg/2 mL, 600 mg/4 mL" },
      { name: "Phenobarbitone Injection", therapy: "Anticonvulsant / Sedative", strength: "100 mg/mL, 200 mg/mL", presentation: "100 mg/1 mL, 200 mg/1 mL" },
      { name: "Protamine Sulfate Injection", therapy: "Heparin Antagonist / Anticoagulant Reversal Agent", strength: "10 mg/mL", presentation: "50 mg/5 mL" },
      { name: "Iron Sucrose Injection", therapy: "Iron Replacement", strength: "20 mg/mL", presentation: "50 mg/2.5 mL, 100 mg/5 mL, 200 mg/10 mL" },
      { name: "Acetylcysteine Injection", therapy: "Antidote / Mucolytic", strength: "200 mg/mL", presentation: "400 mg/2 mL, 1000 mg/5 mL" },
      { name: "Phytomenadione (Vitamin K1) Injection", therapy: "Vitamin K Replacement", strength: "2 mg/mL", presentation: "1 mg/0.5 mL" },
    ],
  },
  {
    id: "bfs-blow-fill-seal-vials-respules",
    name: "BFS (Blow Fill Seal) Vials / Respules",
    vessel: "bfs",
    products: [
      { name: "Budesonide Respiratory Suspension", therapy: "Corticosteroid", strength: "0.25 mg, 0.5 mg, 1 mg", presentation: "2 mL, 2.5 mL" },
      { name: "Levosalbutamol Respiratory Solution", therapy: "Bronchodilator", strength: "0.31 mg, 0.63 mg, 1.25 mg", presentation: "2 mL, 2.5 mL, 3 mL" },
      { name: "Ipratropium Bromide Respiratory Solution", therapy: "Anticholinergic Bronchodilator", strength: "0.5 mg", presentation: "2.5 mL" },
      { name: "Levosalbutamol + Ipratropium Bromide", therapy: "Bronchodilator", strength: "0.63 mg + 0.5 mg, 1.25 mg + 0.5 mg", presentation: "2.5 mL" },
      { name: "Levosalbutamol + Budesonide", therapy: "Bronchodilator / Corticosteroid", strength: "0.31 mg + 0.5 mg, 0.63 mg + 0.5 mg, 1.25 mg + 0.5 mg", presentation: "2 mL, 2.5 mL" },
      { name: "Formoterol + Budesonide", therapy: "LABA / Corticosteroid", strength: "20 mcg + 0.5 mg, 20 mcg + 1 mg", presentation: "2 mL, 2.5 mL" },
      { name: "Arformoterol", therapy: "Long-Acting Bronchodilator", strength: "15 mcg", presentation: "2 mL, 2.5 mL" },
      { name: "Tobramycin", therapy: "Aminoglycoside Antibiotic", strength: "300 mg", presentation: "5 mL" },
      { name: "Fluticasone Propionate", therapy: "Corticosteroid", strength: "0.5 mg, 2 mg", presentation: "2 mL, 2.5 mL" },
      { name: "Glycopyrronium", therapy: "Long-Acting Anticholinergic", strength: "25 mcg", presentation: "2 mL" },
      { name: "Sodium Chloride Inhalation Solution", therapy: "Nebulization Solution", strength: "0.9%, 3%, 7%", presentation: "2 mL, 3 mL, 4 mL" },
      { name: "Sterile Water for Inhalation", therapy: "Nebulization / Diluent", strength: "Sterile Water", presentation: "2 mL, 5 mL" },
    ],
  },
  {
    id: "ophthalmics-eye-drops",
    name: "Ophthalmics (Eye Drops)",
    vessel: "ophthalmic",
    products: [
      { name: "Moxifloxacin Ophthalmic Solution", therapy: "Fluoroquinolone Antibiotic", strength: "0.50%", presentation: "5 mL" },
      { name: "Olopatadine HCl Ophthalmic Solution", therapy: "Antihistamine / Mast Cell Stabilizer", strength: "0.1%, 0.20%", presentation: "5 mL" },
      { name: "Latanoprost Ophthalmic Solution", therapy: "Prostaglandin Analogue / Antiglaucoma", strength: "0.005%", presentation: "5 mL" },
      { name: "Latanoprost + Timolol Maleate Ophthalmic Solution", therapy: "Antiglaucoma", strength: "0.005% + 0.50%", presentation: "5 mL" },
      { name: "Timolol Maleate Ophthalmic Solution", therapy: "Beta-Blocker / Antiglaucoma", strength: "0.50%", presentation: "5 mL" },
      { name: "Bimatoprost Ophthalmic Solution", therapy: "Prostaglandin Analogue / Antiglaucoma", strength: "0.03%", presentation: "10 mL" },
      { name: "Dorzolamide HCl + Timolol Maleate Ophthalmic Solution", therapy: "Antiglaucoma", strength: "2.00% + 0.50%", presentation: "10 mL" },
      { name: "Dorzolamide HCl Ophthalmic Solution", therapy: "Carbonic Anhydrase Inhibitor / Antiglaucoma", strength: "2.00%", presentation: "5 mL" },
      { name: "Carboxymethylcellulose Sodium Ophthalmic Solution", therapy: "Ophthalmic Lubricant", strength: "0.50%", presentation: "10 mL" },
      { name: "HPMC (Hydroxypropyl Methylcellulose (Hypromellose)) Ophthalmic Solution", therapy: "Ophthalmic Lubricant", strength: "0.30%", presentation: "10 mL, 15 mL" },
      { name: "Sodium Hyaluronate (Hyaluronic Acid) Ophthalmic Solution", therapy: "Ophthalmic Lubricant", strength: "0.1%, 0.3%", presentation: "10 mL, 15 mL" },
    ],
  },
  {
    id: "inhalation-anaesthetic-glass-bottle",
    name: "Inhalation Anaesthetic (Glass Bottle)",
    vessel: "anaesthetics",
    products: [
      { name: "Isoflurane", therapy: "Inhalation Anaesthetic", strength: "Volatile Inhalation Anaesthetic", presentation: "100 mL, 250 mL" },
      { name: "Sevoflurane", therapy: "Inhalation Anaesthetic", strength: "Volatile Inhalation Anaesthetic", presentation: "100 mL, 250 mL" },
    ],
  },
  {
    id: "contrast-agents-glass-vials",
    name: "Contrast Agents (Glass Vials)",
    vessel: "vial",
    products: [
      { name: "Gadobutrol Injection", therapy: "MRI Contrast Agent", strength: "1 mmol/mL", presentation: "20 mL, 30 mL" },
      { name: "Gadodiamide Injection", therapy: "MRI Contrast Agent", strength: "287 mg/mL", presentation: "10 mL, 20 mL" },
      { name: "Iopromide Injection", therapy: "X-Ray / CT Contrast Agent", strength: "300/370 mg I/mL", presentation: "50 mL" },
      { name: "Iohexol Injection", therapy: "X-Ray / CT Contrast Agent", strength: "140/180/240/300/350 mg I/mL", presentation: "50 mL, 100 mL" },
    ],
  },
];

export const portfolio: readonly PortfolioStage[] = [
  {
    id: "commercial",
    label: "Commercial",
    blurb: "In market today, manufactured and released from Eluru.",
    categories: commercial,
  },
  {
    id: "pipeline",
    label: "Pipeline",
    blurb: "In development. Filings and launch dates are not yet on record.",
    categories: pipeline,
  },
];

/** Totals, derived rather than written down, so they cannot drift. */
export const portfolioTotals = portfolio.map((stage) => ({
  id: stage.id,
  categories: stage.categories.length,
  products: stage.categories.reduce((n, c) => n + c.products.length, 0),
}));
