import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink, 
  Copy, 
  Check, 
  FileText, 
  Download, 
  Plus, 
  Trash2, 
  SplitSquareVertical, 
  ShieldCheck, 
  Layers, 
  HelpCircle,
  Search
} from 'lucide-react';
import { procurementCategories } from '../data/procurementData';

// Comprehensive comparison dataset of standard benchmarks across sectors
const comparisonCatalogue = [
  {
    is_code: 'IS 4984:2016',
    title: 'High Density Polyethylene (HDPE) Pipes for Water Supply — Specification (Fifth Revision)',
    scope: 'Covers solid-wall HDPE pipes for potable water distribution, sewerage, and industrial applications (20mm to 1000mm diameter).',
    applicability: 'Potable water supply, gravity flow mains, rising mains, municipal water infrastructure under Jal Jeevan Mission.',
    materialGrade: 'PE 63, PE 80, PE 100 virgin grade polymer with MRS 6.3, 8.0, and 10.0 MPa.',
    pressureRatings: 'PN 2.5, PN 4.0, PN 6.0, PN 10.0, PN 12.5, PN 16.0 bar.',
    keyTechnicalReqs: [
      'Carbon black content: 2.0 to 2.5% uniformly dispersed (grade ≤ 3)',
      'Density at 27°C: 940.0 to 958.0 kg/m³',
      'Melt Flow Index (MFI): 0.2 to 1.1 g/10 min at 190°C/5kg load',
      'Elongation at break: Minimum 350%'
    ],
    testRequirements: [
      'Internal Hydrostatic Pressure Test at 27°C (100h / 165h)',
      'Hydrostatic Test at 80°C (165h & 1000h)',
      'Oxidation Induction Time (OIT) ≥ 20 mins at 200°C',
      'Reversion test ≤ 3%'
    ],
    testStandardRefs: 'IS 12235 (Part 1, 2, 5 & 8)',
    latestVersion: 'IS 4984:2016 (Reaffirmed 2021)',
    previousVersions: '1995 (4th Rev), 1987 (3rd Rev), 1978 (2nd Rev)',
    amendments: 'Amendment No. 1 (2018), Amendment No. 2 (2020)',
    certificationApplicability: 'MANDATORY (Scheme-I ISI Mark under MoCF Quality Control Order)',
    qcoNotification: 'S.O. 1225(E) dated 26.02.2021 (DPIIT / MoCF)',
    category: 'pipes'
  },
  {
    is_code: 'IS 14885:2001',
    title: 'Polyethylene (PE) Pipes for Gas Distribution and Reticulation — Specification',
    scope: 'Covers polyethylene pipes for underground conveying of City Gas Distribution (CGD), natural gas, and LPG at temperatures from -20°C to +40°C.',
    applicability: 'City Gas Distribution networks, PNG domestic connections, PNGRB authorized gas distribution grids.',
    materialGrade: 'PE 80 (Yellow) and PE 100 (Orange/Black with stripes), specifically stabilized against hydrocarbon permeation.',
    pressureRatings: 'Maximum Operating Pressure (MOP) up to 4 bar (PE 80) and up to 7 bar (PE 100).',
    keyTechnicalReqs: [
      'Yellow/Orange masterbatch with UV light stabilizer',
      'Volatile content ≤ 350 mg/kg',
      'Melt Flow Index (MFI) change after processing ≤ 20%',
      'Resistance to rapid crack propagation (RCP) at 0°C'
    ],
    testRequirements: [
      'Slow Crack Growth (SCG) Notch Test ≥ 500 hours at 80°C',
      'Rapid Crack Propagation (Critical Pressure Pc ≥ 10 bar)',
      'Resistance to gas constituents & condensate',
      'Tensile yield stress ≥ 19 MPa (PE 80), ≥ 25 MPa (PE 100)'
    ],
    testStandardRefs: 'IS 12235, ISO 13477, ISO 13479',
    latestVersion: 'IS 14885:2001 (Reaffirmed 2020)',
    previousVersions: 'First Formulation (2001)',
    amendments: 'Amendment No. 1 (2009), Amendment No. 2 (2015)',
    certificationApplicability: 'MANDATORY (Scheme-I ISI Mark under PNGRB & DPIIT QCO)',
    qcoNotification: 'PNGRB T4S Regulations 2020 & Gazette QCO 2021',
    category: 'pipes'
  },
  {
    is_code: 'IS 10322 (Part 5/Sec 3):2012',
    title: 'Luminaires: Particular Requirements — Luminaires for Road and Street Lighting',
    scope: 'Covers safety, photometric, and constructional requirements for LED streetlights and outdoor roadway luminaires.',
    applicability: 'Municipal street lighting, national highways (NHAI), smart cities, CPWD outdoor illumination tenders.',
    materialGrade: 'High pressure die-cast aluminum housing (ADC12), toughened glass cover (IK08+), IP66 ingress protection.',
    pressureRatings: 'N/A (Operates at 140V - 280V AC 50Hz, withstands 440V for 8 hours).',
    keyTechnicalReqs: [
      'System efficacy: Minimum 120 - 140 lumens/Watt',
      'Power Factor (PF) ≥ 0.95, Total Harmonic Distortion (THD) < 10%',
      'Surge Protection Device (SPD) ≥ 10 kV / 10 kA integral',
      'CCT: 4000K / 5700K with CRI ≥ 70'
    ],
    testRequirements: [
      'IP66 Ingress Protection test as per IS/IEC 60529',
      'IK08 Impact Resistance test as per IS 10322 (Part 1)',
      'Thermal Endurance and Operating Temperature test (-10°C to +50°C)',
      'Photometric light distribution and lumen maintenance (LM80 / LM79)'
    ],
    testStandardRefs: 'IS 16103 (Part 1 & 2), IS 15885 (Part 2/Sec 13)',
    latestVersion: 'IS 10322 (Part 5/Sec 3):2012 (Reaffirmed 2022)',
    previousVersions: 'IS 10322 (Part 5/Sec 3):1987',
    amendments: 'Amendment No. 1 (2016), Amendment No. 2 (2019)',
    certificationApplicability: 'MANDATORY (CRS Registration under MeitY CRO / Scheme-II)',
    qcoNotification: 'MeitY Electronics & IT Goods Order (CRO Phase-II)',
    category: 'electronics'
  },
  {
    is_code: 'IS 1786:2008',
    title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement — Specification',
    scope: 'Covers thermo-mechanically treated (TMT) steel bars and wires for structural reinforced concrete work (Fe 415, Fe 500, Fe 550, Fe 600).',
    applicability: 'Bridges, dams, CPWD civil constructions, railway structures, metro viaducts, seismic-resistant designs.',
    materialGrade: 'Primary steel melted from virgin iron ore in BF-BOF or EAF route (no re-rolled scrap).',
    pressureRatings: 'Yield Strength: 415 to 600 N/mm²; Ultimate Tensile Strength: 485 to 660 N/mm².',
    keyTechnicalReqs: [
      'Carbon equivalent (CE) ≤ 0.42% for Fe 500D (superior weldability)',
      'Phosphorus (P) and Sulphur (S) ≤ 0.040% each for D (Ductile) grade',
      'Total Elongation (Agt) at maximum force ≥ 5% (Fe 500D)',
      'Uniform rib height and spacing for high bond strength'
    ],
    testRequirements: [
      'Tensile and 0.2% Proof Stress verification as per IS 1608',
      'Bend and Rebend Test (180° / 135° over mandrel) without crack',
      'Chemical Spectrometry analysis for C, S, P, CE',
      'Corrosion resistance and cross-sectional area tolerance'
    ],
    testStandardRefs: 'IS 1608 (Part 1), IS 1599, IS 228',
    latestVersion: 'IS 1786:2008 (Fourth Revision, Reaffirmed 2023)',
    previousVersions: '1985 (3rd Rev), 1979 (2nd Rev), 1966 (1st Rev)',
    amendments: 'Amendment No. 1 (2012), Amendment No. 2 (2017), Amendment No. 3 (2020)',
    certificationApplicability: 'MANDATORY (Scheme-I ISI Mark under Ministry of Steel QCO)',
    qcoNotification: 'Ministry of Steel QCO S.O. 1673(E) dated 27.05.2016',
    category: 'steel'
  },
  {
    is_code: 'IS 15410:2003',
    title: 'Containers for Packaging of Natural Mineral Water and Packaged Drinking Water — Specification',
    scope: 'Requirements for PET, PC, and PP containers for packaging of natural mineral water and packaged drinking water.',
    applicability: 'Packaged drinking water plants, IRCTC Rail Neer procurement, hospital food & water supply tenders.',
    materialGrade: 'Food-grade virgin polymers conforming to IS 9845 (overall migration) and IS 12252.',
    pressureRatings: 'N/A (Drop impact and vertical top load resistant).',
    keyTechnicalReqs: [
      'Overall migration limit ≤ 60 mg/kg (or 10 mg/dm²)',
      'Antimony migration limit ≤ 0.04 mg/l (PET containers)',
      'Total heavy metals (Pb, Cd, Cr, Hg) ≤ 1 ppm',
      'Transparency and optical clarity without haziness'
    ],
    testRequirements: [
      'Overall migration test with food simulant at 40°C for 10 days',
      'Drop impact test at 1.2m height onto flat steel surface',
      'Vertical top load compressive strength test',
      'Leakage test under vacuum / internal air pressure'
    ],
    testStandardRefs: 'IS 9845, IS 12252, IS 2798',
    latestVersion: 'IS 15410:2003 (Reaffirmed 2021)',
    previousVersions: 'First Formulation (2003)',
    amendments: 'Amendment No. 1 (2009), Amendment No. 2 (2013)',
    certificationApplicability: 'MANDATORY (Scheme-I ISI Mark under FSSAI & BIS Mandatory QCO)',
    qcoNotification: 'FSSAI Packaging Regulations 2018 & BIS Act Gazette',
    category: 'packaging'
  }
];

