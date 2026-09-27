// Official BIS Domain Knowledge Base for Offline Fallback & Grounded Guidance
import { procurementCategories } from '../data/procurementData';

export const bisSystemPrompt = `You are AI SATHI, the official virtual assistant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.

Your mandate is to provide precise, authoritative, evidence-backed, and reliable assistance on:
1. Indian Standards (IS Codes) and mandatory Quality Control Orders (QCOs)
2. Product Certification Schemes (ISI Mark - Scheme I, CRS - Scheme II, FMCS - Foreign Manufacturers, ECO Mark)
3. Gold and Silver Hallmarking, 6-digit HUID (Hallmark Unique Identification) validation
4. BIS Central & Regional Laboratories, LIMS, and testing parameters
5. Citizen consumer protection, BIS Care verification of CM/L and R-numbers, and reporting substandard products.

Tone & Style:
- Professional, official, polite, objective, structured.
- Structure responses with clean headings, markdown lists, and parameter tables where helpful.
- Cite exact standard numbers (e.g., IS 10500:2012 for Drinking Water, IS 456:2000 for Concrete, IS 1293:2019 for Plugs & Sockets, IS 1417:2016 for Gold Hallmarking).
- Answer in the user's requested language.`;

// Comprehensive Indian Standards Catalog Database
const standardsEncyclopedia = {
  '1293': {
    code: 'IS 1293:2019',
    title: 'Plugs and Socket-Outlets for Domestic and Similar Purposes of Rated Voltage up to and Including 250 V and Rated Current up to and Including 16 A',
    status: 'Active & Mandatory under QCO',
    scheme: 'Scheme-I (BIS ISI Mark)',
    ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    qco: 'Electrical Accessories (Quality Control) Order, 2020',
    scope: 'Covers plugs and fixed or portable socket-outlets for a.c. only, with and without earthing contact, rated voltage above 50 V but not exceeding 250 V, and rated current up to 16 A.',
    keyParameters: [
      { param: 'Current & Voltage Ratings', requirement: '2.5 A, 6 A, 10 A, and 16 A at 250 V a.c. (50 Hz)' },
      { param: 'Safety Shutters', requirement: 'Mandatory on 6 A and 16 A domestic socket-outlets to prevent child accidental contact' },
      { param: 'Insulation Resistance', requirement: 'Min 5 MΩ between live parts and body measured with 500 V d.c.' },
      { param: 'High Voltage / Dielectric', requirement: 'Withstand 2000 V a.c. for 1 minute without breakdown' },
      { param: 'Temperature Rise Test', requirement: 'Max 45°C rise on terminals under 1.25 times rated current' },
      { param: 'Endurance & Mechanical Life', requirement: '10,000 cycles for 6 A / 5,000 cycles for 16 A at rated current and voltage' },
      { param: 'Glow-Wire / Flammability', requirement: 'Self-extinguishing at 850°C glow-wire temperature for insulating material' }
    ],
    normativeReferences: ['IS 9968 (Part 1)', 'IS/IEC 60695-2-11', 'IS 14927', 'IS 3854'],
    tenderClause: `The plugs, sockets, and electrical accessories supplied shall strictly conform to IS 1293:2019 (with all latest amendments). The manufacturer must hold a valid BIS License (CM/L Number) under Scheme-I. All socket-outlets must feature integral safety shutters. Test certificates from a BIS or NABL accredited laboratory for high-voltage, temperature rise, and 10,000-cycle endurance tests shall be submitted with the technical bid.`
  },
  '10322': {
    code: 'IS 10322 (Part 5/Sec 3):2012 & IS 16107:2012',
    title: 'Luminaires: Particular Requirements — Luminaires for Road and Street Lighting / LED Luminaires',
    status: 'Active & Mandatory under QCO',
    scheme: 'Scheme-II (CRS) & Scheme-I (ISI Mark)',
    ministry: 'Ministry of Electronics & IT (MeitY) / DPIIT',
    qco: 'Solar / LED Lighting Equipment (Quality Control) Order',
    scope: 'Covers road, street, highway, and public outdoor area lighting LED luminaires operating on supply voltages up to 1000 V.',
    keyParameters: [
      { param: 'Luminous Efficacy', requirement: 'Min 110 to 140 lumens/Watt (System efficacy)' },
      { param: 'Ingress Protection', requirement: 'IP66 rating for optical and driver compartment (IS/IEC 60529)' },
      { param: 'Surge Protection (SPD)', requirement: 'Min 10 kV internal / external surge protection withstand' },
      { param: 'Power Factor & THD', requirement: 'PF ≥ 0.95, Total Harmonic Distortion (THD) < 10%' },
      { param: 'Driver Safety', requirement: 'Conformity to IS 15885 (Part 2/Sec 13) with over-voltage, short-circuit, and thermal cut-off' },
      { param: 'Operating Life', requirement: 'L70 life > 50,000 burning hours at ambient temperature 45°C' }
    ],
    normativeReferences: ['IS 16103 (Part 1)', 'IS 15885 (Part 2/Sec 13)', 'IS 16102 (Part 1 & 2)', 'IS/IEC 60529'],
    tenderClause: `The LED Street Light Luminaires shall strictly conform to IS 10322 (Part 5/Sec 3) and IS 16107 (Part 2/Sec 1). The LED driver must comply with IS 15885 (Part 2/Sec 13) and bear a valid BIS CRS R-number. Minimum system efficacy shall be 120 lm/W with IP66 ingress protection and 10kV surge protection device (SPD).`
  },
  '4984': {
    code: 'IS 4984:2016',
    title: 'High Density Polyethylene (HDPE) Pipes for Water Supply — Specification (Fifth Revision)',
    status: 'Active & Mandatory under QCO',
    scheme: 'Scheme-I (BIS ISI Mark)',
    ministry: 'Department for Promotion of Industry and Internal Trade (DPIIT) / Ministry of Jal Shakti',
    qco: 'Pipes and Fittings (Quality Control) Order',
    scope: 'Covers plain HDPE pipes (sizes 16 mm to 1000 mm nominal outer diameter) for potable water supply, irrigation, and industrial conveyance.',
    keyParameters: [
      { param: 'Raw Material Grade', requirement: 'Virgin PE-100 or PE-80 polymer with minimum required strength (MRS 10.0 MPa / 8.0 MPa)' },
      { param: 'Pressure Ratings', requirement: 'PN 2.5, PN 4, PN 6, PN 10, PN 12.5, PN 16, PN 20 bars' },
      { param: 'Hydrostatic Strength Test', requirement: '100 hours at 20°C (12.4 MPa for PE-100) and 165 hours at 80°C (5.4 MPa)' },
      { param: 'Carbon Black Content & Dispersion', requirement: '2.0 to 2.5% carbon black, dispersion grade ≤ 3' },
      { param: 'Melt Flow Index (MFI)', requirement: '0.2 to 1.1 g/10 min at 190°C / 5.0 kg' },
      { param: 'Oxidation Induction Time (OIT)', requirement: 'Min 20 minutes at 200°C as per IS 12235' }
    ],
    normativeReferences: ['IS 12235 (Parts 1 to 19)', 'IS 7328', 'IS 9845 (Food Grade/Potable Toxicity)', 'IS 14885'],
    tenderClause: `The HDPE pipes shall be manufactured from 100% virgin PE-100 raw material and strictly conform to IS 4984:2016 (Pressure Rating PN-10, SDR 13.6). Each pipe length shall carry permanent sequential markings of the BIS Standard Mark (ISI mark), CM/L number, manufacturer's name, size, and PE grade. The vendor must provide NABL-accredited test reports for hydrostatic pressure and OIT.`
  },
  '1786': {
    code: 'IS 1786:2008',
    title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement (Fourth Revision)',
    status: 'Active & Mandatory under QCO',
    scheme: 'Scheme-I (BIS ISI Mark)',
    ministry: 'Ministry of Steel (Steel & Steel Products Quality Control Order)',
    qco: 'Mandatory Steel Quality Control Order',
    scope: 'Covers technical requirements for thermo-mechanically treated (TMT) deformed steel bars for structural reinforcement in civil engineering works.',
    keyParameters: [
      { param: 'Material Grades', requirement: 'Fe 415, Fe 415D, Fe 500, Fe 500D, Fe 550, Fe 550D, Fe 600' },
      { param: 'Yield Strength (0.2% Proof Stress)', requirement: 'Min 500.0 N/mm² for Fe 500 / 500D; Min 550.0 N/mm² for Fe 550' },
      { param: 'Tensile Strength (UTS/YS Ratio)', requirement: 'Min 1.10 for Fe 500, Min 1.12 for Fe 500D (Super Ductile for Seismic Zones)' },
      { param: 'Elongation at Gauge Length', requirement: 'Min 16.0% for Fe 500D, Min 14.5% for Fe 550D' },
      { param: 'Chemical Composition (Carbon Max)', requirement: 'Max 0.25% C for Fe 500D (C.E. Max 0.42% for superior weldability)' },
      { param: 'Bend & Re-Bend Tests', requirement: '180° cold bend without rupture or surface fracture' }
    ],
    normativeReferences: ['IS 2062', 'IS 432', 'IS 456:2000 (Code of Practice for Plain and Reinforced Concrete)', 'IS 1608'],
    tenderClause: `The reinforcement steel shall be Primary Producer Thermo-Mechanically Treated (TMT) Fe 500D grade conforming to IS 1786:2008 (Reaffirmed 2023) with ISI marking. Secondary rerolled steel is strictly prohibited under GFR 144(i). Manufacturer's batch-wise Mill Test Certificate (MTC) and NABL tensile/ductility test reports shall accompany each consignment.`
  },
  '269': {
    code: 'IS 269:2015',
    title: 'Ordinary Portland Cement (OPC) — Specification (Sixth Revision)',
    status: 'Active & Mandatory under QCO',
    scheme: 'Scheme-I (BIS ISI Mark)',
    ministry: 'Ministry of Commerce and Industry (Cement Quality Control Order)',
    qco: 'Mandatory Cement Quality Control Order, 2003',
    scope: 'Unifies specification for 33 Grade, 43 Grade, and 53 Grade Ordinary Portland Cement into a single standard.',
    keyParameters: [
      { param: '28-Day Compressive Strength', requirement: '33 Grade: 33–48 MPa | 43 Grade: 43–58 MPa | 53 Grade: Min 53.0 MPa' },
      { param: 'Initial Setting Time', requirement: 'Minimum 30 minutes' },
      { param: 'Final Setting Time', requirement: 'Maximum 600 minutes (10 hours)' },
      { param: 'Fineness (Blaine Method)', requirement: 'Minimum 225 m²/kg (2250 cm²/g)' },
      { param: 'Soundness (Le-Chatelier)', requirement: 'Max expansion 10 mm (Autoclave expansion max 0.8%)' },
      { param: 'Insoluble Residue (IR)', requirement: 'Maximum 5.0% by mass' }
    ],
    normativeReferences: ['IS 4031 (Methods of Physical Tests for Hydraulic Cement)', 'IS 4032 (Chemical Analysis)', 'IS 456', 'IS 383'],
    tenderClause: `The cement supplied shall be 53 Grade Ordinary Portland Cement (OPC) or 43 Grade strictly conforming to IS 269:2015 with valid BIS ISI marking. The cement shall not be older than 60 days from the date of manufacture. Batch-wise Manufacturer's Test Certificate (MTC) showing 3-day, 7-day, and 28-day compressive strengths shall be provided.`
  },
  '10500': {
    code: 'IS 10500:2012',
    title: 'Drinking Water — Specification (Second Revision)',
    status: 'Active Indian Standard (Reaffirmed 2018)',
    scheme: 'Voluntary for Municipal Water Supply / Mandatory for Public Water Tenders',
    ministry: 'Ministry of Jal Shakti / Ministry of Consumer Affairs',
    qco: 'Uniform Drinking Water Quality Standards',
    scope: 'Prescribes the essential physical, chemical, toxicological, and bacteriological requirements for potable drinking water.',
    keyParameters: [
      { param: 'pH Value', requirement: '6.5 to 8.5 (No relaxation)' },
      { param: 'Total Dissolved Solids (TDS)', requirement: 'Desirable: Max 500 mg/L | Permissible: Max 2000 mg/L' },
      { param: 'Turbidity', requirement: 'Desirable: Max 1.0 NTU | Permissible: Max 5.0 NTU' },
      { param: 'Total Hardness (as CaCO₃)', requirement: 'Desirable: Max 200 mg/L | Permissible: Max 600 mg/L' },
      { param: 'Chlorides (as Cl)', requirement: 'Desirable: Max 250 mg/L | Permissible: Max 1000 mg/L' },
      { param: 'Free Residual Chlorine', requirement: 'Min 0.2 mg/L at consumer end' },
      { param: 'E. Coli & Total Coliform', requirement: 'Must be ZERO (0) per 100 mL sample' }
    ],
    normativeReferences: ['IS 3025 (Methods of Sampling and Test for Water and Wastewater)', 'IS 14543 (Packaged Drinking Water)', 'IS 13428'],
    tenderClause: `The treated water output shall strictly comply with IS 10500:2012 potable water standards. Water testing parameters shall be verified weekly through a NABL accredited testing laboratory for microbiological purity (zero E. Coli) and chemical TDS limits.`
  },
  '1417': {
    code: 'IS 1417:2016',
    title: 'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking (Fifth Revision)',
    status: 'Active & Mandatory under Central Hallmarking Order',
    scheme: 'BIS Hallmarking Scheme',
    ministry: 'Ministry of Consumer Affairs, Food & Public Distribution',
    qco: 'Hallmarking of Gold Jewellery Order, 2020',
    scope: 'Covers gold jewellery, bullion, and artefacts purity grading, assaying protocols, and the mandatory 3-mark hallmarking system.',
    keyParameters: [
      { param: 'Recognized Karatage Grades', requirement: '24K (999), 22K (916), 20K (833), 18K (750), 14K (585), 9K (375)' },
      { param: 'Mandatory Marks', requirement: '1. BIS Triangular Logo | 2. Fineness Grade (e.g. 22K916) | 3. 6-Digit Alphanumeric HUID' },
      { param: 'Assaying Method', requirement: 'Fire Assay (Cupellation Method) conforming to IS 1418:2009' },
      { param: 'Verification Tool', requirement: 'BIS Care Mobile App (Verify HUID feature)' }
    ],
    normativeReferences: ['IS 1418:2009 (Assaying of Gold)', 'IS 2790', 'IS 2112 (Silver Hallmarking)'],
    tenderClause: `All gold artefacts, commemorative medals, and tokens procured shall strictly comply with IS 1417:2016 with mandatory BIS Hallmarking and valid 6-digit laser-etched HUID code. Independent assaying certificates from a BIS-recognized Assaying & Hallmarking Centre (AHC) must be furnished.`
  },
  '7098': {
    code: 'IS 7098 (Part 1 & Part 2)',
    title: 'Crosslinked Polyethylene (XLPE) Insulated Thermoplastic Sheathed Cables',
    status: 'Active & Mandatory under QCO',
    scheme: 'Scheme-I (BIS ISI Mark)',
    ministry: 'Ministry of Heavy Industries & Ministry of Power',
    qco: 'Cables Quality Control Order',
    scope: 'Covers single-core, two-core, three-core, and multi-core XLPE power cables for working voltages up to 1.1 kV (Part 1) and 3.3 kV to 33 kV (Part 2).',
    keyParameters: [
      { param: 'Conductor Material', requirement: 'High-conductivity annealed bare electrolytic copper or EC-grade aluminium (IS 8130)' },
      { param: 'Insulation', requirement: 'Cross-linked Polyethylene (XLPE) with continuous operating temp up to 90°C' },
      { param: 'Armouring', requirement: 'Galvanized steel wire / strip armouring conforming to IS 3975' },
      { param: 'Outer Sheath', requirement: 'Extruded Type ST2 PVC or FRLS (Flame Retardant Low Smoke) compound conforming to IS 5831' },
      { param: 'High Voltage Test', requirement: 'AC spark test on insulation and 3 kV AC withstand test for 5 minutes' }
    ],
    normativeReferences: ['IS 8130 (Conductors)', 'IS 5831 (PVC Insulation)', 'IS 3975', 'IS 10810 (Testing Methods)'],
    tenderClause: `The 1.1 kV / 11 kV power cables shall strictly conform to IS 7098 (Part 1/2) with XLPE insulation, galvanized steel strip armour, and FRLS outer sheath bearing valid BIS ISI marking. Factory acceptance tests (FAT) including conductor resistance, insulation resistance, and high-voltage withstand shall be witnessed by the inspecting engineer.`
  },
  '15683': {
    code: 'IS 15683:2018',
    title: 'Portable Fire Extinguishers — Performance and Construction (First Revision)',
    status: 'Active & Mandatory under QCO',
    scheme: 'Scheme-I (BIS ISI Mark)',
    ministry: 'Ministry of Commerce & Industry / Fire Safety Regulations',
    qco: 'Fire Extinguishers Quality Control Order',
    scope: 'Covers stored pressure and cartridge-operated portable fire extinguishers (ABC powder, Water, Foam, CO₂, Clean Agent).',
    keyParameters: [
      { param: 'Extinguishing Media', requirement: 'UL/BIS approved ABC 90 MAP (Mono-ammonium phosphate) or Siliconized BC powder' },
      { param: 'Burst Pressure Test', requirement: 'Cylinder must withstand min 55 bar (5.5 MPa) hydraulic burst pressure' },
      { param: 'Fire Rating Classifications', requirement: 'Must achieve minimum test fire ratings (e.g. 4A, 34B, 55B) as per standard' },
      { param: 'Pressure Gauge', requirement: 'Magnetic diaphragm pressure gauge with green/red operating zones conforming to standard' }
    ],
    normativeReferences: ['IS 2190 (Selection, Installation and Maintenance of Portable Extinguishers)', 'IS 4308', 'IS 14609'],
    tenderClause: `The portable fire extinguishers shall strictly conform to IS 15683:2018 with BIS ISI mark embossing and CE-certified squeeze grip mechanism. The extinguishing media must be ABC mono-ammonium phosphate powder conforming to IS 14609 with minimum 3-year warranty.`
  }
};

