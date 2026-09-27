export const certificationSchemes = [
  {
    id: "isi-scheme",
    title: "Product Certification Scheme (ISI Mark Scheme - I)",
    badge: "Most Widely Recognized",
    tagline: "Assurance of quality, safety, and reliability on domestic manufacturing",
    description: "The classic BIS Product Certification Scheme (Scheme-I) grants manufacturers the license to use the prestigious Standard Mark (ISI mark) on products complying with Indian Standards.",
    targetAudience: "Domestic manufacturers of industrial & consumer products (mandatory for 500+ products via QCOs)",
    steps: [
      { step: "01", title: "Online Application (Manakonline)", desc: "Submit Form-I on the Manakonline portal with manufacturing details, raw materials, test equipment, and application fee." },
      { step: "02", title: "Factory Inspection & Verification", desc: "A BIS Certification Officer visits the factory to inspect manufacturing infrastructure, quality control systems, and in-house testing facilities." },
      { step: "03", title: "Sample Drawing & Independent Testing", desc: "Officer draws production samples and sends them to BIS or BIS-recognized labs for complete conformity testing." },
      { step: "04", title: "Grant of License (CML Number)", desc: "Upon satisfactory test report and factory audit, BIS grants license with a unique 7-digit CM/L number." },
      { step: "05", title: "Surveillance & Market Samples", desc: "Regular surprise audits and market surveillance ensure continuous quality compliance." }
    ],
    features: [
      "Simplified Procedure option (license grant within 30 days based on self-test reports)",
      "QR code tagging on certificates for instant verification",
      "Concession in marking fee for Micro, Small & Medium Enterprises (MSMEs) and Women Entrepreneurs"
    ],
    accentColor: "blue"
  },
  {
    id: "crs-scheme",
    title: "Compulsory Registration Scheme (CRS - Scheme II)",
    badge: "Electronics & IT Focus",
    tagline: "Self-declaration of conformity based on testing in BIS-recognized labs",
    description: "Formulated under MeitY & MNRE notifications, CRS requires manufacturers to register electronic and solar products with BIS based on safety test reports.",
    targetAudience: "Global & domestic manufacturers of electronics, IT equipment, solar inverters, LED lights, batteries",
    steps: [
      { step: "01", title: "Sample Testing in BIS Lab", desc: "Send product samples to a BIS-approved Indian test laboratory (NABL accredited) as per applicable Indian Standard." },
      { step: "02", title: "Test Report Generation", desc: "Lab issues an automated test report conforming to safety parameters (valid for 90 days from issue)." },
      { step: "03", title: "Online Registration Submission", desc: "Submit application on CRS portal (crsbis.in) with test report, brand endorsement details, and Undertaking." },
      { step: "04", title: "Grant of R-Number", desc: "BIS scrutinizes documentation and issues unique Registration Number (e.g. R-41000000) for product marking." }
    ],
    features: [
      "No mandatory factory physical inspection required prior to grant",
      "Standard CRS Mark (R-Number + IS number statement) displayed on product label",
      "Inclusion of new models under same series through supplementary test reports"
    ],
    accentColor: "amber"
  },
  {
    id: "fmcs-scheme",
    title: "Foreign Manufacturers Certification Scheme (FMCS)",
    badge: "Global Imports",
    tagline: "Certification for overseas factories exporting goods to the Indian market",
    description: "FMCS enables foreign manufacturing facilities outside India to obtain a BIS license to mark their products with the ISI mark before shipment to India.",
    targetAudience: "Manufacturing facilities located outside the territory of India exporting to India",
    steps: [
      { step: "01", title: "Application & AIR Appointment", desc: "Overseas manufacturer appoints an Authorized Indian Representative (AIR) residing in India." },
      { step: "02", title: "Factory Audit by BIS Officers", desc: "BIS technical team travels to foreign plant for physical audit of production line and QA facilities." },
      { step: "03", title: "Sample Testing in India", desc: "Audited samples are shipped under customs seal to BIS laboratories in India for testing." },
      { step: "04", title: "Performance Bank Guarantee (PBG)", desc: "Applicant submits PBG of USD 10,000 from an RBI-approved bank before grant of license." },
      { step: "05", title: "Grant of FMCS License", desc: "License is granted for 1 to 2 years, renewable periodically upon compliance." }
    ],
    features: [
      "Authorized Indian Representative (AIR) acts as legal liaison in India",
      "Prevents substandard foreign goods from entering Indian domestic market",
      "Covers steel, tires, chemicals, machinery, and consumer durables"
    ],
    accentColor: "emerald"
  },
  {
    id: "eco-mark",
    title: "ECO Mark Scheme (Environment-Friendly Products)",
    badge: "Sustainability",
    tagline: "Labeling eco-friendly consumer goods meeting stringent environmental standards",
    description: "The ECO Mark operates in combination with the ISI mark to identify products that meet specific environmental criteria alongside BIS quality requirements.",
    targetAudience: "Manufacturers of detergents, paints, paper, plastics, batteries, cosmetics",
    steps: [
      { step: "01", title: "Dual Compliance", desc: "Product must comply with both the respective IS product specification AND Eco-criteria issued by MoEFCC." },
      { step: "02", title: "Earthen Pot (Matka) Symbol", desc: "Certified products carry the distinct Matka logo indicating minimal environmental impact." }
    ],
    features: [
      "Promotes biodegradable ingredients, recyclability, and reduced chemical pollution",
      "Encourages sustainable consumer choices across India"
    ],
    accentColor: "teal"
  }
];

