import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  BookOpen,
  Layers,
  FlaskConical,
  ShieldCheck,
  Wrench,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Info,
  ArrowRight,
  Plus,
  Minus,
  RotateCcw,
  Tag,
  Check,
  X,
  FolderTree,
  Eye,
  ExternalLink
} from 'lucide-react';

// Comprehensive Database of Indian Standards & Relationships
const standardsCatalogue = [
  {
    id: 'is-269-2015',
    isNumber: 'IS 269:2015',
    title: 'Ordinary Portland Cement — Specification (33 Grade, 43 Grade & 53 Grade Merged)',
    edition: '2015 (6th Revision)',
    status: 'Active',
    reaffirmed: '2020',
    department: 'Civil Engineering (CED 02)',
    keywords: ['cement', 'opc', 'concrete', 'construction', 'structural', 'mortar'],
    normativeReferences: [
      {
        isNumber: 'IS 4031 (Part 1):1996',
        title: 'Methods of Physical Tests for Hydraulic Cement — Part 1: Determination of Fineness by Dry Sieving',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 6.1 (Fineness by Dry Sieving)',
        currentVersion: 'IS 4031 (Part 1):1996 (Reaffirmed 2021)',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Explicitly mandated in IS 269:2015 Clause 6.1 for verifying maximum retained residue (≤ 10%).'
      },
      {
        isNumber: 'IS 4031 (Part 5):1988',
        title: 'Methods of Physical Tests for Hydraulic Cement — Part 5: Determination of Initial and Final Setting Times',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 7.2 (Initial & Final Setting Time)',
        currentVersion: 'IS 4031 (Part 5):1988 (Reaffirmed 2023)',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Mandated under Clause 7.2 to guarantee initial setting time ≥ 30 mins and final setting time ≤ 600 mins.'
      },
      {
        isNumber: 'IS 4031 (Part 6):1988',
        title: 'Methods of Physical Tests for Hydraulic Cement — Part 6: Determination of Compressive Strength of Hydraulic Cement',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 7.3 (Compressive Strength at 3, 7, 28 Days)',
        currentVersion: 'IS 4031 (Part 6):1988 (Reaffirmed 2023)',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Mandatory standard testing procedure for certifying 33, 43, and 53 grade compressive thresholds.'
      },
      {
        isNumber: 'IS 4032:1985',
        title: 'Method of Chemical Analysis of Hydraulic Cement',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 5.2 (Chemical Composition Limits)',
        currentVersion: 'IS 4032:1985 (Reaffirmed 2024)',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Required for determining Loss on Ignition (LOI ≤ 5.0%) and Insoluble Residue (IR ≤ 5.0%).'
      },
      {
        isNumber: 'IS 3535:1986',
        title: 'Methods of Sampling Hydraulic Cements',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 9.1 (Lot Sampling & Acceptance)',
        currentVersion: 'IS 3535:1986 (Reaffirmed 2022)',
        status: 'Active',
        category: 'Normative Reference',
        whyConnected: 'Governs the statutory sampling method for bulk tankers, 50kg HDPE/paper bags, and silo discharges.'
      },
      {
        isNumber: 'IS 650:1991',
        title: 'Standard Sand for Testing of Cement — Specification (Ennore Sand)',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 7.3.1 (Standard Mortar Preparation)',
        currentVersion: 'IS 650:1991 (Reaffirmed 2020)',
        status: 'Active',
        category: 'Normative Reference',
        whyConnected: 'Specifies the mandatory Ennore silica sand fractions (Grade I, II, III) required for all strength test cubes.'
      }
    ],
    highlyRelatedStandards: [
      {
        isNumber: 'IS 1489 (Part 1):2015',
        title: 'Portland Pozzolana Cement — Specification — Part 1: Fly Ash Based',
        relationship: 'Related Product Standard',
        relevance: 96,
        status: 'Active',
        currentVersion: '2015 (Reaffirmed 2020)',
        category: 'Related Product Standards',
        whyConnected: 'Parallel hydraulic cement standard replacing 15–35% clinker with fly ash for eco-friendly mass concreting.'
      },
      {
        isNumber: 'IS 456:2000',
        title: 'Plain and Reinforced Concrete — Code of Practice (Fourth Revision)',
        relationship: 'Installation / Application',
        relevance: 95,
        status: 'Active',
        currentVersion: '2000 (Reaffirmed 2021)',
        category: 'Installation / Application',
        whyConnected: 'The master national code governing structural application, minimum cementitious content, and water-cement ratios.'
      },
      {
        isNumber: 'IS 455:2015',
        title: 'Portland Slag Cement — Specification',
        relationship: 'Related Product Standard',
        relevance: 92,
        status: 'Active',
        currentVersion: '2015 (Reaffirmed 2020)',
        category: 'Related Product Standards',
        whyConnected: 'Allied blended cement standard utilizing blast furnace slag for enhanced marine and sulfate resistance.'
      },
      {
        isNumber: 'IS 10262:2019',
        title: 'Concrete Mix Proportioning — Guidelines (Second Revision)',
        relationship: 'Installation / Application',
        relevance: 91,
        status: 'Active',
        currentVersion: '2019 (Reaffirmed 2024)',
        category: 'Installation / Application',
        whyConnected: 'Provides mathematical mix design algorithms utilizing IS 269 28-day target cement strength curves.'
      },
      {
        isNumber: 'IS 516 (Part 1/Sec 1):2021',
        title: 'Hardened Concrete — Methods of Test — Part 1: Testing of Strength',
        relationship: 'Test Method',
        relevance: 89,
        status: 'Active',
        currentVersion: '2021',
        category: 'Test Method',
        whyConnected: 'Standard test protocols for cast concrete cylinders and beams made from IS 269 cement.'
      },
      {
        isNumber: 'IS 4845:1968',
        title: 'Definitions and Terminology Relating to Hydraulic Cement',
        relationship: 'Terminology',
        relevance: 88,
        status: 'Active',
        currentVersion: '1968 (Reaffirmed 2022)',
        category: 'Terminology',
        whyConnected: 'Defines standardized statutory nomenclature for clinker types, pozzolana, setting times, and sound testing.'
      },
      {
        isNumber: 'IS 9103:1999',
        title: 'Concrete Admixtures — Specification (First Revision)',
        relationship: 'Related Product Standard',
        relevance: 85,
        status: 'Active',
        currentVersion: '1999 (Reaffirmed 2023)',
        category: 'Related Product Standards',
        whyConnected: 'Governs chemical plasticizers, retarders, and accelerators blended with IS 269 for high-workability mixes.'
      }
    ]
  },
  {
    id: 'is-1786-2024',
    isNumber: 'IS 1786:2024',
    title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement — Specification (Fe 500D / Fe 550D)',
    edition: '2024 (5th Revision)',
    status: 'Active',
    reaffirmed: '2025',
    department: 'Civil Engineering (CED 54)',
    keywords: ['steel', 'tmt', 'rebars', 'reinforcement', 'fe 500d', 'bridges', 'seismic'],
    normativeReferences: [
      {
        isNumber: 'IS 1608 (Part 1):2022',
        title: 'Metallic Materials — Tensile Testing — Part 1: Method of Test at Room Temperature',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 8.1 (0.2% Proof Stress & Tensile Strength)',
        currentVersion: 'IS 1608:2022',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Mandated for exact verification of 0.2% proof stress, Rm/Re ratio, and uniform elongation Agt.'
      },
      {
        isNumber: 'IS 1599:2019',
        title: 'Metallic Materials — Bend Test (Third Revision)',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 9.1 & Clause 9.3 (Bend and Re-Bend Test)',
        currentVersion: 'IS 1599:2019',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Mandatory 180° cold bend and reverse bend test after artificial aging at 100°C for 30 minutes.'
      },
      {
        isNumber: 'IS 228 (Part 1 to 24)',
        title: 'Methods for Chemical Analysis of Steels, Cast Iron and Other Iron Alloys',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 4.2 (Carbon Equivalent Calculation)',
        currentVersion: 'IS 228 (Current Versions)',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Prescribed protocol for checking Carbon (≤ 0.25%), Sulfur (≤ 0.040%), Phosphorus (≤ 0.040%), and CE formula.'
      },
      {
        isNumber: 'IS 2500 (Part 1):2020',
        title: 'Sampling Inspection Procedures by Attributes — Part 1: Sampling Schemes',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 11.2 (Lot Consignment Sampling)',
        currentVersion: 'IS 2500 (Part 1):2020',
        status: 'Active',
        category: 'Normative Reference',
        whyConnected: 'Statutory sampling protocol for testing bundles of 50 MT production lots.'
      }
    ],
    highlyRelatedStandards: [
      {
        isNumber: 'IS 13920:2016',
        title: 'Ductile Design and Detailing of Reinforced Concrete Structures Subjected to Seismic Forces',
        relationship: 'Safety',
        relevance: 97,
        status: 'Active',
        currentVersion: '2016 (Reaffirmed 2023)',
        category: 'Safety',
        whyConnected: 'Mandates Fe 500D rebars with high ductility (Agt ≥ 5%) for all earthquake-resistant buildings in Zones III, IV, and V.'
      },
      {
        isNumber: 'IS 456:2000',
        title: 'Plain and Reinforced Concrete — Code of Practice',
        relationship: 'Installation / Application',
        relevance: 95,
        status: 'Active',
        currentVersion: '2000 (Reaffirmed 2021)',
        category: 'Installation / Application',
        whyConnected: 'Governs rebar detailing, cover thickness, lap lengths, anchorage bonds, and bar spacing in RCC elements.'
      },
      {
        isNumber: 'IS 2062:2011',
        title: 'Hot Rolled Medium and High Tensile Structural Steel — Specification',
        relationship: 'Related Product Standard',
        relevance: 91,
        status: 'Active',
        currentVersion: '2011 (Reaffirmed 2021)',
        category: 'Related Product Standards',
        whyConnected: 'Parallel structural steel standard for rolled sections, beams, plates, and angles used in composite construction.'
      },
      {
        isNumber: 'IS 9417:2018',
        title: 'Recommendations for Welding Cold-Worked and Hot-Rolled Steel Bars for Reinforced Concrete Construction',
        relationship: 'Installation / Application',
        relevance: 93,
        status: 'Active',
        currentVersion: '2018 (Reaffirmed 2023)',
        category: 'Installation / Application',
        whyConnected: 'Specifies butt and lap welding procedures for TMT rebars maintaining structural tensile integrity.'
      },
      {
        isNumber: 'IS 1956 (Part 1 to 8)',
        title: 'Glossary of Terms Relating to Iron and Steel',
        relationship: 'Terminology',
        relevance: 86,
        status: 'Active',
        currentVersion: 'Reaffirmed 2022',
        category: 'Terminology',
        whyConnected: 'Defines terminology for thermo-mechanical treatment (QST), proof stress, yield point, and ribbed deformations.'
      }
    ]
  },
  {
    id: 'is-10322-2024',
    isNumber: 'IS 10322 (Part 5/Sec 3):2024',
    title: 'Luminaires — Part 5: Particular Requirements — Sec 3: Luminaires for Road and Street Lighting',
    edition: '2024 (Revised)',
    status: 'Active',
    reaffirmed: '2026',
    department: 'Electrotechnical (ETD 24)',
    keywords: ['led', 'lighting', 'street light', 'luminaire', 'ip66', 'surge', 'photobiological'],
    normativeReferences: [
      {
        isNumber: 'IS 10322 (Part 1):2024',
        title: 'Luminaires — Part 1: General Requirements and Tests (IEC 60598-1 Aligned)',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 1.2 & Clause 4.1 (General Insulation & Construction)',
        currentVersion: 'IS 10322 (Part 1):2024',
        status: 'Active',
        category: 'Normative Reference',
        whyConnected: 'Provides fundamental baseline safety, insulation resistance, thermal endurance, and earthing rules.'
      },
      {
        isNumber: 'IS/IEC 60529:2001',
        title: 'Degrees of Protection Provided by Enclosures (IP Code)',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 8.2 (IP66 Weatherproof Seal Verification)',
        currentVersion: 'IS/IEC 60529:2001 (Reaffirmed 2024)',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Mandated protocol for testing dust tightness (IP6X) and powerful water jet immersion resistance (IPX6).'
      },
      {
        isNumber: 'IS 15885 (Part 2/Sec 13):2024',
        title: 'Electronic Controlgear for LED Modules — Particular Requirements',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 5.1 & Clause 7.3 (Driver PF ≥ 0.95, THD < 10%)',
        currentVersion: 'IS 15885 (Part 2/Sec 13):2024',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Statutory compliance for internal constant current LED drivers and over-voltage 440V withstand protection.'
      },
      {
        isNumber: 'IS 16108:2021',
        title: 'Photobiological Safety of Lamps and Lamp Systems (IEC 62471 Aligned)',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 4.3 (Blue Light Hazard RG-0 / RG-1 Classification)',
        currentVersion: 'IS 16108:2021 (Reaffirmed 2026)',
        status: 'Active',
        category: 'Safety',
        whyConnected: 'Mandated to certify zero retinal photochemical hazard for nighttime motorists and pedestrians.'
      }
    ],
    highlyRelatedStandards: [
      {
        isNumber: 'IS 16107 (Part 2/Sec 1):2024',
        title: 'Luminaires Performance — Part 2: Particular Requirements — Sec 1: LED Luminaires',
        relationship: 'Test Method',
        relevance: 96,
        status: 'Active',
        currentVersion: '2024',
        category: 'Test Method',
        whyConnected: 'Specifies luminous efficacy (≥ 120 lm/W), color rendering index (CRI ≥ 70), and lumen maintenance (L70 > 50,000 hrs).'
      },
      {
        isNumber: 'IS 1944 (Part 1 & 2):1970',
        title: 'Code of Practice for Lighting of Public Thoroughfares (Urban & Highways)',
        relationship: 'Installation / Application',
        relevance: 94,
        status: 'Active',
        currentVersion: '1970 (Reaffirmed 2022)',
        category: 'Installation / Application',
        whyConnected: 'Standard calculation guide for pole height, spacing, lux level uniformity, and tilt angles on Indian roads.'
      },
      {
        isNumber: 'IS/IEC 62262:2002',
        title: 'Degrees of Protection Provided by Enclosures against External Mechanical Impacts (IK Code)',
        relationship: 'Safety',
        relevance: 92,
        status: 'Active',
        currentVersion: '2002 (Reaffirmed 2023)',
        category: 'Safety',
        whyConnected: 'Defines IK08 impact resistance test (5 Joule impact) on glass diffuser and die-cast housing.'
      },
      {
        isNumber: 'IS 16101:2012',
        title: 'General Lighting — LEDs and LED Modules — Terms and Definitions',
        relationship: 'Terminology',
        relevance: 88,
        status: 'Active',
        currentVersion: '2012 (Reaffirmed 2022)',
        category: 'Terminology',
        whyConnected: 'Harmonized terminology for correlated color temperature (CCT), binning, luminous flux, and thermal resistance.'
      },
      {
        isNumber: 'IS 16102 (Part 1):2023',
        title: 'Self-Ballasted LED Lamps for General Lighting — Safety Requirements',
        relationship: 'Related Product Standard',
        relevance: 91,
        status: 'Active',
        currentVersion: '2023',
        category: 'Related Product Standards',
        whyConnected: 'Allied residential and commercial lamp specification under the mandatory BIS CRS scheme.'
      }
    ]
  },
  {
    id: 'is-17526-2021',
    isNumber: 'IS 17526:2021',
    title: 'Stainless Steel Water Bottles — Specification (Single Wall & Insulated Flasks)',
    edition: '2021 (1st Edition)',
    status: 'Active',
    reaffirmed: '2024',
    department: 'Mechanical Engineering (MED 33)',
    keywords: ['bottle', 'stainless steel', 'flask', 'food contact', 'ss 304', 'water bottle'],
    normativeReferences: [
      {
        isNumber: 'IS 6911:2017',
        title: 'Stainless Steel Plate, Sheet and Strip — Specification (Third Revision)',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 4.1 (Austenitic Stainless Steel Grade X04Cr19Ni9 / SS 304)',
        currentVersion: 'IS 6911:2017 (Reaffirmed 2023)',
        status: 'Active',
        category: 'Normative Reference',
        whyConnected: 'Mandates food contact virgin food-grade stainless steel with minimum 18% Chromium and 8% Nickel.'
      },
      {
        isNumber: 'IS 9845:1998',
        title: 'Determination of Overall Migration of Constituents of Plastics Materials Intended for Food Contact',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 5.4 (Toxicological Overall Migration Limits ≤ 10 mg/dm²)',
        currentVersion: 'IS 9845:1998 (Reaffirmed 2024)',
        status: 'Active',
        category: 'Test Method',
        whyConnected: 'Mandated for food simulant migration tests on BPA-free plastic caps and silicone sealing gaskets.'
      },
      {
        isNumber: 'IS 10146:1982',
        title: 'Polyethylene for its Safe Use in Contact with Foodstuffs, Pharmaceuticals and Drinking Water',
        relationship: 'Normative Reference',
        referencedClause: 'Clause 4.3 (Polymer Safety Criteria)',
        currentVersion: 'IS 10146:1982 (Reaffirmed 2023)',
        status: 'Active',
        category: 'Normative Reference',
        whyConnected: 'Specifies virgin non-toxic polymer resins for inner caps, flip valves, and drinking spouts.'
      }
    ],
    highlyRelatedStandards: [
      {
        isNumber: 'IS 17527:2021',
        title: 'Insulated Flasks and Vacuum Bottles — Specification',
        relationship: 'Related Product Standard',
        relevance: 95,
        status: 'Active',
        currentVersion: '2021 (Reaffirmed 2024)',
        category: 'Related Product Standards',
        whyConnected: 'Companion standard for double-wall vacuum insulated flasks with 24-hour thermal retention requirements.'
      },
      {
        isNumber: 'IS 14756:2017',
        title: 'Stainless Steel Cookware — Specification (Second Revision)',
        relationship: 'Related Product Standard',
        relevance: 89,
        status: 'Active',
        currentVersion: '2017 (Reaffirmed 2022)',
        category: 'Related Product Standards',
        whyConnected: 'Allied domestic stainless steel utensil standard testing corrosion resistance and chemical leaching.'
      },
      {
        isNumber: 'IS 3434:1984',
        title: 'Glossary of Terms Relating to Domestic Stainless Steel Utensils',
        relationship: 'Terminology',
        relevance: 87,
        status: 'Active',
        currentVersion: '1984 (Reaffirmed 2021)',
        category: 'Terminology',
        whyConnected: 'Defines manufacturing terminology: deep drawing, electropolishing, seam welding, and bead rolling.'
      }
    ]
  }
];

