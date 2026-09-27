import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  ChevronRight, 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  FileText, 
  X,
  Bot
} from 'lucide-react';
import { procurementEngine } from '../services/procurementEngine';

export const SidebarAiCopilot = ({ onNavigateTab, onSelectSearchQuery }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const quickPrompts = [
    { label: "⚡ LED Street Light", query: "LED street light with IP65 protection" },
    { label: "🛡️ HDPE Water Pipe", query: "HDPE pipe for potable water supply" },
    { label: "💻 Office Laptop", query: "Laptop with 16GB RAM for government office" },
    { label: "🧯 Fire Extinguisher", query: "ABC dry powder fire extinguisher" },
  ];

  const handleQuickAsk = (text) => {
    setPrompt(text);
    executeAiAnalysis(text);
  };

  const executeAiAnalysis = (queryText) => {
    if (!queryText.trim()) return;
    setLoading(true);
    setResult(null);

    // Run semantic AI engine
    setTimeout(() => {
      const analysis = procurementEngine.analyzeTenderSpec(queryText, 'en');
      setResult({
        query: queryText,
        primaryIS: analysis.primaryIS || "IS 10322 (Part 5/Sec 3)",
        standardTitle: analysis.standardTitle || "Applicable Indian Standard for Technical Specification",
        isMandatory: analysis.isMandatory !== undefined ? analysis.isMandatory : true,
        scheme: analysis.scheme || "Scheme-I (ISI Mark) / Scheme-II (CRS)",
        qco: analysis.qco || "Mandatory Quality Control Order Applicable",
        gfrClause: analysis.tenderClause || `The supplied equipment shall strictly comply with ${analysis.primaryIS || 'the relevant Indian Standard'} bearing valid BIS Certification/Registration and test reports from a NABL accredited laboratory.`
      });
      setLoading(false);
      setIsExpanded(true);
    }, 450);
  };

  const handleCopyClause = () => {
    if (!result?.gfrClause) return;
    navigator.clipboard.writeText(result.gfrClause);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-2 border-t border-[#1A2E4E]/80">
      
      {/* AI Header */}
      <div className="px-3 pb-2 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
            <Sparkles className="h-2.5 w-2.5 text-white animate-pulse" />
          </div>
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-blue-300">
            MargDarshak AI Copilot
          </span>
        </div>
        {result && (
          <button 
            onClick={() => { setResult(null); setIsExpanded(false); setPrompt(''); }}
            className="text-[10px] text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      <div className="px-1 space-y-2">
        {/* Quick Input Bar inside Sidebar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); executeAiAnalysis(prompt); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI: item, standard or QCO..."
            className="w-full bg-[#0C1A2E] text-slate-200 placeholder-slate-500 text-[11px] px-3 py-2 pr-8 rounded-lg border border-[#233A5E] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="absolute right-1.5 p-1 text-blue-400 hover:text-white disabled:opacity-30 transition-colors"
            title="Analyze with AI"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        {!result && !loading && (
          <div className="flex flex-wrap gap-1 px-1">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickAsk(p.query)}
                className="text-[9.5px] bg-[#14263F] hover:bg-blue-900/60 text-slate-300 hover:text-blue-200 px-2 py-1 rounded-md border border-[#1E3658] transition-colors truncate max-w-full text-left"
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Instant AI Response Card inside Sidebar */}
        {result && (
          <div className="p-2.5 bg-gradient-to-br from-[#0B2545] to-[#081B33] border border-blue-500/40 rounded-xl space-y-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                AI Recommended Standard
              </span>
              <button
                onClick={() => handleCopyClause()}
                className="text-[9.5px] text-blue-300 hover:text-white flex items-center space-x-1"
                title="Copy Tender Clause"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div>
              <div className="text-[12px] font-bold text-white leading-tight">
                {result.primaryIS}
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5 leading-snug line-clamp-2">
                {result.standardTitle}
              </div>
            </div>

            <div className="p-1.5 bg-[#051324]/80 rounded border border-blue-900/50 text-[10px]">
              <span className="text-amber-300 font-semibold block">Statutory Mandate:</span>
              <span className="text-slate-300 text-[9.5px] line-clamp-1">{result.scheme}</span>
            </div>

            <div className="flex items-center space-x-1.5 pt-1">
              <button
                onClick={() => {
                  if (onSelectSearchQuery) {
                    onSelectSearchQuery(result.query);
                  } else if (onNavigateTab) {
                    onNavigateTab('analyze');
                  }
                }}
                className="flex-1 py-1.5 px-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold rounded-lg flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Full Spec Analysis</span>
                <ChevronRight className="h-3 w-3" />
              </button>

              <button
                onClick={() => onNavigateTab && onNavigateTab('assistant')}
                className="p-1.5 bg-[#14263F] hover:bg-slate-700 text-blue-300 hover:text-white rounded-lg border border-[#233A5E]"
                title="Open AI Chat Assistant"
              >
                <Bot className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
