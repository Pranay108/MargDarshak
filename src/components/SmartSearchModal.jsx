import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  FlaskConical, 
  Award, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Bot,
  Scale
} from 'lucide-react';
import { option2Standards } from '../data/standardsData';
import { cementTestingLabsData } from '../data/labsData';
import { certificationSchemes } from '../data/schemesData';
import { procurementCategories } from '../data/procurementData';

export const SmartSearchModal = ({
  isOpen,
  onClose,
  onSelectQuery,
  onNavigateTab,
  currentLang
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Tender specification for HDPE Pipes IS 4984',
    'IS 14543 Packaged Drinking Water testing',
    'Cement testing laboratories in MP',
    'Option-2 30-Day Fast Track Licensing'
  ]);

  // Suggested Natural Language queries
  const sampleSuggestions = [
    { text: "Find Indian Standards & GeM tender specs for HDPE pipes (IS 4984)", category: "Procurement", tab: "procurement" },
    { text: "Find the requirements for packaged drinking water (IS 14543)", category: "Standards", tab: "standards" },
    { text: "Which laboratory can test ordinary portland cement (IS 269)?", category: "Laboratories", tab: "laboratories" },
    { text: "How do I apply for Option-2 fast-track 30-day certification?", category: "Certification", tab: "licensing" },
    { text: "TMT Fe 500D steel bar tender clause and normative refs", category: "Procurement", tab: "procurement" },
    { text: "Verify 6-digit Hallmarking Unique ID (HUID)", category: "Hallmarking", tab: "hallmarking" }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live search filtering across standards, labs, procurement, and schemes
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return null;
    const q = searchQuery.toLowerCase();

    // Procurement category matches
    const matchedProcurement = (procurementCategories || []).filter(cat =>
      cat.name.toLowerCase().includes(q) ||
      cat.keywords.some(k => k.toLowerCase().includes(q)) ||
      cat.sector.toLowerCase().includes(q)
    ).slice(0, 3);

    // Standards matches
    const matchedStandards = (option2Standards || []).filter(item => 
      item.is_number.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 4);

    // Lab matches
    const matchedLabs = (cementTestingLabsData?.labs || []).filter(lab =>
      lab.name.toLowerCase().includes(q) ||
      lab.city.toLowerCase().includes(q) ||
      lab.state.toLowerCase().includes(q)
    ).slice(0, 3);

    return {
      procurement: matchedProcurement,
      standards: matchedStandards,
      labs: matchedLabs,
      total: matchedProcurement.length + matchedStandards.length + matchedLabs.length
    };
  }, [searchQuery]);

  const handleLaunchAI = (query) => {
    if (!query) return;
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
    onClose();
    onSelectQuery(query);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="flex items-center border-b border-slate-200 px-4 py-3 bg-slate-50/70">
          <Search className="h-5 w-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                handleLaunchAI(searchQuery.trim());
              }
            }}
            placeholder="Search BIS Standards, Tender Specifications, Laboratories & Services..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-xs font-mono bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[68vh] overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* Direct AI Query Action Bar */}
          {searchQuery.trim() && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/80 border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-[#00529B] text-white flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0B2545]">Ask BIS-Saathi AI Knowledge Assistant</p>
                  <p className="text-xs text-slate-600 line-clamp-1">"{searchQuery}"</p>
                </div>
              </div>
              <button
                onClick={() => handleLaunchAI(searchQuery)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-bold bg-[#00529B] text-white hover:bg-[#003d73] transition-colors shrink-0"
              >
                <span>Ask AI</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Filtered Instant Results if query exists */}
          {filteredResults && (
            <div className="space-y-4">
              {filteredResults.total === 0 ? (
                <div className="text-center py-6 text-slate-500 text-sm">
                  <p>No exact catalog match found for "{searchQuery}".</p>
                  <button
                    onClick={() => handleLaunchAI(searchQuery)}
                    className="mt-3 inline-flex items-center space-x-1 text-xs font-bold text-[#00529B] hover:underline"
                  >
                    <span>Ask BIS-Saathi AI to analyze tender and standards repository</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <>
                  {/* Procurement Matches */}
                  {filteredResults.procurement.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center">
                          <Scale className="h-3.5 w-3.5 mr-1 text-amber-600" />
                          GeM & Procurement Tender Engines
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {filteredResults.procurement.map((p) => (
                          <div 
                            key={p.id}
                            onClick={() => {
                              onClose();
                              onNavigateTab('procurement');
                            }}
                            className="group flex items-center justify-between p-2.5 rounded-lg border border-amber-200 bg-amber-50/40 hover:bg-amber-100/50 cursor-pointer transition-all"
                          >
                            <div>
                              <p className="text-xs font-bold text-[#0B2545] group-hover:text-amber-950">{p.name}</p>
                              <p className="text-[11px] text-slate-600">{p.sector}</p>
                            </div>
                            <span className="text-xs font-bold text-amber-800">
                              Generate Clause →
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Standards Matches */}
                  {filteredResults.standards.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                          <BookOpen className="h-3.5 w-3.5 mr-1 text-[#00529B]" />
                          Matching Indian Standards
                        </span>
                        <span className="text-[11px] text-slate-400">Option-2 Fast Track</span>
                      </div>
                      <div className="space-y-1.5">
                        {filteredResults.standards.map((st) => (
                          <div 
                            key={st.sr_no}
                            onClick={() => handleLaunchAI(`Tell me about Indian Standard ${st.is_number} for ${st.title} and its testing requirements`)}
                            className="group flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 cursor-pointer transition-all"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 font-mono group-hover:bg-blue-100 group-hover:text-[#00529B]">
                                {st.is_number}
                              </span>
                              <span className="text-xs font-medium text-slate-800 group-hover:text-blue-900">
                                {st.title}
                              </span>
                            </div>
                            <span className="text-[10.5px] text-slate-400 group-hover:text-blue-600 hidden sm:inline">
                              {st.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Laboratory Matches */}
                  {filteredResults.labs.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                          <FlaskConical className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                          Accredited Laboratories
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {filteredResults.labs.map((lab) => (
                          <div 
                            key={lab.id}
                            onClick={() => {
                              onClose();
                              onNavigateTab('laboratories');
                            }}
                            className="group flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 cursor-pointer transition-all"
                          >
                            <div>
                              <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900">{lab.name}</p>
                              <p className="text-[11px] text-slate-500">{lab.city}, {lab.state} • NABL/BIS Recognized</p>
                            </div>
                            <span className="text-xs text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform">
                              View Lab →
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Natural Language Suggestions */}
          {!searchQuery.trim() && (
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Suggested Natural-Language Inquiries</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sampleSuggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (s.tab === 'procurement') {
                        onClose();
                        onNavigateTab('procurement');
                      } else {
                        handleLaunchAI(s.text);
                      }
                    }}
                    className="flex items-start text-left p-2.5 rounded-lg border border-slate-150 bg-slate-50/60 hover:bg-blue-50 hover:border-blue-200 transition-all group"
                  >
                    <div className="h-5 w-5 rounded bg-blue-100 text-[#00529B] flex items-center justify-center shrink-0 mt-0.5 mr-2.5">
                      <Search className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-800 group-hover:text-[#00529B] leading-snug">
                        {s.text}
                      </p>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                        {s.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!searchQuery.trim() && recentSearches.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center mb-2">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Recent Queries
              </span>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLaunchAI(item)}
                    className="px-2.5 py-1 rounded-full text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Hint */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500 font-sans">
          <span>Search 21,000+ Indian Standards, GeM tender specs, 2,700+ labs & HUID data</span>
          <span className="font-mono">Press ENTER to query AI-Saathi</span>
        </div>
      </div>
    </div>
  );
};