// Product Certification Licenses: IS 269:2015 (Ordinary Portland Cement)
export const cementLicensingData = {
  indian_standard: "IS 269:2015",
  standard_name: "Ordinary Portland Cement (33, 43 and 53 Grade) — Specification",
  status: "Operative",
  licenses: [
    {
      s_no: 1,
      licence_no: "8181373",
      firm_name_and_address: "Ultratech Cement Ltd (Bela Cement Works), Jaypee Puram",
      district: "REWA"
    },
    {
      s_no: 2,
      licence_no: "8107159",
      firm_name_and_address: "Ultratech Cement Limited (Unit: Maihar Cement Works), PO Sarla Nagar",
      district: "SATNA"
    },
    {
      s_no: 3,
      licence_no: "3083045",
      firm_name_and_address: "Ultratech Cement Ltd (Sidhi Cement Works), Jaypee Vihar, Village Maingawan, PO Bharatpur",
      district: "SIDHI"
    },
    {
      s_no: 4,
      licence_no: "8212762",
      firm_name_and_address: "Prism Johnson Limited (Cement Division), Rajdeep Rewa Road",
      district: "SATNA"
    },
    {
      s_no: 5,
      licence_no: "8450677",
      firm_name_and_address: "Pioneer Industries, Village Jeerabad, Teh. Gandhwani",
      district: "DHAR"
    },
    {
      s_no: 6,
      licence_no: "8200070103",
      firm_name_and_address: "Creative Housewares (P) Ltd., Plot No. 31,32,33, Lamtra Industrial Area",
      district: "KATNI"
    },
    {
      s_no: 7,
      licence_no: "8200109104",
      firm_name_and_address: "Wonder Cement Limited, Plot No. 1-A & 1-B, Industrial Area, Kherwas, Badnawar",
      district: "DHAR"
    },
    {
      s_no: 8,
      licence_no: "8200003690",
      firm_name_and_address: "RCCPL Private Limited, Village Bhaurali Post Itahara",
      district: "SATNA"
    },
    {
      s_no: 9,
      licence_no: "8200152905",
      firm_name_and_address: "J.K. Cement Limited",
      district: "PANNA"
    },
    {
      s_no: 10,
      licence_no: "3165249",
      firm_name_and_address: "Prism Johnson Limited (Formerly Prism Cement Limited) (Cement Division Unit-II), Rajdeep, Rewa Road",
      district: "SATNA"
    },
    {
      s_no: 11,
      licence_no: "2537356",
      firm_name_and_address: "KJS Cement Limited, Vill Amiliya, Rewa Road, NH7",
      district: "MAIHAR"
    },
    {
      s_no: 12,
      licence_no: "8200077614",
      firm_name_and_address: "UltraTech Cement Ltd (Unit Dhar Cement Works), Village Tonki, Tehsil Manawar",
      district: "DHAR"
    },
    {
      s_no: 13,
      licence_no: "8200132499",
      firm_name_and_address: "Sagar Cements (M) Private Limited, Vill Karondiya, PO Jeerabad, Teh Gandhwani",
      district: "DHAR"
    },
    {
      s_no: 14,
      licence_no: "8111453",
      firm_name_and_address: "Ultra Tech Cement Limited (Unit-Vikram Cement Works), P.O. Khor Tehsil Jawad",
      district: "NEEMUCH"
    },
    {
      s_no: 15,
      licence_no: "8256176",
      firm_name_and_address: "Birla Corporation Ltd, P.O Birla Vikas",
      district: "SATNA"
    },
    {
      s_no: 16,
      licence_no: "8342169",
      firm_name_and_address: "Nagori Cement Ltd., Bagh Distt",
      district: "DHAR"
    },
    {
      s_no: 17,
      licence_no: "2260440",
      firm_name_and_address: "ACC Limited, Kymore Cement Works, P.O. Kymore",
      district: "KATNI"
    },
    {
      s_no: 18,
      licence_no: "8166579",
      firm_name_and_address: "Jaypee Rewa Plant, Jaypee Nagar Distt Rewa",
      district: "REWA"
    },
    {
      s_no: 19,
      licence_no: "8066575",
      firm_name_and_address: "Diamond Cements, Prop. HeidelbergCement India Ltd, Village-Imlai, PO Imlai",
      district: "DAMOH"
    },
    {
      s_no: 20,
      licence_no: "8400102306",
      firm_name_and_address: "Shree Grinding Unit (A Unit of Shree Cement Ltd.)",
      district: "ALWAR"
    },
    {
      s_no: 21,
      licence_no: "3170444",
      firm_name_and_address: "Devshree Cement Limited",
      district: "JODHPUR"
    },
    {
      s_no: 22,
      licence_no: "8504573",
      firm_name_and_address: "Tiger Cement Pvt. Ltd",
      district: "BIKANER"
    },
    {
      s_no: 23,
      licence_no: "2558768",
      firm_name_and_address: "Shree Jaipur Cement Plant (Phulera, Jaipur)",
      district: "JAIPUR"
    },
    {
      s_no: 24,
      licence_no: "3095961",
      firm_name_and_address: "J.K. Cement Works (Unit of J.K. Cement Ltd.)",
      district: "NAGAUR"
    },
    {
      s_no: 25,
      licence_no: "8016358",
      firm_name_and_address: "Chanderia Cement Works",
      district: "CHITTORGARH"
    },
    {
      s_no: 26,
      licence_no: "2361143",
      firm_name_and_address: "JK Lakshmi Cement Limited",
      district: "SIROHI"
    },
    {
      s_no: 27,
      licence_no: "8651485",
      firm_name_and_address: "Meera Cement Private Limited",
      district: "NAGAUR"
    },
    {
      s_no: 28,
      licence_no: "8155271",
      firm_name_and_address: "Shravan Cements Pvt. Ltd.",
      district: "ALWAR"
    },
    {
      s_no: 29,
      licence_no: "3091145",
      firm_name_and_address: "UltraTech Cement Limited (Unit Kotputli Cement Works)",
      district: "JAIPUR"
    },
    {
      s_no: 30,
      licence_no: "8400161811",
      firm_name_and_address: "Great India Cement Pvt Ltd",
      district: "ALWAR"
    },
    {
      s_no: 31,
      licence_no: "8650887",
      firm_name_and_address: "Astha Cements Private Limited",
      district: "ALWAR"
    },
    {
      s_no: 32,
      licence_no: "3116236",
      firm_name_and_address: "Agarwal Cement & Chemicals (P) Ltd.",
      district: "NAGAUR"
    },
    {
      s_no: 33,
      licence_no: "2690263",
      firm_name_and_address: "Nuvoco Vistas Corporation Limited",
      district: "CHITTORGARH"
    },
    {
      s_no: 34,
      licence_no: "8217772",
      firm_name_and_address: "J.K. Cement Works",
      district: "CHITTORGARH"
    },
    {
      s_no: 35,
      licence_no: "8400156810",
      firm_name_and_address: "Shekhawati Cement",
      district: "JHUNJHUNU"
    },
    {
      s_no: 36,
      licence_no: "8609890",
      firm_name_and_address: "Sorabh Cement Limited",
      district: "SIKAR"
    },
    {
      "s_no": 37,
      licence_no: "8400014410",
      firm_name_and_address: "Nuvoco Vistas Corporation Limited",
      district: "PALI"
    },
    {
      s_no: 38,
      licence_no: "8053162",
      firm_name_and_address: "Birla Cement Works",
      district: "CHITTORGARH"
    },
    {
      s_no: 39,
      licence_no: "8400244411",
      firm_name_and_address: "Tarun Industries",
      district: "JHALAWAR"
    },
    {
      s_no: 40,
      licence_no: "8400121512",
      firm_name_and_address: "Bangur Cement Unit (A Unit of Shree Cement Ltd)",
      district: "GANGANAGAR"
    },
    {
      s_no: 41,
      licence_no: "8400331212",
      firm_name_and_address: "Bangur Cement Unit",
      district: "PALI"
    },
    {
      s_no: 42,
      licence_no: "8400159917",
      firm_name_and_address: "Ultimo Cement India Private Limited",
      district: "ALWAR"
    },
    {
      s_no: 43,
      licence_no: "8600115911",
      firm_name_and_address: "Ambuja Cements Limited",
      district: "NAGAUR"
    },
    {
      s_no: 44,
      licence_no: "8400175713",
      firm_name_and_address: "Jindal Shakti Cement",
      district: "DAUSA"
    },
    {
      s_no: 45,
      licence_no: "8146674",
      firm_name_and_address: "JCL Cements Pvt. Ltd.",
      district: "ALWAR"
    },
    {
      s_no: 46,
      licence_no: "8190576",
      firm_name_and_address: "Ambuja Cements Limited",
      district: "PALI"
    },
    {
      s_no: 47,
      licence_no: "8214059",
      firm_name_and_address: "Ultratech Cement Limited",
      district: "SIROHI"
    },
    {
      s_no: 48,
      licence_no: "8206868",
      firm_name_and_address: "Shri Ram Cement Works",
      district: "KOTA"
    },
    {
      s_no: 49,
      licence_no: "8159077",
      firm_name_and_address: "Nokha Cement Private Limited",
      district: "BIKANER"
    },
    {
      s_no: 50,
      licence_no: "8600120446",
      firm_name_and_address: "Gopalji Cement Private Limited",
      district: "ALWAR"
    }
  ]
};
