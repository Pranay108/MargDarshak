import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  FileCheck2,
  FileSignature,
  UploadCloud,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Layers,
  ShieldCheck,
  Scale,
  BookOpen,
  FlaskConical,
  Edit3,
  Sliders,
  CheckSquare,
  Square,
  Paperclip,
  ArrowUp,
  Info,
  Clock,
  Eye,
  Wand2,
  Plus,
  Trash2,
  Printer,
  X
} from 'lucide-react';
import { procurementCategories } from '../data/procurementData';
import { procurementEngine } from '../services/procurementEngine';
import { AshokaEmblem, IsiMarkLogo, BisOfficialLogo } from '../components/OfficialLogos';
import { generateTenderSpecificationPDF, generateTenderSpecificationPDFDataUrl } from '../utils/pdfGenerator';

// Comprehensive Database of Sample Real Tenders with Outdated Standards & Missing Clauses
const sampleTenderLibrary = [
  {
    id: 'led-street-light',
    name: 'Smart City 120W LED Street Lighting Project',
    dept: 'Municipal Corporation / Smart City Special Purpose Vehicle',
    category: 'Electrical & Electronics (ETD)',
    rawText: `TENDER REF: SMC/ELECT/2026/LED-408\nPROCUREMENT OF 2,500 UNITS OF 120W OUTDOOR LED STREET LIGHT LUMINAIRES\n\n1. SCOPE: Supply and installation of energy efficient LED Street Lights with IP65 fixture.\n2. TECHNICAL SPECIFICATIONS:\n- System Wattage: 120 Watts ± 5%\n- Luminous Efficacy: ≥ 120 Lumens/Watt\n- CCT: 5700K Cool White, CRI > 70\n- Housing: Pressure die-cast aluminum\n3. STANDARDS REFERENCED: The luminaires must adhere to IS 10322:2012 for general luminaires and IS 15885 (Part 2/Sec 13):2012 for LED control gear.\n4. WARRANTY & TESTING: 5 years comprehensive onsite warranty. Manufacturer test certificate required.`,
    extracted: {
      title: 'Procurement of 2,500 Units of 120W Outdoor LED Street Light Luminaires',
      product: 'Outdoor LED Street Light Luminaire (120W)',
      specs: [
        { label: 'System Wattage', value: '120 Watts ± 5%' },
        { label: 'Luminous Efficacy', value: '≥ 120 lm/W' },
        { label: 'Correlated Color Temp (CCT)', value: '5700K (Cool White)' },
        { label: 'Color Rendering Index (CRI)', value: '≥ 70' },
        { label: 'Housing Material', value: 'Pressure Die-Cast Aluminum (ADC12)' },
        { label: 'Ingress Protection', value: 'IP65 (Tender specification)' }
      ],
      quantity: '2,500 Units',
      requiredStandards: ['IS 10322:2012', 'IS 15885 (Part 2/Sec 13):2012'],
      referencedIS: ['IS 10322:2012', 'IS 15885 (Part 2/Sec 13):2012'],
      testingRequirements: ['Manufacturer In-House Test Certificate'],
      certificationRequirements: ['None explicitly specified in tender draft'],
      safetyRequirements: ['General electrical insulation'],
      complianceRequirements: ['5 years comprehensive onsite warranty'],
      importantClauses: [
        'Clause 3.1: Luminaire housing shall be pressure die cast aluminum with powder coating',
        'Clause 4.2: Supplier must provide 5 years warranty with onsite replacement within 48 hours'
      ]
    },
    identifiedStandards: [
      {
        code: 'IS 10322 (Part 5/Sec 3):2024',
        title: 'Luminaires — Part 5: Particular Requirements — Sec 3: Luminaires for Road and Street Lighting',
        relevance: 'HIGH',
        currentVersion: 'IS 10322 (Part 5/Sec 3):2024',
        status: 'CURRENT',
        latestAmendment: 'Amendment 2 — Jan 2026',
        category: 'Product Standard'
      },
      {
        code: 'IS 15885 (Part 2/Sec 13):2024',
        title: 'Lamp Controlgear — Part 2: Particular Requirements — Sec 13: d.c. or a.c. Supplied Electronic Controlgear for LED Modules',
        relevance: 'HIGH',
        currentVersion: 'IS 15885 (Part 2/Sec 13):2024',
        status: 'CURRENT',
        latestAmendment: 'Amendment 1 — 2025',
        category: 'Component / Controlgear'
      },
      {
        code: 'IS 16102 (Part 1 & 2):2023',
        title: 'Self-Ballasted LED Lamps for General Lighting Services — Safety and Performance Requirements',
        relevance: 'HIGH',
        currentVersion: 'IS 16102:2023',
        status: 'CURRENT',
        latestAmendment: 'Amendment 3 — 2025',
        category: 'Performance Standard'
      },
      {
        code: 'IS 16108:2021',
        title: 'Photobiological Safety of Lamps and Lamp Systems (RG-0 / RG-1 Blue Light Hazard Exemption)',
        relevance: 'MEDIUM',
        currentVersion: 'IS 16108:2021',
        status: 'CURRENT',
        latestAmendment: 'Reaffirmed 2026',
        category: 'Safety Standard'
      }
    ],
    outdatedStandards: [
      {
        tenderRef: 'IS 10322:2012',
        latest: 'IS 10322 (Part 5/Sec 3):2024 + Amendment 2 (2026)',
        reason: 'IS 10322:2012 was superseded by the revised 2024 edition aligning with IEC 60598-2-3:2020. Crucial thermal management and IK08 impact testing requirements were added.',
        changes: [
          'Upgraded Ingress Protection benchmark from IP65 to IP66 minimum for outdoor road fixtures.',
          'Mandatory 10kV / 5kA surge immunity test under Clause 9.4.',
          'Mandatory thermal endurance testing under Clause 12.1 at 45°C ambient.'
        ]
      },
      {
        tenderRef: 'IS 15885 (Part 2/Sec 13):2012',
        latest: 'IS 15885 (Part 2/Sec 13):2024 + Amendment 1 (2025)',
        reason: 'The 2012 version lacks total harmonic distortion (THD < 10%) compliance and over-voltage cut-off protection thresholds (up to 440V AC for 2 hours) required for Indian grid resilience.',
        changes: [
          'Introduced strict Power Factor (PF ≥ 0.95) and THD (< 10%) limits under Clause 7.3.',
          '440V AC high voltage withstand protection test added under Clause 11.2.'
        ]
      }
    ],
    missingRequirements: [
      {
        type: 'Testing requirement missing',
        detail: '10kV / 5kA In-built Surge Protection Device (SPD) immunity test is not mentioned.',
        standard: 'IS 10322 (Part 5/Sec 3):2024',
        clause: 'Clause 9.4 & IS 16107 (Part 2/Sec 1)'
      },
      {
        type: 'Applicable certification not mentioned',
        detail: 'Mandatory BIS Compulsory Registration Scheme (CRS) under MeitY CRO-III Order is missing from tender eligibility.',
        standard: 'BIS CRS Order (Gazette Notification S.O. 2357(E))',
        clause: 'Mandatory Registration Scheme (R-XXXXXXXX license mark)'
      },
      {
        type: 'Latest amendment not referenced',
        detail: 'Amendment 2 (2026) regarding Photobiological Safety (RG-0 / Exempt Group) not cited.',
        standard: 'IS 16108:2021 / IEC 62471',
        clause: 'Clause 4.3 (Blue Light Hazard Assessment)'
      },
      {
        type: 'Safety requirement missing',
        detail: 'IK08 Impact Resistance mechanical strength test is missing for outdoor roadway application.',
        standard: 'IS 10322 (Part 5/Sec 3):2024',
        clause: 'Clause 8.3 & IS/IEC 62262 (IK code test)'
      }
    ],
    relatedStandards: [
      { code: 'IS 16107 (Part 2/Sec 1):2024', title: 'Luminaires Performance — LED Luminaires', type: 'Performance Test Method', reason: 'Defines lumen maintenance (L70 > 50,000 hrs) and CCT tolerance.' },
      { code: 'IS 16108:2021', title: 'Photobiological Safety of Lamps and Lamp Systems', type: 'Safety Standard', reason: 'Ensures zero retinal blue-light damage for drivers and pedestrians.' },
      { code: 'IS/IEC 60529:2001', title: 'Degrees of Protection Provided by Enclosures (IP Code)', type: 'Test Method Standard', reason: 'Standardized test procedure for IP66 dust and water immersion test.' },
      { code: 'IS 15885 (Part 1):2024', title: 'Lamp Controlgear — General and Safety Requirements', type: 'Normative Reference', reason: 'Governs electrical insulation and short circuit safety of internal drivers.' },
      { code: 'IS/ISO 9001:2015', title: 'Quality Management Systems', type: 'Quality System', reason: 'Ensures factory quality audit and incoming raw material inspection.' }
    ],
    complianceCheck: [
      { label: 'Standard reference valid', status: 'warning', detail: 'Tender cites superseded 2012 editions of IS 10322 and IS 15885' },
      { label: 'Latest version referenced', status: 'fail', detail: 'Outdated by 12 years; must be upgraded to 2024 editions' },
      { label: 'Required test method included', status: 'warning', detail: 'Missing Surge (10kV), IK08 Impact, and Photobiological Safety tests' },
      { label: 'Certification requirement included', status: 'fail', detail: 'Mandatory BIS CRS registration not mandated' },
      { label: 'Safety requirements included', status: 'warning', detail: 'Photobiological eye safety RG-0 not included' },
      { label: 'Relevant technical specifications included', status: 'pass', detail: 'Wattage, CCT, Housing material, and Efficacy are covered' }
    ]
  },
  {
    id: 'tmt-rebars',
    name: 'CPWD Fe 500D TMT Steel Rebars Procurement',
    dept: 'Central Public Works Department (CPWD)',
    category: 'Civil Engineering (CED)',
    rawText: `TENDER REF: CPWD/NZ/2026/STEEL-104\nSUPPLY OF 1,200 METRIC TONNES OF HIGH STRENGTH TMT STEEL REBARS FOR RCC BRIDGE CONSTRUCTION\n\n1. SCOPE: Supply of Thermo-Mechanically Treated (TMT) steel bars Fe 500 grade in sizes 12mm, 16mm, 20mm, 25mm, 32mm.\n2. SPECIFICATIONS: Tensile strength minimum 545 N/mm², yield stress 500 N/mm².\n3. STANDARD: Bars shall conform to IS 1786:2008.\n4. BRAND: Primary producers only (SAIL, TATA, JSW).`,
    extracted: {
      title: 'Supply of 1,200 MT of High Strength TMT Steel Rebars for RCC Bridge Construction',
      product: 'Thermo-Mechanically Treated (TMT) Steel Reinforcement Bars',
      specs: [
        { label: 'Steel Grade', value: 'Fe 500 (Tender text) -> Recommended Fe 500D' },
        { label: 'Nominal Diameters', value: '12mm, 16mm, 20mm, 25mm, 32mm' },
        { label: 'Yield Stress (Re)', value: '≥ 500 N/mm²' },
        { label: 'Tensile Strength (Rm)', value: '≥ 565 N/mm² (for Fe 500D)' },
        { label: 'Elongation at Break', value: '≥ 16.0% (for seismic zone compliance)' },
        { label: 'Carbon Equivalent (CE)', value: '≤ 0.42% for enhanced weldability' }
      ],
      quantity: '1,200 Metric Tonnes (MT)',
      requiredStandards: ['IS 1786:2008'],
      referencedIS: ['IS 1786:2008'],
      testingRequirements: ['Mill Test Certificate from Primary Producer'],
      certificationRequirements: ['Primary Producer Certification'],
      safetyRequirements: ['Seismic ductility requirements'],
      complianceRequirements: ['Delivery in bundled lots of 50 MT with batch test tags'],
      importantClauses: [
        'Clause 2.1: Rebars shall be produced from 100% virgin steel iron ore route',
        'Clause 5.3: Delivery schedule within 60 days of purchase order'
      ]
    },
    identifiedStandards: [
      {
        code: 'IS 1786:2024',
        title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement — Specification',
        relevance: 'HIGH',
        currentVersion: 'IS 1786:2024 (5th Revision)',
        status: 'CURRENT',
        latestAmendment: 'Amendment 3 — 2025',
        category: 'Primary Standard'
      },
      {
        code: 'IS 13920:2016',
        title: 'Ductile Design and Detailing of Reinforced Concrete Structures Subjected to Seismic Forces',
        relevance: 'HIGH',
        currentVersion: 'IS 13920:2016',
        status: 'CURRENT',
        latestAmendment: 'Reaffirmed 2023',
        category: 'Design & Seismic Code'
      },
      {
        code: 'IS 1608 (Part 1):2022',
        title: 'Metallic Materials — Tensile Testing — Part 1: Method of Test at Room Temperature',
        relevance: 'MEDIUM',
        currentVersion: 'IS 1608:2022',
        status: 'CURRENT',
        latestAmendment: '2024 Edition',
        category: 'Test Method'
      }
    ],
    outdatedStandards: [
      {
        tenderRef: 'IS 1786:2008',
        latest: 'IS 1786:2024 + Amendment 3 (2025)',
        reason: 'IS 1786:2008 has been updated with mandatory Fe 500D / Fe 550D seismic requirements and uniform rib geometry testing to ensure concrete bond strength.',
        changes: [
          'Mandatory Fe 500D grade for bridge superstructures in Seismic Zone III, IV, and V.',
          'Mandatory total elongation at maximum force (Agt ≥ 5.0%) requirement under Clause 8.1.',
          'Mandatory BIS Scheme-I ISI Certification Mark under Steel QCO 2024.'
        ]
      }
    ],
    missingRequirements: [
      {
        type: 'Testing requirement missing',
        detail: 'Re-bend test after aging at 100°C for 30 minutes is missing from quality criteria.',
        standard: 'IS 1786:2024',
        clause: 'Clause 9.3 (Bend and Re-bend Test)'
      },
      {
        type: 'Applicable certification not mentioned',
        detail: 'Mandatory BIS Scheme-I ISI Mark Certification under Ministry of Steel QCO is not cited.',
        standard: 'Steel and Steel Products (Quality Control) Order',
        clause: 'Gazette S.O. 1225(E) — Mandatory ISI Mark'
      },
      {
        type: 'Safety requirement missing',
        detail: 'Ratio of Ultimate Tensile Strength to actual 0.2% Proof Stress (Rm/Re ≥ 1.25) missing for seismic ductility.',
        standard: 'IS 1786:2024 & IS 13920:2016',
        clause: 'Clause 8.1 Table 3'
      }
    ],
    relatedStandards: [
      { code: 'IS 1608 (Part 1):2022', title: 'Metallic Materials — Tensile Testing', type: 'Test Method', reason: 'Prescribed protocol for proof stress (0.2%) and elongation determination.' },
      { code: 'IS 1599:2019', title: 'Metallic Materials — Bend Test', type: 'Test Method', reason: 'Mandatory mandrel diameter specification for 180 degree cold bend.' },
      { code: 'IS 2500 (Part 1):2020', title: 'Sampling Inspection Procedures', type: 'Sampling Standard', reason: 'Governs lot sampling criteria for every 50 MT consignment.' }
    ],
    complianceCheck: [
      { label: 'Standard reference valid', status: 'warning', detail: 'Tender cites outdated IS 1786:2008' },
      { label: 'Latest version referenced', status: 'fail', detail: 'Must cite IS 1786:2024 (5th Revision)' },
      { label: 'Required test method included', status: 'warning', detail: 'Re-bend test and Rib area factor (fR) tests missing' },
      { label: 'Certification requirement included', status: 'fail', detail: 'Mandatory BIS Scheme-I ISI Mark not specified' },
      { label: 'Safety requirements included', status: 'fail', detail: 'Missing Rm/Re seismic ratio and Agt elongation requirements' },
      { label: 'Relevant technical specifications included', status: 'pass', detail: 'Diameters and nominal yield stress specified' }
    ]
  },
  {
    id: 'stainless-bottles',
    name: 'Indian Railways Institutional Stainless Steel Bottles Tender',
    dept: 'Ministry of Railways (IRCTC / Zonal Railways)',
    category: 'Mechanical Engineering & Consumer (MED)',
    rawText: `TENDER REF: IRCTC/CAT/2026/SSB-88\nPROCUREMENT OF 50,000 PIECES OF STAINLESS STEEL WATER BOTTLES (1000 ML)\n\n1. SCOPE: Supply of 1000 ml food grade stainless steel reusable water bottles with leak proof cap for train passengers.\n2. SPECIFICATIONS: Single wall stainless steel body, 1000 ml capacity, matte silver finish.\n3. STANDARDS: Must conform to standard commercial food grade SS 304.\n4. PACKING: Individual recyclable corrugated box.`,
    extracted: {
      title: 'Procurement of 50,000 Pieces of Stainless Steel Water Bottles (1000 ml)',
      product: 'Stainless Steel Water Bottles (Food Contact Reusable)',
      specs: [
        { label: 'Capacity', value: '1,000 ml (1.0 Litre)' },
        { label: 'Material Composition', value: 'AISI 304 / Grade X04Cr19Ni9 Stainless Steel' },
        { label: 'Wall Construction', value: 'Single-wall / Double-wall insulated option' },
        { label: 'Surface Finish', value: 'Electropolished interior, Matte brushed exterior' },
        { label: 'Cap / Gasket', value: 'BPA-free Food Grade Silicon Gasket' }
      ],
      quantity: '50,000 Pieces',
      requiredStandards: ['Generic SS 304 reference'],
      referencedIS: ['None cited'],
      testingRequirements: ['Supplier visual inspection'],
      certificationRequirements: ['Food grade self-declaration'],
      safetyRequirements: ['Non-toxic food contact'],
      complianceRequirements: ['Individual packaging in recyclable carton'],
      importantClauses: [
        'Clause 1.1: Product must be leak proof and suitable for travel use',
        'Clause 3.2: 100% defect free delivery at designated central railway depots'
      ]
    },
    identifiedStandards: [
      {
        code: 'IS 17526:2021',
        title: 'Stainless Steel Water Bottles — Specification',
        relevance: 'HIGH',
        currentVersion: 'IS 17526:2021',
        status: 'CURRENT',
        latestAmendment: 'Amendment 2 — 2024',
        category: 'Product Standard'
      },
      {
        code: 'IS 6911:2017',
        title: 'Stainless Steel Plate, Sheet and Strip — Specification',
        relevance: 'HIGH',
        currentVersion: 'IS 6911:2017',
        status: 'CURRENT',
        latestAmendment: 'Reaffirmed 2023',
        category: 'Raw Material Standard'
      },
      {
        code: 'IS 9845:1998',
        title: 'Determination of Overall Migration of Constituents of Plastics Materials and Articles Intended for Food Contact',
        relevance: 'HIGH',
        currentVersion: 'IS 9845:1998',
        status: 'CURRENT',
        latestAmendment: 'Reaffirmed 2024',
        category: 'Safety Migration Test'
      }
    ],
    outdatedStandards: [],
    missingRequirements: [
      {
        type: 'Required standard missing',
        detail: 'Tender mentions generic "SS 304" but omits the dedicated Indian Standard IS 17526:2021.',
        standard: 'IS 17526:2021',
        clause: 'Entire Specification'
      },
      {
        type: 'Applicable certification not mentioned',
        detail: 'Mandatory BIS ISI Certification Mark under DPIIT Quality Control Order (QCO) 2023 is not mandated.',
        standard: 'DPIIT QCO for Stainless Steel Water Bottles',
        clause: 'Mandatory BIS Scheme-I ISI Mark (CM/L license)'
      },
      {
        type: 'Testing requirement missing',
        detail: 'Drop test from 1.2m height and 24-hour leak tightness test missing.',
        standard: 'IS 17526:2021',
        clause: 'Clause 6.1 (Leakage Test) & Clause 6.3 (Impact Drop Test)'
      },
      {
        type: 'Safety requirement missing',
        detail: 'Overall chemical migration testing for heavy metals (Lead, Cadmium, Chromium) as per IS 9845.',
        standard: 'IS 9845:1998 / FSSAI Regulations',
        clause: 'Clause 5.4 (Toxicological Safety)'
      }
    ],
    relatedStandards: [
      { code: 'IS 6911:2017', title: 'Stainless Steel Plate, Sheet and Strip', type: 'Raw Material', reason: 'Ensures virgin food contact austenitic grade X04Cr19Ni9.' },
      { code: 'IS 9845:1998', title: 'Determination of Overall Migration in Food Simulants', type: 'Test Method', reason: 'Mandatory for food contact cap gaskets and inner liners.' }
    ],
    complianceCheck: [
      { label: 'Standard reference valid', status: 'fail', detail: 'Zero formal Indian Standards referenced' },
      { label: 'Latest version referenced', status: 'fail', detail: 'Missing IS 17526:2021' },
      { label: 'Required test method included', status: 'fail', detail: 'Missing Drop, Leak, Corrosion resistance tests' },
      { label: 'Certification requirement included', status: 'fail', detail: 'Missing Mandatory DPIIT QCO ISI Mark' },
      { label: 'Safety requirements included', status: 'warning', detail: 'No toxicological migration limits set' },
      { label: 'Relevant technical specifications included', status: 'pass', detail: 'Volume and material class specified' }
    ]
  }
];