export const SourceViewerPage = ({
  analysisResult,
  inputText,
  onNavigateTab
}) => {
  const { t } = useTranslation();
  
  // Selected standards for side-by-side comparison
  const [selectedStandardCodes, setSelectedStandardCodes] = useState(['IS 4984:2016', 'IS 14885:2001']);
  const [copiedKey, setCopiedKey] = useState(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedStandards = comparisonCatalogue.filter(s => 
    selectedStandardCodes.includes(s.is_code)
  );

  const availableToAdd = comparisonCatalogue.filter(s => 
    !selectedStandardCodes.includes(s.is_code) &&
    (searchQuery ? (s.is_code.toLowerCase().includes(searchQuery.toLowerCase()) || s.title.toLowerCase().includes(searchQuery.toLowerCase())) : true)
  );

  const handleAddStandard = (code) => {
    if (selectedStandardCodes.length >= 4) {
      alert('Maximum 4 standards can be compared simultaneously for optimal readability.');
      return;
    }
    if (!selectedStandardCodes.includes(code)) {
      setSelectedStandardCodes([...selectedStandardCodes, code]);
    }
  };

  const handleRemoveStandard = (code) => {
    if (selectedStandardCodes.length <= 1) {
      alert('At least 1 standard must remain selected.');
      return;
    }
    setSelectedStandardCodes(selectedStandardCodes.filter(c => c !== code));
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header (Clean Government Style) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-semibold text-[#006699] uppercase tracking-wider">
              <span>Section 4</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Multi-Standard Decision Support</span>
            </div>
            <h1 className="text-xl font-bold text-[#0B2545] mt-1 flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#006699]" />
              <span>Indian Standards Comparative Matrix</span>
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Conduct rigorous side-by-side technical evaluation of competing Indian Standards (IS) across scope, technical requirements, testing protocols, and mandatory certification applicability before finalizing tender specifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setShowEvidenceModal(true)}
              className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#006699] border border-blue-200 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <SplitSquareVertical className="h-4 w-4" />
              <span>Side-by-Side Clause Viewer</span>
            </button>

            <button
              onClick={() => onNavigateTab('recommendation')}
              className="px-3.5 py-2 bg-[#0B2545] hover:bg-[#134074] text-white rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <span>Back to Recommendation</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Standard Selector Pills */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Comparing ({selectedStandards.length}/4):
            </span>
            {selectedStandards.map((std) => (
              <span
                key={std.is_code}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded text-xs font-bold font-mono text-[#0B2545]"
              >
                <span>{std.is_code}</span>
                <button
                  onClick={() => handleRemoveStandard(std.is_code)}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                  title="Remove from comparison"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Quick Add Dropdown / Selector */}
          {availableToAdd.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Add Standard:</span>
              <div className="flex flex-wrap gap-1.5">
                {availableToAdd.slice(0, 3).map((std) => (
                  <button
                    key={std.is_code}
                    onClick={() => handleAddStandard(std.is_code)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-mono font-medium flex items-center gap-1 border border-slate-200 transition-colors"
                  >
                    <Plus className="h-3 w-3 text-slate-500" />
                    <span>{std.is_code.split(':')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Comparison Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-[#006699]" />
            <h2 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
              Official Indian Standards Technical Comparison Table
            </h2>
          </div>
          <span className="text-[10px] font-medium text-slate-500">
            Conforms to GFR 2017 Rule 144(i) Technical Non-Bias Mandate
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0F1E36] text-white">
                <th className="p-3.5 w-48 font-bold uppercase tracking-wider text-[11px] border-r border-[#1A2E4E] shrink-0">
                  Evaluation Dimension
                </th>
                {selectedStandards.map((std) => (
                  <th key={std.is_code} className="p-3.5 min-w-[280px] max-w-[340px] border-r border-[#1A2E4E] last:border-r-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold font-mono text-amber-300">
                        {std.is_code}
                      </span>
                      <button
                        onClick={() => handleCopy(std.is_code, std.is_code)}
                        className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white"
                        title="Copy IS Number"
                      >
                        {copiedKey === std.is_code ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    <div className="text-[11px] font-normal text-slate-300 mt-1 line-clamp-2">
                      {std.title}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              
              {/* Row 1: Scope */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                  Scope & Application
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 text-slate-700 leading-relaxed border-r border-slate-200 last:border-r-0 align-top">
                    {std.scope}
                  </td>
                ))}
              </tr>

              {/* Row 2: Tender Applicability */}
              <tr className="hover:bg-slate-50/80 transition-colors bg-blue-50/20">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                  Procurement Applicability
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 text-slate-800 font-medium border-r border-slate-200 last:border-r-0 align-top">
                    <div className="p-2 bg-blue-50/60 border border-blue-100 rounded text-[11px]">
                      {std.applicability}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 3: Material Grade & Raw Material */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                  Raw Material & Classification
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 text-slate-700 border-r border-slate-200 last:border-r-0 align-top">
                    <p className="font-semibold text-slate-900">{std.materialGrade}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Pressure: {std.pressureRatings}</p>
                  </td>
                ))}
              </tr>

              {/* Row 4: Key Technical Requirements */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                  Key Technical Parameters
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 border-r border-slate-200 last:border-r-0 align-top">
                    <ul className="space-y-1.5">
                      {std.keyTechnicalReqs.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5 text-slate-700 text-[11px]">
                          <span className="text-[#006699] font-bold shrink-0">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Row 5: Test Requirements */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                  Mandatory Lab Test Protocols
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 border-r border-slate-200 last:border-r-0 align-top">
                    <ul className="space-y-1.5 mb-2">
                      {std.testRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5 text-slate-700 text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-[10px] font-mono text-purple-800 bg-purple-50 p-1.5 rounded border border-purple-100">
                      Method Standards: {std.testStandardRefs}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 6: Latest Version & Reaffirmation */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                  Active Edition & Reaffirmation
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 border-r border-slate-200 last:border-r-0 align-top">
                    <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px]">
                      {std.latestVersion}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">Previous: {std.previousVersions}</p>
                  </td>
                ))}
              </tr>

              {/* Row 7: Amendments */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                  Gazetted Amendments
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 text-slate-700 border-r border-slate-200 last:border-r-0 align-top">
                    <div className="text-xs font-medium text-slate-800">{std.amendments}</div>
                    <span className="text-[10px] text-emerald-700 font-medium">Fully incorporated into current draft</span>
                  </td>
                ))}
              </tr>

              {/* Row 8: Statutory Certification Applicability */}
              <tr className="hover:bg-slate-50/80 transition-colors bg-amber-50/30">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-50/50 border-r border-slate-200">
                  Certification & QCO Status
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 border-r border-slate-200 last:border-r-0 align-top">
                    <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs">
                      <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>{std.certificationApplicability}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-1 font-mono">{std.qcoNotification}</p>
                  </td>
                ))}
              </tr>

              {/* Row 9: Actions */}
              <tr className="bg-slate-50/70">
                <td className="p-3.5 font-bold text-slate-900 bg-slate-100/60 border-r border-slate-200">
                  Actions
                </td>
                {selectedStandards.map((std) => (
                  <td key={std.is_code} className="p-3.5 border-r border-slate-200 last:border-r-0 align-top">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onNavigateTab('standards')}
                        className="w-full px-3 py-1.5 bg-[#0B2545] hover:bg-[#134074] text-white rounded text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>View Details & Versions</span>
                      </button>
                      <button
                        onClick={() => onNavigateTab('related')}
                        className="w-full px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Layers className="h-3.5 w-3.5 text-slate-500" />
                        <span>Related Standards</span>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Side-by-Side Clause & Gazette Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-[#0F1E36] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SplitSquareVertical className="h-5 w-5 text-[#38BDF8]" />
                <h3 className="font-bold text-sm">Side-by-Side Standard Clause Verification</h3>
              </div>
              <button
                onClick={() => setShowEvidenceModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 flex-1 overflow-y-auto p-4 gap-4">
              
              {/* Left Column: Primary IS */}
              <div className="space-y-3">
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded">
                  <span className="text-[10px] font-bold text-[#006699] uppercase block font-mono">Benchmark A</span>
                  <div className="font-bold text-xs text-[#0B2545]">{selectedStandards[0]?.is_code}</div>
                  <div className="text-[11px] text-slate-600">{selectedStandards[0]?.title}</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
                  <span className="font-bold text-slate-900 block font-mono text-[11px]">Clause 5.1 — Raw Material Criteria:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {selectedStandards[0]?.materialGrade} shall be utilized without addition of un-stabilized regrind. Carbon black dispersion grade shall not exceed Grade 3 when tested according to IS 12235.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
                  <span className="font-bold text-slate-900 block font-mono text-[11px]">Clause 8.2 — Acceptance Hydrostatic Limits:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Test specimen must withstand circumferential stress at 80°C for 165 hours without premature ductile or brittle failure.
                  </p>
                </div>
              </div>

              {/* Right Column: Comparative Standard */}
              <div className="space-y-3">
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block font-mono">Benchmark B</span>
                  <div className="font-bold text-xs text-[#0B2545]">{selectedStandards[1]?.is_code || selectedStandards[0]?.is_code}</div>
                  <div className="text-[11px] text-slate-600">{selectedStandards[1]?.title || selectedStandards[0]?.title}</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
                  <span className="font-bold text-slate-900 block font-mono text-[11px]">Clause 6.3 — Special Gas/End-Use Constraint:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {selectedStandards[1]?.materialGrade || selectedStandards[0]?.materialGrade}. Special pigmentation with high resistance to condensate hydrocarbon swelling.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
                  <span className="font-bold text-slate-900 block font-mono text-[11px]">Clause 9.4 — Crack Propagation Resistance:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Mandatory S4 (Small-Scale Steady-State) crack resistance validation to avert catastrophic line rupture.
                  </p>
                </div>
              </div>

            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowEvidenceModal(false)}
                className="px-4 py-1.5 bg-[#0B2545] hover:bg-[#134074] text-white rounded text-xs font-semibold"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
