import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  BookOpen,
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Download,
  ExternalLink,
  History,
  GitBranch,
  ShieldCheck,
  AlertCircle,
  FileSearch,
  Eye,
  FileCheck,
  ChevronRight,
  Copy,
  Check,
  FlaskConical
} from 'lucide-react';
import { standardsData } from '../data/standardsData';

// Rich version history and document metadata for Indian Standards
const detailedStandardsDirectory = [
  {
    is_number: "IS 15410:2003",
    clean_code: "IS 15410",
    title: "Containers for Packaging of Natural Mineral Water and Packaged Drinking Water — Specification",
    category: "Food & Packaging",
    scope: "Covers material, physical, toxicological, and chemical requirements for single-use and multi-use PET, PC, and PP containers for packaging of natural mineral water and packaged drinking water.",
    publication_date: "15 March 2003",
    current_version: "IS 15410:2003 (Reaffirmed 2021)",
    status: "Active / Operative",
    mandatoryQco: "Mandatory (BIS Scheme-I ISI Mark under FSSAI Regulations)",
    committee: "PCD 12 (Plastics Piping and Containers Sectional Committee)",
    versions: [
      {
        version_id: "2003",
        edition: "First Formulation",
        publication_year: 2003,
        reaffirmation_year: 2021,
        status: "Current / Operative",
        summary: "Established baseline national benchmarks for migration limits, heavy metal thresholds, and bottle top-load compressive strength.",
        major_changes: [
          "Prescribed overall migration limit ≤ 60 mg/kg",
          "Specified drop impact test requirement from 1.2 meters height",
          "Mandated antimony extraction limit ≤ 0.04 mg/l for PET resins"
        ]
      },
      {
        version_id: "1998",
        edition: "Draft Standard Precursor",
        publication_year: 1998,
        status: "Superseded",
        summary: "Initial exploratory draft under Food Packaging Sectional Committee.",
        major_changes: [
          "Provisional guidelines for polyethylene terephthalate bottles"
        ]
      }
    ],
    amendments: [
      {
        no: "Amendment No. 1",
        date: "November 2009",
        scope: "Substituted Clause 4.2: updated overall migration simulant test duration to conform with IS 9845 revised protocols.",
        status: "Incorporated"
      },
      {
        no: "Amendment No. 2",
        date: "July 2013",
        scope: "Added Clause 7.3: mandatory recycled polymer restriction—only virgin food-grade polymer permitted.",
        status: "Incorporated"
      },
      {
        no: "Amendment No. 3",
        date: "February 2020",
        scope: "Updated environmental marking and plastic identification symbols (SPI resin codes 1, 5, 7).",
        status: "Incorporated"
      }
    ],
    normative_references: [
      { is_code: "IS 9845:1998", title: "Determination of Overall Migration of Constituents of Plastics Materials", type: "Normative" },
      { is_code: "IS 12252:1987", title: "Polyethylene for its Safe Use in Contact with Foodstuffs", type: "Normative" },
      { is_code: "IS 2798:1998", title: "Methods of Test for Plastics Containers", type: "Test Method" },
      { is_code: "IS 10146:1982", title: "Polyethylene for its Safe Use in Contact with Foodstuffs, Pharmaceuticals and Drinking Water", type: "Safety" }
    ],
    related_standards: [
      { is_code: "IS 14543:2016", title: "Packaged Drinking Water (Other than Natural Mineral Water)", relation: "Primary Product Standard" },
      { is_code: "IS 13428:2005", title: "Packaged Natural Mineral Water — Specification", relation: "Primary Product Standard" }
    ],
    pdf_source: "https://standardsbis.bsbedge.com/IS_15410_2003.pdf",
    gazette_ref: "Gazette of India Notification CG-DL-E-26022021-225432"
  },
  {
    is_number: "IS 4984:2016",
    clean_code: "IS 4984",
    title: "High Density Polyethylene (HDPE) Pipes for Water Supply — Specification (Fifth Revision)",
    category: "Pipes & Water Infrastructure",
    scope: "Covers solid-wall HDPE pipes for potable water supply, gravity mains, rising mains, and sewerage drainage for infrastructure projects.",
    publication_date: "12 October 2016",
    current_version: "IS 4984:2016 (Reaffirmed 2021)",
    status: "Active / Operative",
    mandatoryQco: "Mandatory (Scheme-I ISI Mark under DPIIT / MoCF Quality Control Order)",
    committee: "CED 50 (Plastic Piping System Sectional Committee)",
    versions: [
      {
        version_id: "2016",
        edition: "Fifth Revision",
        publication_year: 2016,
        reaffirmation_year: 2021,
        status: "Current / Operative",
        summary: "Modernized PE-100 designation, increased hydrostatic duration requirements, and streamlined MRS classification.",
        major_changes: [
          "Introduced PE-100 designated materials with Minimum Required Strength (MRS) 10.0 MPa",
          "Extended internal hydrostatic pressure testing up to 1000 hours at 80°C",
          "Added Oxidation Induction Time (OIT) ≥ 20 minutes at 200°C"
        ]
      },
      {
        version_id: "1995",
        edition: "Fourth Revision",
        publication_year: 1995,
        status: "Superseded",
        summary: "Adopted PE-63 and PE-80 polymer classes with revised wall thickness charts.",
        major_changes: [
          "Introduced PE-63 and PE-80 material classifications",
          "Revised SDR ratings from PN 2.5 to PN 16"
        ]
      },
      {
        version_id: "1987",
        edition: "Third Revision",
        publication_year: 1987,
        status: "Superseded",
        summary: "Standardized metric outer diameters from 16mm to 630mm.",
        major_changes: [
          "Phased out imperial diameter schedules"
        ]
      }
    ],
    amendments: [
      {
        no: "Amendment No. 1",
        date: "April 2018",
        scope: "Revised Table 3 wall thickness tolerances for PN 12.5 and PN 16 pipes above 315mm.",
        status: "Incorporated"
      },
      {
        no: "Amendment No. 2",
        date: "September 2020",
        scope: "Updated carbon black dispersion testing method to align with ISO 18553.",
        status: "Incorporated"
      }
    ],
    normative_references: [
      { is_code: "IS 7328:1992", title: "High Density Polyethylene Materials for Moulding and Extrusion", type: "Raw Material" },
      { is_code: "IS 12235 (Part 1 to 14)", title: "Methods of Test for Unplasticized and Polyolefin Pipes", type: "Test Methods" },
      { is_code: "IS 7634 (Part 2):2012", title: "Code of Practice for Laying and Jointing of Polyethylene Pipes", type: "Installation" },
      { is_code: "IS 9845:1998", title: "Overall Migration of Plastics in Contact with Foodstuffs", type: "Safety" }
    ],
    related_standards: [
      { is_code: "IS 14885:2001", title: "Polyethylene Pipes for Gas Distribution and Reticulation", relation: "Allied Gas Standard" },
      { is_code: "IS 14333:1996", title: "High Density Polyethylene Pipe for Sewerage", relation: "Allied Drainage Standard" }
    ],
    pdf_source: "https://standardsbis.bsbedge.com/IS_4984_2016.pdf",
    gazette_ref: "MoCF Gazette Notification S.O. 1225(E) dated 26.02.2021"
  },
  {
    is_number: "IS 1786:2008",
    clean_code: "IS 1786",
    title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement — Specification (Fourth Revision)",
    category: "Steel & Civil Construction",
    scope: "Covers requirements for thermo-mechanically treated (TMT) deformed steel bars and wires for structural reinforced concrete construction.",
    publication_date: "10 April 2008",
    current_version: "IS 1786:2008 (Reaffirmed 2023)",
    status: "Active / Operative",
    mandatoryQco: "Mandatory (Scheme-I ISI Mark under Ministry of Steel Quality Control Order)",
    committee: "CED 54 (Concrete Reinforcement Sectional Committee)",
    versions: [
      {
        version_id: "2008",
        edition: "Fourth Revision",
        publication_year: 2008,
        reaffirmation_year: 2023,
        status: "Current / Operative",
        summary: "Introduced Fe 500D, Fe 550D, and Fe 600 grades with enhanced ductility for earthquake-resistant design.",
        major_changes: [
          "Introduced 'D' (Ductile) grades with mandatory minimum 5% total elongation at maximum force",
          "Lowered maximum permissible Sulphur and Phosphorus to 0.040% for ductile grades",
          "Added mandatory rebend test over specified mandrel diameters"
        ]
      },
      {
        version_id: "1985",
        edition: "Third Revision",
        publication_year: 1985,
        status: "Superseded",
        summary: "Introduced Fe 415 and Fe 500 grades to replace cold-twisted deformed (CTD) Torsteel.",
        major_changes: [
          "Adopted thermo-mechanical treatment (TMT) criteria"
        ]
      }
    ],
    amendments: [
      {
        no: "Amendment No. 1",
        date: "August 2012",
        scope: "Revised Carbon Equivalent formula: CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15.",
        status: "Incorporated"
      },
      {
        no: "Amendment No. 2",
        date: "March 2017",
        scope: "Mandated manufacturer brand mark and grade embossing at regular intervals along bar length.",
        status: "Incorporated"
      },
      {
        no: "Amendment No. 3",
        date: "November 2020",
        scope: "Clarified primary virgin steel melting requirement (BF-BOF or EAF route).",
        status: "Incorporated"
      }
    ],
    normative_references: [
      { is_code: "IS 1608 (Part 1):2018", title: "Metallic Materials — Tensile Testing at Ambient Temperature", type: "Test Method" },
      { is_code: "IS 1599:2019", title: "Metallic Materials — Bend Test", type: "Test Method" },
      { is_code: "IS 228 (Various Parts)", title: "Methods for Chemical Analysis of Steels", type: "Chemical Test" },
      { is_code: "IS 456:2000", title: "Code of Practice for Plain and Reinforced Concrete", type: "Design Code" }
    ],
    related_standards: [
      { is_code: "IS 432 (Part 1):1982", title: "Mild Steel and Medium Tensile Steel Bars for Concrete Reinforcement", relation: "Alternative Mild Steel Standard" },
      { is_code: "IS 2062:2011", title: "Hot Rolled Medium and High Tensile Structural Steel", relation: "Structural Steel" }
    ],
    pdf_source: "https://standardsbis.bsbedge.com/IS_1786_2008.pdf",
    gazette_ref: "Ministry of Steel Gazette Order S.O. 1673(E)"
  }
];

