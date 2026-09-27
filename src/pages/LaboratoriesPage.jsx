import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FlaskConical, 
  MapPin, 
  CheckCircle2, 
  MessageSquare,
  Microscope,
  FileSpreadsheet,
  Building2,
  Search,
  Filter,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { bisLaboratories, labTestingWorkflow, cementTestingLabsData } from '../data/labsData';

export const LaboratoriesPage = ({ onAskLab }) => {
  const { t } = useTranslation();
  const [selectedLabId, setSelectedLabId] = useState('cl-sahibabad');
  
  // Search & Filter for 48 testing labs
  const [labSearch, setLabSearch] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [copiedText, setCopiedText] = useState(null);

  const selectedLab = bisLaboratories.find(l => l.id === selectedLabId) || bisLaboratories[0];

  // Distinct states for filter
  const states = ['ALL', ...Array.from(new Set(cementTestingLabsData.labs.map(l => l.state))).sort()];

  // Filtered Laboratories list
  const filteredLabs = cementTestingLabsData.labs.filter(lab => {
    const matchesSearch = 
      lab.name.toLowerCase().includes(labSearch.toLowerCase()) ||
      lab.city.toLowerCase().includes(labSearch.toLowerCase()) ||
      lab.state.toLowerCase().includes(labSearch.toLowerCase()) ||
      lab.address.toLowerCase().includes(labSearch.toLowerCase()) ||
      lab.email.toLowerCase().includes(labSearch.toLowerCase());

    const matchesState = selectedState === 'ALL' || lab.state === selectedState;

    return matchesSearch && matchesState;
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Hero Card */}
        <div className="rounded border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans font-bold">
                Accredited BIS Laboratories & Testing Network
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
                Apex analytical testing facilities, recognized research institutes (NTH, NCCBM, SIIR), and digitized LIMS testing network.
              </p>
            </div>

            <button
              onClick={() => onAskLab("Detail the test parameters, equipment capabilities, and sampling protocols under BIS Central Laboratory and accredited labs for IS 269 Cement.")}
              className="inline-flex items-center space-x-2 rounded bg-[#00529B] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#044983] transition-colors self-start md:self-center shrink-0"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Inquire with AI SATHI</span>
            </button>
          </div>

          {/* Apex Regional Lab Selection Tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {bisLaboratories.map((lab) => {
              const isActive = lab.id === selectedLabId;
              return (
                <button
                  key={lab.id}
                  onClick={() => setSelectedLabId(lab.id)}
                  className={`flex items-center space-x-2 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#00529B] text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{lab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Apex Lab Details */}
        <div className="rounded border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 border border-slate-200">
                  {selectedLab.region}
                </span>
                <span className="text-xs text-slate-500">Established {selectedLab.established}</span>
              </div>
              <h2 className="mt-1.5 text-lg font-bold text-slate-900 font-sans font-bold">
                {selectedLab.name}
              </h2>
              <div className="flex items-center space-x-1.5 text-xs text-slate-600 mt-1">
                <MapPin className="h-3.5 w-3.5 text-red-600" />
                <span>{selectedLab.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedLab.accreditations.map((acc, aIdx) => (
                <span key={aIdx} className="rounded bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 border border-slate-200">
                  {acc}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {selectedLab.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Core Testing Disciplines
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedLab.specializations.map((spec, sIdx) => (
                  <span key={sIdx} className="rounded bg-white px-2.5 py-1 text-xs text-slate-800 border border-slate-200 shadow-xs">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Key Capabilities
              </span>
              <div className="space-y-1.5 text-xs text-slate-700">
                {selectedLab.keyCapabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 48 ACCREDITED TESTING LABORATORIES DIRECTORY */}
        <div className="rounded border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-[#00529B]" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 font-sans font-bold">
                  Accredited Testing Laboratories Directory ({cementTestingLabsData.labs.length} Facilities)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                BIS Branch Labs, National Test Houses (NTH), NCCBM, SIIR, and recognized testing centers for Indian Standards testing.
              </p>
            </div>

            {/* Search Filter */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={labSearch}
                onChange={(e) => setLabSearch(e.target.value)}
                placeholder="Search by Lab Name, City, State, Email..."
                className="w-full rounded border border-slate-300 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:border-[#00529B] focus:outline-none"
              />
            </div>
          </div>

          {/* State Filter Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-semibold text-xs shrink-0 mr-1 flex items-center space-x-1">
              <Filter className="h-3 w-3" />
              <span>State:</span>
            </span>
            {states.map((st, stIdx) => (
              <button
                key={stIdx}
                onClick={() => setSelectedState(st)}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors shrink-0 ${
                  selectedState === st
                    ? 'bg-[#00529B] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Lab Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {filteredLabs.map((lab) => (
              <div
                key={lab.s_no}
                className="group flex flex-col justify-between rounded border border-slate-200 bg-white p-3.5 transition-colors hover:border-blue-300 hover:bg-blue-50/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-mono font-bold text-slate-600 border border-slate-200">
                      {lab.s_no}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200">
                      {lab.type || "Accredited Lab"}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#00529B] transition-colors">
                    {lab.name}
                  </h3>

                  <div className="mt-2 flex items-start space-x-1.5 text-xs text-slate-600">
                    <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                    <p className="line-clamp-2 text-[11px] leading-relaxed">
                      {lab.address}
                    </p>
                  </div>

                  <div className="mt-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">{lab.city}</span>, {lab.state}
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5 text-xs">
                  {lab.email && (
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-1.5 text-slate-600 truncate mr-2">
                        <Mail className="h-3 w-3 text-[#00529B] shrink-0" />
                        <span className="truncate font-mono">{lab.email}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(lab.email)}
                        className="text-slate-400 hover:text-slate-700 p-0.5 shrink-0"
                        title="Copy Email"
                      >
                        {copiedText === lab.email ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  )}

                  {lab.contact && lab.contact !== '-' && (
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-1.5 text-slate-600">
                        <Phone className="h-3 w-3 text-emerald-600 shrink-0" />
                        <span className="font-mono">{lab.contact}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(lab.contact)}
                        className="text-slate-400 hover:text-slate-700 p-0.5 shrink-0"
                        title="Copy Phone"
                      >
                        {copiedText === lab.contact ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredLabs.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              No laboratories found matching "{labSearch}".
            </div>
          )}
        </div>

        {/* LIMS Workflow */}
        <div className="rounded border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center space-x-2 mb-3">
            <FileSpreadsheet className="h-4 w-4 text-[#00529B]" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans font-bold">
              Laboratory Information Management System (LIMS) Sample Journey
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {labTestingWorkflow.map((step, idx) => (
              <div key={idx} className="rounded border border-slate-200 bg-slate-50 p-3.5 relative">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-[#00529B] text-[10px] font-bold font-mono">
                  0{step.step}
                </span>
                <h4 className="mt-2 text-xs font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
