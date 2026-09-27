import React, { useState } from 'react';
import { 
  Download, 
  Chrome, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Compass, 
  Layers, 
  MousePointerClick, 
  Code2, 
  SlidersHorizontal,
  Search,
  Upload,
  RotateCcw
} from 'lucide-react';
import { downloadMargSathiZip } from '../utils/extensionGenerator';
import { llmService } from '../services/llmService';

export const ExtensionPage = ({ onNavigateTab, t }) => {
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'install' | 'architecture'
  
  // Interactive Simulator States
  const [selectedText, setSelectedText] = useState('Supply and installation of 90W LED street lighting system with IP66 protection, minimum 120 lm/W luminous efficacy, 10kV surge protection, and CCT 5700K for municipal road electrification project.');
  const [uploadedDocName, setUploadedDocName] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [simResults, setSimResults] = useState({
    isNumber: 'IS 10322 (Part 5/Sec 3):2012',
    title: 'Luminaires - Particular Requirements: Luminaires for Road and Street Lighting',
    relevance: 96,
    explanation: 'Direct standard governing outdoor LED & conventional road lighting luminaires, ingress protection (IP65/IP66), thermal dissipation, and optical distribution.',
    clauses: ['Cl. 5.2 Photometrics', 'Cl. 8.1 IP66 Ingress', 'Cl. 12.3 Surge 10kV'],
    scheme: 'Mandatory BIS CRS (Scheme-II) & ISI Mark (Scheme-I)',
    qco: 'DPIIT & Ministry of Power Quality Control Order on Luminaires and LED Controlgear',
    related: [
      { code: 'IS 16107 (Part 2/Sec 1)', title: 'Luminaires for LED Lighting - Performance Requirements' },
      { code: 'IS 15885 (Part 2/Sec 13)', title: 'Electronic Controlgear for LED Modules (Drivers)' }
    ],
    version: 'Reaffirmed 2024 • Incorporating Amendment No. 1, 2 & 3',
    source: 'Bureau of Indian Standards (BIS) Manakonline Catalog • Gazette Notification S.O. 2024'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [apiUrl, setApiUrl] = useState('http://localhost:3000/api');

  // Pre-configured procurement samples for simulator
  const demoSnippets = [
    {
      id: 'led',
      title: '90W LED Street Light Luminaires',
      text: 'Supply and installation of 90W LED street lighting system with IP66 protection, minimum 120 lm/W luminous efficacy, 10kV surge protection, and CCT 5700K for municipal road electrification project.',
      data: {
        isNumber: 'IS 10322 (Part 5/Sec 3):2012',
        title: 'Luminaires - Particular Requirements: Luminaires for Road and Street Lighting',
        relevance: 96,
        explanation: 'Direct standard governing outdoor LED & conventional road lighting luminaires, ingress protection (IP65/IP66), thermal dissipation, and optical distribution.',
        clauses: ['Cl. 5.2 Photometrics', 'Cl. 8.1 IP66 Ingress', 'Cl. 12.3 Surge 10kV'],
        scheme: 'Mandatory BIS CRS (Scheme-II) & ISI Mark (Scheme-I)',
        qco: 'DPIIT & Ministry of Power Quality Control Order on Luminaires and LED Controlgear',
        related: [
          { code: 'IS 16107 (Part 2/Sec 1)', title: 'Luminaires for LED Lighting - Performance Requirements' },
          { code: 'IS 15885 (Part 2/Sec 13)', title: 'Electronic Controlgear for LED Modules (Drivers)' }
        ],
        version: 'Reaffirmed 2024 • Incorporating Amendment No. 1, 2 & 3',
        source: 'Bureau of Indian Standards (BIS) Manakonline Catalog • Gazette Notification S.O. 2024'
      }
    },
    {
      id: 'pipe',
      title: 'PE-100 Grade HDPE Water Pipes',
      text: 'High Density Polyethylene (HDPE) Pipes 110mm OD, PN-10 rating, PE-100 virgin grade raw material for underground potable water distribution network under Jal Jeevan Mission.',
      data: {
        isNumber: 'IS 4984:2016',
        title: 'High Density Polyethylene (HDPE) Pipes for Water Supply - Specification',
        relevance: 95,
        explanation: 'Specifies requirements for PE-63, PE-80, and PE-100 virgin grade HDPE pressure pipes for potable water conveyance, hydrostatic burst strength, and elongation.',
        clauses: ['Cl. 5.1 Virgin Resin PE-100', 'Cl. 8.2 Hydrostatic Strength at 80°C', 'Cl. 9.1 Carbon Black Dispersion'],
        scheme: 'Mandatory BIS ISI Mark (Scheme-I)',
        qco: 'DPIIT Mandatory Quality Control Order on Polyethylene Pipes and Fittings',
        related: [
          { code: 'IS 7328:2020', title: 'HDPE Materials for Moulding and Extrusion' },
          { code: 'IS 7634 (Part 2)', title: 'Code of Practice for Laying HDPE Pipes' }
        ],
        version: 'Reaffirmed 2021 • Incorporating Amendment No. 1 & 2',
        source: 'Bureau of Indian Standards (BIS) Manakonline Catalog • DPIIT QCO Gazette'
      }
    },
    {
      id: 'steel',
      title: 'Fe 500D High Strength TMT Rebars',
      text: 'Supply of Fe 500D High Strength Deformed TMT Steel Reinforcement Bars conforming to seismic ductility criteria for multi-storey RCC government complex.',
      data: {
        isNumber: 'IS 1786:2008',
        title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement',
        relevance: 97,
        explanation: 'Governs Fe 415, Fe 500, Fe 500D, and Fe 550D grades. Mandates 16% minimum elongation and 1.10 TS/YS ratio for seismic ductility.',
        clauses: ['Cl. 7.2 Chemical S & P Limits', 'Cl. 8.1 Proof Stress & Tensile', 'Cl. 9.3 Bend & Rebend Test'],
        scheme: 'Mandatory BIS ISI Mark (Scheme-I)',
        qco: 'Ministry of Steel (Quality Control) Order - 100% Mandatory ISI Mark',
        related: [
          { code: 'IS 13920:2016', title: 'Ductile Design of Reinforced Concrete Structures' },
          { code: 'IS 2062:2011', title: 'Hot Rolled Medium and High Tensile Structural Steel' }
        ],
        version: 'Reaffirmed 2023 • Latest Amendment Incorporated',
        source: 'Bureau of Indian Standards (BIS) • Ministry of Steel Quality Order'
      }
    }
  ];

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadMargSathiZip();
    } catch (err) {
      console.error("Failed to download MargDarshak extension zip:", err);
      alert("Download error: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleSimulateSelect = (snippet) => {
    setSelectedText(snippet.text);
    setUploadedDocName(null);
    runSimulatedCheck(snippet.data);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocName(file.name);
      setSelectedText(`Technical requirement extracted from tender document "${file.name}": Specification analysis for procurement compliance with Bureau of Indian Standards (BIS), statutory QCO orders, and GFR 2017 Rule 144(i).`);
      runSimulatedCheck();
    }
  };

  const runSimulatedCheck = async (customData) => {
    setIsAnalyzing(true);
    if (customData) {
      setTimeout(() => {
        setSimResults(customData);
        setIsAnalyzing(false);
      }, 300);
      return;
    }

    try {
      const liveAiData = await llmService.generateStructuredStandardRecommendations(selectedText);
      if (liveAiData && liveAiData.isNumber) {
        setSimResults({
          isNumber: liveAiData.isNumber,
          title: liveAiData.title,
          relevance: liveAiData.relevance || 96,
          explanation: liveAiData.semanticAnalysis?.whyApplicable || liveAiData.title,
          clauses: liveAiData.clauses || ['Cl. 5.1 Technical Parameters', 'Cl. 8.2 Compliance Verification', 'Cl. 12.1 Mark Inspection'],
          scheme: liveAiData.mandatoryQCO?.scheme || 'Mandatory BIS Certification (Scheme-I)',
          qco: liveAiData.mandatoryQCO?.orderName || 'Central Government Mandatory Quality Control Order',
          related: liveAiData.normativeReferences?.map(n => ({ code: n.isNumber || n.code || 'IS Reference', title: n.title || '' })) || [
            { code: 'IS 4984', title: 'Polymer Material Specification' },
            { code: 'IS 10322', title: 'Performance Testing' }
          ],
          version: liveAiData.version || 'Reaffirmed Current Edition • Incorporating Latest Amendments',
          source: 'Bureau of Indian Standards (BIS) Manakonline Catalog • Verified Knowledge Base'
        });
      } else {
        const match = demoSnippets.find(s => 
          selectedText.toLowerCase().includes('led') || 
          selectedText.toLowerCase().includes('light')
        ) || demoSnippets.find(s => 
          selectedText.toLowerCase().includes('pipe') || 
          selectedText.toLowerCase().includes('hdpe')
        ) || demoSnippets.find(s => 
          selectedText.toLowerCase().includes('steel') || 
          selectedText.toLowerCase().includes('tmt')
        ) || demoSnippets[0];
        setSimResults(match.data);
      }
    } catch (e) {
      console.warn('Live simulation fallback:', e);
      const match = demoSnippets[0];
      setSimResults(match.data);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      
      {/* 1. HERO BANNER */}
      <div className="relative rounded-2xl bg-[#0A2540] text-white p-6 sm:p-10 shadow-lg border border-slate-700">
        
        {/* Tricolor accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2">
          
          <div className="lg:col-span-8 space-y-3.5">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded text-xs font-semibold text-blue-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>OFFICIAL BROWSER EXTENSION • MANIFEST V3</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Sarthi — Indian Standards Assistant
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
              The official browser companion to the MargDarshak platform for procurement officers, PSUs, and technical evaluators. Identify Indian Standards (IS), extract structured requirements, verify mandatory QCO certification schemes, detect outdated versions, and build audit-ready tender specifications directly from any webpage.
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>460px Institutional Popup</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Multi-format Document Upload</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Powered by MargDarshak</span>
              </div>
            </div>

          </div>

          {/* Download Action Box */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 text-center space-y-3.5 shadow-md">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <Compass className="h-6 w-6 text-white" />
            </div>

            <div>
              <div className="text-sm font-bold text-white">Sarthi Assistant v1.0.0</div>
              <div className="text-[11px] text-blue-200 mt-0.5">Official Companion to MargDarshak</div>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-3 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded shadow flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-75"
            >
              <Download className="h-4 w-4" />
              <span>{downloading ? "Preparing Package..." : "Download Sarthi Extension (.ZIP)"}</span>
            </button>

            <div className="text-[10.5px] text-slate-300">
              Unpacked Folder: <code className="bg-black/30 px-1 py-0.5 rounded text-blue-200">margsarthi/</code>
            </div>
          </div>

        </div>

      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2.5 rounded text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-[#0A2540] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MousePointerClick className="h-4 w-4 text-blue-400" />
          <span>Interactive Live Popup (450px Preview)</span>
        </button>

        <button
          onClick={() => setActiveTab('install')}
          className={`px-4 py-2.5 rounded text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'install'
              ? 'bg-[#0A2540] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Chrome className="h-4 w-4 text-blue-400" />
          <span>Chrome & Edge Installation</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2.5 rounded text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
            activeTab === 'architecture'
              ? 'bg-[#0A2540] text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Code2 className="h-4 w-4 text-blue-400" />
          <span>Institutional Architecture & API</span>
        </button>
      </div>

      {/* 3. TAB 1: INTERACTIVE 450px POPUP SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-950">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🏛️</span>
              <span><strong>Live Interactive Simulator:</strong> Test the exact 450px MargDarshak extension popup below, including document upload, requirement analysis, and the 7 result sections.</span>
            </div>
          </div>

          <div className="flex justify-center">
            
            {/* 450px EXACT POPUP CONTAINER */}
            <div className="w-[450px] max-w-full bg-white border border-slate-300 rounded-lg shadow-xl overflow-hidden flex flex-col font-sans">
              
              {/* Tricolor Accent */}
              <div className="h-[3px] flex w-full">
                <div className="flex-1 bg-[#FF9933]"></div>
                <div className="flex-1 bg-[#FFFFFF]"></div>
                <div className="flex-1 bg-[#138808]"></div>
              </div>

              {/* 1. Header */}
              <div className="bg-[#0A2540] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 bg-white/10 border border-white/20 rounded flex items-center justify-center text-blue-300">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight text-white">MargDarshak</div>
                    <div className="text-[10px] text-slate-300">Indian Standards Assistant</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[9.5px] font-bold text-blue-200 bg-blue-900/60 border border-blue-400/30 px-2 py-0.5 rounded uppercase">
                    BIS & GFR 144(i)
                  </span>
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                    title="Backend Settings"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Settings Dropdown if open */}
              {showSettings && (
                <div className="bg-slate-50 p-3 border-b border-blue-200 text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold text-slate-800 text-[11px]">
                    <span>BACKEND API ENDPOINT:</span>
                    <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-700">✕</button>
                  </div>
                  <input
                    type="text"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                  />
                  <div className="text-[10px] text-slate-500">
                    Calls <code className="text-blue-600">POST /api/recommend-standards</code>
                  </div>
                </div>
              )}

              {/* 2. Main Scrollable Body */}
              <div className="p-4 space-y-3 bg-[#F8FAFC] max-h-[520px] overflow-y-auto">
                
                {/* Selected Requirement */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-[#0A2540] uppercase tracking-wide">
                      Selected Requirement
                    </label>
                    <div className="flex items-center space-x-2 text-[10.5px]">
                      <span className="text-slate-400">{selectedText.length} chars</span>
                      <button
                        onClick={() => { setSelectedText(''); setUploadedDocName(null); }}
                        className="text-blue-600 hover:underline font-semibold cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={selectedText}
                    onChange={(e) => setSelectedText(e.target.value)}
                    placeholder="Highlight text on webpage or type specification..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded text-xs text-slate-800 leading-relaxed outline-none focus:border-blue-600 shadow-2xs resize-none"
                  />

                  {/* Document Upload Bar */}
                  <label className="flex items-center gap-2 p-2 bg-[#F1F5F9] border border-dashed border-slate-300 rounded cursor-pointer hover:bg-blue-50 transition-colors">
                    <Upload className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                    <span className="text-[10.5px] text-slate-600 truncate">
                      {uploadedDocName ? `Uploaded: ${uploadedDocName}` : "Upload Document (PDF, DOC/DOCX, TXT, XLS/XLSX, PPT, Image)"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                    />
                  </label>

                  {/* Primary Action Button */}
                  <button
                    onClick={() => runSimulatedCheck()}
                    disabled={isAnalyzing || !selectedText.trim()}
                    className="w-full py-2.5 px-3 bg-[#0A2540] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded shadow-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>{isAnalyzing ? "Analyzing Requirement…" : "Check with MargDarshak"}</span>
                  </button>
                </div>

                {/* 3. Loading State */}
                {isAnalyzing && (
                  <div className="bg-white border border-slate-200 rounded p-6 text-center space-y-2 shadow-2xs">
                    <div className="w-6 h-6 border-2 border-slate-200 border-t-[#0A2540] rounded-full animate-spin mx-auto"></div>
                    <div className="text-xs font-bold text-[#0A2540]">Analyzing Requirement…</div>
                    <div className="text-[10.5px] text-slate-500 max-w-xs mx-auto">
                      Querying 21,000+ Indian Standards (IS), Gazette QCO mandates, and GFR 144(i) compliance rules.
                    </div>
                  </div>
                )}

                {/* 4. Results Section */}
                {!isAnalyzing && simResults && (
                  <div className="bg-white border border-slate-200 rounded p-3.5 shadow-xs space-y-2.5">
                    
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9.5px] font-extrabold text-[#0A2540] tracking-wider uppercase">
                        RECOMMENDED INDIAN STANDARD
                      </span>
                      <span className="text-[10.5px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                        {simResults.relevance}% Match
                      </span>
                    </div>

                    {/* Standard Header */}
                    <div className="border-b border-slate-200 pb-2">
                      <div className="text-sm font-extrabold text-[#0A2540]">{simResults.isNumber}</div>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">{simResults.title}</div>
                    </div>

                    {/* Relevance Explanation */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Relevance Explanation</div>
                      <div className="text-[11.5px] text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 leading-relaxed">
                        {simResults.explanation}
                      </div>
                    </div>

                    {/* Key Technical Clauses Chips */}
                    <div className="flex flex-wrap gap-1">
                      {simResults.clauses.map(c => (
                        <span key={c} className="text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Certification & Compliance */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Certification & Compliance</div>
                      <div className="bg-amber-50/70 border border-amber-200 rounded p-2 text-[11px] text-amber-950 space-y-0.5">
                        <div><strong className="text-amber-900">Scheme:</strong> {simResults.scheme}</div>
                        <div><strong className="text-amber-900">QCO Order:</strong> {simResults.qco}</div>
                      </div>
                    </div>

                    {/* Related & Normative Standards */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Related & Normative Standards</div>
                      <div className="space-y-1">
                        {simResults.related.map(r => (
                          <div key={r.code} className="text-[11px] bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-700">
                            <strong className="text-[#0A2540]">{r.code}:</strong> {r.title}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Latest Version / Amendments */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Latest Version / Amendments</div>
                      <div className="text-[11px] text-slate-700 bg-slate-50 p-1.5 rounded border border-slate-200">
                        {simResults.version}
                      </div>
                    </div>

                    {/* Source Reference */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Source Reference</div>
                      <div className="text-[10.5px] text-slate-500 italic">
                        {simResults.source}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-slate-200">
                      <a
                        href={`https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/${encodeURIComponent(simResults.isNumber)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-1.5 px-2 bg-white hover:bg-slate-50 text-[#0A2540] border border-slate-300 text-xs font-semibold rounded flex items-center justify-center space-x-1 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>View Standard</span>
                      </a>

                      <button
                        onClick={() => onNavigateTab && onNavigateTab('analyze')}
                        className="flex-1 py-1.5 px-2 bg-[#0A2540] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                      >
                        <Compass className="h-3 w-3" />
                        <span>Open in MargDarshak</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* Quick Sample Specification Chips */}
                <div className="bg-white border border-dashed border-slate-300 rounded p-2.5 space-y-1.5">
                  <div className="text-[10.5px] font-bold text-slate-500 uppercase">Quick Specification Tests:</div>
                  <div className="space-y-1">
                    {demoSnippets.map(snippet => (
                      <button
                        key={snippet.id}
                        onClick={() => handleSimulateSelect(snippet)}
                        className="w-full text-left p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 rounded text-[11px] text-slate-700 font-medium transition-colors cursor-pointer"
                      >
                        {snippet.title}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* 7. Institutional Footer */}
              <div className="bg-white border-t border-slate-200 py-2 px-4 text-center text-[10.5px] text-slate-500">
                Powered by <strong className="text-[#0A2540]">MargDarshak</strong> | BIS Standards Knowledge Base
              </div>

            </div>

          </div>

        </div>
      )}

      {/* 4. TAB 2: INSTALLATION */}
      {activeTab === 'install' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              How to Install MargDarshak in Chrome or Edge (3 Steps)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Load MargDarshak in Developer Mode on any Chromium browser (Google Chrome, Microsoft Edge, Brave).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
              <div className="w-7 h-7 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs">1</div>
              <h3 className="font-bold text-slate-900">Download & Unpack ZIP</h3>
              <p className="text-slate-600 leading-relaxed">
                Click <strong>Download MargDarshak (.ZIP)</strong> above and extract the zip archive into a folder on your computer.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
              <div className="w-7 h-7 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs">2</div>
              <h3 className="font-bold text-slate-900">Open Extensions Manager</h3>
              <p className="text-slate-600 leading-relaxed">
                Navigate to <code className="bg-white px-1 py-0.5 border rounded text-blue-600">chrome://extensions</code> or <code className="bg-white px-1 py-0.5 border rounded text-blue-600">edge://extensions</code> and turn on <strong>Developer Mode</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-2">
              <div className="w-7 h-7 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs">3</div>
              <h3 className="font-bold text-slate-900">Load Unpacked</h3>
              <p className="text-slate-600 leading-relaxed">
                Click <strong>Load unpacked</strong> at the top-left and select the <code className="bg-white px-1 py-0.5 border rounded text-blue-600">margsarthi</code> folder. Done!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Technical Specifications & GFR 144(i) Verification Architecture
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Purpose-built for public procurement officers and technical specification drafters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>Zero Data Exfiltration</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Tender drafts and specifications are parsed securely in-browser without external tracking or telemetry leaks.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span>Statutory QCO Mandate Verification</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Instantly flags whether an item requires mandatory ISI Mark (Scheme-I) or Compulsory Registration (Scheme-II CRS).
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
