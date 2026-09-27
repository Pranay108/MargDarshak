export const bisLaboratories = [
  {
    id: "cl-sahibabad",
    name: "BIS Central Laboratory (CL)",
    location: "Sahibabad, Ghaziabad (NCR)",
    region: "National Headquarters Lab",
    specializations: ["Chemical Analysis", "Electrical & Electronics", "Mechanical & Metallurgy", "Microbiology & Food"],
    established: "1988",
    accreditations: ["ISO/IEC 17025", "NABL Accredited"],
    description: "The apex laboratory of BIS equipped with state-of-the-art analytical testing facilities, automated chromatography, spectrometer suites, and high-voltage test bays.",
    keyCapabilities: [
      "Testing of packaged drinking water and food products",
      "Structural steel and reinforcement bar tensile / bend tests",
      "High voltage and insulation breakdown testing",
      "Photometric and energy efficiency analysis of LED lamps"
    ]
  },
  {
    id: "wrol-mumbai",
    name: "Western Regional Office Laboratory (WROL)",
    location: "Andheri (East), Mumbai, Maharashtra",
    region: "Western Region",
    specializations: ["Chemical", "Mechanical", "Electrical", "Plastic & Polymer"],
    established: "1972",
    accreditations: ["ISO/IEC 17025", "NABL Accredited"],
    description: "Serves major industrial corridors in Maharashtra, Gujarat, Goa, and Madhya Pradesh with specialized petrochemical, polymer, and consumer goods testing.",
    keyCapabilities: [
      "Plastics, pipes (PVC, HDPE) and polymer testing",
      "Domestic electrical appliances and switchgear",
      "Paints, varnishes, and corrosion testing",
      "Textiles and geotextile tensile testing"
    ]
  },
  {
    id: "srol-chennai",
    name: "Southern Regional Office Laboratory (SROL)",
    location: "CIT Campus, Taramani, Chennai, Tamil Nadu",
    region: "Southern Region",
    specializations: ["Electrical Safety", "Electronics & IT (CRS)", "Chemical", "Mechanical"],
    established: "1975",
    accreditations: ["ISO/IEC 17025", "NABL Accredited"],
    description: "Hub for electronics, automotive component testing, pumps, motors, and solar equipment across South India.",
    keyCapabilities: [
      "IT & Electronic equipment testing under CRS (IS 13252)",
      "Solar PV modules and inverters",
      "Agricultural pump sets and electric motors",
      "Gold assaying reference laboratory"
    ]
  },
  {
    id: "erol-kolkata",
    name: "Eastern Regional Office Laboratory (EROL)",
    location: "Salt Lake, Kolkata, West Bengal",
    region: "Eastern Region",
    specializations: ["Metallurgy & Steel", "Chemical", "Mechanical", "Jute & Packaging"],
    established: "1977",
    accreditations: ["ISO/IEC 17025", "NABL Accredited"],
    description: "Specialized hub for heavy engineering, metals, alloys, mining tools, cement, and eastern agricultural commodities.",
    keyCapabilities: [
      "Steel rebar, structural sections, and ductile iron pipes",
      "Ordinary & Pozzolana Portland cement testing",
      "Jute bags, paper, and packaging materials",
      "Transformer oil and petroleum lubricants"
    ]
  },
  {
    id: "nrol-chandigarh",
    name: "Northern Regional Office Laboratory (NROL)",
    location: "Sahibzada Ajit Singh Nagar (Mohali), Punjab / Chandigarh",
    region: "Northern Region",
    specializations: ["Food & Agriculture", "Chemical", "Mechanical", "Electrical"],
    established: "1983",
    accreditations: ["ISO/IEC 17025", "NABL Accredited"],
    description: "Serving North India with specialized emphasis on agro-commodities, fertilizers, pipes, wires, and consumer durables.",
    keyCapabilities: [
      "Food chemistry, pesticide residue, and heavy metal analysis",
      "Cables, wires, and conductors",
      "Sanitary appliances and ceramic tiles",
      "Pressure cookers and domestic LPG appliances"
    ]
  }
];