export const RelatedStandardsPage = ({ onNavigateTab }) => {
  const { t } = useTranslation();

  // Selected Standard State (Starts un-proceeded as strictly required by prompt)
  const [selectedStandard, setSelectedStandard] = useState(standardsCatalogue[0]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasProceeded, setHasProceeded] = useState(false);

  // Tree Visualizer State
  const [treeZoom, setTreeZoom] = useState(1);
  const [treeSearch, setTreeSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    'Normative Reference': true,
    'Test Method': true,
    'Related Product Standards': true,
    'Safety': true,
    'Installation / Application': true,
    'Terminology': true
  });
  const [selectedNodeDetails, setSelectedNodeDetails] = useState(null);
  const [customAddedTreeNodes, setCustomAddedTreeNodes] = useState([]);

  // Search Filtered Standards for Modal
  const filteredCatalogue = useMemo(() => {
    if (!searchQuery.trim()) return standardsCatalogue;
    const q = searchQuery.toLowerCase();
    return standardsCatalogue.filter(s =>
      s.isNumber.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.keywords.some(k => k.includes(q))
    );
  }, [searchQuery]);

  // Handle Standard Selection from Dropdown / Modal
  const handleSelectStandard = (std) => {
    setSelectedStandard(std);
    setIsSelectorOpen(false);
    setHasProceeded(false); // Reset analysis on new standard until user clicks Proceed
    setSelectedNodeDetails(null);
    setCustomAddedTreeNodes([]);
  };

  // Handle Proceed Action
  const handleProceed = () => {
    setHasProceeded(true);
    // Smooth scroll down to analysis
    setTimeout(() => {
      document.getElementById('analysis-results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Toggle tree branch
  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Add standard card into tree
  const handleAddToTree = (std) => {
    if (!customAddedTreeNodes.some(n => n.isNumber === std.isNumber)) {
      setCustomAddedTreeNodes(prev => [...prev, std]);
    }
  };

  // Group all connected standards by relationship category for the Tree Visualizer
  const treeDataByCategory = useMemo(() => {
    if (!selectedStandard) return {};
    const categories = {
      'Normative Reference': [],
      'Test Method': [],
      'Terminology': [],
      'Safety': [],
      'Installation / Application': [],
      'Related Product Standards': []
    };

    // 1. Add Normative References
    selectedStandard.normativeReferences.forEach(item => {
      const targetCat = item.category === 'Test Method' ? 'Test Method' :
                        item.category === 'Safety' ? 'Safety' : 'Normative Reference';
      categories[targetCat].push({
        isNumber: item.isNumber,
        title: item.title,
        relationship: item.relationship,
        relevance: 98,
        referencedClause: item.referencedClause,
        currentVersion: item.currentVersion,
        status: item.status,
        whyConnected: item.whyConnected
      });
    });

    // 2. Add Highly Related Standards
    selectedStandard.highlyRelatedStandards.forEach(item => {
      const cat = item.category || 'Related Product Standards';
      if (categories[cat]) {
        categories[cat].push(item);
      } else {
        categories['Related Product Standards'].push(item);
      }
    });

    // 3. Add Custom Added Nodes
    customAddedTreeNodes.forEach(item => {
      const cat = item.category || 'Related Product Standards';
      if (!categories[cat].some(x => x.isNumber === item.isNumber)) {
        categories[cat].push(item);
      }
    });

    return categories;
  }, [selectedStandard, customAddedTreeNodes]);

  return (
    <div className="space-y-8 pb-24">

      {/* ========================================================================= */}
      {/* 1. SELECT A STANDARD SECTION */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
              <span className="px-2.5 py-0.5 bg-blue-100/80 text-[#2563EB] rounded-md font-mono">Module 3</span>
              <span className="text-slate-300">•</span>
              <span>Indian Standards Relationship Mapping</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0A2540] tracking-tight mt-1">
              Select a Standard & Find Related Standards
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Choose an Indian Standard (IS Code) to map its normative references, test methods, safety codes, and visual connection hierarchy.
            </p>
          </div>

          {/* Prominent "+ Select Standard" Button */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setIsSelectorOpen(true)}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center space-x-2 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>+ Select Standard</span>
            </button>
          </div>
        </div>

        {/* Selected Standard Card */}
        {selectedStandard && (
          <div className="mt-5 p-5 bg-gradient-to-r from-blue-50/60 via-slate-50 to-indigo-50/40 border border-blue-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-0.5 bg-[#2563EB] text-white text-xs font-mono font-black rounded-md shadow-2xs">
                  {selectedStandard.isNumber}
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded">
                  Status: {selectedStandard.status}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Edition: <strong className="text-slate-800">{selectedStandard.edition}</strong>
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-[#0A2540] leading-snug">
                {selectedStandard.title}
              </h2>

              <p className="text-xs text-slate-600">
                Department: <strong className="text-slate-800">{selectedStandard.department}</strong> • Reaffirmed: <strong className="text-slate-800">{selectedStandard.reaffirmed}</strong>
              </p>
            </div>

            {/* Primary Action Button: [ Proceed → ] */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={handleProceed}
                className="w-full sm:w-auto px-7 py-3 bg-[#0A2540] hover:bg-[#1E3A8A] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer group"
              >
                <span>Proceed</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SEARCHABLE STANDARD SELECTOR MODAL */}
      {/* ========================================================================= */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            
            {/* Modal Header & Search */}
            <div className="p-5 border-b border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-[#2563EB]" />
                  <h3 className="text-base font-bold text-[#0A2540]">Search Standard Catalog</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSelectorOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by IS Number (e.g. IS 269), Title, Product, or Keyword..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2563EB] focus:bg-white focus:outline-hidden"
                  autoFocus
                />
              </div>
            </div>

            {/* Results List */}
            <div className="p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-slate-100">
              {filteredCatalogue.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No Indian Standards found matching "{searchQuery}". Try searching for 'cement', 'steel', 'lighting', or 'bottle'.
                </div>
              ) : (
                filteredCatalogue.map((std) => (
                  <div
                    key={std.id}
                    onClick={() => handleSelectStandard(std)}
                    className="pt-2.5 first:pt-0 p-3 hover:bg-blue-50/70 rounded-xl cursor-pointer transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#2563EB]">
                        {std.isNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                        {std.status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#0A2540] leading-snug">
                      {std.title}
                    </p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 pt-0.5">
                      <span>Edition: <strong>{std.edition}</strong></span>
                      <span>•</span>
                      <span>{std.department}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-right text-xs text-slate-500 font-medium">
              Click any Indian Standard to load for relationship analysis
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* AFTER CLICKING "PROCEED": RESULTS SECTIONS A & B */}
      {/* ========================================================================= */}
      {hasProceeded && selectedStandard && (
        <div id="analysis-results-section" className="space-y-8 animate-fade-in">

          {/* --------------------------------------------------------------------- */}
          {/* SECTION A: HIGHLY RELATED STANDARDS */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#0A2540] flex items-center space-x-2">
                  <span>Highly Related Standards</span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Standards identified as highly relevant to the selected standard.
                </p>
              </div>

              {/* Semantic Relevance Tooltip Alert Banner */}
              <div className="group relative inline-block">
                <div className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-[#2563EB] rounded-lg text-xs font-semibold flex items-center space-x-1.5 cursor-help">
                  <Info className="h-3.5 w-3.5 shrink-0" />
                  <span>About Semantic Relevance</span>
                </div>

                <div className="absolute right-0 top-full mt-2 w-80 p-3 bg-slate-900 text-slate-100 text-[11px] rounded-xl shadow-xl z-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none leading-relaxed">
                  <strong>Semantic Relevance</strong> is an AI-generated similarity score based on factors such as scope, product domain, terminology, technical requirements, clauses and referenced standards. It does not mean that two standards are 96% identical.
                </div>
              </div>
            </div>

            {/* Ranked Data-Table Style Results */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    <th className="py-3 px-3">Standard</th>
                    <th className="py-3 px-3">Title</th>
                    <th className="py-3 px-3">Relationship</th>
                    <th className="py-3 px-3 text-center">Semantic Relevance</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedStandard.highlyRelatedStandards.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#2563EB] whitespace-nowrap">
                        {item.isNumber}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#0A2540] max-w-xs sm:max-w-md">
                        {item.title}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10.5px] font-bold rounded-md border border-slate-200">
                          {item.relationship}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-blue-100 text-[#2563EB] text-xs font-black rounded-md">
                          {item.relevance}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap space-x-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const matched = standardsCatalogue.find(s => s.isNumber === item.isNumber);
                            if (matched) {
                              handleSelectStandard(matched);
                              setHasProceeded(true);
                            }
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-md transition-colors cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddToTree(item)}
                          className="px-2.5 py-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[11px] rounded-md transition-colors cursor-pointer"
                        >
                          Add to Tree
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* SECTION B: NORMATIVE REFERENCES */}
          {/* --------------------------------------------------------------------- */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-[#2563EB]" />
                <h2 className="text-base sm:text-lg font-bold text-[#0A2540]">
                  Normative References
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Standards explicitly cited and mandated within the text and clauses of <strong>{selectedStandard.isNumber}</strong>.
              </p>
            </div>

            {/* Hierarchical Flow Display */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-700 flex items-center space-x-2">
              <span className="text-[#2563EB] font-bold">{selectedStandard.isNumber}</span>
              <span>↓</span>
              <span className="text-slate-500">Explicit Normative Citations ({selectedStandard.normativeReferences.length} Standards)</span>
            </div>

            {/* Normative Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedStandard.normativeReferences.map((norm, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-blue-300 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#2563EB]">
                          {norm.isNumber}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          {norm.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-[#0A2540] mt-1 leading-snug">
                        {norm.title}
                      </h4>
                    </div>

                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold rounded shrink-0">
                      {norm.relationship}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-600">
                    <div>
                      <span className="text-slate-400">Referenced Clause: </span>
                      <strong className="text-slate-900 font-mono">{norm.referencedClause}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const matched = standardsCatalogue.find(s => s.isNumber === norm.isNumber);
                        if (matched) {
                          handleSelectStandard(matched);
                          setHasProceeded(true);
                        }
                      }}
                      className="text-[#2563EB] font-bold hover:underline self-end sm:self-auto cursor-pointer"
                    >
                      Open Standard →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* FEATURE 2: STANDARDS TREE VISUALIZER (FULL WIDTH) */}
          {/* ===================================================================== */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            
            {/* Visualizer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <FolderTree className="h-5 w-5 text-[#2563EB]" />
                  <h2 className="text-base sm:text-lg font-bold text-[#0A2540]">
                    Standards Tree Visualizer
                  </h2>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Explore how this standard is connected to other Indian Standards.
                </p>
              </div>

              {/* Tree Controls (Search, Zoom In, Zoom Out, Reset) */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    value={treeSearch}
                    onChange={(e) => setTreeSearch(e.target.value)}
                    placeholder="Search in tree..."
                    className="pl-2.5 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-36 sm:w-48 focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setTreeZoom(z => Math.min(z + 0.1, 1.4))}
                  title="Zoom In"
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTreeZoom(z => Math.max(z - 0.1, 0.7))}
                  title="Zoom Out"
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => { setTreeZoom(1); setTreeSearch(''); }}
                  title="Reset View"
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* FULL WIDTH Hierarchical Tree Viewport */}
            <div className="w-full bg-[#0F172A] text-slate-100 border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[580px] overflow-auto relative font-sans shadow-inner">
              
              <div
                className="transition-transform duration-150 origin-top-left space-y-4 max-w-5xl"
                style={{ transform: `scale(${treeZoom})` }}
              >
                {/* ROOT NODE: Selected Standard */}
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-700/80">
                  <div className="p-2.5 bg-blue-600/30 text-blue-400 border border-blue-500/40 rounded-xl shadow-xs shrink-0">
                    <FolderTree className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-base sm:text-lg font-black text-white tracking-tight">
                        {selectedStandard.isNumber}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded">
                        {selectedStandard.status}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        [{selectedStandard.edition}]
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                      {selectedStandard.title}
                    </p>
                  </div>
                </div>

                {/* Vertical Trunk Line & Category Branches */}
                <div className="pl-3 sm:pl-6 space-y-5 border-l-2 border-slate-700/80 ml-4 sm:ml-6 font-mono text-xs">
                  
                  {/* 1. 📚 Normative References Branch */}
                  {treeDataByCategory['Normative Reference']?.length > 0 && (
                    <div className="relative pt-2">
                      <div className="absolute -left-[14px] sm:-left-[26px] top-4 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                      
                      <div
                        onClick={() => toggleCategory('Normative Reference')}
                        className="flex items-center space-x-2 py-1.5 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors w-fit select-none"
                      >
                        <span className="text-sm">📚</span>
                        <span className="font-bold text-blue-300">Normative References</span>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-mono">
                          {treeDataByCategory['Normative Reference'].length}
                        </span>
                        <span className="text-slate-400 text-xs pl-1">
                          {expandedCategories['Normative Reference'] ? '▾' : '▸'}
                        </span>
                      </div>

                      {expandedCategories['Normative Reference'] && (
                        <div className="pl-4 sm:pl-7 border-l-2 border-slate-700/60 ml-3 sm:ml-4 mt-2.5 space-y-3">
                          {treeDataByCategory['Normative Reference'].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[18px] sm:-left-[30px] top-3.5 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                              
                              <div className="p-3 sm:p-4 rounded-xl border bg-slate-800/70 border-slate-700 hover:border-blue-400 hover:bg-slate-800 transition-all">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                  <span className="font-bold text-blue-400 font-mono text-xs sm:text-sm">
                                    {item.isNumber}
                                  </span>
                                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold self-start sm:self-auto">
                                    Relevance: {item.relevance}%
                                  </span>
                                </div>
                                <p className="text-xs text-slate-300 font-sans mt-1">
                                  {item.title}
                                </p>
                                
                                {/* Sub-tree Metadata Branch Details */}
                                <div className="mt-2.5 pt-2 border-t border-slate-700/50 pl-2 space-y-1 text-xs text-slate-400 font-mono">
                                  <div className="flex items-center space-x-1.5">
                                    <span className="text-slate-600">├──</span>
                                    <span className="text-slate-500">Relevance:</span>
                                    <strong className="text-blue-300">{item.relevance}%</strong>
                                  </div>
                                  {item.referencedClause && (
                                    <div className="flex items-center space-x-1.5">
                                      <span className="text-slate-600">├──</span>
                                      <span className="text-slate-500">Clause:</span>
                                      <strong className="text-amber-300">{item.referencedClause}</strong>
                                    </div>
                                  )}
                                  <div className="flex items-center space-x-1.5">
                                    <span className="text-slate-600">└──</span>
                                    <span className="text-slate-500">Status:</span>
                                    <strong className="text-emerald-400">{item.status}</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. 🧪 Test Methods Branch */}
                  {treeDataByCategory['Test Method']?.length > 0 && (
                    <div className="relative pt-2">
                      <div className="absolute -left-[14px] sm:-left-[26px] top-4 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                      
                      <div
                        onClick={() => toggleCategory('Test Method')}
                        className="flex items-center space-x-2 py-1.5 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors w-fit select-none"
                      >
                        <span className="text-sm">🧪</span>
                        <span className="font-bold text-amber-300">Test Methods</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                          {treeDataByCategory['Test Method'].length}
                        </span>
                        <span className="text-slate-400 text-xs pl-1">
                          {expandedCategories['Test Method'] ? '▾' : '▸'}
                        </span>
                      </div>

                      {expandedCategories['Test Method'] && (
                        <div className="pl-4 sm:pl-7 border-l-2 border-slate-700/60 ml-3 sm:ml-4 mt-2.5 space-y-2.5">
                          {treeDataByCategory['Test Method'].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[18px] sm:-left-[30px] top-3.5 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                              
                              <div className="p-3 rounded-xl border bg-slate-800/70 border-slate-700 hover:border-amber-400 hover:bg-slate-800 transition-all flex items-center justify-between">
                                <div className="truncate mr-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-bold text-amber-300 font-mono text-xs sm:text-sm">
                                      {item.isNumber}
                                    </span>
                                    <span className="text-slate-500">—</span>
                                    <span className="text-slate-300 text-xs font-sans truncate">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded shrink-0 font-mono">
                                  {item.relevance}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. 📖 Terminology Standards Branch */}
                  {treeDataByCategory['Terminology']?.length > 0 && (
                    <div className="relative pt-2">
                      <div className="absolute -left-[14px] sm:-left-[26px] top-4 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                      
                      <div
                        onClick={() => toggleCategory('Terminology')}
                        className="flex items-center space-x-2 py-1.5 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors w-fit select-none"
                      >
                        <span className="text-sm">📖</span>
                        <span className="font-bold text-purple-300">Terminology Standards</span>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-mono">
                          {treeDataByCategory['Terminology'].length}
                        </span>
                        <span className="text-slate-400 text-xs pl-1">
                          {expandedCategories['Terminology'] ? '▾' : '▸'}
                        </span>
                      </div>

                      {expandedCategories['Terminology'] && (
                        <div className="pl-4 sm:pl-7 border-l-2 border-slate-700/60 ml-3 sm:ml-4 mt-2.5 space-y-2.5">
                          {treeDataByCategory['Terminology'].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[18px] sm:-left-[30px] top-3.5 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                              
                              <div className="p-3 rounded-xl border bg-slate-800/70 border-slate-700 hover:border-purple-400 hover:bg-slate-800 transition-all flex items-center justify-between">
                                <div className="truncate mr-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-bold text-purple-300 font-mono text-xs sm:text-sm">
                                      {item.isNumber}
                                    </span>
                                    <span className="text-slate-500">—</span>
                                    <span className="text-slate-300 text-xs font-sans truncate">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded shrink-0 font-mono">
                                  {item.relevance}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. 🛡️ Safety Standards Branch */}
                  {treeDataByCategory['Safety']?.length > 0 && (
                    <div className="relative pt-2">
                      <div className="absolute -left-[14px] sm:-left-[26px] top-4 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                      
                      <div
                        onClick={() => toggleCategory('Safety')}
                        className="flex items-center space-x-2 py-1.5 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors w-fit select-none"
                      >
                        <span className="text-sm">🛡️</span>
                        <span className="font-bold text-emerald-300">Safety Standards</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                          {treeDataByCategory['Safety'].length}
                        </span>
                        <span className="text-slate-400 text-xs pl-1">
                          {expandedCategories['Safety'] ? '▾' : '▸'}
                        </span>
                      </div>

                      {expandedCategories['Safety'] && (
                        <div className="pl-4 sm:pl-7 border-l-2 border-slate-700/60 ml-3 sm:ml-4 mt-2.5 space-y-2.5">
                          {treeDataByCategory['Safety'].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[18px] sm:-left-[30px] top-3.5 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                              
                              <div className="p-3 rounded-xl border bg-slate-800/70 border-slate-700 hover:border-emerald-400 hover:bg-slate-800 transition-all flex items-center justify-between">
                                <div className="truncate mr-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-bold text-emerald-300 font-mono text-xs sm:text-sm">
                                      {item.isNumber}
                                    </span>
                                    <span className="text-slate-500">—</span>
                                    <span className="text-slate-300 text-xs font-sans truncate">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded shrink-0 font-mono">
                                  {item.relevance}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 5. 🔧 Installation / Application Branch */}
                  {treeDataByCategory['Installation / Application']?.length > 0 && (
                    <div className="relative pt-2">
                      <div className="absolute -left-[14px] sm:-left-[26px] top-4 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                      
                      <div
                        onClick={() => toggleCategory('Installation / Application')}
                        className="flex items-center space-x-2 py-1.5 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors w-fit select-none"
                      >
                        <span className="text-sm">🔧</span>
                        <span className="font-bold text-indigo-300">Installation / Application</span>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                          {treeDataByCategory['Installation / Application'].length}
                        </span>
                        <span className="text-slate-400 text-xs pl-1">
                          {expandedCategories['Installation / Application'] ? '▾' : '▸'}
                        </span>
                      </div>

                      {expandedCategories['Installation / Application'] && (
                        <div className="pl-4 sm:pl-7 border-l-2 border-slate-700/60 ml-3 sm:ml-4 mt-2.5 space-y-2.5">
                          {treeDataByCategory['Installation / Application'].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[18px] sm:-left-[30px] top-3.5 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                              
                              <div className="p-3 rounded-xl border bg-slate-800/70 border-slate-700 hover:border-indigo-400 hover:bg-slate-800 transition-all flex items-center justify-between">
                                <div className="truncate mr-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-bold text-indigo-300 font-mono text-xs sm:text-sm">
                                      {item.isNumber}
                                    </span>
                                    <span className="text-slate-500">—</span>
                                    <span className="text-slate-300 text-xs font-sans truncate">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded shrink-0 font-mono">
                                  {item.relevance}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 6. 🔗 Related Product Standards Branch */}
                  {treeDataByCategory['Related Product Standards']?.length > 0 && (
                    <div className="relative pt-2">
                      <div className="absolute -left-[14px] sm:-left-[26px] top-4 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                      
                      <div
                        onClick={() => toggleCategory('Related Product Standards')}
                        className="flex items-center space-x-2 py-1.5 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg cursor-pointer transition-colors w-fit select-none"
                      >
                        <span className="text-sm">🔗</span>
                        <span className="font-bold text-cyan-300">Related Product Standards</span>
                        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono">
                          {treeDataByCategory['Related Product Standards'].length}
                        </span>
                        <span className="text-slate-400 text-xs pl-1">
                          {expandedCategories['Related Product Standards'] ? '▾' : '▸'}
                        </span>
                      </div>

                      {expandedCategories['Related Product Standards'] && (
                        <div className="pl-4 sm:pl-7 border-l-2 border-slate-700/60 ml-3 sm:ml-4 mt-2.5 space-y-2.5">
                          {treeDataByCategory['Related Product Standards'].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[18px] sm:-left-[30px] top-3.5 w-3.5 sm:w-6 h-0.5 bg-slate-700" />
                              
                              <div className="p-3 rounded-xl border bg-slate-800/70 border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all flex items-center justify-between">
                                <div className="truncate mr-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-bold text-cyan-300 font-mono text-xs sm:text-sm">
                                      {item.isNumber}
                                    </span>
                                    <span className="text-slate-500">—</span>
                                    <span className="text-slate-300 text-xs font-sans truncate">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded shrink-0 font-mono">
                                  {item.relevance}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
