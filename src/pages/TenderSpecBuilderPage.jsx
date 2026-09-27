import React, { useState, useEffect } from 'react';
import {
  Download,
  Copy,
  Check,
  FileText,
  ShieldCheck,
  Building2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Printer,
  FileCheck2,
  Scale,
  Sparkles,
  Eye,
  X,
  RefreshCw,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { procurementCategories } from '../data/procurementData';
import { generateTenderSpecificationPDF, generateTenderSpecificationPDFDataUrl } from '../utils/pdfGenerator';
import { AshokaEmblem, IsiMarkLogo } from '../components/OfficialLogos';

export const TenderSpecBuilderPage = ({
  analysisResult,
  user,
  onNavigateTab,
  currentLang,
  t
}) => {
  // 1. Preset Selector with LED Street Lighting as the first high-fidelity default matching user's reference
  const [selectedCategory, setSelectedCategory] = useState(() => {
    // If analysisResult passed, use it, else default to LED Street Lighting or first
    const ledCat = procurementCategories.find(c => c.id === 'led-street-lighting') || procurementCategories[0];
    return analysisResult?.category || ledCat;
  });

  // 2. High-Fidelity Customizable Document Fields
  const [fileNo, setFileNo] = useState('DEMO/PROC/2026/LED-SL/0417');
  const [dateGenerated, setDateGenerated] = useState('27.09.2026');
  const [docTitle, setDocTitle] = useState('TECHNICAL SPECIFICATION FOR TENDER');
  const [tenderSubject, setTenderSubject] = useState('Procurement of LED Street Lighting Fixtures');
  const [issuingAuthority, setIssuingAuthority] = useState('Municipal Corporation (Illustrative)');
  const [departmentName, setDepartmentName] = useState('SAMPLE PROCUREMENT DEPARTMENT');
  const [officeName, setOfficeName] = useState('Office of the Procurement & Tendering Authority');
  
  const [tenderRef, setTenderRef] = useState('GEM/2026/B/XXXXXXX');
  const [bidMode, setBidMode] = useState('Online (GeM Portal)');
  const [bidValidity, setBidValidity] = useState('120 Days');
  const [emdAmount, setEmdAmount] = useState('Rs. 2,50,000/-');

  // Section 1: Scope of Supply
  const [scopeOfSupply, setScopeOfSupply] = useState(
    'Supply, installation, testing and commissioning of 1,000 nos. LED Street Light fixtures (90W ± 5%) for outdoor road/highway lighting under the Smart City Street Lighting Programme, including 230V AC operation, IP65-rated enclosure, and 5-year comprehensive warranty.'
  );

  // Section 2: Technical Requirements Table
  const [technicalRequirements, setTechnicalRequirements] = useState([
    { parameter: 'Luminaire Type', requirement: 'LED Street Light, Cut-off / Semi cut-off type' },
    { parameter: 'Wattage', requirement: '90W ± 5%' },
    { parameter: 'Operating Voltage', requirement: '230V AC, 50Hz' },
    { parameter: 'Ingress Protection', requirement: 'IP65 (minimum)' },
    { parameter: 'Luminous Efficacy', requirement: '≥ 130 lm/W' },
    { parameter: 'Colour Temperature (CCT)', requirement: '5700K ± 300K' },
    { parameter: 'Surge Protection', requirement: '10kV (minimum)' },
    { parameter: 'Operating Life', requirement: '≥ 50,000 burning hours (L70)' }
  ]);

  // Section 3: Applicable Indian Standards
  const [primaryStandardsSummary, setPrimaryStandardsSummary] = useState(
    'Primary Standard(s): IS 10322 (Part 5) – Luminaires: General Requirements and Tests; IS 16107 – LED Street Lighting Luminaires – Specification (Latest Edition with Amendment No. 2).'
  );
  const [standardsTable, setStandardsTable] = useState([
    { isNumber: 'IS 16107 : 2021', title: 'LED Street Lighting Luminaires — Specification', relevance: 'Primary product standard' },
    { isNumber: 'IS 10322 (Pt.5)', title: 'Luminaires — General Requirements and Tests', relevance: 'General safety & performance' },
    { isNumber: 'IS 3646 (Pt.1)', title: 'Code of Practice for Interior Illumination', relevance: 'Referenced installation practice' },
    { isNumber: 'IS 4718', title: 'Terminology for Illuminating Engineering', relevance: 'Terminology reference' }
  ]);

  // Section 4: Allied & Normative Standards
  const [alliedStandards, setAlliedStandards] = useState([
    { category: 'Test Methods', details: 'IS/IEC 60598 – Luminaires safety and performance testing' },
    { category: 'Terminology', details: 'IS 4718 – Terminology for Illuminating Engineering' },
    { category: 'Safety', details: 'IS 302 (Part 1) – Safety of household and similar electrical appliances' },
    { category: 'Installation Practice', details: 'IS 1944 (Part 2) – Code of Practice for Lighting of Public Thoroughfares' }
  ]);

  // Section 5: Mandatory Certification Requirements
  const [certifications, setCertifications] = useState([
    { name: 'BIS Product Certification (ISI Mark)', applicability: 'Mandatory under QCO', status: 'Required' },
    { name: 'Compulsory Registration Scheme (CRS)', applicability: 'Applicable for electronic components', status: 'Required' },
    { name: 'Bureau of Energy Efficiency (BEE) Star Rating', applicability: 'Recommended for energy efficiency', status: 'Optional' }
  ]);

  // Section 6: Warranty & After Sales
  const [warrantyText, setWarrantyText] = useState(
    'The bidder shall provide a comprehensive on-site warranty of 5 (five) years from the date of installation, covering all manufacturing defects, LED driver failure, and photometric performance degradation beyond specified limits. Annual Maintenance Contract (AMC) terms shall be as per GeM standard bidding document.'
  );

  // Section 7: Evaluation Criteria
  const [evaluationCriteriaText, setEvaluationCriteriaText] = useState(
    'Bids shall be evaluated on the L1 (Lowest Cost) basis among technically qualified bidders who meet all mandatory technical specifications and certification requirements listed in Sections 3 and 5 above. Non-compliance with any applicable IS Standard shall result in technical disqualification.'
  );

  const [signatoryAuthority, setSignatoryAuthority] = useState('Procurement & Tendering Officer');
  const [signatoryOrg, setSignatoryOrg] = useState('Municipal Corporation');

  // UI state
  const [copiedText, setCopiedText] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState('');
  const [previewPdfModalOpen, setPreviewPdfModalOpen] = useState(false);
  const [previewPdfUrl, setPreviewPdfUrl] = useState('');
  const [activePreviewPage, setActivePreviewPage] = useState(1); // 1 or 2

  // Sync fields when a category is selected
  const handleSelectCategoryPreset = (cat) => {
    setSelectedCategory(cat);

    if (cat.id === 'led-street-lighting') {
      setFileNo('DEMO/PROC/2026/LED-SL/0417');
      setTenderSubject('Procurement of LED Street Lighting Fixtures');
      setIssuingAuthority('Municipal Corporation (Illustrative)');
      setScopeOfSupply(
        'Supply, installation, testing and commissioning of 1,000 nos. LED Street Light fixtures (90W ± 5%) for outdoor road/highway lighting under the Smart City Street Lighting Programme, including 230V AC operation, IP65-rated enclosure, and 5-year comprehensive warranty.'
      );
      setTechnicalRequirements([
        { parameter: 'Luminaire Type', requirement: 'LED Street Light, Cut-off / Semi cut-off type' },
        { parameter: 'Wattage', requirement: '90W ± 5%' },
        { parameter: 'Operating Voltage', requirement: '230V AC, 50Hz' },
        { parameter: 'Ingress Protection', requirement: 'IP65 (minimum)' },
        { parameter: 'Luminous Efficacy', requirement: '≥ 130 lm/W' },
        { parameter: 'Colour Temperature (CCT)', requirement: '5700K ± 300K' },
        { parameter: 'Surge Protection', requirement: '10kV (minimum)' },
        { parameter: 'Operating Life', requirement: '≥ 50,000 burning hours (L70)' }
      ]);
      setPrimaryStandardsSummary(
        'Primary Standard(s): IS 10322 (Part 5) – Luminaires: General Requirements and Tests; IS 16107 – LED Street Lighting Luminaires – Specification (Latest Edition with Amendment No. 2).'
      );
      setStandardsTable([
        { isNumber: 'IS 16107 : 2021', title: 'LED Street Lighting Luminaires — Specification', relevance: 'Primary product standard' },
        { isNumber: 'IS 10322 (Pt.5)', title: 'Luminaires — General Requirements and Tests', relevance: 'General safety & performance' },
        { isNumber: 'IS 3646 (Pt.1)', title: 'Code of Practice for Interior Illumination', relevance: 'Referenced installation practice' },
        { isNumber: 'IS 4718', title: 'Terminology for Illuminating Engineering', relevance: 'Terminology reference' }
      ]);
      setAlliedStandards([
        { category: 'Test Methods', details: 'IS/IEC 60598 – Luminaires safety and performance testing' },
        { category: 'Terminology', details: 'IS 4718 – Terminology for Illuminating Engineering' },
        { category: 'Safety', details: 'IS 302 (Part 1) – Safety of household and similar electrical appliances' },
        { category: 'Installation Practice', details: 'IS 1944 (Part 2) – Code of Practice for Lighting of Public Thoroughfares' }
      ]);
      setCertifications([
        { name: 'BIS Product Certification (ISI Mark)', applicability: 'Mandatory under QCO', status: 'Required' },
        { name: 'Compulsory Registration Scheme (CRS)', applicability: 'Applicable for electronic components', status: 'Required' },
        { name: 'Bureau of Energy Efficiency (BEE) Star Rating', applicability: 'Recommended for energy efficiency', status: 'Optional' }
      ]);
    } else {
      const pStd = cat.primaryStandards?.[0];
      setFileNo(`DEMO/PROC/2026/${cat.id.slice(0, 6).toUpperCase()}/0891`);
      setTenderSubject(`Procurement of ${cat.name}`);
      setIssuingAuthority(cat.departmentTag || 'State Procurement Authority');
      setScopeOfSupply(
        `Supply, delivery, testing and commissioning of ${cat.name} strictly conforming to ${pStd?.is_code || 'Indian Standards'} with valid BIS Certification and manufacturer test reports.`
      );
      if (cat.extractedRequirements?.length) {
        setTechnicalRequirements(
          cat.extractedRequirements.map(req => ({ parameter: req.parameter, requirement: req.requirement }))
        );
      }
      setPrimaryStandardsSummary(
        `Primary Standard(s): ${cat.primaryStandards?.map(s => `${s.is_code} – ${s.title}`).join('; ')}`
      );
      setStandardsTable(
        cat.primaryStandards?.map(s => ({
          isNumber: s.is_code,
          title: s.title,
          relevance: 'Primary product standard'
        })) || []
      );
      const alliedList = [];
      if (cat.alliedStandards?.testMethods?.length) {
        alliedList.push({ category: 'Test Methods', details: `${cat.alliedStandards.testMethods[0].is_code} – ${cat.alliedStandards.testMethods[0].title}` });
      }
      if (cat.alliedStandards?.normativeReferences?.length) {
        alliedList.push({ category: 'Normative References', details: `${cat.alliedStandards.normativeReferences[0].is_code} – ${cat.alliedStandards.normativeReferences[0].title}` });
      }
      if (cat.alliedStandards?.installationAndCodeOfPractice?.length) {
        alliedList.push({ category: 'Code of Practice', details: `${cat.alliedStandards.installationAndCodeOfPractice[0].is_code} – ${cat.alliedStandards.installationAndCodeOfPractice[0].title}` });
      }
      setAlliedStandards(alliedList.length ? alliedList : [
        { category: 'Test Methods', details: 'NABL-Accredited Lab Test Protocol' },
        { category: 'Code of Practice', details: 'Bureau of Indian Standards Code of Practice' }
      ]);
      setCertifications([
        { name: `BIS Product Certification (${cat.mandatoryCertification?.scheme || 'ISI Mark'})`, applicability: cat.mandatoryCertification?.isMandatory ? 'Mandatory under QCO' : 'Applicable Standard', status: 'Required' },
        { name: 'NABL Lab Pre-Dispatch Test Certificate', applicability: 'Batch-wise Quality Assurance', status: 'Required' },
        { name: 'Environmental & Safety Compliance', applicability: 'National Standards Guidelines', status: 'Recommended' }
      ]);
    }
  };

  const getPdfPayload = () => ({
    fileNo,
    dateGenerated,
    docTitle,
    tenderSubject,
    issuingAuthority,
    departmentName,
    officeName,
    tenderRef,
    bidMode,
    bidValidity,
    emdAmount,
    scopeOfSupply,
    technicalRequirements,
    primaryStandardsSummary,
    standardsTable,
    alliedStandards,
    certifications,
    warrantyText,
    evaluationCriteriaText,
    signatoryAuthority,
    signatoryOrg
  });

  // Handle PDF Download
  const handleExportPDF = () => {
    setIsGeneratingPdf(true);
    setPdfSuccessMessage('');

    try {
      const fileName = generateTenderSpecificationPDF(getPdfPayload());
      setPdfSuccessMessage(`Official 2-Page Tender PDF downloaded: ${fileName}`);
      setTimeout(() => setPdfSuccessMessage(''), 6000);
    } catch (err) {
      console.error('Failed to generate PDF', err);
      alert('Error generating PDF document. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Handle Live In-Browser Preview
  const handleOpenLivePreview = () => {
    try {
      const dataUrl = generateTenderSpecificationPDFDataUrl(getPdfPayload());
      setPreviewPdfUrl(dataUrl);
      setPreviewPdfModalOpen(true);
    } catch (err) {
      console.error('Failed to generate PDF preview', err);
      alert('Error rendering live preview.');
    }
  };

  // Copy Full Document Text
  const handleCopyText = () => {
    const fullDoc = `================================================================================
${docTitle}
${tenderSubject}
File No.: ${fileNo} | Dated: ${dateGenerated}
Drafted with the assistance of MargDarshak — AI-Powered Indian Standards Recommendation Engine
================================================================================

Tender Reference No.: ${tenderRef}
Issuing Authority: ${issuingAuthority}
Date of Issue: ${dateGenerated}
Bid Submission Mode: ${bidMode}
Bid Validity: ${bidValidity}
EMD Amount: ${emdAmount}

1. Scope of Supply:
${scopeOfSupply}

2. Technical Requirements:
${technicalRequirements.map(t => `- ${t.parameter}: ${t.requirement}`).join('\n')}

3. Applicable Indian Standards (AI-Recommended):
${primaryStandardsSummary}
${standardsTable.map(s => `- ${s.isNumber}: ${s.title} (${s.relevance})`).join('\n')}

4. Allied & Normative Reference Standards:
${alliedStandards.map(a => `- ${a.category}: ${a.details}`).join('\n')}

5. Mandatory Certification Requirements:
${certifications.map(c => `- ${c.name} | ${c.applicability} | ${c.status}`).join('\n')}

6. Warranty & After-Sales Support:
${warrantyText}

7. Evaluation Criteria:
${evaluationCriteriaText}

For and on behalf of ${signatoryOrg}
${signatoryAuthority}
(Signature & Office Seal)
`;
    navigator.clipboard.writeText(fullDoc);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-slate-900 font-sans">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Top Breadcrumb */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
          <span>MargDarshak</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <button onClick={() => onNavigateTab('procurement')} className="hover:underline hover:text-[#2563EB]">
            Public Procurement
          </button>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#2563EB] font-semibold">Tender Document & Specification Generator</span>
        </div>

        {/* 1. Header Banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-blue-50/70 to-transparent pointer-events-none"></div>

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
                  <Sparkles className="h-3.5 w-3.5 mr-1 text-[#2563EB]" />
                  Official 2-Page Government Tender Document Builder
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  GFR Rule 144(i) • BIS Act 2016 Compliant
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] tracking-tight">
                Technical Specification for Tender (2-Page Official PDF)
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Generate high-fidelity, dual-seal government tender documents formatted with technical requirement tables, AI-recommended Indian Standards (IS Codes), QCO statutory mandates, and GFR non-bias clauses.
              </p>
            </div>

            {/* Action buttons on header */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleOpenLivePreview}
                className="inline-flex items-center space-x-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-xs cursor-pointer"
              >
                <Eye className="h-4 w-4 text-blue-600" />
                <span>Live PDF Modal</span>
              </button>

              <button
                type="button"
                onClick={handleExportPDF}
                disabled={isGeneratingPdf}
                className="inline-flex items-center space-x-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 px-5 py-2.5 text-xs font-bold text-white transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {isGeneratingPdf ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download 2-Page Official PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Success Banner if PDF generated */}
          {pdfSuccessMessage && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-2 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{pdfSuccessMessage}</span>
              </div>
              <button onClick={() => setPdfSuccessMessage('')} className="text-emerald-700 hover:text-emerald-950 font-bold">✕</button>
            </div>
          )}
        </div>

        {/* 2. Sample Tender Preset Selector */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-[#2563EB]" />
              <span className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
                Select Preloaded Government Tender Template
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Click any preset to load complete technical specifications</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {procurementCategories.map((cat) => {
              const isSelected = selectedCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategoryPreset(cat)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50/80 text-[#2563EB] font-bold shadow-xs ring-2 ring-blue-400/30'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 block truncate">{cat.primaryStandards?.[0]?.is_code}</span>
                  <span className="text-xs font-bold block truncate leading-tight mt-0.5">{cat.name.split('(')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Main Split View: Left Customization Controls & Right High-Fidelity 2-Page Document Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column (5 Cols): Interactive Parameter Controls */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Sliders className="h-4 w-4 text-[#2563EB]" />
                <h3 className="text-sm font-bold text-[#0A2540]">
                  Tender Metadata & Section Parameters
                </h3>
              </div>

              {/* Form Inputs */}
              <div className="space-y-3.5 text-xs">

                {/* Tender Subject */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Tender Subject / Product Title:
                  </label>
                  <input
                    type="text"
                    value={tenderSubject}
                    onChange={(e) => setTenderSubject(e.target.value)}
                    placeholder="e.g. Procurement of LED Street Lighting Fixtures"
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                {/* File Number & Date */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">File Number:</label>
                    <input
                      type="text"
                      value={fileNo}
                      onChange={(e) => setFileNo(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 p-2 font-mono text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Date:</label>
                    <input
                      type="text"
                      value={dateGenerated}
                      onChange={(e) => setDateGenerated(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* Issuing Authority & Department */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Issuing Authority:
                  </label>
                  <input
                    type="text"
                    value={issuingAuthority}
                    onChange={(e) => setIssuingAuthority(e.target.value)}
                    placeholder="e.g. Municipal Corporation"
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                {/* Tender Reference & EMD */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tender Ref No:</label>
                    <input
                      type="text"
                      value={tenderRef}
                      onChange={(e) => setTenderRef(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 p-2 font-mono text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">EMD Amount:</label>
                    <input
                      type="text"
                      value={emdAmount}
                      onChange={(e) => setEmdAmount(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                {/* 1. Scope of Supply */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    1. Scope of Supply:
                  </label>
                  <textarea
                    value={scopeOfSupply}
                    onChange={(e) => setScopeOfSupply(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB] leading-relaxed"
                  />
                </div>

                {/* 6. Warranty & After-Sales */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    6. Warranty & After-Sales Support:
                  </label>
                  <textarea
                    value={warrantyText}
                    onChange={(e) => setWarrantyText(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB] leading-relaxed"
                  />
                </div>

                {/* 7. Evaluation Criteria */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    7. Evaluation Criteria:
                  </label>
                  <textarea
                    value={evaluationCriteriaText}
                    onChange={(e) => setEvaluationCriteriaText(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-900 focus:outline-none focus:border-[#2563EB] leading-relaxed"
                  />
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportPDF}
                  disabled={isGeneratingPdf}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 py-2.5 text-xs font-bold text-white transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download 2-Page PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyText}
                  className="w-full inline-flex items-center justify-center space-x-2 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {copiedText ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedText ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column (7 Cols): High-Fidelity 2-Page Paper Document Render matching user's exact sample */}
          <div className="lg:col-span-7 space-y-4">

            {/* Page Switcher Tabs */}
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-2 px-4 shadow-2xs">
              <span className="text-xs font-bold text-slate-700">
                Document Page Preview:
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => setActivePreviewPage(1)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activePreviewPage === 1
                      ? 'bg-[#2563EB] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Page 1 (Header, Scope, Specs, Standards)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewPage(2)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activePreviewPage === 2
                      ? 'bg-[#2563EB] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Page 2 (Allied, QCO, Warranty, Signatures)
                </button>
              </div>
            </div>

            {/* The Paper Sheet */}
            <div className="rounded-xl border border-slate-300 bg-white p-6 sm:p-10 shadow-lg text-slate-800 relative font-serif text-[11px] leading-relaxed select-text min-h-[950px] flex flex-col justify-between">

              {/* Faint Diagonal Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] select-none z-0">
                <span className="text-[120px] font-black text-slate-900 font-sans rotate-[-35deg] tracking-widest">
                  SAMPLE
                </span>
              </div>

              {/* Relative Content */}
              <div className="relative z-10 space-y-4 font-sans">

                {/* Top Red Sample Banner */}
                <div className="bg-[#991B1B] text-white font-bold text-center py-1.5 px-2 rounded-xs text-[10px] tracking-wide uppercase">
                  SAMPLE DOCUMENT — FOR DEMONSTRATION / ILLUSTRATIVE PURPOSES ONLY | NOT AN OFFICIAL GOVERNMENT DOCUMENT
                </div>

                {/* Tricolor Indicator Line */}
                <div className="flex h-1.5 w-full rounded-xs overflow-hidden">
                  <div className="bg-[#FF9933] w-1/3"></div>
                  <div className="bg-white border-y border-slate-200 w-1/3"></div>
                  <div className="bg-[#138808] w-1/3"></div>
                </div>

                {/* ========================================================= */}
                {/* PAGE 1 CONTENT                                           */}
                {/* ========================================================= */}
                {activePreviewPage === 1 && (
                  <div className="space-y-4 animate-fade-in">

                    {/* Department Header with Dual Circular Seals */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Left Circular Seal */}
                      <div className="w-14 h-14 rounded-full border-2 border-slate-800 flex flex-col items-center justify-center text-center font-bold text-[8.5px] leading-tight text-slate-800 shrink-0">
                        <span>SAMPLE</span>
                        <span>SEAL</span>
                      </div>

                      {/* Center Department Titles */}
                      <div className="text-center px-2">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                          {departmentName}
                        </h4>
                        <h3 className="text-sm font-black text-[#0A2540] uppercase tracking-wide">
                          {issuingAuthority}
                        </h3>
                        <p className="text-[10px] text-slate-600 font-medium">
                          {officeName}
                        </p>
                      </div>

                      {/* Right Circular Seal */}
                      <div className="w-14 h-14 rounded-full border-2 border-slate-800 flex flex-col items-center justify-center text-center font-bold text-[8.5px] leading-tight text-slate-800 shrink-0">
                        <span>DEMO</span>
                        <span>SEAL</span>
                      </div>
                    </div>

                    {/* Double Divider Line */}
                    <div className="space-y-0.5 pt-1">
                      <div className="h-0.5 bg-slate-900 w-full"></div>
                      <div className="h-px bg-slate-400 w-full"></div>
                    </div>

                    {/* Main Title Lockup */}
                    <div className="text-center space-y-0.5 pt-1">
                      <h2 className="text-base sm:text-lg font-black text-[#0A2540] tracking-tight">
                        {docTitle}
                      </h2>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                        {tenderSubject}
                      </h3>
                      <p className="text-[10.5px] text-slate-500 font-medium">
                        File No.: <span className="font-mono font-bold text-slate-700">{fileNo}</span> | Dated: {dateGenerated}
                      </p>
                      <p className="text-[9.5px] text-slate-400 italic">
                        Drafted with the assistance of MargDarshak — AI-Powered Indian Standards Recommendation Engine
                      </p>
                    </div>

                    {/* Metadata Table Grid */}
                    <div className="border border-slate-300 rounded overflow-hidden text-[10.5px]">
                      <table className="w-full border-collapse">
                        <tbody>
                          <tr className="border-b border-slate-300">
                            <td className="p-2 font-bold text-slate-800 bg-slate-50 w-1/4 border-r border-slate-300">Tender Reference No.</td>
                            <td className="p-2 font-mono font-bold text-[#2563EB] w-1/4 border-r border-slate-300">{tenderRef}</td>
                            <td className="p-2 font-bold text-slate-800 bg-slate-50 w-1/4 border-r border-slate-300">Issuing Authority</td>
                            <td className="p-2 text-slate-800 w-1/4">{issuingAuthority}</td>
                          </tr>
                          <tr className="border-b border-slate-300">
                            <td className="p-2 font-bold text-slate-800 bg-slate-50 border-r border-slate-300">Date of Issue</td>
                            <td className="p-2 text-slate-800 border-r border-slate-300">{dateGenerated}</td>
                            <td className="p-2 font-bold text-slate-800 bg-slate-50 border-r border-slate-300">Bid Submission Mode</td>
                            <td className="p-2 text-slate-800">{bidMode}</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-bold text-slate-800 bg-slate-50 border-r border-slate-300">Bid Validity</td>
                            <td className="p-2 text-slate-800 border-r border-slate-300">{bidValidity}</td>
                            <td className="p-2 font-bold text-slate-800 bg-slate-50 border-r border-slate-300">EMD Amount</td>
                            <td className="p-2 font-bold text-slate-900">{emdAmount}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* 1. Scope of Supply */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-[#0A2540]">
                        1. Scope of Supply
                      </h4>
                      <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                        {scopeOfSupply}
                      </p>
                    </div>

                    {/* 2. Technical Requirements Table */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-[#0A2540]">
                        2. Technical Requirements
                      </h4>
                      <div className="border border-slate-300 rounded overflow-hidden text-[10.5px]">
                        <table className="w-full text-left">
                          <thead className="bg-[#0B2545] text-white text-[10px] font-bold">
                            <tr>
                              <th className="p-1.5 px-2.5 w-2/5 border-r border-slate-600">Parameter</th>
                              <th className="p-1.5 px-2.5 w-3/5">Requirement</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {technicalRequirements.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50">
                                <td className="p-1.5 px-2.5 font-bold text-slate-800 border-r border-slate-200">{row.parameter}</td>
                                <td className="p-1.5 px-2.5 text-slate-700">{row.requirement}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 3. Applicable Indian Standards (AI-Recommended) */}
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-xs text-[#0A2540]">
                        3. Applicable Indian Standards (AI-Recommended)
                      </h4>
                      <p className="text-[10px] text-slate-700 leading-snug">
                        {primaryStandardsSummary}
                      </p>
                      <div className="border border-slate-300 rounded overflow-hidden text-[10px]">
                        <table className="w-full text-left">
                          <thead className="bg-[#800000] text-white font-bold">
                            <tr>
                              <th className="p-1.5 px-2 w-1/4 border-r border-rose-900">IS Number</th>
                              <th className="p-1.5 px-2 w-1/2 border-r border-rose-900">Title</th>
                              <th className="p-1.5 px-2 w-1/4">Relevance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {standardsTable.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50">
                                <td className="p-1.5 px-2 font-mono font-bold text-slate-900 border-r border-slate-200">{row.isNumber}</td>
                                <td className="p-1.5 px-2 text-slate-800 border-r border-slate-200">{row.title}</td>
                                <td className="p-1.5 px-2 text-slate-600">{row.relevance}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}

                {/* ========================================================= */}
                {/* PAGE 2 CONTENT                                           */}
                {/* ========================================================= */}
                {activePreviewPage === 2 && (
                  <div className="space-y-4 pt-1 animate-fade-in">

                    {/* 4. Allied & Normative Reference Standards */}
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-xs text-[#0A2540]">
                        4. Allied & Normative Reference Standards
                      </h4>
                      <ul className="space-y-1 text-[10.5px] text-slate-700">
                        {alliedStandards.map((item, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="font-black text-slate-900">•</span>
                            <span>
                              <strong className="text-slate-900">{item.category}:</strong> {item.details}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 5. Mandatory Certification Requirements */}
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-xs text-[#0A2540]">
                        5. Mandatory Certification Requirements
                      </h4>
                      <div className="border border-slate-300 rounded overflow-hidden text-[10px]">
                        <table className="w-full text-left">
                          <thead className="bg-[#0B2545] text-white font-bold">
                            <tr>
                              <th className="p-1.5 px-2.5 w-2/5 border-r border-slate-600">Certification</th>
                              <th className="p-1.5 px-2.5 w-2/5 border-r border-slate-600">Applicability</th>
                              <th className="p-1.5 px-2.5 w-1/5 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {certifications.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50">
                                <td className="p-1.5 px-2.5 font-bold text-slate-800 border-r border-slate-200">{row.name}</td>
                                <td className="p-1.5 px-2.5 text-slate-700 border-r border-slate-200">{row.applicability}</td>
                                <td className="p-1.5 px-2.5 text-center font-bold text-[#2563EB]">{row.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 6. Warranty & After-Sales Support */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-[#0A2540]">
                        6. Warranty & After-Sales Support
                      </h4>
                      <p className="text-[10.5px] text-slate-700 leading-relaxed text-justify">
                        {warrantyText}
                      </p>
                    </div>

                    {/* 7. Evaluation Criteria */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-[#0A2540]">
                        7. Evaluation Criteria
                      </h4>
                      <p className="text-[10.5px] text-slate-700 leading-relaxed text-justify">
                        {evaluationCriteriaText}
                      </p>
                    </div>

                    {/* [!] AI-Generated Draft Disclaimer Alert Box */}
                    <div className="p-3 rounded border border-amber-300 bg-amber-50/80 text-[10px] text-amber-900 leading-relaxed italic">
                      <strong>[!] AI-Generated Draft Disclaimer:</strong> This tender specification was auto-generated by the MargDarshak AI Recommendation Engine based on semantic analysis of the input product description. It is intended as a drafting aid only. The Procurement Officer must review, verify against the latest published IS Standards, and obtain necessary approvals before final publication of this tender.
                    </div>

                    {/* Signature Block */}
                    <div className="pt-6 flex justify-end">
                      <div className="text-right space-y-1">
                        <p className="text-[11px] text-slate-600">For and on behalf of</p>
                        <p className="text-xs font-bold text-slate-900">{signatoryOrg}</p>
                        <div className="pt-8">
                          <p className="text-slate-400 font-mono text-[10px]">____________________________</p>
                          <p className="text-xs font-bold text-slate-900 mt-1">{signatoryAuthority}</p>
                          <p className="text-[10px] text-slate-500">(Signature & Office Seal)</p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Running Bottom Footer matching sample */}
              <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-500 font-mono flex items-center justify-between relative z-10 font-sans">
                <span>F. No. {fileNo}</span>
                <span className="font-bold text-slate-700">Page {activePreviewPage} | SAMPLE ONLY</span>
                <span>— Illustrative / Not Official —</span>
              </div>

            </div>

          </div>

        </div>

        {/* 4. Live In-Browser PDF Preview Modal */}
        {previewPdfModalOpen && (
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
                    onClick={handleExportPDF}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewPdfModalOpen(false)}
                    className="rounded-lg p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF iframe */}
              <div className="flex-1 bg-slate-100 p-2">
                {previewPdfUrl ? (
                  <iframe
                    src={previewPdfUrl}
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
    </div>
  );
};