export const labTestingWorkflow = [
  { step: "1", title: "Sample Collection / Submission", desc: "Sample drawn by BIS officer during factory audit or market surveillance, or submitted directly via LIMS portal." },
  { step: "2", title: "Barcoding & Anonymization", desc: "Samples are coded with automated barcodes in the Laboratory Information Management System (LIMS) to preserve strict testing confidentiality." },
  { step: "3", title: "Standardized Testing Protocol", desc: "Rigorous testing executed as per relevant Indian Standard parameters by qualified scientific personnel using calibrated equipment." },
  { step: "4", title: "Digital Test Report (LIMS)", desc: "Digitally signed test certificate generated with QR code verification and linked directly to manufacturer's CM/L file." }
];

// Accredited Testing Laboratories under IS 269:2015 (48 Labs)
export const cementTestingLabsData = {
  indian_standard: "IS 269:2015",
  standard_name: "Ordinary Portland Cement Testing & Chemical Analysis",
  status: "Accredited & Recognized",
  labs: [
    {
      s_no: 1,
      name: "BIS, Bengaluru Branch Laboratory (BNBL)",
      address: "Peenya Industrial Area, 1st Stage, Tumkur Road, Bengaluru - 560058",
      city: "Bengaluru",
      state: "Karnataka",
      contact: "+91 11 23230131",
      email: "bnbol@bis.gov.in",
      type: "BIS Branch Lab"
    },
    {
      s_no: 2,
      name: "BIS, Central Laboratory (CL)",
      address: "20/9, Site 4, Sahibabad Industrial Area, Sahibabad",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      contact: "0120 4177 115",
      email: "sample@bis.gov.in",
      type: "BIS Apex Central Lab"
    },
    {
      s_no: 3,
      name: "BIS, Eastern Regional Laboratory (ERL)",
      address: "(1) Annex Building & Sample Cell: P-230, CIT Scheme, VII-M, Kankurgachi (2) Main building: 1/14, CIT Scheme VII M, VIP Road, Kolkata 700054",
      city: "Kolkata",
      state: "West Bengal",
      contact: "+91 33 23209474",
      email: "sample.erol@bis.gov.in",
      type: "BIS Regional Lab"
    },
    {
      s_no: 4,
      name: "BIS, Guwahati Branch Laboratory (GBL)",
      address: "2nd Floor, West End Block, Housefed Building Complex, Last Gate, Dispur, Guwahati, Assam 781006",
      city: "Guwahati",
      state: "Assam",
      contact: "+91 9641193329",
      email: "gbol@bis.gov.in",
      type: "BIS Branch Lab"
    },
    {
      s_no: 5,
      name: "BIS, Northern Regional Laboratory (NRL)",
      address: "B-69, Industrial Focal Point, Phase VII, Mohali",
      city: "Mohali",
      state: "Punjab",
      contact: "+91 172 4802676",
      email: "nrol@bis.gov.in",
      type: "BIS Regional Lab"
    },
    {
      s_no: 6,
      name: "BIS, Patna Branch Laboratory (PBL)",
      address: "Bureau of Indian Standards, Patliputra Industrial Estate",
      city: "Patna",
      state: "Bihar",
      contact: "0612 2262808",
      email: "pbol@bis.gov.in",
      type: "BIS Branch Lab"
    },
    {
      s_no: 7,
      name: "BIS, Southern Regional Laboratory (SRL)",
      address: "IV Cross Road, CIT Campus, Taramani, Chennai-600113, Tamil Nadu",
      city: "Chennai",
      state: "Tamil Nadu",
      contact: "+91 44 22541442",
      email: "srol@bis.gov.in",
      type: "BIS Regional Lab"
    },
    {
      s_no: 8,
      name: "BIS, Western Regional Laboratory (WRL)",
      address: "Bureau of Indian Standards (Western Regional Laboratory), Plot No. E9, Road No. 8, M.I.D.C, Andheri (East), Mumbai",
      city: "Mumbai",
      state: "Maharashtra",
      contact: "+91 22 28329295",
      email: "wrol@bis.gov.in",
      type: "BIS Regional Lab"
    },
    {
      s_no: 9,
      name: "SIIR, Delhi – Shriram Institute For Industrial Research",
      address: "19-University Road, Delhi 110007",
      city: "Delhi",
      state: "Delhi",
      contact: "+91 011 35200445",
      email: "laxmirawat@shriraminstitute.org",
      type: "Recognized Research Institute"
    },
    {
      s_no: 10,
      name: "Kailtech Test and Research Centre Pvt. Ltd., Indore",
      address: "141C, Electronic Complex Industrial Area",
      city: "Indore",
      state: "Madhya Pradesh",
      contact: "+91 731 4048821",
      email: "contact@kailtech.net",
      type: "Recognized Testing Center"
    },
    {
      s_no: 11,
      name: "Ghaziabad Testing Laboratories Pvt Ltd, Ghaziabad",
      address: "AO 150 Amrit Steel Compound South Side GT Road Industrial Area",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      contact: "+91 9891067223",
      email: "gtaslab@yahoo.com",
      type: "Recognized Testing Lab"
    },
    {
      s_no: 12,
      name: "IDMA Laboratories Limited, Panchkula",
      address: "Plot No. 391 Industrial Area Phase 1",
      city: "Panchkula",
      state: "Haryana",
      contact: "+91 9888002607",
      email: "testing@idmagroup.co.in",
      type: "Recognized Lab"
    },
    {
      s_no: 13,
      name: "National Test House (WR) - NTH, Mumbai",
      address: "Plot No. F-10, MIDC, Andheri (E)",
      city: "Mumbai",
      state: "Maharashtra",
      contact: "+91 022 28352341",
      email: "director.nthwr@gov.in",
      type: "National Test House (Govt)"
    },
    {
      s_no: 14,
      name: "National Council for Cement and Building Materials (NCCBM), Hyderabad",
      address: "NCB Bhavan, Old Bombay Road, Near Raidarga Police Station, Gachibowli",
      city: "Hyderabad",
      state: "Telangana",
      contact: "+91 0129 4192222",
      email: "ncbhcrt@rediffmail.com",
      type: "Autonomous Apex Body (Govt)"
    },
    {
      s_no: 15,
      name: "National Test House (NR) - NTH, Ghaziabad",
      address: "Kamla Nehru Nagar, Ghaziabad",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      contact: "+91 9999472699",
      email: "directorgzb@nth.gov.in",
      type: "National Test House (Govt)"
    },
    {
      s_no: 16,
      name: "Suntech",
      address: "40-P, Tupudana Industrial Area",
      city: "Ranchi",
      state: "Jharkhand",
      contact: "+91 9934148451",
      email: "sun.tech.lab@gmail.com",
      type: "Recognized Testing Lab"
    },
    {
      s_no: 17,
      name: "Mananda Test House, Derabassi",
      address: "Dhanauni Road (Near Lord Mahavir Jain Public School), Derabassi, Mohali",
      city: "Derabassi",
      state: "Punjab",
      contact: "+91 9988336323",
      email: "mth17@rediffmail.com",
      type: "Recognized Testing Lab"
    },
    {
      s_no: 18,
      name: "Delhi Test House, Azadpur",
      address: "A-62/3, G T Karnal Road Industrial Area, Opposite Hans Cinema, Azadpur",
      city: "Delhi",
      state: "Delhi",
      contact: "+91 9810442016",
      email: "info@delhitesthouse.com",
      type: "Recognized Test House"
    },
    {
      s_no: 19,
      name: "National Test House (NWR) - NTH, Jaipur",
      address: "E 763, Road No. 9F1, VKI Area",
      city: "Jaipur",
      state: "Rajasthan",
      contact: "+91 33 23673872",
      email: "directorjai@nth.gov.in",
      type: "National Test House (Govt)"
    },
    {
      s_no: 20,
      name: "Ace Test House Private Limited, New Delhi",
      address: "Khasra No. 1048 Near Pepsi Godown, Vill- Bhalaswa",
      city: "New Delhi",
      state: "Delhi",
      contact: "+91 7042858881",
      email: "acetesthouse@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 21,
      name: "Aadco Testing & Research Laboratory Pvt Ltd, Ghaziabad",
      address: "F 28 Bulandshahar Road Industrial Area",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      contact: "+91 9555443495",
      email: "aadcolab@gmail.com",
      type: "Recognized Testing Lab"
    },
    {
      s_no: 22,
      name: "CEG Test House & Research Centre Private Limited, Jaipur",
      address: "CEG Tower, B-11(G), Malviya Industrial Area, Malviya Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      contact: "+91 0141 4046599",
      email: "quality@cegtesthouse.com",
      type: "Recognized Test House"
    },
    {
      s_no: 23,
      name: "Choksi Laboratories Limited, Indore",
      address: "Survey No. 9/1, Balaji Tusiyana Industrial Estate, Kumedi",
      city: "Indore",
      state: "Madhya Pradesh",
      contact: "+91 8770896041",
      email: "qa.indore@choksilab.com",
      type: "Recognized Lab"
    },
    {
      s_no: 24,
      name: "National Test House (SR), Chennai",
      address: "Govt. of India, CSIR Road, Taramani",
      city: "Chennai",
      state: "Tamil Nadu",
      contact: "+91 44 22433158",
      email: "directorchn@nth.gov.in",
      type: "National Test House (Govt)"
    },
    {
      s_no: 25,
      name: "National Council for Cement and Building Materials (NCCBM), Faridabad",
      address: "34 km, Stone Delhi Mathura Road, Ballabgarh, Opposite Good Year Tyres",
      city: "Faridabad",
      state: "Haryana",
      contact: "0129 266789",
      email: "ncbcrt2@gmail.com",
      type: "Autonomous Apex Body (Govt)"
    },
    {
      s_no: 26,
      name: "Shriram Institute For Industrial Research, Bengaluru",
      address: "14-15, Sadarmangala Industrial Area, Whitefield Road",
      city: "Bengaluru",
      state: "Karnataka",
      contact: "+91 011 27667267",
      email: "dn@shriraminstitute-blr.org",
      type: "Recognized Research Institute"
    },
    {
      s_no: 27,
      name: "Lucid Laboratories Private Limited, Hyderabad",
      address: "Plot No. 3, IDA, Balanagar",
      city: "Hyderabad",
      state: "Telangana",
      contact: "+91 040 69042222",
      email: "info@lucidlabsindia.com",
      type: "Recognized Lab"
    },
    {
      s_no: 28,
      name: "Spectro Analytical Labs Private Limited, Greater Noida",
      address: "S-1, GNEPIP Surajpur Industrial Area, Kasna Phase V",
      city: "Greater Noida",
      state: "Uttar Pradesh",
      contact: "+91 9873571512",
      email: "qa.gn@xoin.eurofinsasia.com",
      type: "Recognized Analytical Lab"
    },
    {
      s_no: 29,
      name: "National Test House-ER (NTH), Kolkata",
      address: "Block-CP, Sector-V, Salt Lake City",
      city: "Kolkata",
      state: "West Bengal",
      contact: "+91 33 23673871",
      email: "directorkol@nth.gov.in",
      type: "National Test House (Govt)"
    },
    {
      s_no: 30,
      name: "Arihant Analytical Laboratory Pvt. Ltd., Sonipat",
      address: "Plot No. 272, Sector-57, Phase IV, HSIIDC Kundli",
      city: "Sonipat",
      state: "Haryana",
      contact: "+91 9310022355",
      email: "aalkundli@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 31,
      name: "Allumera Engineering Solutions Pvt Ltd, New Delhi",
      address: "Khasra No. 61, Matiala Village, Uttam Nagar",
      city: "New Delhi",
      state: "Delhi",
      contact: "+91 9810040186",
      email: "aespllab@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 32,
      name: "Krishna Digital Material Testing Laboratory LLP, Bhopal",
      address: "02, Bhawani Nagar, JK Road, Bhopal",
      city: "Bhopal",
      state: "Madhya Pradesh",
      contact: "+91 0755 4001289",
      email: "krishnalab12@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 33,
      name: "National Test House (NER) - NTH, Guwahati",
      address: "C.I.T.I Complex, Post: Gopinath Nagar, Kalapahar",
      city: "Guwahati",
      state: "Assam",
      contact: "+91 0361 2417938",
      email: "directorguw@nth.gov.in",
      type: "National Test House (Govt)"
    },
    {
      s_no: 34,
      name: "QA Testing Laboratories Private Limited, Noida",
      address: "B-76, Sector-64",
      city: "Noida",
      state: "Uttar Pradesh",
      contact: "+91 8750096307",
      email: "qm@qatestinglaboratories.com",
      type: "Recognized Lab"
    },
    {
      s_no: 35,
      name: "Stellar Test House, Noida",
      address: "G-68, Sector-63",
      city: "Noida",
      state: "Uttar Pradesh",
      contact: "+91 8130190099",
      email: "ankit@stellartesthouse.com",
      type: "Recognized Lab"
    },
    {
      s_no: 36,
      name: "NBML Building Materials Testing Lab LLP, Raipur",
      address: "Raipur Bilaspur Road, Near Akaswani Radio Station, Urkura Nagar",
      city: "Raipur",
      state: "Chhattisgarh",
      contact: "+91 9881110389",
      email: "nbmtl2017@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 37,
      name: "Eko Pro Engineers Private Limited, Ghaziabad",
      address: "32/37, South Side of G.T Road, Industrial Area",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      contact: "+91 9810243870",
      email: "labs@ekopro.in",
      type: "Recognized Lab"
    },
    {
      s_no: 38,
      name: "Indian Testing Laboratory Private Limited, Greater Noida",
      address: "Plot No-248, Ecotech-III, Udyog Kendra-II",
      city: "Greater Noida",
      state: "Uttar Pradesh",
      contact: "+91 9999669383",
      email: "itlnoida.labs@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 39,
      name: "ADS Labtech, Ghaziabad",
      address: "39/2/10-A, Site-IV, Sahibabad Industrial Area",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      contact: "+91 7217808235",
      email: "shaktigroups@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 40,
      name: "Pioneer Testing Laboratory Private Limited, New Delhi",
      address: "Kh No. 84/2, Street No. 4, Mundka Industrial Area",
      city: "Delhi",
      state: "Delhi",
      contact: "+91 9810040186",
      email: "pioneertestinglabdelhi@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 41,
      name: "Micro Engineering And Testing Laboratory, Sonipat",
      address: "Plot No. 43, HSIIDC, Indl. Estate, Rai",
      city: "Sonipat",
      state: "Haryana",
      contact: "+91 9871143785",
      email: "METLSON@YAHOO.COM",
      type: "Recognized Lab"
    },
    {
      s_no: 42,
      name: "Delta Testing and Research Laboratories, Delhi",
      address: "Plot No. C-5, Block-C, Main Kanjhawala Road, Rajiv Nagar",
      city: "Delhi",
      state: "Delhi",
      contact: "+91 9811037450",
      email: "info@deltatestinglab.com",
      type: "Recognized Lab"
    },
    {
      s_no: 43,
      name: "Ramco Research And Development Centre, Chennai",
      address: "11A, Okkiyam, Thoraipakkam, Old Mahabalipuram Road",
      city: "Chennai",
      state: "Tamil Nadu",
      contact: "9994446192",
      email: "trg@ramcocements.co.in",
      type: "Industry R&D Center"
    },
    {
      s_no: 44,
      name: "CIMEC Infralabs Private Limited, Ghaziabad",
      address: "Ground Floor, 179/13, Anand Industrial Area, Mohan Nagar",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      contact: "+91 120 4156544",
      email: "vsr1960@gmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 45,
      name: "DVG Laboratories & Consultants Pvt Ltd, Greater Noida",
      address: "A2/71, Site-V, UPSIDC Industrial Area, Kasna",
      city: "Greater Noida",
      state: "Uttar Pradesh",
      contact: "+91 9818254877",
      email: "dvglabs.testing@hotmail.com",
      type: "Recognized Lab"
    },
    {
      s_no: 46,
      name: "Spectro SSA Labs Private Limited, Navi Mumbai",
      address: "R-489, Sector 8, MIDC, TTC Industrial Area, Rabale",
      city: "Rabale",
      state: "Maharashtra",
      contact: "+91 9769696069",
      email: "Ratan.Jotwani@xoin.eurofinsasia.com",
      type: "Recognized Analytical Lab"
    },
    {
      s_no: 47,
      name: "Ramco Industries Limited Material Testing Lab, Arakonam",
      address: "No. 17, Winterpet Post, Arakonam",
      city: "Arakonam",
      state: "Tamil Nadu",
      contact: "+91 8838118563",
      email: "cpd@ril.co.in",
      type: "Recognized Material Lab"
    },
    {
      s_no: 48,
      name: "Rahul Engineers Laboratory Private Limited, Udaipur",
      address: "5A-Chitrakut Nagar",
      city: "Udaipur",
      state: "Rajasthan",
      contact: "+91 8107343935",
      email: "rahul.labudr@gmail.com",
      type: "Recognized Testing Lab"
    }
  ]
};
