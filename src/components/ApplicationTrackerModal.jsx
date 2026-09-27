import React, { useState } from 'react';
import { 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  Building2, 
  FileText, 
  FlaskConical, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { sampleTrackingCases } from '../data/announcementsData';

export const ApplicationTrackerModal = ({
  isOpen,
  onClose,
  initialRef = '',
  onAskAi
}) => {
  const [searchInput, setSearchInput] = useState(initialRef || 'BIS/2026/DL/78912');
  const [currentCase, setCurrentCase] = useState(
    sampleTrackingCases.find(c => c.refNumber === initialRef) || sampleTrackingCases[0]
  );
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    setNotFound(false);
    const trimmed = searchInput.trim();
    if (!trimmed) return;

    const matched = sampleTrackingCases.find(c => 
      c.refNumber.toLowerCase() === trimmed.toLowerCase() ||
      c.applicantName.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (matched) {
      setCurrentCase(matched);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const selectSample = (sample) => {
    setSearchInput(sample.refNumber);
    setCurrentCase(sample);
    setNotFound(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl max-h-[90vh] rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 bg-gradient-to-r from-slate-900 to-[#0F2E59] text-white">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-200">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">e-BIS Application & Licence Tracker</h2>
              <p className="text-xs text-slate-300">Live Stage Verification • Manak Online Central Database</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Search bar & quick samples */}
          <div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter Application Ref No (e.g. BIS/2026/DL/78912) or HUID..."
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#00529B] focus:outline-none focus:ring-1 focus:ring-[#00529B]"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-[#00529B] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#003d73] transition-colors shrink-0"
              >
                Track Status
              </button>
            </form>

            {/* Preloaded Sample Cases */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Quick Demo Records:</span>
              {sampleTrackingCases.map((sc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectSample(sc)}
                  className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                    currentCase?.refNumber === sc.refNumber
                      ? 'bg-blue-100 text-[#00529B] font-bold border border-blue-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sc.refNumber}
                </button>
              ))}
            </div>
          </div>

          {notFound && (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start space-x-2.5">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">No direct match found for "{searchInput}"</p>
                <p className="text-xs text-amber-700 mt-0.5">Please check the reference format or select one of the demo records above to view the timeline flow.</p>
              </div>
            </div>
          )}

          {currentCase && !notFound && (
            <div className="space-y-6">
              
              {/* Application Details Summary Card */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold bg-[#0B2545] text-white px-2 py-0.5 rounded">
                        {currentCase.refNumber}
                      </span>
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {currentCase.scheme}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5">
                      {currentCase.productName}
                    </h3>
                    <p className="text-xs text-slate-600">{currentCase.applicantName} • {currentCase.branchOffice}</p>
                  </div>

                  <div className="sm:text-right bg-white sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Current Status</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-700 inline-flex items-center">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                      {currentCase.statusText}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Applied: {currentCase.appliedDate}</span>
                  </div>
                </div>

                {/* Meta details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Standard Number</span>
                    <span className="font-bold text-slate-800">{currentCase.standardNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Assigned Scrutiny Officer</span>
                    <span className="font-bold text-slate-800">{currentCase.assignedOfficer}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Laboratory Testing Facility</span>
                    <span className="font-bold text-slate-800 truncate block" title={currentCase.testingLab}>
                      {currentCase.testingLab}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Interactive Workflow Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  End-to-End Conformity Assessment Timeline
                </h4>
                
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {currentCase.timeline.map((stage, idx) => {
                    const isPassed = stage.done;
                    const isCurrent = idx === currentCase.currentStageIndex;

                    return (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div 
                          className={`absolute -left-6 sm:-left-8 top-0.5 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-white text-xs ${
                            isPassed
                              ? 'bg-emerald-600 ring-4 ring-emerald-100'
                              : isCurrent
                              ? 'bg-blue-600 ring-4 ring-blue-100 animate-pulse'
                              : 'bg-slate-300'
                          }`}
                        >
                          {isPassed ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <span className="text-[10px] font-bold">{idx + 1}</span>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className={`p-3.5 rounded-lg border transition-all ${
                          isCurrent 
                            ? 'bg-blue-50/50 border-blue-200 shadow-xs' 
                            : isPassed 
                            ? 'bg-white border-slate-200' 
                            : 'bg-slate-50/40 border-dashed border-slate-200 opacity-75'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h5 className={`text-xs sm:text-sm font-bold ${
                              isPassed || isCurrent ? 'text-slate-900' : 'text-slate-500'
                            }`}>
                              {stage.title}
                            </h5>
                            <span className="text-[11px] font-mono text-slate-500">
                              {stage.date}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            {stage.note}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Report ID: <span className="font-mono font-medium text-slate-800">{currentCase.sampleReportNo}</span>
                </div>
                {onAskAi && (
                  <button
                    onClick={() => {
                      onClose();
                      onAskAi(`What are the remaining steps and requirements for application ${currentCase.refNumber} under ${currentCase.standardNumber}?`);
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#00529B] text-white hover:bg-[#003d73] transition-colors"
                  >
                    <span>Ask AI-Saathi About This Application</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