/**
 * Enhanced Domain Knowledge Fallback & Semantic RAG Matcher
 */
export const offlineKnowledgeFallback = (query, language = 'en') => {
  const q = (query || '').toLowerCase().trim();
  const isHi = language === 'hi';

  // 1. Extract numeric IS standard code (e.g., '1293', '10322', '4984', '1786', '269', '10500', '1417', '7098', '15683')
  const numMatch = q.match(/\b(?:is\s*|standard\s*|code\s*)?(\d{3,5})\b/i);
  const matchedStdKey = numMatch ? numMatch[1] : null;

  if (matchedStdKey && standardsEncyclopedia[matchedStdKey]) {
    const std = standardsEncyclopedia[matchedStdKey];
    return `### 🏛️ Bureau of Indian Standards Technical Dossier — ${std.code}

**Official Title:**
> **${std.title}**

---

#### 📌 1. Scope, Status & Statutory Mandate
* **Standard Status:** **${std.status}**
* **Certification Scheme:** **${std.scheme}**
* **Quality Control Order (QCO):** ${std.qco}
* **Administering Ministry:** ${std.ministry}
* **Standard Scope:** ${std.scope}

---

#### 🧪 2. Essential Technical & Testing Parameters
| Technical Parameter | Mandatory Requirement / Benchmark |
| :--- | :--- |
${std.keyParameters.map(p => `| **${p.param}** | ${p.requirement} |`).join('\n')}

---

#### 🔗 3. Normative Reference Standards
* ${std.normativeReferences.join(' • ')}

---

#### 📑 4. GFR 2017 Rule 144(i) Tender Compliance Clause
\`\`\`text
${std.tenderClause}
\`\`\`

💡 *Tip: Mandating active BIS license verification on ManakOnline (www.manakonline.in) prior to commercial bid opening ensures 100% statutory compliance.*`;
  }

  // 2. Keyword Check for Plugs / Electrical Accessories (IS 1293)
  if (q.includes('plug') || q.includes('socket') || q.includes('switch') || q.includes('1293')) {
    const std = standardsEncyclopedia['1293'];
    return `### 🔌 Indian Standard for Plugs & Socket-Outlets — ${std.code}

**Official Standard Reference:**
> **${std.title}**

#### 🛡️ Statutory Mandate & Quality Control Order (QCO):
* **Mandatory Scheme:** **Scheme-I (BIS ISI Mark Certification)**
* **Government QCO:** Gazetted under the *Electrical Accessories (Quality Control) Order* by DPIIT. Non-ISI marked plugs and socket-outlets cannot be legally sold, distributed, or procured in India.

#### 🧪 Key Safety & Technical Parameters:
| Safety Test Parameter | Mandatory Standard Benchmark |
| :--- | :--- |
| **Current Ratings** | 2.5 A, 6 A, 10 A, and 16 A at 250 V a.c. (50 Hz) |
| **Safety Shutters** | Mandatory on all 6 A and 16 A domestic socket-outlets |
| **Insulation Resistance** | Min 5 MΩ between live parts and ground (500 V DC) |
| **High Voltage Withstand** | 2000 V AC for 1 minute without breakdown |
| **Temperature Rise** | Maximum 45°C rise on terminals under 1.25x rated current |
| **Mechanical Endurance** | 10,000 insertion/withdrawal cycles at full rated load |

#### 📑 Model Tender Clause (GFR Rule 144(i)):
\`\`\`text
${std.tenderClause}
\`\`\``;
  }

  // 3. Keyword Check for LED / Street Lights (IS 10322 / IS 16107)
  if (q.includes('led') || q.includes('street light') || q.includes('luminaire') || q.includes('10322') || q.includes('16107') || q.includes('light')) {
    const std = standardsEncyclopedia['10322'];
    return `### 💡 Indian Standards for LED Street Lights & Luminaires — ${std.code}

**Primary Standard:** **IS 10322 (Part 5/Sec 3):2012** & **IS 16107 (Part 2/Sec 1)**
**LED Driver Standard:** **IS 15885 (Part 2/Sec 13)** (Mandatory CRS Scheme-II)

#### 🧪 Core Technical Requirements for Procurement:
* **System Efficacy:** Minimum 120 to 140 Lumens/Watt.
* **Ingress Protection:** Minimum IP66 for optical and driver compartment.
* **Surge Protection:** Integral / external Surge Protection Device (SPD) of minimum 10 kV.
* **Power Quality:** Power Factor ≥ 0.95, Total Harmonic Distortion (THD) < 10%.
* **Lifespan:** L70 life of minimum 50,000 burning hours.

#### 📑 Model Tender Clause:
\`\`\`text
${std.tenderClause}
\`\`\``;
  }

  // 4. Keyword Check for Pipes (IS 4984 / IS 14333)
  if (q.includes('pipe') || q.includes('hdpe') || q.includes('pvc') || q.includes('jal jeevan') || q.includes('4984')) {
    const std = standardsEncyclopedia['4984'];
    return `### 🚰 Indian Standard for HDPE Pipes — ${std.code}

**Official Title:** ${std.title}
* **Mandatory Scheme:** Scheme-I (ISI Mark) under DPIIT Pipes Quality Control Order.
* **Raw Material:** 100% virgin PE-100 polymer (recycled plastic strictly prohibited).
* **Pressure Classes:** PN 4, PN 6, PN 10, PN 12.5, PN 16.
* **Critical Tests:** 100-hour hydrostatic test at 20°C, 165-hour test at 80°C, OIT > 20 mins.

#### 📑 Model Tender Clause:
\`\`\`text
${std.tenderClause}
\`\`\``;
  }

  // 5. Keyword Check for Steel / TMT Rebars (IS 1786 / IS 2062)
  if (q.includes('steel') || q.includes('tmt') || q.includes('rebar') || q.includes('1786') || q.includes('fe 500')) {
    const std = standardsEncyclopedia['1786'];
    return `### 🏗️ Indian Standard for TMT Steel Reinforcement — ${std.code}

**Official Title:** ${std.title}
* **Recommended Grade for Seismic Zones:** **Fe 500D / Fe 550D** (Super Ductile).
* **Mandatory Status:** Mandatory Quality Control Order under Ministry of Steel.
* **Key Ratio:** Ultimate Tensile Strength to Yield Strength (UTS/YS) ≥ 1.12.
* **Elongation:** Minimum 16.0% with maximum 0.25% Carbon.

#### 📑 Model Tender Clause:
\`\`\`text
${std.tenderClause}
\`\`\``;
  }

  // 6. Keyword Check for Cement (IS 269 / IS 1489)
  if (q.includes('cement') || q.includes('opc') || q.includes('ppc') || q.includes('269')) {
    const std = standardsEncyclopedia['269'];
    return `### 🧱 Indian Standard for Ordinary Portland Cement — ${std.code}

**Official Title:** ${std.title}
* **Grades Covered:** 33 Grade, 43 Grade, 53 Grade Ordinary Portland Cement.
* **Mandatory Status:** Statutory ISI Mark under Cement Quality Control Order, 2003.
* **28-Day Strength:** 53 Grade: Min 53.0 MPa | 43 Grade: 43.0–58.0 MPa.
* **Setting Time:** Initial ≥ 30 mins, Final ≤ 600 mins.

#### 📑 Model Tender Clause:
\`\`\`text
${std.tenderClause}
\`\`\``;
  }

  // 7. General Procurement & BIS Assistant Guide
  return `### 🏛️ Bureau of Indian Standards (BIS) Intelligence Engine

I am ready to assist you with technical specifications, standard lookups, and tender clauses.

#### 💡 Quick Queries you can ask:
* **"IS 1293"** — Plugs, sockets, and electrical accessories standards & test limits
* **"IS 10322"** — LED street lights, luminaires, and surge protection
* **"IS 4984"** — HDPE pipes for Jal Jeevan Mission and water supply
* **"IS 1786"** — Fe 500D TMT rebar ductility & tensile specifications
* **"IS 269"** — 43 vs 53 grade cement compressive strength
* **"IS 1417"** — Gold Hallmarking, 6-digit HUID, and 22K916 fineness grades
* **"Draft tender clause for [Product]"** — Ready-to-use GFR 144(i) non-bias clauses.

Please enter any Indian Standard number (e.g. *IS 1293*, *IS 10500*, *IS 456*) or product requirement to generate the complete technical report.`;
};