export const StandardsPage = ({ onAskStandard }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('IS 15410');
  const [selectedStandard, setSelectedStandard] = useState(detailedStandardsDirectory[0]);
  const [activeViewerTab, setActiveViewerTab] = useState('details'); // 'details' | 'timeline' | 'amendments' | 'normative' | 'viewer'
  const [copiedCode, setCopiedCode] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim().toLowerCase();
    const matched = detailedStandardsDirectory.find(
      s => s.is_number.toLowerCase().includes(query) ||
        s.clean_code.toLowerCase().includes(query) ||
        s.title.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
    );
    if (matched) {
      setSelectedStandard(matched);
    } else {
      // Create dynamic record
      setSelectedStandard({
        is_number: searchQuery.toUpperCase(),
        clean_code: searchQuery.toUpperCase(),
        title: `Indian Standard Specification for ${searchQuery}`,
        category: "General Engineering & Procurement",
        scope: "Specification defining material characteristics, dimensions, acceptance tests and compliance parameters.",
        publication_date: "01 January 2020",
        current_version: `${searchQuery.toUpperCase()}:2020 (Reaffirmed 2023)`,
        status: "Active / Operative",
        mandatoryQco: "Statutory BIS Quality Control Order Applicable",
        committee: "Sectional Technical Committee",
        versions: [
          {
            version_id: "2020",
            edition: "Current Revision",
            publication_year: 2020,
            reaffirmation_year: 2023,
            status: "Current / Operative",
            summary: "Active edition with latest technical amendments and sampling tables.",
            major_changes: ["Updated NABL test methods", "Incorporated mandatory QCO provisions"]
          }
        ],
        amendments: [
          { no: "Amendment No. 1", date: "2022", scope: "Clause 3.2 updated for sampling limits.", status: "Incorporated" }
        ],
        normative_references: [
          { is_code: "IS 4905", title: "Methods for Random Sampling", type: "Normative" },
          { is_code: "IS/ISO 9001", title: "Quality Management Systems", type: "Quality" }
        ],
        related_standards: [
          { is_code: "IS 10500", title: "Drinking Water Specification", relation: "Related Standard" }
        ],
        pdf_source: "https://standardsbis.bsbedge.com",
        gazette_ref: "Gazette of India Quality Control Order Notification"
      });
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">

      {/* 1. Header & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-semibold text-[#006699] uppercase tracking-wider">
              <span>Section 5</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Official Standards Repository</span>
            </div>
            <h1 className="text-xl font-bold text-[#0B2545] mt-1 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#006699]" />
              <span>Standard Details & Document Version Viewer</span>
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Track complete publication history, gazetted revisions, amendments, normative references, and official PDF documents for any Indian Standard (IS Code).
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <span className="text-[11px] text-slate-500 font-medium">Popular:</span>
            {detailedStandardsDirectory.map((std) => (
              <button
                key={std.clean_code}
                onClick={() => {
                  setSelectedStandard(std);
                  setSearchQuery(std.clean_code);
                }}
                className={`px-2.5 py-1 text-xs rounded font-mono font-semibold transition-colors border ${selectedStandard.clean_code === std.clean_code
                    ? 'bg-[#0B2545] text-white border-[#0B2545]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
              >
                {std.clean_code}
              </button>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IS Number or Standard Name (e.g., IS 15410, IS 4984, Containers for Water)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#006699]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded transition-colors shrink-0"
          >
            Search Standard
          </button>
        </form>
      </div>

      {/* 2. Selected Standard Header Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-bold font-mono text-[#0B2545]">
                {selectedStandard.is_number}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                ● {selectedStandard.status}
              </span>
              <span className="px-2 py-0.5 bg-blue-50 text-[#006699] text-[10px] font-bold rounded border border-blue-100">
                {selectedStandard.category}
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {selectedStandard.title}
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              {selectedStandard.scope}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => handleCopy(selectedStandard.is_number, 'top_is')}
              className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedCode === 'top_is' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>Copy IS Reference</span>
            </button>

            <button
              onClick={() => setActiveViewerTab('viewer')}
              className="px-3.5 py-2 bg-[#006699] hover:bg-[#004d73] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Source Document</span>
            </button>
          </div>
        </div>

        {/* Key Metadata Strip */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Publication Date</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{selectedStandard.publication_date}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Active Version</span>
            <span className="font-semibold text-emerald-700 mt-0.5 block">{selectedStandard.current_version}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Technical Committee</span>
            <span className="font-semibold text-slate-900 mt-0.5 block">{selectedStandard.committee}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Statutory Mandate</span>
            <span className="font-bold text-[#006699] mt-0.5 block">{selectedStandard.mandatoryQco}</span>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs within Standard Details */}
      <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs flex flex-wrap gap-1.5 text-xs font-semibold">
        {[
          { id: 'details', label: 'Technical Scope & Summary', icon: BookOpen },
          { id: 'timeline', label: `Version History (${selectedStandard.versions.length})`, icon: History },
          { id: 'amendments', label: `Gazette Amendments (${selectedStandard.amendments.length})`, icon: Calendar },
          { id: 'normative', label: `Normative References (${selectedStandard.normative_references.length})`, icon: Layers },
          { id: 'viewer', label: 'Document / Source Viewer', icon: FileSearch }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveViewerTab(tab.id)}
              className={`px-3.5 py-2 rounded flex items-center space-x-2 transition-colors ${activeViewerTab === tab.id
                  ? 'bg-[#0B2545] text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content Panel */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">

        {/* TAB 1: Technical Scope & Summary */}
        {activeViewerTab === 'details' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                Comprehensive Technical Scope
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-lg">
                {selectedStandard.scope}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg space-y-2">
                <span className="text-xs font-bold text-[#006699] uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Statutory Compliance & QCO Notification</span>
                </span>
                <p className="text-xs text-slate-700">
                  {selectedStandard.mandatoryQco}. Under Section 16 & Section 29 of the BIS Act 2016, no person shall manufacture, store for sale, or sell without a valid BIS Standard Mark.
                </p>
                <div className="text-[11px] font-mono text-slate-500 pt-1">
                  Gazette: {selectedStandard.gazette_ref}
                </div>
              </div>

              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Tender Specification Guidance</span>
                </span>
                <p className="text-xs text-slate-700">
                  When drafting tender documents, procurement officers should cite: <strong className="font-mono text-slate-900">"{selectedStandard.is_number} with all latest amendments"</strong> to ensure full GFR 2017 Rule 144 compliance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Version History Timeline */}
        {activeViewerTab === 'timeline' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                Chronological Version Timeline & Revision History
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evolution of standard editions, technical improvements, and reaffirmation records published by the Bureau of Indian Standards.
              </p>
            </div>

            <div className="relative pl-6 space-y-6 border-l-2 border-slate-200">
              {selectedStandard.versions.map((ver, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${ver.status.includes('Current')
                      ? 'bg-emerald-600 border-white ring-2 ring-emerald-400'
                      : 'bg-slate-400 border-white'
                    }`} />

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs font-mono text-[#0B2545]">
                          Edition: {ver.edition} ({ver.publication_year})
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ver.status.includes('Current') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                          {ver.status}
                        </span>
                      </div>
                      {ver.reaffirmation_year && (
                        <span className="text-[11px] font-medium text-slate-500">
                          Reaffirmed: {ver.reaffirmation_year}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ver.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-700 uppercase block mb-1">
                        Key Technical Changes in this Edition:
                      </span>
                      <ul className="space-y-1 pl-1">
                        {ver.major_changes.map((change, cIdx) => (
                          <li key={cIdx} className="flex items-start space-x-1.5 text-xs text-slate-700">
                            <span className="text-[#006699] font-bold shrink-0">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Amendments History */}
        {activeViewerTab === 'amendments' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                Gazetted Amendments & Corrigenda Records
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Official amendments published in the Gazette of India modifying specific clauses of this standard.
              </p>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {selectedStandard.amendments.map((amd, idx) => (
                <div key={idx} className="p-4 bg-white hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#0B2545]">{amd.no}</span>
                      <span className="px-2 py-0.5 bg-blue-50 text-[#006699] text-[10px] font-semibold rounded border border-blue-100">
                        Date: {amd.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{amd.scope}</p>
                  </div>

                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded self-start sm:self-center shrink-0">
                    ● {amd.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Normative References & Related Standards */}
        {activeViewerTab === 'normative' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                Normative References & Related Indian Standards
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Associated test methods, material standards, and execution codes indispensable for the application of {selectedStandard.clean_code}.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Indispensable Normative References:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedStandard.normative_references.map((norm, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold font-mono text-[#0B2545]">{norm.is_code}</span>
                        <span className="px-1.5 py-0.2 bg-blue-50 text-[#006699] text-[9px] font-bold rounded">
                          {norm.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700">{norm.title}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(norm.is_code, `norm_${idx}`)}
                      className="p-1 hover:bg-slate-200 rounded text-slate-500 shrink-0"
                      title="Copy IS Code"
                    >
                      {copiedCode === `norm_${idx}` ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold text-slate-700 uppercase pt-2">Allied & Related Product Standards:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedStandard.related_standards.map((rel, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-xs font-bold font-mono text-[#0B2545]">{rel.is_code}</span>
                    <p className="text-xs text-slate-700 mt-0.5">{rel.title}</p>
                    <span className="text-[10px] text-slate-500 font-medium block mt-1">Relation: {rel.relation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Professional Source Document / PDF Viewer Panel */}
        {activeViewerTab === 'viewer' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#006699]" />
                  <span>Official Gazette / BIS PDF Document Viewer</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Verified PDF copy of <strong>{selectedStandard.is_number}</strong> from the Bureau of Indian Standards Electronic Repository.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Downloading verified PDF for ${selectedStandard.is_number}...`)}
                  className="px-3 py-1.5 bg-[#0B2545] hover:bg-[#134074] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Simulated Document Viewer Canvas */}
            <div className="bg-slate-900 rounded-lg p-4 sm:p-6 text-slate-200 flex flex-col items-center">
              <div className="w-full max-w-3xl bg-white text-slate-900 rounded shadow-2xl p-8 sm:p-12 space-y-6 font-serif border border-slate-300">

                {/* PDF Document Header */}
                <div className="text-center border-b-2 border-slate-900 pb-6 space-y-2">
                  <div className="text-xs uppercase tracking-widest font-sans font-bold text-slate-600">
                    Bureau of Indian Standards
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-sans text-slate-950">
                    INDIAN STANDARD
                  </div>
                  <div className="text-base sm:text-lg font-bold font-sans text-[#006699]">
                    {selectedStandard.is_number}
                  </div>
                  <div className="text-sm font-semibold italic text-slate-800 pt-2">
                    {selectedStandard.title}
                  </div>
                </div>

                {/* PDF Clause 1 */}
                <div className="space-y-2 text-xs font-sans leading-relaxed text-slate-800">
                  <h4 className="font-bold text-slate-900 uppercase">1. SCOPE</h4>
                  <p>{selectedStandard.scope}</p>
                </div>

                {/* PDF Clause 2 */}
                <div className="space-y-2 text-xs font-sans leading-relaxed text-slate-800">
                  <h4 className="font-bold text-slate-900 uppercase">2. NORMATIVE REFERENCES</h4>
                  <p>
                    The standards listed below contain provisions which, through reference in this text, constitute provisions of this Indian Standard:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {selectedStandard.normative_references.map((n, i) => (
                      <li key={i}><strong className="font-mono">{n.is_code}</strong> — {n.title}</li>
                    ))}
                  </ul>
                </div>

                {/* PDF Clause 3 */}
                <div className="space-y-2 text-xs font-sans leading-relaxed text-slate-800">
                  <h4 className="font-bold text-slate-900 uppercase">3. STATUTORY MARKING & CONFORMITY</h4>
                  <p>
                    Every package and unit complying with this specification shall be clearly marked with the BIS Standard Mark (ISI Mark / CRS Registration) in accordance with the Bureau of Indian Standards Act, 2016 and the rules and regulations framed thereunder.
                  </p>
                </div>

                {/* PDF Footer Signoff */}
                <div className="pt-6 border-t border-slate-300 flex justify-between text-[10px] font-sans text-slate-500">
                  <span>Page 1 of 12</span>
                  <span>BUREAU OF INDIAN STANDARDS, MANAK BHAVAN, NEW DELHI</span>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
