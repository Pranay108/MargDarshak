import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  UploadCloud,
  FileText,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Scale,
  BookOpen,
  Copy,
  Check,
  FileCheck2,
  ArrowRight,
  Search,
  RefreshCw,
  Volume2,
  Info,
  Bookmark,
  Download,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FlaskConical,
  Award,
  Zap,
  CheckCircle,
  Clock,
  Settings,
  Paperclip,
  ArrowUp
} from 'lucide-react';
import { procurementCategories } from '../data/procurementData';
import { procurementEngine } from '../services/procurementEngine';
import { documentExtractor } from '../utils/documentExtractor';

export const StandardRecommendationPage = ({
  inputText,
  setInputText,
  selectedCategory,
  setSelectedCategory,
  analysisResult,
  setAnalysisResult,
  onNavigateTab,
  currentLang = 'en'
}) => {
  const { t, i18n } = useTranslation();

  // 3 Input Modes: 'write' | 'upload' | 'voice'
  const [inputMode, setInputMode] = useState('write');

  // Local input state for the workspace
  const defaultPromptText = "Need to procure 500 stainless steel water bottles, 1 litre capacity, food-contact safe, reusable, leak-proof and suitable for institutional use.";
  const [localText, setLocalText] = useState(inputText || defaultPromptText);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisActive, setAnalysisActive] = useState(true);

  // Local active analysis state initialized with immediate match
  const [internalResult, setInternalResult] = useState(() => {
    if (analysisResult) return analysisResult;
    return procurementEngine.analyzeTenderSpec(inputText || defaultPromptText, currentLang);
  });

  // Automatically analyze on mount or when parent inputText changes
  useEffect(() => {
    if (inputText && inputText !== localText) {
      setLocalText(inputText);
      handleRunAnalysis(inputText);
    } else if (!internalResult) {
      handleRunAnalysis(localText);
    }
  }, [inputText]);

  // Upload Mode States
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ocrScanning, setOcrScanning] = useState(false);
  const fileInputRef = useRef(null);

  // Voice Recognition States
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [voiceError, setVoiceError] = useState(null);
  const recognitionRef = useRef(null);

  // UI Interactive States
  const [copiedCode, setCopiedCode] = useState(null);
  const [copiedClause, setCopiedClause] = useState(false);
  const [bookmarkedList, setBookmarkedList] = useState([]);

  // Sample prompt chips
  const samplePrompts = [
    {
      label: "Stainless Steel Bottles",
      text: "Need to procure 500 stainless steel water bottles, 1 litre capacity, food-contact safe, reusable, leak-proof and suitable for institutional use."
    },
    {
      label: "HDPE Water Pipes",
      text: "Procurement of 110mm outer diameter HDPE pipes PE-100 grade, PN-10 pressure rating for municipal potable water supply network under Jal Jeevan Mission."
    },
    {
      label: "LED Street Lights",
      text: "Supply and installation of 120W outdoor LED street light luminaires with 10kV surge protection, IP66 weatherproof enclosure, and BIS CRS registration."
    },
    {
      label: "TMT Rebars (Fe 500D)",
      text: "Supply of high strength thermo-mechanically treated TMT steel bars Fe 500D grade conforming to seismic zone IV requirements for RCC bridge construction."
    },
    {
      label: "53 Grade OPC Cement",
      text: "Supply of 1500 metric tonnes of Ordinary Portland Cement (OPC) 53 Grade in 50kg bags for high strength concrete superstructure work."
    }
  ];

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      // Match current portal language if supported
      const langMap = {
        en: 'en-IN',
        hi: 'hi-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        gu: 'gu-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        pa: 'pa-IN',
        or: 'or-IN',
        as: 'as-IN',
        ur: 'ur-IN'
      };
      recognition.lang = langMap[currentLang] || 'en-IN';

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript + ' ';
        }
        setVoiceTranscript(currentText.trim());
        setLocalText(currentText.trim());
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setVoiceError(`Voice error: ${event.error}. You can also type or paste your requirement.`);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setVoiceSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) { }
      }
    };
  }, [currentLang]);

  // Handle Voice Toggle
  const toggleVoiceRecording = () => {
    if (!voiceSupported) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge, or type directly.");
      return;
    }

    setVoiceError(null);
    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (e) { }
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
        setIsRecording(false);
      }
    }
  };

  // Run AI Semantic Analysis connected to LLM API
  const handleRunAnalysis = async (textToAnalyze) => {
    const text = (textToAnalyze !== undefined ? textToAnalyze : localText) || '';
    if (!text.trim()) return;

    setIsAnalyzing(true);
    if (setInputText) setInputText(text);

    // 1. Instantaneous grounded match for zero-lag responsiveness
    const immediateMatch = procurementEngine.analyzeTenderSpec(text, currentLang);
    if (immediateMatch) {
      setInternalResult(immediateMatch);
      if (setAnalysisResult) setAnalysisResult(immediateMatch);
      if (setSelectedCategory && immediateMatch.category) setSelectedCategory(immediateMatch.category);
    }

    // 2. Background AI enhancement from live LLM
    try {
      const result = await procurementEngine.analyzeTenderSpecAI(text, currentLang);
      if (result) {
        setInternalResult(result);
        if (setAnalysisResult) setAnalysisResult(result);
        if (setSelectedCategory && result.category) setSelectedCategory(result.category);
      }
    } catch (err) {
      console.error('Error analyzing specifications with AI:', err);
    } finally {
      setIsAnalyzing(false);
      setAnalysisActive(true);
    }
  };

  // Handle File Upload & PDF/DOCX Text Extraction
  const processUploadedFile = async (file) => {
    if (!file) return;
    setUploadedFile(file);
    setOcrScanning(true);

    try {
      const extracted = await documentExtractor.extractText(file);
      const cleanedText = extracted.text || '';
      
      // Update local input text with extracted content
      setLocalText(cleanedText);
      setOcrScanning(false);
      
      // Automatically run AI standard analysis with Mistral AI on the extracted text
      handleRunAnalysis(cleanedText);
    } catch (err) {
      console.error('Failed to extract document text:', err);
      setOcrScanning(false);
      alert(`Could not extract document text: ${err.message}. Please upload a standard PDF, DOCX, or TXT file.`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleBookmark = (isCode) => {
    if (bookmarkedList.includes(isCode)) {
      setBookmarkedList(bookmarkedList.filter(c => c !== isCode));
    } else {
      setBookmarkedList([...bookmarkedList, isCode]);
    }
  };

  // Current active result (uses internal live analysis, props, or immediate grounded match)
  const activeResult = internalResult || analysisResult || procurementEngine.analyzeTenderSpec(localText, currentLang);

  const dims = activeResult.semanticDimensions || procurementEngine.extractSemanticDimensions(localText, activeResult.category);
  const ambiguities = activeResult.ambiguityAnalysis || procurementEngine.detectAmbiguities(localText, activeResult.category);
  const roadmap = activeResult.testingRoadmap || procurementEngine.generateTestingRoadmap(activeResult.category);

  return (
    <div className="space-y-6 pb-16">

      {/* 1. Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/60 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#006699] uppercase tracking-wider">
              <span className="px-2 py-0.5 bg-blue-100 text-[#006699] rounded font-mono">Module 2</span>
              <span className="text-slate-300">•</span>
              <span>Semantic Indian Standards Engine</span>
            </div>
            <h1 className="text-2xl font-black text-[#0B2545] tracking-tight mt-1 flex items-center space-x-2.5">
              <span>Find Applicable Standards Workspace</span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                AI Powered
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Describe your product in any convenient way — upload tender documents, write/paste requirements, or speak via microphone.
              The engine semantically understands 10 technical dimensions, verifies Gazetted QCOs, detects ambiguities, and maps normative standards.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Catalog Knowledge</span>
              <span className="text-xs font-bold text-[#0B2545]">21,000+ IS Codes • 753 QCOs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FLOATING PILL SEARCH & UPLOAD INPUT BAR */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Main Capsule Input Bar matching reference */}
          <div className="relative flex items-center w-full bg-white border border-[#93C5FD] hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 rounded-full shadow-xs transition-all px-3 sm:px-4 py-2 sm:py-2.5">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processUploadedFile(e.target.files[0]);
                }
              }}
              accept=".pdf,.doc,.docx,.txt,image/*"
              className="hidden"
            />

            {/* Paperclip Icon (Upload / Attach) */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload tender document (PDF/DOCX/TXT)"
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer shrink-0"
            >
              <Paperclip className="h-5 w-5 transform -rotate-45" />
            </button>

            {/* Input Field */}
            <input
              type="text"
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleRunAnalysis(localText);
                }
              }}
              placeholder="Ask a question or upload a tender document (PDF/DOCX)..."
              className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-slate-800 placeholder:text-slate-400 px-2 sm:px-3 py-1 font-normal"
            />

            {/* Mic / Voice Option if available */}
            {voiceSupported && (
              <button
                type="button"
                onClick={toggleVoiceRecording}
                title={isRecording ? 'Stop Recording' : 'Voice Input'}
                className={`p-2 rounded-full transition-colors mr-1 cursor-pointer shrink-0 ${
                  isRecording 
                    ? 'text-rose-600 bg-rose-50 animate-pulse' 
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            )}

            {/* Circular Send / Search Up-Arrow Button */}
            <button
              type="button"
              onClick={() => handleRunAnalysis(localText)}
              disabled={isAnalyzing || (!localText.trim() && !uploadedFile)}
              title="Run Recommendation Analysis"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#3B82F6] hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-[#3B82F6] text-white shadow-xs transition-all shrink-0 cursor-pointer"
            >
              {isAnalyzing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-5 w-5 stroke-[2.5]" />
              )}
            </button>
          </div>

          {/* Live AI Analyzing Status Banner */}
          {isAnalyzing && (
            <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-[#006699] animate-pulse shadow-xs">
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 animate-spin text-blue-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">
                    AI Sarthi is analyzing requirements via LLM Engine...
                  </span>
                  <span className="text-slate-600 text-[11px]">
                    Matching 21,000+ Indian Standards, gazetted QCO orders, testing protocols & GFR clauses.
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-blue-600 text-white font-mono text-[10px] font-bold rounded-lg shrink-0">
                AI Reasoning
              </span>
            </div>
          )}

          {/* Upload Status / OCR Banner */}
          {ocrScanning && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center space-x-3 text-xs text-[#006699] animate-pulse">
              <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
              <span>
                Extracting technical parameters & scanning text from <strong>{uploadedFile?.name}</strong>...
              </span>
            </div>
          )}

          {uploadedFile && !ocrScanning && (
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
              <div className="flex items-center space-x-2 text-emerald-900 truncate">
                <FileCheck2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="truncate">
                  Attached: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(1)} KB) — Ready for standard matching
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUploadedFile(null);
                  setLocalText('');
                }}
                className="text-[11px] font-bold text-slate-500 hover:text-rose-600 ml-3 shrink-0 cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          {/* Quick Sample Prompts Pills */}
          <div className="pt-2">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Suggested Prompts:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setLocalText(item.text);
                    handleRunAnalysis(item.text);
                  }}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 hover:text-[#006699] border border-slate-200/90 rounded-full text-xs font-medium text-slate-700 transition-colors text-left shadow-2xs cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= FOCUSED APPLICABLE STANDARDS RECOMMENDATION ================= */}
      {analysisActive && activeResult && (
        <div className="space-y-6">

          {/* Section Header: Applicable Indian Standards Summary */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B2545] via-[#0E3360] to-[#081B33] border border-[#1E4E8C]/70 p-4 sm:p-5 text-white shadow-lg shadow-blue-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Subtle Top-Right Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center space-x-3.5 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-blue-900/40 border border-blue-400/40 shrink-0 ring-4 ring-blue-500/10">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-2 mb-0.5">
                  <span className="text-[11px] font-extrabold text-[#7DD3FC] uppercase tracking-wider">
                    Recommended Applicable Standards
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10.5px] font-bold rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Confidence: {activeResult.confidence || 96}%</span>
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight font-sans">
                  {activeResult.category?.name || "Product Technical Standards"}
                </h2>
              </div>
            </div>

            {/* QCO Mandatory / Scheme Status Pill */}
            <div className="relative z-10 flex items-center shrink-0">
              {activeResult.mandatoryCertification?.isMandatory !== false ? (
                <div className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-600/10 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center space-x-2 shadow-xs backdrop-blur-xs">
                  <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>
                    {activeResult.mandatoryCertification?.scheme || "Scheme-I (ISI Mark)"} — <span className="text-amber-300">Mandatory QCO</span>
                  </span>
                </div>
              ) : (
                <div className="px-3.5 py-2 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs font-bold flex items-center space-x-2 shadow-xs backdrop-blur-xs">
                  <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>
                    {activeResult.mandatoryCertification?.scheme || "Scheme-I (ISI Mark)"} — Voluntary
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 1. PRIMARY APPLICABLE STANDARDS CARDS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
                <Award className="h-4 w-4 text-[#2563EB]" />
                <span>Primary Applicable Indian Standard(s)</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Official Bureau of Indian Standards Specifications
              </span>
            </div>

            {(activeResult.primaryStandards || []).map((std, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-blue-100 hover:border-blue-400 rounded-2xl p-5 sm:p-6 shadow-xs transition-all space-y-4"
              >
                {/* Standard Title & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-black text-[#0B2545] font-mono bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                        {std.is_code}
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {std.active_status || 'Active & Valid'}
                      </span>
                      {std.year && (
                        <span className="text-xs text-slate-500 font-medium">
                          Edition: <strong>{std.year}</strong> (Reaffirmed {std.reaffirmed || '2021'})
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {std.title}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleCopy(std.is_code, `code_${idx}`)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer"
                      title="Copy Standard Code"
                    >
                      {copiedCode === `code_${idx}` ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
                      <span>{copiedCode === `code_${idx}` ? 'Copied' : 'Copy IS Code'}</span>
                    </button>
                  </div>
                </div>

                {/* Scope & Description */}
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-1">Standard Scope & Applicability:</strong>
                  {std.summary}
                </div>

                {/* Extracted Key Technical Parameters if available */}
                {activeResult.extractedRequirements && activeResult.extractedRequirements.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                      Mandatory Technical Specifications & Requirements:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      {activeResult.extractedRequirements.map((req, rIdx) => (
                        <div key={rIdx} className="p-3 bg-white border border-slate-200 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">
                            {req.parameter}
                          </span>
                          <span className="font-bold text-slate-900 block mt-0.5">
                            {req.requirement}
                          </span>
                          <span className="text-[10px] text-blue-600 font-medium block mt-1">
                            Ref: {req.clause}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 2. NORMATIVE & TEST METHOD REFERENCES */}
          {activeResult.alliedStandards && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
                <FlaskConical className="h-5 w-5 text-indigo-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Normative References & Testing Standards
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mandatory auxiliary standards required for raw material conformance and lab test protocols.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                {/* Normative Standards */}
                {(activeResult.alliedStandards.normativeReferences || []).map((norm, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200 rounded-xl transition-colors space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0B2545] font-mono text-sm">{norm.is_code}</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                        Normative Ref
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800">{norm.title}</p>
                    <p className="text-[11px] text-slate-500">{norm.relevance}</p>
                  </div>
                ))}

                {/* Test Method Standards */}
                {(activeResult.alliedStandards.testMethods || []).map((test, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 rounded-xl transition-colors space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800 font-mono text-sm">{test.is_code}</span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                        Test Method
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800">{test.title}</p>
                    <p className="text-[11px] text-slate-500">Test Type: {test.test_type}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. GFR RULE 144(i) NEUTRAL TENDER CLAUSE */}
          {activeResult.tenderClause && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <FileCheck2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      GFR Rule 144(i) Tender Specification Clause
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standardized non-bias procurement clause ready for bid document insertion.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(activeResult.tenderClause);
                    setCopiedClause(true);
                    setTimeout(() => setCopiedClause(false), 2000);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  {copiedClause ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedClause ? 'Clause Copied!' : 'Copy Tender Clause'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                {activeResult.tenderClause}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