export const ProcurementPage = ({
  inputText: initialInputText,
  setInputText: setParentInputText,
  selectedCategory,
  onNavigateTab,
  currentLang = 'en',
  t
}) => {
  // TWO CORE TABS AS REQUESTED: 1. 'analyzer' | 2. 'generator'
  const [activeMainTab, setActiveMainTab] = useState('analyzer');

  // Analyzer States
  const [rawTenderInput, setRawTenderInput] = useState(sampleTenderLibrary[0].rawText);
  const [selectedSampleId, setSelectedSampleId] = useState('led-street-light');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(true);
  const [activeAnalysisData, setActiveAnalysisData] = useState(sampleTenderLibrary[0]);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [viewingVersionDiff, setViewingVersionDiff] = useState(null);

  const fileInputRef = useRef(null);

  // Generator States
  const [generatorSource, setGeneratorSource] = useState('analyzed'); // 'analyzed' | 'description' | 'specs'
  const [customTitle, setCustomTitle] = useState('');
  const [customAgency, setCustomAgency] = useState('Central Public Works Department (CPWD), Govt of India');
  const [customQuantity, setCustomQuantity] = useState('2,500 Units');
  const [customWarranty, setCustomWarranty] = useState('5 Years Comprehensive Onsite Replacement Warranty');
  const [customDeliveryDays, setCustomDeliveryDays] = useState('60 Days from Issue of Supply Order');
  const [selectedStandardsList, setSelectedStandardsList] = useState([]);
  const [selectedTestsList, setSelectedTestsList] = useState([]);
  const [includeQcoClause, setIncludeQcoClause] = useState(true);
  const [includeNablClause, setIncludeNablClause] = useState(true);
  const [includeGeMClause, setIncludeGeMClause] = useState(true);
  const [generatorActiveDocTab, setGeneratorActiveDocTab] = useState('full-spec'); // 'full-spec' | 'tech-spec' | 'checklist'
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Synchronize generator default selections whenever active analysis data changes
  useEffect(() => {
    if (activeAnalysisData) {
      setCustomTitle(activeAnalysisData.extracted?.title || 'Upgraded Standards-Compliant Tender Specification');
      setCustomQuantity(activeAnalysisData.extracted?.quantity || '1,000 Units');
      setSelectedStandardsList(activeAnalysisData.identifiedStandards?.map(s => s.code) || []);
      setSelectedTestsList(
        activeAnalysisData.missingRequirements?.map(m => `${m.type}: ${m.detail}`) || []
      );
    }
  }, [activeAnalysisData]);

  // Handle Analysis Run
  const handleRunAnalysis = (textToProcess = rawTenderInput) => {
    if (!textToProcess.trim()) return;
    setIsAnalyzing(true);
    setAnalysisDone(false);

    setTimeout(() => {
      // Find matching sample or synthetically generate full breakdown
      const matched = sampleTenderLibrary.find(s => s.id === selectedSampleId) || sampleTenderLibrary[0];
      setActiveAnalysisData({
        ...matched,
        rawText: textToProcess,
        extracted: {
          ...matched.extracted,
          title: textToProcess.includes('LED') ? 'Procurement of 120W Outdoor LED Street Light Luminaires' :
                 textToProcess.includes('TMT') || textToProcess.includes('Steel') ? 'Supply of 1,200 MT High Strength TMT Steel Rebars' :
                 textToProcess.includes('Bottle') ? 'Procurement of 50,000 Pieces of Stainless Steel Bottles (1000 ml)' :
                 'Technical Procurement Specification Analysis'
        }
      });
      setIsAnalyzing(false);
      setAnalysisDone(true);
    }, 600);
  };

  // Handle Sample Select
  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setRawTenderInput(sample.rawText);
    setUploadedFileName(null);
    handleRunAnalysis(sample.rawText);
  };

  // Handle File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setOcrScanning(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      setTimeout(() => {
        setOcrScanning(false);
        const text = (event.target?.result && typeof event.target.result === 'string') 
          ? event.target.result.slice(0, 4000) 
          : sampleTenderLibrary[0].rawText;
        setRawTenderInput(text);
        handleRunAnalysis(text);
      }, 750);
    };

    if (file.type.includes('text')) {
      reader.readAsText(file);
    } else {
      // Simulate PDF / Word document OCR
      setTimeout(() => {
        setOcrScanning(false);
        setRawTenderInput(sampleTenderLibrary[0].rawText);
        handleRunAnalysis(sampleTenderLibrary[0].rawText);
      }, 900);
    }
  };

  // Transition from Analyzer -> Generator
  const handleFixAndUpdateTender = () => {
    setActiveMainTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle standards in generator
  const handleToggleStandard = (code) => {
    setSelectedStandardsList(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  // Toggle testing in generator
  const handleToggleTest = (testStr) => {
    setSelectedTestsList(prev => 
      prev.includes(testStr) ? prev.filter(t => t !== testStr) : [...prev, testStr]
    );
  };

  // Copy helper
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  // Download DOCX / Text format
  const handleDownloadDoc = (filename, content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'application/msword;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Print / PDF format
  const handlePrintPdf = () => {
    window.print();
  };

  // Official PDF Generator Handlers
  const handleOpenPdfPreview = () => {
    setPdfGenerating(true);
    setTimeout(() => {
      try {
        const url = generateTenderSpecificationPDFDataUrl({
          fileNo: `PROC/${new Date().getFullYear()}/${activeAnalysisData.id.toUpperCase()}`,
          dateGenerated: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          docTitle: "TECHNICAL SPECIFICATION FOR TENDER",
          tenderSubject: customTitle || activeAnalysisData.extracted?.title || "Procurement Technical Specification",
          issuingAuthority: customAgency || "Central Public Works Department (CPWD)",
          departmentName: "SAMPLE PROCUREMENT DEPARTMENT",
          officeName: "Office of the Procurement & Tendering Authority",
          tenderRef: `GEM/${new Date().getFullYear()}/B/` + Math.floor(1000000 + Math.random() * 9000000),
          bidMode: "Online (GeM Portal)",
          bidValidity: "120 Days",
          emdAmount: "As per GeM Portal Schedule",
          scopeOfSupply: `Supply, installation, testing and commissioning of ${customQuantity} conforming to Bureau of Indian Standards specifications with ${customWarranty} and delivery within ${customDeliveryDays}.`,
          technicalRequirements: activeAnalysisData.extracted?.specs?.map(s => ({
            parameter: s.label,
            requirement: s.value
          })) || [
            { parameter: "Product Category", requirement: activeAnalysisData.extracted?.product || "Standard Supply Item" },
            { parameter: "Quantity", requirement: customQuantity },
            { parameter: "Warranty", requirement: customWarranty }
          ],
          primaryStandardsSummary: `Primary Standard(s): ${selectedStandardsList.join(', ')} (Latest Edition with gazetted amendments).`,
          standardsTable: activeAnalysisData.identifiedStandards?.filter(s => selectedStandardsList.includes(s.code)).map(s => ({
            isNumber: s.code,
            title: s.title,
            relevance: s.category || "Primary Indian Standard"
          })) || [],
          alliedStandards: activeAnalysisData.relatedStandards?.map(r => ({
            category: r.type || "Test Method",
            details: `${r.code} — ${r.title}`
          })) || [
            { category: "Test Methods", details: "IS/IEC Standards for safety and endurance testing at NABL accredited laboratories." }
          ],
          certifications: [
            { name: "BIS Product Certification (ISI Mark / CRS)", applicability: "Mandatory under Central Government QCO", status: "Required" },
            { name: "NABL Accredited Test Certificate (ISO/IEC 17025)", applicability: "Mandatory pre-dispatch inspection", status: "Required" }
          ],
          warrantyText: `The bidder shall provide a comprehensive on-site warranty of ${customWarranty} from the date of installation, covering all manufacturing defects and performance degradation. Annual Maintenance Contract (AMC) terms shall be as per standard bidding terms.`,
          evaluationCriteriaText: "Bids shall be evaluated on the L1 (Lowest Cost) basis among technically qualified bidders who meet all mandatory technical specifications, BIS Indian Standards, and QCO certification requirements. Non-compliance with any cited Indian Standard shall result in technical rejection under GFR 2017 Rule 144(i).",
          signatoryAuthority: "Superintending Engineer (Procurement)",
          signatoryOrg: customAgency || "Central Public Works Department"
        });
        setPdfDataUrl(url);
        setPdfPreviewOpen(true);
      } catch (err) {
        console.error('Failed to generate PDF preview:', err);
      } finally {
        setPdfGenerating(false);
      }
    }, 150);
  };

  const handleDownloadOfficialPdf = () => {
    generateTenderSpecificationPDF({
      fileNo: `PROC/${new Date().getFullYear()}/${activeAnalysisData.id.toUpperCase()}`,
      dateGenerated: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      docTitle: "TECHNICAL SPECIFICATION FOR TENDER",
      tenderSubject: customTitle || activeAnalysisData.extracted?.title || "Procurement Technical Specification",
      issuingAuthority: customAgency || "Central Public Works Department (CPWD)",
      departmentName: "SAMPLE PROCUREMENT DEPARTMENT",
      officeName: "Office of the Procurement & Tendering Authority",
      tenderRef: `GEM/${new Date().getFullYear()}/B/` + Math.floor(1000000 + Math.random() * 9000000),
      bidMode: "Online (GeM Portal)",
      bidValidity: "120 Days",
      emdAmount: "As per GeM Portal Schedule",
      scopeOfSupply: `Supply, installation, testing and commissioning of ${customQuantity} conforming to Bureau of Indian Standards specifications with ${customWarranty} and delivery within ${customDeliveryDays}.`,
      technicalRequirements: activeAnalysisData.extracted?.specs?.map(s => ({
        parameter: s.label,
        requirement: s.value
      })) || [
        { parameter: "Product Category", requirement: activeAnalysisData.extracted?.product || "Standard Supply Item" },
        { parameter: "Quantity", requirement: customQuantity },
        { parameter: "Warranty", requirement: customWarranty }
      ],
      primaryStandardsSummary: `Primary Standard(s): ${selectedStandardsList.join(', ')} (Latest Edition with gazetted amendments).`,
      standardsTable: activeAnalysisData.identifiedStandards?.filter(s => selectedStandardsList.includes(s.code)).map(s => ({
        isNumber: s.code,
        title: s.title,
        relevance: s.category || "Primary Indian Standard"
      })) || [],
      alliedStandards: activeAnalysisData.relatedStandards?.map(r => ({
        category: r.type || "Test Method",
        details: `${r.code} — ${r.title}`
      })) || [],
      certifications: [
        { name: "BIS Product Certification (ISI Mark / CRS)", applicability: "Mandatory under Central Government QCO", status: "Required" },
        { name: "NABL Accredited Test Certificate (ISO/IEC 17025)", applicability: "Mandatory pre-dispatch inspection", status: "Required" }
      ],
      warrantyText: `The bidder shall provide a comprehensive on-site warranty of ${customWarranty} from the date of installation, covering all manufacturing defects and performance degradation. Annual Maintenance Contract (AMC) terms shall be as per standard bidding terms.`,
      evaluationCriteriaText: "Bids shall be evaluated on the L1 (Lowest Cost) basis among technically qualified bidders who meet all mandatory technical specifications, BIS Indian Standards, and QCO certification requirements. Non-compliance with any cited Indian Standard shall result in technical rejection under GFR 2017 Rule 144(i).",
      signatoryAuthority: "Superintending Engineer (Procurement)",
      signatoryOrg: customAgency || "Central Public Works Department"
    });
  };

  // 12-Section Structured Tender Document Generation String
  const generateFullTenderDoc = () => {
    const ext = activeAnalysisData.extracted;
    const isLed = activeAnalysisData.id === 'led-street-light';
    const isTmt = activeAnalysisData.id === 'tmt-rebars';
    const isBottle = activeAnalysisData.id === 'stainless-bottles';

    return `GOVERNMENT OF INDIA / STATE PROCUREMENT AUTHORITY
TECHNICAL SPECIFICATION & STANDARDS COMPLIANT TENDER DOCUMENT
================================================================================
Tender Document Reference : TND/${new Date().getFullYear()}/${activeAnalysisData.id.toUpperCase()}-REV01
Procuring Authority       : ${customAgency}
Date of Release           : ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
Target Portal             : Government e-Marketplace (GeM) & CPPP e-Procurement
================================================================================

1. SCOPE OF PROCUREMENT:
--------------------------------------------------------------------------------
1.1 This specification covers the technical, quality, testing, inspection, and certification requirements for the supply of:
    "${customTitle}".
1.2 Total Estimated Quantity: ${customQuantity}.
1.3 Delivery Period: ${customDeliveryDays}.
1.4 The scope encompasses manufacturing, pre-dispatch factory testing at NABL accredited labs, safe transit insurance, supply, unloading, and ${customWarranty}.

2. PRODUCT DESCRIPTION:
--------------------------------------------------------------------------------
2.1 Product Category: ${ext?.product || 'Industrial / Institutional Supply Goods'}.
2.2 The product shall be designed, engineered, and manufactured using state-of-the-art technology and 100% virgin raw materials conforming to latest Indian Standards.
2.3 The finished product must withstand Indian tropical climatic conditions (ambient temperature up to 50°C, relative humidity up to 95%).

3. TECHNICAL SPECIFICATIONS:
--------------------------------------------------------------------------------
${ext?.specs?.map((s, idx) => `3.${idx + 1} ${s.label.padEnd(35, ' ')}: ${s.value}`).join('\n')}
3.${(ext?.specs?.length || 0) + 1} Finish and Workmanship: Free from burrs, cracks, porosity, visual discoloration, or sharp mechanical edges.

4. APPLICABLE INDIAN STANDARDS (LATEST VERSIONS):
--------------------------------------------------------------------------------
The supplied goods and all integral components shall strictly comply with the latest editions of the following Bureau of Indian Standards (BIS) specifications, including all gazetted amendments as of the date of bid submission:
${selectedStandardsList.map((code, idx) => {
  const std = activeAnalysisData.identifiedStandards?.find(s => s.code === code);
  return `4.${idx + 1} [${code}] — ${std?.title || 'Relevant Indian Standard Specification'}`;
}).join('\n')}

5. LATEST STANDARD VERSIONS & GAZETTE AMENDMENT COMPLIANCE:
--------------------------------------------------------------------------------
5.1 Standard Grounding: Bidders are hereby notified that all references to superseded standard versions (e.g. ${activeAnalysisData.outdatedStandards?.map(o => o.tenderRef).join(', ') || 'superseded editions'}) stand revoked. Bids offering compliance only to older editions shall be rejected as non-responsive.
5.2 Latest Amendments Cited:
${activeAnalysisData.identifiedStandards?.map(s => `    - ${s.code}: Must comply with ${s.latestAmendment}`).join('\n')}

6. MANDATORY TESTING REQUIREMENTS & TEST METHODS:
--------------------------------------------------------------------------------
The bidder/manufacturer shall submit Type Test Reports from a BIS-recognized / NABL-accredited Laboratory (ISO/IEC 17025) covering the following mandatory test clauses:
${isLed ? `6.1 Ingress Protection Test (IP66): As per Clause 8.2 of IS 10322 (Part 5/Sec 3):2024 & IS/IEC 60529.
6.2 High Voltage Surge Immunity Test (10kV / 5kA): As per Clause 9.4 of IS 10322:2024 & IS 16107 (Part 2/Sec 1).
6.3 Thermal Endurance & Temperature Rise Test: Clause 12.1 of IS 10322 at 45°C ambient.
6.4 Driver Power Factor & Total Harmonic Distortion (THD < 10%): Clause 7.3 of IS 15885 (Part 2/Sec 13):2024.
6.5 High Voltage Overload Protection (440V AC for 2 Hours): Clause 11.2 of IS 15885:2024.` :
isTmt ? `6.1 0.2% Proof Stress / Yield Stress & Ultimate Tensile Strength: Clause 8.1 of IS 1786:2024 as per IS 1608 (Part 1).
6.2 Total Elongation at Maximum Force (Agt ≥ 5.0%): Clause 8.1 Table 3 for seismic ductility.
6.3 Cold Bend & Re-Bend Test after accelerated aging: Clause 9.3 of IS 1786:2024 & IS 1599.
6.4 Nominal Mass & Rib Area Factor (fR ≥ 0.075): Clause 6.1 & Clause 5.3 of IS 1786:2024.` :
`6.1 Overall Migration Test in Food Simulants: As per IS 9845:1998 for toxicological safety.
6.2 Drop Impact Resistance Test (1.2m Height): Clause 6.3 of IS 17526:2021.
6.3 Vacuum Insulation Thermal Retention Test: Clause 6.4 of IS 17526:2021.
6.4 Leak-tightness Test (24 Hours hydrostatic hold): Clause 6.1 of IS 17526:2021.`}

7. CERTIFICATION REQUIREMENTS & STATUTORY QCO COMPLIANCE:
--------------------------------------------------------------------------------
${includeQcoClause ? `7.1 Quality Control Order (QCO) Compliance: The item is notified under the mandatory Quality Control Order issued by the Government of India. The manufacturer MUST hold a valid BIS License (ISI Mark / CRS Registration) on the date of bid opening.
7.2 Valid License Proof: Copy of valid BIS CML/R-number license with current endorsement schedules must be submitted with the technical bid.
7.3 Marking on Product: Every unit delivered must bear the embossed/laser-engraved BIS Standard Mark along with the CML/R-number and manufacturer identification.` : '7.1 Standard manufacturer certification required.'}

8. SAFETY & ENVIRONMENTAL REQUIREMENTS:
--------------------------------------------------------------------------------
8.1 Photobiological / Mechanical Safety: ${isLed ? 'The luminaire shall be certified under Risk Group RG-0 (Exempt Group) as per IS 16108:2021 / IEC 62471 to eliminate blue light hazard.' : 'The product shall be free from sharp edges, toxic coatings, or hazardous chemical migration.'}
8.2 Fire Retardance & Ingress Safety: Materials used shall pass glow wire test at 650°C / 850°C and flame retardance standards.
8.3 Environmental: 100% RoHS compliance (Restriction of Hazardous Substances: Lead, Mercury, Cadmium, Hexavalent Chromium).

9. QUALITY ASSURANCE REQUIREMENTS:
--------------------------------------------------------------------------------
9.1 The manufacturer shall operate a Quality Management System certified to ISO 9001:2015.
9.2 Traceability: Each product batch shall possess unique QR code / serial number linking to raw material mill certificates.

10. INSPECTION & ACCEPTANCE CRITERIA:
--------------------------------------------------------------------------------
10.1 Pre-Dispatch Inspection (PDI): The buyer reserves the right to depute its authorized inspector / third-party agency (RITES, CPWD, BIS) for factory inspection.
10.2 Sampling Plan: Random sampling shall be carried out in accordance with IS 2500 (Part 1):2020 / ISO 2859-1 at Inspection Level II, AQL 1.0.
10.3 Rejection Threshold: If more than 1% of the sampled lot fails any dimensional, electrical, or mechanical test, the entire lot shall be rejected at supplier cost.

11. DOCUMENTATION REQUIREMENTS:
--------------------------------------------------------------------------------
The successful bidder must supply the following documentation with the consignment:
11.1 Complete Type Test Reports from NABL Accredited Laboratory (not older than 18 months).
11.2 Routine & Acceptance Factory Test Certificates for each manufactured batch.
11.3 Copy of valid BIS License with schedule showing relevant product grade/size.
11.4 Manufacturer Warranty Certificate and Installation & Maintenance Manual in English & Hindi.

12. STATUTORY & GeM COMPLIANCE REQUIREMENTS:
--------------------------------------------------------------------------------
12.1 Make in India (MII) Preference: Class-I Local Supplier (Local content ≥ 50%) as per DPIIT Public Procurement Order.
12.2 Bidder must submit a formal declaration affirming full compliance with all clauses of this updated tender specification without any deviation.
================================================================================
END OF TECHNICAL SPECIFICATION DOCUMENT
================================================================================`;
  };

  const fullDocText = generateFullTenderDoc();

  return (
    <div className="space-y-6 pb-20">

      {/* 1. Module Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/70 via-indigo-50/30 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
              <span className="px-2.5 py-0.5 bg-blue-100/80 text-[#2563EB] rounded-md font-mono">Module 7</span>
              <span className="text-slate-300">•</span>
              <span>Government Procurement & Indian Standards Alignment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight mt-1 flex items-center space-x-2.5">
              <span>Procurement Hub</span>
              <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold rounded-full">
                Tender AI Core
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Analyze existing tender documents for Indian Standards compliance, detect outdated IS codes and missing testing clauses, and generate fully structured, standards-grounded tender specifications.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-right shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Workflow Mode</span>
              <span className="text-xs font-bold text-[#0A2540]">
                {activeMainTab === 'analyzer' ? '1. Tender Analyzer' : '2. Tender Spec Generator'}
              </span>
            </div>
          </div>
        </div>

        {/* Top 2-Feature Tab Switcher */}
        <div className="flex border-b border-slate-200 mt-6 -mb-6 -mx-6 px-6 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setActiveMainTab('analyzer')}
            className={`flex items-center space-x-2 px-6 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeMainTab === 'analyzer'
                ? 'border-[#2563EB] text-[#2563EB] bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>1. Tender Analyzer</span>
            <span className="ml-1 px-2 py-0.2 bg-blue-100 text-[#2563EB] text-[10px] font-bold rounded-full">
              Audit & Verify
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('generator')}
            className={`flex items-center space-x-2 px-6 py-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeMainTab === 'generator'
                ? 'border-[#2563EB] text-[#2563EB] bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSignature className="h-4 w-4" />
            <span>2. Tender Document Generator</span>
            <span className="ml-1 px-2 py-0.2 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
              12 Sections
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE 1: TENDER ANALYZER */}
      {/* ========================================================================= */}
      {activeMainTab === 'analyzer' && (
        <div className="space-y-6">

          {/* 1.1 Tender Input Workspace (Upload / Text / Sample) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-[#0A2540] flex items-center space-x-2">
                  <span>Upload or Paste Existing Tender Document</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Supports PDF, DOC/DOCX files, raw GeM specification text, or natural product descriptions.
                </p>
              </div>

              {/* Sample Tenders Dropdown / Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500">Quick Test Tenders:</span>
                <select
                  value={selectedSampleId}
                  onChange={(e) => {
                    const s = sampleTenderLibrary.find(x => x.id === e.target.value);
                    if (s) handleSelectSample(s);
                  }}
                  className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {sampleTenderLibrary.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Floating Capsule Input Bar */}
            <div className="max-w-4xl mx-auto space-y-3">
              <div className="relative flex items-center w-full bg-white border border-[#93C5FD] hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 rounded-full shadow-xs transition-all px-3 sm:px-4 py-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                />

                {/* Paperclip Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload PDF / DOCX Tender Document"
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  <Paperclip className="h-5 w-5 transform -rotate-45" />
                </button>

                {/* Input Text / Search */}
                <input
                  type="text"
                  value={rawTenderInput.replace(/\n/g, ' ').slice(0, 140)}
                  onChange={(e) => setRawTenderInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleRunAnalysis(rawTenderInput);
                    }
                  }}
                  placeholder="Ask a question or upload a tender document (PDF/DOCX)..."
                  className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 px-2 sm:px-3 py-1 font-normal"
                />

                {/* Run Analysis Button */}
                <button
                  type="button"
                  onClick={() => handleRunAnalysis(rawTenderInput)}
                  disabled={isAnalyzing || !rawTenderInput.trim()}
                  title="Analyze Tender Specifications"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2563EB] hover:bg-blue-700 disabled:opacity-40 text-white shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUp className="h-5 w-5 stroke-[2.5]" />
                  )}
                </button>
              </div>

              {/* OCR Scanning / Upload Notification */}
              {ocrScanning && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center space-x-3 text-xs text-[#2563EB] animate-pulse">
                  <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                  <span>
                    Extracting technical clauses, referenced standards, and OCR scanning text from <strong>{uploadedFileName}</strong>...
                  </span>
                </div>
              )}

              {uploadedFileName && !ocrScanning && (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <div className="flex items-center space-x-2 text-emerald-900 truncate">
                    <FileCheck2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="truncate">Uploaded File: <strong>{uploadedFileName}</strong> — Ready for Standards Verification</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFileName(null);
                      setRawTenderInput(sampleTenderLibrary[0].rawText);
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-rose-600 ml-3 shrink-0 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Editable Raw Tender Expandable View */}
              <div className="pt-2">
                <details className="group">
                  <summary className="text-xs font-semibold text-slate-500 hover:text-blue-600 cursor-pointer list-none flex items-center space-x-1.5 select-none">
                    <ChevronRight className="h-3.5 w-3.5 group-open:rotate-90 transition-transform" />
                    <span>View / Edit Full Raw Tender Text ({rawTenderInput.length} characters)</span>
                  </summary>
                  <div className="mt-2">
                    <textarea
                      rows={5}
                      value={rawTenderInput}
                      onChange={(e) => setRawTenderInput(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* 1.2 EXTRACTED & ORGANIZED METADATA CARD */}
          {analysisDone && activeAnalysisData && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 text-[#2563EB] rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#0A2540]">
                      Extracted Tender Structure & Technical Parameters
                    </h2>
                    <p className="text-xs text-slate-500">
                      Automated decomposition of scope, technical parameters, and explicit requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                    {activeAnalysisData.category}
                  </span>
                </div>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Tender Title</span>
                  <p className="text-xs sm:text-sm font-bold text-[#0A2540] leading-snug">
                    {activeAnalysisData.extracted.title}
                  </p>
                </div>

                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Product / Service</span>
                  <p className="text-xs sm:text-sm font-bold text-[#2563EB] leading-snug">
                    {activeAnalysisData.extracted.product}
                  </p>
                </div>

                <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Scope Quantity</span>
                  <p className="text-xs sm:text-sm font-bold text-emerald-700 leading-snug">
                    {activeAnalysisData.extracted.quantity}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5 flex items-center space-x-1.5">
                  <Sliders className="h-3.5 w-3.5 text-blue-600" />
                  <span>Extracted Technical Specifications:</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {activeAnalysisData.extracted.specs.map((spec, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200/90 rounded-xl flex items-center justify-between text-xs shadow-2xs">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="font-bold text-slate-900 text-right ml-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements 4-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-blue-800 block">Testing Requirements</span>
                  <ul className="text-xs text-slate-700 space-y-1 font-medium">
                    {activeAnalysisData.extracted.testingRequirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-blue-500">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-indigo-800 block">Certification Requirements</span>
                  <ul className="text-xs text-slate-700 space-y-1 font-medium">
                    {activeAnalysisData.extracted.certificationRequirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-indigo-500">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Safety Requirements</span>
                  <ul className="text-xs text-slate-700 space-y-1 font-medium">
                    {activeAnalysisData.extracted.safetyRequirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-500">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-100/70 border border-slate-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-700 block">Compliance Clauses</span>
                  <ul className="text-xs text-slate-700 space-y-1 font-medium">
                    {activeAnalysisData.extracted.complianceRequirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-slate-500">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 1.3 STANDARD IDENTIFICATION & OUTDATED STANDARD DETECTION */}
          {analysisDone && activeAnalysisData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Standard Identification (Semantic) */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-blue-50 text-[#2563EB] rounded-lg">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#0A2540]">
                        Standard Identification
                      </h2>
                      <p className="text-xs text-slate-500">
                        Semantic identification of applicable Indian Standards.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-100 text-[#2563EB] rounded-full">
                    {activeAnalysisData.identifiedStandards.length} Standards
                  </span>
                </div>

                <div className="space-y-3">
                  {activeAnalysisData.identifiedStandards.map((std, idx) => (
                    <div key={idx} className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs sm:text-sm font-bold text-[#2563EB]">
                              {std.code}
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                              {std.status}
                            </span>
                          </div>
                          <h4 className="text-xs font-semibold text-[#0A2540] mt-1 leading-snug">
                            {std.title}
                          </h4>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Relevance</span>
                          <span className={`text-xs font-black ${
                            std.relevance === 'HIGH' ? 'text-[#2563EB]' : 'text-slate-700'
                          }`}>
                            {std.relevance}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-200/60 font-medium">
                        <div>
                          <span className="text-slate-400">Current Version: </span>
                          <span className="font-semibold text-slate-800">{std.currentVersion}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Latest Amendment: </span>
                          <span className="font-semibold text-blue-700">{std.latestAmendment}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outdated Standard Detection */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#0A2540]">
                        Outdated Standard Detection
                      </h2>
                      <p className="text-xs text-slate-500">
                        Superseded standard versions detected in the tender text.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                    {activeAnalysisData.outdatedStandards.length} Outdated
                  </span>
                </div>

                {activeAnalysisData.outdatedStandards.length === 0 ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-900">All Standards are Up-To-Date</h4>
                    <p className="text-xs text-emerald-700">
                      No superseded Indian Standards were found in the uploaded document.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {activeAnalysisData.outdatedStandards.map((outdated, idx) => (
                      <div key={idx} className="p-4 bg-amber-50/60 border border-amber-200/90 rounded-xl space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-amber-200/80 text-amber-900 font-bold text-[10px] rounded uppercase tracking-wide flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            OUTDATED STANDARD
                          </span>

                          <button
                            type="button"
                            onClick={() => setViewingVersionDiff(viewingVersionDiff === idx ? null : idx)}
                            className="text-xs font-bold text-[#2563EB] hover:text-blue-800 underline cursor-pointer"
                          >
                            {viewingVersionDiff === idx ? 'Hide Version Changes' : 'View Version Changes'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-white/90 border border-rose-200 rounded-lg">
                            <span className="text-[10px] font-bold text-rose-600 uppercase block">Tender Refers To:</span>
                            <span className="font-bold text-rose-900 line-through">{outdated.tenderRef}</span>
                          </div>

                          <div className="p-2.5 bg-white/90 border border-emerald-200 rounded-lg">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase block">Latest Standard:</span>
                            <span className="font-bold text-emerald-900">{outdated.latest}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {outdated.reason}
                        </p>

                        {/* Expandable Version Changes */}
                        {viewingVersionDiff === idx && (
                          <div className="mt-2 p-3 bg-white border border-amber-200 rounded-lg space-y-1.5 text-xs text-slate-800">
                            <span className="text-[11px] font-bold text-[#0A2540] uppercase block">
                              Key Differences & Upgraded Requirements:
                            </span>
                            <ul className="space-y-1">
                              {outdated.changes.map((ch, i) => (
                                <li key={i} className="flex items-start gap-1.5 text-slate-700">
                                  <span className="text-amber-600 font-bold">⚡</span>
                                  <span>{ch}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 1.4 MISSING REQUIREMENTS DETECTION & RELATED STANDARDS */}
          {analysisDone && activeAnalysisData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Missing Requirements Warnings */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#0A2540]">
                        Missing Requirements Analysis
                      </h2>
                      <p className="text-xs text-slate-500">
                        Essential compliance, testing, and safety gaps identified.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-full">
                    {activeAnalysisData.missingRequirements.length} Gaps
                  </span>
                </div>

                <div className="space-y-3">
                  {activeAnalysisData.missingRequirements.map((missing, idx) => (
                    <div key={idx} className="p-3.5 bg-rose-50/40 border border-rose-200/80 rounded-xl space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-800 flex items-center gap-1.5">
                          <span className="text-rose-600">⚠</span>
                          {missing.type}
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 border border-rose-200 rounded text-slate-700">
                          {missing.clause}
                        </span>
                      </div>
                      <p className="text-slate-800 font-medium leading-snug">
                        {missing.detail}
                      </p>
                      <div className="text-[11px] text-slate-500 pt-0.5">
                        <span>Standard Reference: </span>
                        <strong className="text-[#2563EB]">{missing.standard}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Standards Breakdown */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#0A2540]">
                        Related Standards Breakdown
                      </h2>
                      <p className="text-xs text-slate-500">
                        Normative test methods, safety, and installation references.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                    {activeAnalysisData.relatedStandards.length} Related
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {activeAnalysisData.relatedStandards.map((rel, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#2563EB]">{rel.code}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200/80 text-slate-700 rounded-full">
                          {rel.type}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 leading-tight">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        <strong>Why Relevant: </strong>{rel.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 1.5 TENDER COMPLIANCE CHECKLIST & TENDER ANALYSIS SUMMARY */}
          {analysisDone && activeAnalysisData && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">

              {/* Compliance Checklist */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#0A2540]">
                        Tender Compliance Checklist
                      </h2>
                      <p className="text-xs text-slate-500">
                        Pre-award technical compliance verification against Indian Standards criteria.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeAnalysisData.complianceCheck.map((chk, idx) => {
                    const isPass = chk.status === 'pass';
                    const isWarn = chk.status === 'warning';
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                          isPass ? 'bg-emerald-50/40 border-emerald-200' :
                          isWarn ? 'bg-amber-50/40 border-amber-200' :
                          'bg-rose-50/40 border-rose-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {isPass ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : isWarn ? (
                            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                          ) : (
                            <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                          )}
                          <span className={`font-bold ${
                            isPass ? 'text-emerald-900' : isWarn ? 'text-amber-900' : 'text-rose-900'
                          }`}>
                            {chk.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug pl-6">
                          {chk.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 1.6 Tender Analysis Summary Box */}
              <div className="p-5 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-blue-50/90 border border-blue-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                    Executive Overview
                  </span>
                  <h3 className="text-lg font-black text-[#0A2540]">
                    Tender Analysis Summary
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-700 pt-1 font-medium">
                    <span>Standards identified: <strong className="text-blue-700">{activeAnalysisData.identifiedStandards.length}</strong></span>
                    <span>•</span>
                    <span>Outdated references: <strong className="text-rose-600">{activeAnalysisData.outdatedStandards.length}</strong></span>
                    <span>•</span>
                    <span>Missing requirements: <strong className="text-amber-600">{activeAnalysisData.missingRequirements.length}</strong></span>
                    <span>•</span>
                    <span>Certification requirements: <strong className="text-indigo-700">1 (Mandatory QCO)</strong></span>
                    <span>•</span>
                    <span>Testing requirements: <strong className="text-emerald-700">5</strong></span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFixAndUpdateTender}
                  className="px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all shrink-0 cursor-pointer"
                >
                  <Wand2 className="h-4 w-4" />
                  <span>Fix / Update Tender</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* FEATURE 2: TENDER DOCUMENT GENERATOR */}
      {/* ========================================================================= */}
      {activeMainTab === 'generator' && (
        <div className="space-y-6">

          {/* 2.1 Generator Configuration & Customization Workspace */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <FileSignature className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#0A2540]">
                    Tender Specification Generator
                  </h2>
                  <p className="text-xs text-slate-500">
                    Generate an updated, standards-compliant tender specification using latest Indian Standards and test clauses.
                  </p>
                </div>
              </div>

              {/* Source Option Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500">Generate From:</span>
                <select
                  value={generatorSource}
                  onChange={(e) => setGeneratorSource(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="analyzed">Existing Analyzed Tender (Auto-Upgraded)</option>
                  <option value="description">Product Description</option>
                  <option value="specs">Technical Specifications</option>
                  <option value="standards">Selected Indian Standards</option>
                </select>
              </div>
            </div>

            {/* AI Upgrade Status Alert */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start space-x-3 text-xs">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-emerald-900 font-bold block">
                  AI Standards Enhancement Applied Automatically:
                </strong>
                <p className="text-emerald-800 leading-relaxed font-medium">
                  All outdated references ({activeAnalysisData.outdatedStandards.map(o => o.tenderRef).join(', ')}) have been auto-upgraded to current Indian Standard editions. Missing surge, IP66, and Mandatory BIS QCO clauses have been injected into Section 6 & Section 7.
                </p>
              </div>
            </div>

            {/* Edit & Customize Parameters Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Tender Title / Subject:
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Procuring Agency / Ministry:
                </label>
                <input
                  type="text"
                  value={customAgency}
                  onChange={(e) => setCustomAgency(e.target.value)}
                  className="w-full p-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Quantity Required:
                </label>
                <input
                  type="text"
                  value={customQuantity}
                  onChange={(e) => setCustomQuantity(e.target.value)}
                  className="w-full p-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Warranty Requirement:
                </label>
                <input
                  type="text"
                  value={customWarranty}
                  onChange={(e) => setCustomWarranty(e.target.value)}
                  className="w-full p-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Delivery Timeline:
                </label>
                <input
                  type="text"
                  value={customDeliveryDays}
                  onChange={(e) => setCustomDeliveryDays(e.target.value)}
                  className="w-full p-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              {/* Statutory Clauses Toggles */}
              <div className="flex flex-col justify-end space-y-2 pt-1">
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeQcoClause}
                    onChange={(e) => setIncludeQcoClause(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mandate Gazetted QCO & ISI/CRS License</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNablClause}
                    onChange={(e) => setIncludeNablClause(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mandate NABL (ISO/IEC 17025) Type Test Reports</span>
                </label>
              </div>
            </div>

            {/* Standards & Requirements Inclusion Checkbox Matrix */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2.5">
                Select Standards & Test Clauses to Include in Generated Tender:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {activeAnalysisData.identifiedStandards.map((std, idx) => {
                  const isSelected = selectedStandardsList.includes(std.code);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleStandard(std.code)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start space-x-2.5 ${
                        isSelected 
                          ? 'bg-blue-50/80 border-blue-300 text-[#0A2540]' 
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      {isSelected ? (
                        <CheckSquare className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-mono text-xs font-bold block">{std.code}</span>
                        <span className="text-[11px] leading-tight block line-clamp-2 mt-0.5 font-medium">
                          {std.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* 2.2 FINAL GENERATED OUTPUT DOCUMENT DISPLAY */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
            
            {/* Output Sub-Tabs & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setGeneratorActiveDocTab('full-spec')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    generatorActiveDocTab === 'full-spec'
                      ? 'bg-[#2563EB] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tender Specification (12 Sections)
                </button>

                <button
                  type="button"
                  onClick={() => setGeneratorActiveDocTab('tech-spec')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    generatorActiveDocTab === 'tech-spec'
                      ? 'bg-[#2563EB] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Technical Specifications Doc
                </button>

                <button
                  type="button"
                  onClick={() => setGeneratorActiveDocTab('checklist')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    generatorActiveDocTab === 'checklist'
                      ? 'bg-[#2563EB] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Compliance Checklist
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenPdfPreview}
                  disabled={pdfGenerating}
                  className="px-3.5 py-2 bg-[#0B2545] hover:bg-[#133A6B] text-white font-bold text-xs rounded-lg flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-amber-400" />
                  <span>{pdfGenerating ? 'Rendering PDF...' : 'Preview Official PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadOfficialPdf}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Official PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyText(fullDocText)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copiedSuccess ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedSuccess ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadDoc(`Tender_Specification_${activeAnalysisData.id}`, fullDocText)}
                  className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#2563EB] font-bold text-xs rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download DOCX</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintPdf}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Document Viewer Viewport */}
            {generatorActiveDocTab === 'full-spec' && (
              <div className="bg-slate-900 text-slate-100 rounded-xl p-6 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px] border border-slate-800">
                <pre className="whitespace-pre-wrap">{fullDocText}</pre>
              </div>
            )}

            {generatorActiveDocTab === 'tech-spec' && (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-[#0A2540]">
                  Technical Parameter Breakdown & Clause References
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-200/80 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2.5">Parameter</th>
                        <th className="p-2.5">Tender Requirement</th>
                        <th className="p-2.5">Governing Indian Standard</th>
                        <th className="p-2.5">Mandatory Test Clause</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {activeAnalysisData.extracted.specs.map((s, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="p-2.5 font-semibold text-slate-900">{s.label}</td>
                          <td className="p-2.5 font-mono text-blue-700">{s.value}</td>
                          <td className="p-2.5 font-mono text-slate-700">
                            {activeAnalysisData.identifiedStandards[0]?.code || 'IS Specification'}
                          </td>
                          <td className="p-2.5 text-slate-600">Clause {idx + 4}.1 (Type & Acceptance Test)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {generatorActiveDocTab === 'checklist' && (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h3 className="text-sm font-bold text-[#0A2540]">
                  Pre-Publishing Tender Compliance Sign-Off
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-white border border-emerald-200 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">1. All referenced standards updated to current active versions</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">VERIFIED</span>
                  </div>
                  <div className="p-3 bg-white border border-emerald-200 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">2. Mandatory QCO / BIS ISI / CRS registration requirements included</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">INCLUDED</span>
                  </div>
                  <div className="p-3 bg-white border border-emerald-200 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">3. NABL Accredited Type Test reports mandated (ISO/IEC 17025)</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">INCLUDED</span>
                  </div>
                  <div className="p-3 bg-white border border-emerald-200 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">4. Sampling plan benchmarked to IS 2500 (Part 1) Level II</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">INCLUDED</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Live In-Browser Official PDF Preview Modal */}
      {pdfPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-5xl h-[88vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-[#0B2545] text-white">
              <div className="flex items-center space-x-2.5">
                <FileCheck2 className="h-5 w-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold">Official Tender Specification PDF Preview</h3>
                  <p className="text-[11px] text-slate-300">Live 2-Page Rendered Document • GFR Rule 144(i) & BIS Act 2016 Compliant</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleDownloadOfficialPdf}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPdfPreviewOpen(false)}
                  className="rounded-lg p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 bg-slate-100 p-2">
              {pdfDataUrl ? (
                <iframe
                  src={pdfDataUrl}
                  title="Tender Specification PDF Preview"
                  className="w-full h-full rounded-lg border border-slate-300 bg-white"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                  Loading PDF preview...
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
