// Comprehensive Procurement & Tender Standards Dataset for MargDarshak
// Covers major Public Procurement sectors (GeM, CPWD, Jal Jeevan Mission, Railways, DISCOMs, MNRE, MoRTH, Health, Municipalities, Defense)

export const procurementCategories = [
  {
    id: "water-hdpe-pipes",
    name: "HDPE Pipes for Water Supply & Sewerage",
    sector: "Water Supply & Sanitation (Jal Jeevan Mission / AMRUT / Smart Cities)",
    departmentTag: "Ministry of Jal Shakti / State PHEDs",
    keywords: ["hdpe pipe", "pe 100", "pe 80", "polyethylene pipe", "potable water", "pn 6", "pn 10", "pn 16", "water distribution", "sewerage", "jal jeevan"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (JAL JEEVAN MISSION / PHED):
Supply, delivery, laying, jointing, hydraulic testing and commissioning of High Density Polyethylene (HDPE) pipes of nominal outer diameter 110 mm to 315 mm, Pressure Rating PN-10, Standard Dimension Ratio SDR 11/17, manufactured from virgin PE-100 grade resin conforming strictly to IS 4984:2016 with latest amendments. The pipes shall be suitable for underground potable water distribution network under rural piped water supply scheme. All supplies must carry valid BIS ISI Mark with manufacturer CM/L license number. Pre-dispatch inspection (PDI) through third-party agency (TPIA) and NABL-accredited laboratory test reports for Hydrostatic Pressure and Carbon Black Dispersion are mandatory.`,
    extractedRequirements: [
      { parameter: "Product Classification", requirement: "HDPE Solid Wall Potable Water Pipes", clause: "IS 4984 Cl. 3" },
      { parameter: "Raw Material Resin", requirement: "Virgin Polyethylene Grade PE-100 (Black)", clause: "IS 7328 / IS 2530" },
      { parameter: "Pressure Rating & SDR", requirement: "PN 6 / PN 10 / PN 16 (SDR 11 to SDR 26)", clause: "IS 4984 Table 2" },
      { parameter: "Potable Toxicity & Migration", requirement: "Food-grade contact safe under IS 10146", clause: "IS 10146 Cl. 4" },
      { parameter: "Carbon Black Content", requirement: "2.50 ± 0.50% by mass, dispersion <= grade 3", clause: "IS 4984 Annex B" },
      { parameter: "Hydrostatic Strength", requirement: "100h at 20°C (12.4 MPa), 165h at 80°C (5.4 MPa)", clause: "IS 12235 Part 8" }
    ],
    primaryStandards: [
      {
        is_code: "IS 4984:2016",
        title: "High Density Polyethylene Pipes for Water Supply - Specification (Fifth Revision)",
        year: "2016",
        reaffirmed: "2021",
        amendments: "Amendments No. 1, 2 & 3 incorporated",
        active_status: "Latest Published Standard (Valid)",
        summary: "Covers requirements for high density polyethylene pipes of dimensions 16mm to 1000mm OD for potable water supply, conveyance of sewage and industrial effluents."
      },
      {
        is_code: "IS 14333:1996",
        title: "High Density Polyethylene Pipes for Sewerage - Specification",
        year: "1996",
        reaffirmed: "2022",
        amendments: "Amendment No. 1 incorporated",
        active_status: "Active & Valid",
        summary: "Prescribes requirements for HDPE pipes for underground gravity drainage and pressure sewerage networks."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 2530:1963", title: "Methods for test for polyethylene moulding materials and polyethylene compounds", relevance: "Base polymer grade verification (MFI & density 940-958 kg/m³)" },
        { is_code: "IS 7328:1992", title: "High density polyethylene materials for moulding and extrusion", relevance: "Raw material carbon black & virgin resin compliance" }
      ],
      testMethods: [
        { is_code: "IS 12235 (Part 1 to 19)", title: "Thermoplastics pipes and fittings - Methods of test", test_type: "Hydrostatic internal pressure, impact resistance, and tensile strength" },
        { is_code: "IS 4984 Annex B", title: "Carbon black dispersion and oxidation induction time (OIT >= 20 min at 200°C)", test_type: "Thermal stability & UV weathering evaluation" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 4984 Clause 3", title: "Classification by PE Grade (PE 63, PE 80, PE 100) and Standard Dimension Ratio (SDR)", scope: "Material rating and maximum allowable operating pressure (MAOP)" }
      ],
      safetyAndEnvironment: [
        { is_code: "IS 10146:1982", title: "Polyethylene for its safe use in contact with foodstuffs, pharmaceuticals and drinking water", focus: "Migration & toxicity limits for potable safety" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS 7634 (Part 2):2012", title: "Code of practice for plastics pipe work for potable water supplies: Part 2 Laying and jointing of polyethylene pipes", scope: "Butt-fusion and electrofusion jointing protocols" }
      ],
      relatedProducts: [
        { is_code: "IS 8360 (Part 1-3)", title: "Fabricated high density polyethylene (HDPE) fittings for potable water supplies", description: "Bends, tees and reducers for pipeline networks" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-I (ISI Mark)",
      qcoNotification: "Pipes and Fittings (Quality Control) Order, Ministry of Chemicals & Fertilizers",
      gazetteRef: "S.O. 1245(E) / Mandatory Option-2 Annexure-II(C)",
      penaltyClause: "Supply of non-ISI marked pipes is a cognizable offence punishable under Section 29 of BIS Act, 2016."
    },
    tenderClauseTemplate: `The contractor shall supply High Density Polyethylene (HDPE) Pipes strictly conforming to IS 4984:2016 (with all latest amendments). All supplied pipes must bear the valid Standard ISI Mark along with the manufacturer's 7-digit CM/L license number and manufacturer identification as per IS 4984 Clause 11. Raw material shall conform to virgin PE-100 grade complying with IS 7328 and toxicological safety under IS 10146. Each batch must be accompanied by Manufacturer's Test Certificate (MTC) and independent pre-dispatch inspection test reports from a BIS-recognized / NABL-accredited laboratory.`
  },

  {
    id: "civil-portland-cement",
    name: "Ordinary Portland Cement (43 / 53 Grade)",
    sector: "Civil Infrastructure & Construction (CPWD / MoRTH / NHAI / NBCC)",
    departmentTag: "Ministry of Housing and Urban Affairs / MoRTH",
    keywords: ["cement", "opc 43", "opc 53", "ordinary portland cement", "concrete", "mortar", "compressive strength", "structural works", "cpwd", "nhai"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (CPWD / NHAI CIVIL WORKS):
Procurement, supply and delivery of Ordinary Portland Cement (OPC) 53 Grade in 50 kg HDPE/paper bags conforming strictly to IS 269:2015 (with all amendments) for high-grade RCC bridge superstructure, prestressed concrete girders, flyover piers and institutional building works. The cement clinker shall be thoroughly tested for sound chemical composition, insoluble residue (< 5.0%), loss on ignition (< 5.0%), and total sulfur content. Minimum 28-day compressive strength shall not be less than 53 MPa (N/mm²). Every bag must bear the mandatory BIS ISI mark and batch date.`,
    extractedRequirements: [
      { parameter: "Cement Type & Grade", requirement: "Ordinary Portland Cement OPC 53 Grade", clause: "IS 269 Cl. 4" },
      { parameter: "28-Day Compressive Strength", requirement: "Minimum 53.0 MPa (N/mm²)", clause: "IS 269 Table 2" },
      { parameter: "Setting Time", requirement: "Initial >= 30 min, Final <= 600 min", clause: "IS 269 Table 2" },
      { parameter: "Soundness", requirement: "Le-Chatelier <= 10 mm, Autoclave <= 0.8%", clause: "IS 4031 Part 3" },
      { parameter: "Fineness (Specific Surface)", requirement: "Minimum 225 m²/kg (Blaine method)", clause: "IS 4031 Part 2" },
      { parameter: "Chemical Insoluble Residue", requirement: "Maximum 5.0% by mass", clause: "IS 269 Table 1" }
    ],
    primaryStandards: [
      {
        is_code: "IS 269:2015",
        title: "Ordinary Portland Cement - Specification (Sixth Revision)",
        year: "2015",
        reaffirmed: "2020",
        amendments: "Amendments No. 1, 2, 3 & 4 incorporated (Unified 33, 43 and 53 Grades)",
        active_status: "Latest Published Standard (Valid)",
        summary: "Prescribes chemical and physical requirements for 33, 43, and 53 grades of ordinary portland cement manufactured by intimately grinding portland cement clinker and gypsum."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 4031 (Parts 1 to 15)", title: "Methods of physical tests for hydraulic cement", relevance: "Fineness, soundness (Le-Chatelier), setting time, compressive strength" },
        { is_code: "IS 4032:1985", title: "Method of chemical analysis of hydraulic cement", relevance: "Insoluble residue, loss on ignition, lime saturation factor (LSF)" }
      ],
      testMethods: [
        { is_code: "IS 4031 (Part 6):1988", title: "Determination of compressive strength of hydraulic cement other than masonry cement", test_type: "3-day (min 27 MPa), 7-day (min 37 MPa), and 28-day (min 53 MPa) cube testing" },
        { is_code: "IS 4031 (Part 3):1988", title: "Determination of soundness", test_type: "Le-Chatelier expansion (< 10 mm) and Autoclave expansion (< 0.8%)" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 4845:1968", title: "Definitions and terminology relating to hydraulic cement", scope: "Hydration terms, setting stages, and clinker compositions" }
      ],
      safetyAndEnvironment: [
        { is_code: "IS 10262:2019", title: "Concrete mix proportioning - Guidelines", focus: "Durability, water-cement ratio control, and environmental exposure classes" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS 456:2000", title: "Plain and reinforced concrete - Code of practice", scope: "Structural concrete design, curing periods, and minimum grade requirements" }
      ],
      relatedProducts: [
        { is_code: "IS 1489 (Part 1):2015", title: "Portland Pozzolana Cement - Specification (Fly ash based)", description: "Low heat hydraulic cement alternative" },
        { is_code: "IS 455:2015", title: "Portland Slag Cement - Specification", description: "Sulfate and marine environment resistant cement" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-I (ISI Mark)",
      qcoNotification: "Cement (Quality Control) Order, Department for Promotion of Industry and Internal Trade (DPIIT)",
      gazetteRef: "S.O. 1412(E) / Mandatory QCO",
      penaltyClause: "Prohibited to manufacture, store for sale, sell, or distribute cement without valid BIS Standard Mark under Section 16 of BIS Act, 2016."
    },
    tenderClauseTemplate: `All cement supplied shall be Ordinary Portland Cement conforming to IS 269:2015 (53 Grade as specified in BoQ). The cement must carry the mandatory BIS ISI Certification Mark on every bag along with manufacturer's CM/L license number, grade, net quantity (50 kg), and week/year of manufacture. Physical properties including 28-day compressive strength, initial/final setting time, and soundness shall be verified from accredited testing laboratories as per IS 4031 before casting of critical RCC members.`
  },

  {
    id: "steel-tmt-bars",
    name: "TMT High Strength Deformed Steel Rebars",
    sector: "Civil & Structural Infrastructure (CPWD / Railways / NHAI / Metro Rail / DMRC)",
    departmentTag: "Ministry of Steel / Ministry of Railways",
    keywords: ["tmt bars", "steel reinforcement", "fe 500d", "fe 550d", "rebar", "deformed steel", "concrete reinforcement", "ductility", "earthquake resistance"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (METRO RAIL / BRIDGE WORKS):
Supply, delivery, stacking and fabrication of High Strength Deformed Thermo-Mechanically Treated (TMT) Steel Reinforcement Bars of Grade Fe 500D conforming strictly to IS 1786:2008 with latest amendments (No. 1 to 6). The steel must have high seismic ductility with minimum elongation of 16.0% and UTS/YS ratio >= 1.10. Phosphorus and Sulfur shall each be restricted to a maximum of 0.040%. All rebars must carry clear rolled embossing of brand name, diameter, grade Fe 500D and BIS ISI Standard Mark at intervals not exceeding 1.5 meters. Manufacturer must be a primary integrated steel producer with BIS certification.`,
    extractedRequirements: [
      { parameter: "Steel Grade & Type", requirement: "Fe 500D (High Ductility Earthquake Resistant)", clause: "IS 1786 Cl. 4" },
      { parameter: "Yield Stress (0.2% Proof)", requirement: "Minimum 500.0 MPa (N/mm²)", clause: "IS 1786 Table 3" },
      { parameter: "Tensile Strength Ratio", requirement: "UTS / Proof Stress ratio >= 1.10", clause: "IS 1786 Table 3" },
      { parameter: "Elongation (Gauge Length 5.65√A)", requirement: "Minimum 16.0%", clause: "IS 1786 Table 3" },
      { parameter: "Chemical Limits (S + P)", requirement: "Sulfur max 0.040%, Phosphorus max 0.040%, S+P max 0.075%", clause: "IS 1786 Table 1" },
      { parameter: "Bend & Rebend Test", requirement: "180° mandrel bend without rupture or surface cracking", clause: "IS 1599 / IS 1786 Cl. 9" }
    ],
    primaryStandards: [
      {
        is_code: "IS 1786:2008",
        title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement - Specification (Fourth Revision)",
        year: "2008",
        reaffirmed: "2023",
        amendments: "Amendments No. 1, 2, 3, 4, 5 & 6 (Mandatory Ductility & Seismic criteria)",
        active_status: "Latest Published Standard (Valid)",
        summary: "Specifies requirements for high strength deformed steel bars and wires for use as reinforcement in concrete in grades Fe 415, Fe 415D, Fe 500, Fe 500D, Fe 550, Fe 550D, and Fe 600."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 228 (Parts 1 to 24)", title: "Methods for chemical analysis of steels", relevance: "Carbon, sulfur, phosphorus and carbon equivalent (CE <= 0.42%) limits" },
        { is_code: "IS 1608 (Part 1):2018", title: "Metallic materials - Tensile testing", relevance: "Yield strength, ultimate tensile strength, and percentage elongation verification" }
      ],
      testMethods: [
        { is_code: "IS 1599:2019", title: "Metallic materials - Bend test", test_type: "Mandrel bend test and rebend test to 180 degrees without crack or rupture" },
        { is_code: "IS 1786 Clause 9", title: "Transverse rib height and projected rib area factor (fR)", test_type: "Bond strength verification with concrete matrix" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 1956 (Parts 1 to 8)", title: "Glossary of terms relating to iron and steel", scope: "Thermo-mechanical processing, martensitic rim, and ferrite-pearlite core definition" }
      ],
      safetyAndEnvironment: [
        { is_code: "IS 13920:2016", title: "Ductile design and detailing of reinforced concrete structures subjected to seismic forces", focus: "Mandatory use of Fe 415D or Fe 500D in seismic zones III, IV, and V" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS 2502:1963", title: "Code of practice for bending and fixing of bars for concrete reinforcement", scope: "Lap length, hook dimensions, and bar bending schedule (BBS)" }
      ],
      relatedProducts: [
        { is_code: "IS 2062:2011", title: "Hot rolled medium and high tensile structural steel", description: "Steel sections for structural fabrication" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-I (ISI Mark)",
      qcoNotification: "Steel and Steel Products (Quality Control) Order, Ministry of Steel",
      gazetteRef: "S.O. 167(E) / Mandatory ISI Mark Mandate",
      penaltyClause: "Non-ISI certified TMT bars prohibited from sale, importation, or utilization in public contracts under Section 29 BIS Act."
    },
    tenderClauseTemplate: `Reinforcement steel shall consist of High Strength Deformed TMT Bars of Grade Fe 500D strictly conforming to IS 1786:2008 with latest amendments. All supplied bars must have the manufacturer's brand name, diameter, grade (Fe 500D), and the BIS ISI Mark rolled or stamped along the length of each bar at intervals not exceeding 1.5 meters. Chemical composition (Carbon max 0.25%, Sulfur + Phosphorus max 0.075%) and mechanical parameters (0.2% proof stress min 500 MPa, elongation min 16.0%, UTS/YS ratio >= 1.10) must be certified by manufacturer's heat-wise test certificates and confirmed by third-party testing.`
  },

  {
    id: "electrical-pvc-cables",
    name: "1.1 kV Armoured XLPE / FRLS Power Cables",
    sector: "Power, Energy & Electrical Infrastructure (DISCOMs / CPWD Electrical / Railways / NTPC)",
    departmentTag: "Ministry of Power / Central Electricity Authority (CEA)",
    keywords: ["cables", "pvc cables", "xlpe cables", "1100v", "copper conductor", "aluminium conductor", "armoured cable", "frls", "discom", "power distribution"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (STATE DISCOM / CPWD ELECTRICAL):
Supply, laying, testing and termination of 1.1 kV Grade, multi-core, crosslinked polyethylene (XLPE) insulated, galvanized steel strip / round wire armoured, Flame Retardant Low Smoke (FRLS) PVC outer sheathed power cables with stranded compacted aluminium / copper conductor conforming strictly to IS 7098 (Part 1):1988 and IS 8130:2013 with latest amendments. Conductor resistance shall meet Class 2 requirements. Outer sheath shall have oxygen index >= 29% and smoke density rating <= 60%. Cable must carry embossed BIS ISI certification mark with licensee CM/L number at every 1 meter.`,
    extractedRequirements: [
      { parameter: "Voltage Rating & Type", requirement: "1.1 kV Grade (1100 Volts) Heavy Duty Power Cable", clause: "IS 7098 Part 1 Cl. 1" },
      { parameter: "Conductor Material", requirement: "High conductivity stranded Class 2 Aluminium / Annealed Copper", clause: "IS 8130 Table 2" },
      { parameter: "Insulation Material", requirement: "Crosslinked Polyethylene (XLPE) Type GP-2 rated 90°C", clause: "IS 7098 Part 1 Cl. 4" },
      { parameter: "Armouring", requirement: "Galvanized Steel Strip / Wire armouring (min 90% coverage)", clause: "IS 3975 / IS 7098 Part 1" },
      { parameter: "Sheath & Flame Retardance", requirement: "FRLS PVC Sheath (Oxygen Index >= 29%, Temp Index >= 250°C)", clause: "IS 10810 Part 58/61" },
      { parameter: "High Voltage Withstand Test", requirement: "3.0 kV AC RMS for 5 minutes without breakdown", clause: "IS 10810 Part 45" }
    ],
    primaryStandards: [
      {
        is_code: "IS 7098 (Part 1):1988",
        title: "Crosslinked Polyethylene Insulated Thermoplastic Sheathed Cables: Part 1 For Working Voltages up to and Including 1100 V",
        year: "1988",
        reaffirmed: "2020",
        amendments: "Amendments No. 1, 2, 3 & 4 incorporated",
        active_status: "Latest Published Standard (Valid)",
        summary: "Requirements for armored and unarmored XLPE power cables up to 1.1 kV for heavy-duty industrial and underground installation."
      },
      {
        is_code: "IS 694:2010",
        title: "Polyvinyl Chloride Insulated Unsheathed and Sheathed Cables/Cords for Rated Voltages up to 1100 V",
        year: "2010",
        reaffirmed: "2020",
        amendments: "Amendments No. 1 & 2 incorporated",
        active_status: "Active & Valid",
        summary: "Covers single-core and multi-core PVC insulated cables for working voltages up to 1100V, flexible building wires, and light power cords."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 8130:2013", title: "Conductors for insulated electric cables and flexible cords", relevance: "Conductor resistance, stranded copper/aluminium grade compliance" },
        { is_code: "IS 5831:1984", title: "PVC insulation and sheath of electric cables", relevance: "Type A/C insulation and Type ST1/ST2 sheath thermal ratings" },
        { is_code: "IS 3975:1999", title: "Low carbon galvanized steel wires and tapes for armouring of cables", relevance: "Armouring tensile and zinc mass compliance" }
      ],
      testMethods: [
        { is_code: "IS 10810 (Parts 0 to 64)", title: "Methods of test for cables", test_type: "Conductor resistance, spark testing, insulation resistance, flame retardance (FR/FRLS)" },
        { is_code: "IS 10810 (Part 58)", title: "Oxygen index and temperature index test", test_type: "FRLS sheath flammability resistance (Oxygen index min 29%)" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 1885 (Part 32):2019", title: "Electrotechnical vocabulary: Part 32 Electric cables", scope: "Cable construction, shielding, and dielectric definitions" }
      ],
      safetyAndEnvironment: [
        { is_code: "IS 732:2019", title: "Code of practice for electrical wiring installations", focus: "Current carrying capacity, voltage drop, and earthing provisions" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS 1255:1983", title: "Code of practice for installation and maintenance of power cables up to 33 kV", scope: "Direct in-ground burial depth, trenching, bending radius and jointing" }
      ],
      relatedProducts: [
        { is_code: "IS 14255:1995", title: "Aerial Bunched Cables for working voltages up to and including 1100 Volts", description: "ABC distribution cables for overhead electrification" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-I (ISI Mark)",
      qcoNotification: "Electrical Wires and Cables (Quality Control) Order, Ministry of Commerce & Industry (DPIIT)",
      gazetteRef: "S.O. 2209(E) / Mandatory QCO",
      penaltyClause: "All low-voltage wires and power cables must bear BIS ISI certification mark prior to dispatch."
    },
    tenderClauseTemplate: `The electric cables shall be 1100V grade, multi-core, stranded high conductivity annealed copper / electrolytic aluminium conductor, XLPE insulated, inner sheathed, galvanized steel strip / round wire armoured, and overall FRLS PVC sheathed conforming strictly to IS 7098 (Part 1) with latest amendments. All cables must bear the valid BIS ISI Mark with licensee CM/L number embossed or indelibly printed along the outer sheath at every 1 meter, alongside sequential length marking. Routine test reports covering conductor resistance, high voltage withstand test, and oxygen index as per IS 10810 shall be furnished prior to dispatch.`
  },

  {
    id: "renewable-solar-pv",
    name: "Solar PV Modules & Grid Inverters (CRS & ALMM)",
    sector: "Renewable Energy & Sustainability (MNRE / SECI / NTPC / State Nodal Agencies)",
    departmentTag: "Ministry of New and Renewable Energy (MNRE)",
    keywords: ["solar pv", "solar panel", "photovoltaic module", "grid tied inverter", "mnre", "almm", "solar park", "monocrystalline", "bifacial", "rooftop solar"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (MNRE / SECI SOLAR ROOFTOP PROJECT):
Design, engineering, supply, erection, testing and commissioning of Grid-Connected Solar Photovoltaic (PV) Rooftop Power Plants. The Solar PV Modules must be high efficiency Mono-PERC / TopCon Crystalline Silicon modules conforming strictly to IS 14286:2010 / IEC 61215 (Design Qualification) and IS/IEC 61730 (Part 1 & 2):2016 (Safety Qualification). All modules must be registered under BIS Compulsory Registration Scheme (CRS) bearing a valid R-Number and must be actively enlisted in the latest ALMM (Approved List of Models & Manufacturers) issued by MNRE. Grid inverters shall comply with IS 16221 and IS 16169.`,
    extractedRequirements: [
      { parameter: "Module Technology", requirement: "Mono Crystalline / Bifacial PV Modules", clause: "IS 14286 / IEC 61215" },
      { parameter: "Electrical Safety Rating", requirement: "Class II Safety Qualification under IS/IEC 61730-1/2", clause: "IS/IEC 61730 Cl. 5" },
      { parameter: "Statutory Enlistment", requirement: "Valid BIS CRS Registration (R-Number) & MNRE ALMM List-I", clause: "MNRE ALMM Order" },
      { parameter: "PID & Damp Heat Endurance", requirement: "PID resistant test (85°C, 85% RH for 1000 hours)", clause: "IEC 62804 / IS 14286" },
      { parameter: "Fire Safety Rating", requirement: "Class C or Class A Fire Spread Resistance", clause: "IS/IEC 61730-2 MST 23" },
      { parameter: "Inverter Anti-Islanding", requirement: "Disconnect within 2.0 seconds upon grid loss", clause: "IS 16169 / IEEE 1547" }
    ],
    primaryStandards: [
      {
        is_code: "IS 14286:2010 / IEC 61215:2005",
        title: "Crystalline Silicon Terrestrial Photovoltaic (PV) Modules - Design Qualification and Type Approval",
        year: "2010",
        reaffirmed: "2021",
        amendments: "Harmonized with IEC 61215:2016 Part 1 & 2",
        active_status: "Latest Published Standard (Valid)",
        summary: "Specifies requirements for the design qualification and type approval of terrestrial crystalline silicon PV modules suitable for long-term outdoor climate operation."
      },
      {
        is_code: "IS/IEC 61730 (Part 1 & 2):2016",
        title: "Photovoltaic (PV) Module Safety Qualification: Part 1 Requirements for Construction, Part 2 Requirements for Testing",
        year: "2016",
        reaffirmed: "2022",
        amendments: "Latest Harmonized Edition",
        active_status: "Active Mandatory Standard",
        summary: "Mandatory electrical shock and fire safety qualification requirements for solar PV modules."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 16221 (Part 1 & 2):2016", title: "Safety of power converters for use in photovoltaic power systems (Grid-tied inverters)", relevance: "Solar inverter electrical isolation and protection" },
        { is_code: "IS 16169:2014 / IEC 62116", title: "Test procedure of islanding prevention measures for utility-interconnected photovoltaic inverters", relevance: "Anti-islanding grid disconnection within 2 seconds" }
      ],
      testMethods: [
        { is_code: "IS 14286 Clause 10", title: "Thermal cycling, damp-heat (85°C/85% RH for 1000 hrs), humidity-freeze, and mechanical load test", test_type: "Accelerated environmental endurance qualification" },
        { is_code: "IS 61730-2 MST 23", title: "Fire resistance test and reverse current overload test", test_type: "Class C / Class A fire rating test" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 15655:2006", title: "Glossary of terms for solar photovoltaic energy conversion systems", scope: "Standard test conditions (STC: 1000 W/m², 25°C, AM 1.5)" }
      ],
      safetyAndEnvironment: [
        { is_code: "IS 3043:2018", title: "Code of practice for earthing", focus: "Solar array frame bonding, DC surge protection device (SPD) grounding" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS/IEC 62548:2016", title: "Photovoltaic (PV) arrays - Design requirements", scope: "Array layout, string fusing, DC isolation switches, and combiner boxes" }
      ],
      relatedProducts: [
        { is_code: "IS 16077:2013", title: "Solar photovoltaic water pumping systems", description: "Submersible/surface solar pumps for agriculture" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-II (CRS - Compulsory Registration Scheme) & ALMM",
      qcoNotification: "Solar Photovoltaics, Systems, Devices and Components Goods (Requirements for Compulsory Registration) Order, Ministry of New and Renewable Energy (MNRE)",
      gazetteRef: "MNRE Order No. 238/45/2017 & ALMM List-I Enlistment",
      penaltyClause: "All solar PV modules procured in government projects must carry valid BIS Registration Number (R-Number) and be listed in MNRE's Approved List of Models & Manufacturers (ALMM)."
    },
    tenderClauseTemplate: `All Solar Photovoltaic (PV) Modules must be manufactured using high-efficiency crystalline silicon solar cells conforming strictly to IS 14286 / IEC 61215 (Design Qualification) and IS/IEC 61730 Part 1 & 2 (Safety Qualification). The modules must be registered under the BIS Compulsory Registration Scheme (CRS) bearing a valid R-Number (e.g., R-41XXXXXX) and must be actively enlisted in the latest ALMM (Approved List of Models and Manufacturers) published by MNRE. Grid-interactive inverters shall comply with IS 16221 and IS 16169 for anti-islanding protection.`
  },

  {
    id: "fire-safety-extinguishers",
    name: "Portable Fire Extinguishers & Fire Safety Equipment",
    sector: "Fire Safety & Disaster Management (CPWD / Municipalities / PSUs / Airports)",
    departmentTag: "Ministry of Home Affairs / Directorate General of Fire Services",
    keywords: ["fire extinguisher", "abc powder", "co2 extinguisher", "fire safety", "foam extinguisher", "fire hydrant", "fire fighting", "nfpa", "cpwd fire"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (AIRPORTS / CPWD FIRE SAFETY):
Procurement, supply, installation, testing and commissioning of Portable Fire Extinguishers ABC Stored Pressure Type (Capacity 4 kg / 6 kg / 9 kg) conforming strictly to IS 15683:2018 with latest amendments. The extinguishing agent shall be Mono Ammonium Phosphate (MAP >= 50%) dry chemical powder conforming to IS 4308. Pressure gauge, discharge hose, squeeze grip operating valve, and internal epoxy lining must meet standard safety norms. Every unit must carry BIS ISI Certification Mark with licensee number. Maintenance and testing protocols shall adhere to IS 2190:2010.`,
    extractedRequirements: [
      { parameter: "Extinguisher Type & Rating", requirement: "Stored Pressure ABC Type (Class A, B, C & Electrical Fires)", clause: "IS 15683 Cl. 4" },
      { parameter: "Extinguishing Agent Powder", requirement: "Mono Ammonium Phosphate (MAP min 50%)", clause: "IS 4308 Cl. 5" },
      { parameter: "Cylinder Hydraulic Test", requirement: "Pressure tested to 3.0 MPa (30 bar) for 30 seconds", clause: "IS 15683 Cl. 8" },
      { parameter: "Discharge Performance", requirement: "Minimum 85% discharge within 15 to 20 seconds", clause: "IS 15683 Table 4" },
      { parameter: "Anti-Corrosion Coating", requirement: "Internal thermo-set polymer/epoxy coating >= 100 microns", clause: "IS 15683 Cl. 6.3" },
      { parameter: "Maintenance Code", requirement: "Annual inspection & hydrostatic testing schedule as per IS 2190", clause: "IS 2190 Cl. 11" }
    ],
    primaryStandards: [
      {
        is_code: "IS 15683:2018",
        title: "Portable Fire Extinguishers - Performance and Construction - Specification (First Revision)",
        year: "2018",
        reaffirmed: "2023",
        amendments: "Amendments No. 1 & 2 incorporated",
        active_status: "Latest Published Standard (Valid)",
        summary: "Prescribes requirements for portable fire extinguishers of water, foam, carbon dioxide, clean agent, and dry chemical powder types."
      },
      {
        is_code: "IS 2190:2010",
        title: "Selection, Installation and Maintenance of First-Aid Fire Appliances - Code of Practice (Fourth Revision)",
        year: "2010",
        reaffirmed: "2020",
        amendments: "Latest Code of Practice",
        active_status: "Active & Valid",
        summary: "Covers the selection, installation, maintenance, inspection, and hydrostatic testing of portable first-aid fire extinguishers."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 4308:2019", title: "Dry chemical powder for fire fighting - Specification", relevance: "Sodium bicarbonate & monoammonium phosphate chemical purity" },
        { is_code: "IS 2878:2004", title: "Fire extinguisher, carbon dioxide type (portable and trolley mounted)", relevance: "CO2 high-pressure cylinder gas conformity" }
      ],
      testMethods: [
        { is_code: "IS 15683 Clause 8.2", title: "Hydraulic bursting and pressure proof test of cylinder body", test_type: "Proof pressure and safety burst ratio test" },
        { is_code: "IS 15683 Annex D & E", title: "Fire rating test (Class A wooden crib & Class B heptane tray fire)", test_type: "Extinguishing efficacy rating qualification" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 1641:1988", title: "Code of practice for fire safety of buildings (General): General principles of fire grading", scope: "Fire hazard classifications (Light, Ordinary, Extra)" }
      ],
      safetyAndEnvironment: [
        { is_code: "IS 13039:1991", title: "External hydrant systems - Code of practice", focus: "Fire pipeline water ring networks & landing valves" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS 2190:2010", title: "Selection, installation and maintenance of portable first-aid fire extinguishers", scope: "Mounting height (max 1.5m), clearance, and monthly inspection log" }
      ],
      relatedProducts: [
        { is_code: "IS 903:1993", title: "Fire hose delivery couplings, branch pipe, nozzles and strainer", description: "Fire brigade delivery connections" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-I (ISI Mark)",
      qcoNotification: "Fire Extinguishers (Quality Control) Order, Ministry of Commerce & Industry (DPIIT)",
      gazetteRef: "S.O. 4519(E) / Mandatory ISI Mark",
      penaltyClause: "Supply of non-ISI fire extinguishers is strictly prohibited and constitutes criminal safety violation."
    },
    tenderClauseTemplate: `All Portable Fire Extinguishers must be ABC Stored Pressure Type conforming strictly to IS 15683:2018. Each extinguisher cylinder and valve assembly must bear the mandatory BIS ISI Mark with the manufacturer's valid CM/L license number. Extinguishing chemical powder shall be Mono Ammonium Phosphate (MAP min 50%) complying with IS 4308. Hydrostatic pressure test reports (30 bar test) and Class A/B fire rating certificates from a NABL-accredited fire laboratory shall be submitted alongside dispatch.`
  },

  {
    id: "led-street-lighting",
    name: "LED Luminaires for Street & Municipal Lighting",
    sector: "Municipal Infrastructure & Smart Cities (MoHUA / EESL / Municipal Corporations)",
    departmentTag: "Ministry of Housing and Urban Affairs / Bureau of Energy Efficiency (BEE)",
    keywords: ["led street light", "luminaire", "led lighting", "eesl", "smart street lighting", "lumen", "driver", "surge protection", "ip66", "cct"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (SMART CITY / MUNICIPAL CORPORATION):
Supply, installation, testing and commissioning of Energy Efficient Outdoor LED Street Light Luminaires (70W / 120W / 150W) for urban road lighting. Luminaires must conform strictly to IS 10322 (Part 5/Sec 3):2012 and IS 16107 (Part 2/Sec 1):2012 with latest amendments. The electronic LED driver must comply with IS 15885 (Part 2/Sec 13) with built-in 10 kV Surge Protection Device (SPD). Ingress protection shall be IP-66. System efficacy shall not be less than 130 lumens/Watt with Correlated Colour Temperature (CCT) of 5700K. All LED luminaires and drivers must carry valid BIS CRS Registration (R-Number) and ISI Mark.`,
    extractedRequirements: [
      { parameter: "Luminaire Safety Standard", requirement: "Conformity to IS 10322 (Part 5/Sec 3):2012", clause: "IS 10322 Part 5/Sec 3" },
      { parameter: "Performance & Luminous Efficacy", requirement: "System Efficacy >= 130 lm/W as per IS 16107", clause: "IS 16107 Part 2/Sec 1" },
      { parameter: "LED Driver Safety & SPD", requirement: "Driver as per IS 15885 (Part 2/Sec 13) with 10 kV SPD", clause: "IS 15885 Part 2/Sec 13" },
      { parameter: "Ingress Protection (IP)", requirement: "IP-66 Dust-tight and High-pressure water jet resistant", clause: "IS/IEC 60529" },
      { parameter: "Harmonic Distortion (THD)", requirement: "Total Harmonic Distortion (THD) < 10%", clause: "IS 16102 Part 2" },
      { parameter: "Color Quality (CRI & CCT)", requirement: "CRI >= 70, CCT 5700K ± 350K", clause: "IS 16103 Part 1" }
    ],
    primaryStandards: [
      {
        is_code: "IS 10322 (Part 5/Sec 3):2012",
        title: "Luminaires: Part 5 Particular Requirements, Section 3 Luminaires for Road and Street Lighting",
        year: "2012",
        reaffirmed: "2022",
        amendments: "Amendments No. 1 & 2 incorporated",
        active_status: "Latest Published Standard (Valid)",
        summary: "Specifies requirements for road, street, and outdoor public lighting luminaires using electrical light sources on supply voltages not exceeding 1000V."
      },
      {
        is_code: "IS 16107 (Part 2/Sec 1):2012",
        title: "Luminaires Performance: Part 2 Particular Requirements, Section 1 LED Luminaires",
        year: "2012",
        reaffirmed: "2022",
        amendments: "Latest Performance Standard",
        active_status: "Active & Valid",
        summary: "Prescribes photometric performance, system luminous efficacy, lumen maintenance, and life cycle requirements for LED luminaires."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 15885 (Part 2/Sec 13):2012", title: "Lamp controlgear: Part 2 Particular requirements, Section 13 d.c. or a.c. supplied electronic controlgear for LED modules", relevance: "Mandatory safety for internal/external LED drivers" },
        { is_code: "IS 16103 (Part 1 & 2):2012", title: "Led modules for general lighting - Safety and Performance specifications", relevance: "LED chip package quality & thermal dissipation" }
      ],
      testMethods: [
        { is_code: "IS 10322 Part 1 Cl. 9", title: "Thermal endurance, resistance to dust and moisture (IP-66 test)", test_type: "Dust chamber & water jet ingress test" },
        { is_code: "IS 16107-2-1 Cl. 8", title: "Photometric measurement (Goniophotometer lumen output & luminous distribution)", test_type: "Optical photometric efficiency and IES file verification" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 1885 (Part 16):2019", title: "Electrotechnical vocabulary: Lighting and illumination", scope: "Luminous flux, lux, chromaticity coordinates, and glare rating" }
      ],
      safetyAndEnvironment: [
        { is_code: "IS/IEC 62471:2006", title: "Photobiological safety of lamps and lamp systems", focus: "Blue light hazard and retinal exposure safety (RG 0 / RG 1 rating)" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS 1944 (Parts 1 to 7)", title: "Code of practice for lighting of public thoroughfares", scope: "Pole spacing, mounting height, overhang, and luminance uniformity" }
      ],
      relatedProducts: [
        { is_code: "IS 16102 (Part 1 & 2)", title: "Self-ballasted LED lamps for general lighting services", description: "Indoor retrofit LED bulbs" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-II (CRS) & Scheme-I (ISI Mark)",
      qcoNotification: "Solar/LED Lighting Goods (Requirements for Compulsory Registration) Order, MeitY / DPIIT",
      gazetteRef: "MeitY Notification S.O. 2905(E) & DPIIT QCO",
      penaltyClause: "Unregistered LED luminaires or drivers are prohibited from supply in government contracts."
    },
    tenderClauseTemplate: `The LED Street Light Luminaires shall conform to IS 10322 (Part 5/Sec 3):2012 and IS 16107 (Part 2/Sec 1):2012. The electronic controlgear (LED Driver) shall comply with IS 15885 (Part 2/Sec 13) and bear a valid BIS CRS Registration (R-Number). Luminaires must have high pressure die-cast aluminium housing with IP-66 rating, minimum 10 kV internal surge protection device (SPD), system efficacy >= 130 lm/W, THD < 10%, and power factor >= 0.95. Photometric test reports and NABL endurance test certificates shall be provided prior to acceptance.`
  },

  {
    id: "it-electronics-hardware",
    name: "IT Hardware, Workstations & Enterprise Laptops",
    sector: "Information Technology & Office Automation (GeM Procurement / MeitY / NIC)",
    departmentTag: "Ministry of Electronics & Information Technology (MeitY)",
    keywords: ["laptop", "desktop", "computer", "server", "tablet", "ups", "monitor", "meity", "gem it procurement", "cro"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (GeM IT PROCUREMENT / DATA CENTER):
Procurement of Enterprise-Class All-in-One Desktop Computers, Laptops, Workstations, and Online UPS systems for Central Ministry Data Centers and field offices. Equipment must comply strictly with IS 13252 (Part 1):2010 / IS/IEC 62368-1:2018 for Electrical Safety. The equipment must be registered under the BIS Compulsory Registration Scheme (CRS) bearing a valid R-Number (e.g., R-41XXXXXX) on the chassis, packaging and SMPS power adapter. Internal lithium-ion battery packs must comply with IS 16046 (Part 2):2018. Energy efficiency shall meet BEE 5-Star / EPEAT Gold standards.`,
    extractedRequirements: [
      { parameter: "Safety Qualification", requirement: "Conformity to IS 13252 (Part 1) / IS/IEC 62368-1", clause: "IS 13252 Part 1" },
      { parameter: "Statutory BIS Registration", requirement: "Mandatory BIS CRS Registration Number (R-Number)", clause: "MeitY CRO Mandate" },
      { parameter: "Secondary Lithium Battery Safety", requirement: "Conformity to IS 16046 (Part 2):2018 / IEC 62133-2", clause: "IS 16046 Part 2" },
      { parameter: "Power Adapter & SMPS Safety", requirement: "Independent BIS R-Number as per IS 13252", clause: "IS 13252 Cl. 4" },
      { parameter: "RoHS & Hazardous Substances", requirement: "Compliance with E-Waste Management Rules 2022", clause: "MoEFCC Rules" },
      { parameter: "EMC / EMI Immunity", requirement: "Conformity to CISPR 32 / IS/IEC 61000-4 series", clause: "TEC / MeitY Specs" }
    ],
    primaryStandards: [
      {
        is_code: "IS 13252 (Part 1):2010 / IEC 60950-1:2005",
        title: "Information Technology Equipment - Safety: Part 1 General Requirements (Second Revision)",
        year: "2010",
        reaffirmed: "2020",
        amendments: "Amendments No. 1, 2, 3 & 4 incorporated (Co-exists with IS/IEC 62368-1)",
        active_status: "Latest Published Standard (Valid)",
        summary: "Applies to mains-powered or battery-powered information technology equipment, personal computers, servers, storage units, and office machines."
      },
      {
        is_code: "IS/IEC 62368-1:2018",
        title: "Audio/Video, Information and Communication Technology Equipment: Part 1 Safety Requirements",
        year: "2018",
        reaffirmed: "2023",
        amendments: "Latest Hazard-Based Safety Engineering (HBSE) Standard",
        active_status: "Active Harmonized Standard",
        summary: "International hazard-based standard for electronics, computers, and display monitors."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 16046 (Part 2):2018 / IEC 62133-2", title: "Secondary cells and batteries containing alkaline or other non-acid electrolytes (Lithium battery safety)", relevance: "Mandatory battery pack safety for laptops/tablets" },
        { is_code: "IS 16242 (Part 1):2014", title: "Uninterruptible Power Systems (UPS) - Safety requirements", relevance: "Desktop and server UPS power backup certification" }
      ],
      testMethods: [
        { is_code: "IS 13252 Clause 4.2 & 5.1", title: "Electric strength test, touch current, and earth leakage test", test_type: "Dielectric insulation breakdown and user shock hazard evaluation" },
        { is_code: "IS 13252 Clause 4.5", title: "Thermal requirements and fire flammability of enclosures (V-0 / V-1 rating)", test_type: "Temperature rise under normal & fault operating conditions" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 1885 (Part 74):1993", title: "Electrotechnical vocabulary: Information technology safety", scope: "SELV, TNV circuits and insulation classifications" }
      ],
      safetyAndEnvironment: [
        { is_code: "E-Waste Management Rules 2022 / RoHS", title: "Restriction of Hazardous Substances (RoHS) in Electrical and Electronic Equipment", focus: "Lead, mercury, cadmium, and hexavalent chromium limits" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS 732:2019", title: "Code of practice for electrical wiring installations", scope: "Dedicated earthing for server racks and computer peripherals" }
      ],
      relatedProducts: [
        { is_code: "IS 1293:2019", title: "Plugs and socket-outlets up to 250V / 16A", description: "Power cords and supply adapters" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-II (CRS - Compulsory Registration Scheme)",
      qcoNotification: "Electronics and Information Technology Goods (Requirements for Compulsory Registration) Order, Ministry of Electronics & IT (MeitY)",
      gazetteRef: "MeitY Notification S.O. 2357(E) & Amendments",
      penaltyClause: "Import, distribution, or sale of IT equipment without self-declaration of conformity and valid BIS R-Number is prohibited."
    },
    tenderClauseTemplate: `The supplied desktop computers, laptops, monitors, and SMPS power supplies shall strictly comply with IS 13252 (Part 1) / IS/IEC 62368-1 for Electrical Safety. The equipment must be certified under the BIS Compulsory Registration Scheme (CRS) and bear the official standard mark along with the manufacturer's valid Registration Number (R-Number, e.g. R-41XXXXXX) and website reference (crsbis.in) on the product chassis, packaging, and power adapter. Laptop lithium-ion batteries must independently conform to IS 16046 (Part 2).`
  },

  {
    id: "stainless-steel-water-bottles",
    name: "Stainless Steel Water Bottles & Institutional Flasks",
    sector: "Consumer Goods, Institutional Procurement & Health (GeM / Railways / Defense / Education)",
    departmentTag: "Ministry of Consumer Affairs / DPIIT / Ministry of Defense",
    keywords: ["water bottle", "water bottles", "stainless steel bottle", "stainless steel water bottle", "flask", "insulated bottle", "food-contact safe", "reusable bottle", "leak proof bottle", "institutional bottle", "sipper", "steel flask", "is 17526", "is 6911"],
    sampleTenderText: `TENDER SPECIFICATION CLAUSE (INSTITUTIONAL SUPPLY / GeM PROCUREMENT):
Need to procure 500 stainless steel water bottles, 1 litre capacity, food-contact safe, reusable, leak-proof and suitable for institutional use. The body and cap shall be manufactured from food-grade austenitic stainless steel conforming strictly to IS 17526:2021 (with latest amendments) and raw material Grade 304 as per IS 6911:2017. The bottle must be hermetically sealed with food-grade non-toxic silicone gasket complying with IS 9845 for overall migration limits. Every unit must withstand a 1.2-meter drop test onto concrete and carry the mandatory BIS ISI mark with licensee CM/L number.`,
    extractedRequirements: [
      { parameter: "Product Classification", requirement: "Single-wall / Vacuum Insulated Stainless Steel Water Bottle", clause: "IS 17526 Cl. 4" },
      { parameter: "Nominal Capacity & Tolerance", requirement: "1000 ml (1.0 Litre) ± 5% volume", clause: "IS 17526 Cl. 5.1" },
      { parameter: "Material Grade & Purity", requirement: "Food Grade Austenitic Stainless Steel Grade 304 (X04Cr19Ni9)", clause: "IS 6911 / IS 17526 Table 1" },
      { parameter: "Wall Thickness", requirement: "Body min 0.6 mm, Base min 0.8 mm (deep-drawn seamless)", clause: "IS 17526 Cl. 6.2" },
      { parameter: "Leakage Resistance", requirement: "Zero leakage under 0.5 bar air/water pressure test for 5 min", clause: "IS 17526 Cl. 8.3" },
      { parameter: "Food Safety & Toxicity", requirement: "Heavy metal & overall migration <= 10 mg/dm² under IS 9845", clause: "IS 9845 / IS 10146" },
      { parameter: "Mechanical Impact & Drop", requirement: "Drop test from 1.2m height onto concrete without rupture", clause: "IS 17526 Cl. 8.5" }
    ],
    primaryStandards: [
      {
        is_code: "IS 17526:2021",
        title: "Stainless Steel Water Bottles - Specification",
        year: "2021",
        reaffirmed: "2023",
        amendments: "Amendment No. 1 (Mandatory Drop Test & Leak-proof Criteria)",
        active_status: "Mandatory Quality Control Order (QCO) Standard",
        summary: "Prescribes requirements, test methods, material composition, food-contact safety, and capacity limits for reusable stainless steel water bottles."
      },
      {
        is_code: "IS 6911:2017",
        title: "Stainless Steel Plate, Sheet and Strip - Specification (Second Revision)",
        year: "2017",
        reaffirmed: "2022",
        amendments: "Amendments No. 1 & 2 incorporated",
        active_status: "Active Normative Reference Standard",
        summary: "Specifies chemical composition (min 18% Cr, 8% Ni) and mechanical properties for austenitic stainless steel Grade 304 / 316."
      }
    ],
    alliedStandards: {
      normativeReferences: [
        { is_code: "IS 6911:2017", title: "Stainless steel plate, sheet and strip - Specification", relevance: "Chemical composition of Grade 304 (X04Cr19Ni9) raw material" },
        { is_code: "IS 9845:1998", title: "Determination of specific and overall migration of constituents of plastics materials in contact with foodstuffs", relevance: "Food-grade silicone cap gaskets and spout toxicity analysis" }
      ],
      testMethods: [
        { is_code: "IS 17526 Clause 8.3", title: "Leakage test under inversion and pressurized water immersion (0.5 bar)", test_type: "Hermetic seal & gasket integrity verification" },
        { is_code: "IS 17526 Clause 8.5", title: "Drop impact test (1.2 m height when filled to nominal capacity)", test_type: "Structural integrity and weld-seam rupture test" },
        { is_code: "IS 17526 Clause 8.6", title: "Corrosion resistance test (salt spray test 24h as per IS 9844)", test_type: "Pitting corrosion and passivated layer validation" }
      ],
      terminologyAndClassification: [
        { is_code: "IS 17526 Clause 3", title: "Classification: Type 1 (Single Wall), Type 2 (Double Wall Vacuum Insulated)", scope: "Thermal retention and body construction parameters" }
      ],
      safetyAndEnvironment: [
        { is_code: "IS 9845 / FSSAI Norms", title: "Limits for heavy metals (Lead < 0.1 mg/kg, Cadmium < 0.05 mg/kg)", focus: "Non-leaching, non-toxic potable drinking water contact safety" }
      ],
      installationAndCodeOfPractice: [
        { is_code: "IS 14756:2022", title: "Code of practice for stainless steel cookware and institutional storage utensils", scope: "Cleaning, passivation, and surface finish Ra <= 0.4 µm" }
      ],
      relatedProducts: [
        { is_code: "IS 17803:2022", title: "Insulated flasks and thermoware bottles for domestic and institutional use", description: "Vacuum insulated hot and cold storage flasks" }
      ]
    },
    mandatoryCertification: {
      isMandatory: true,
      scheme: "Scheme-I (ISI Mark)",
      qcoNotification: "Cookware, Utensils and Water Bottles (Quality Control) Order, Department for Promotion of Industry and Internal Trade (DPIIT)",
      gazetteRef: "S.O. 3624(E) / Mandatory QCO for Stainless Steel Water Bottles",
      penaltyClause: "Supply or sale of stainless steel water bottles without BIS ISI Mark is prohibited under Section 16 of BIS Act, 2016."
    },
    tenderClauseTemplate: `The supplied water bottles shall strictly conform to IS 17526:2021 (Stainless Steel Water Bottles - Specification) manufactured from food-grade austenitic stainless steel Grade 304 conforming to IS 6911. Every bottle must bear the mandatory BIS ISI Standard Mark along with the manufacturer's valid 7-digit CM/L license number permanently embossed or laser-etched on the base. Cap gaskets and stoppers must be food-contact safe complying with IS 9845. The supplier must furnish Manufacturer's Test Certificate (MTC) and NABL-accredited test reports for drop test, leakage resistance, and chemical migration.`
  }
];
