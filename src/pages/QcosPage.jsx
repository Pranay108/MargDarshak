import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight,
  Info,
  CheckCircle2,
  Calendar,
  Building,
  MessageSquare
} from 'lucide-react';

export const QcosPage = ({ onAskQco, t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('All');

  const qcoList = [
    {
      id: "QCO-2026-01",
      title: "Electrical Accessories Quality Control Order",
      standards: ["IS 1293:2019", "IS 3854:1997"],
      products: "Plugs, Socket-outlets, Switches for domestic purposes",
      ministry: "Ministry of Heavy Industries",
      enforcementDate: "Mandatory Active",
      status: "In Force"
    },
    {
      id: "QCO-2026-02",
      title: "Steel and Steel Products Quality Control Order",
      standards: ["IS 1786:2008", "IS 2062:2011", "IS 277:2018"],
      products: "High strength deformed steel bars, structural steel, galvanized sheets",
      ministry: "Ministry of Steel",
      enforcementDate: "Mandatory Active",
      status: "In Force"
    },
    {
      id: "QCO-2026-03",
      title: "Footwear made from Leather and other materials QCO",
      standards: ["IS 15844", "IS 17043", "IS 3735"],
      products: "Sports footwear, safety rubber boots, leather safety footwear",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      enforcementDate: "Mandatory Active",
      status: "In Force"
    },
    {
      id: "QCO-2026-04",
      title: "Toys (Safety) Quality Control Order",
      standards: ["IS 9873 (Part 1 to 9)", "IS 15644"],
      products: "Electric and non-electric toys for children below 14 years",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      enforcementDate: "Mandatory Active",
      status: "In Force"
    },
    {
      id: "QCO-2026-05",
      title: "Chemicals & Petrochemicals Mandatory Certification Order",
      standards: ["IS 1065", "IS 253", "IS 7224"],
      products: "Stable bleaching powder, common salt, refined iodized salt",
      ministry: "Ministry of Chemicals & Fertilizers",
      enforcementDate: "Mandatory Active",
      status: "In Force"
    },
    {
      id: "QCO-2026-06",
      title: "Plywood and Wooden Flush Doors Mandatory Certification",
      standards: ["IS 303", "IS 710", "IS 2202 (Part 1)"],
      products: "General purpose plywood, marine plywood, wooden flush door shutters",
      ministry: "DPIIT, Ministry of Commerce & Industry",
      enforcementDate: "Mandatory Active",
      status: "In Force"
    }
  ];

  const filteredQcos = qcoList.filter(q => {
    const matchesSearch = 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.products.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.standards.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMinistry = selectedMinistry === 'All' || q.ministry.includes(selectedMinistry);
    return matchesSearch && matchesMinistry;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-[#F8FAFC] p-3 sm:p-5 lg:p-6 text-slate-900 font-sans space-y-4">
      <div className="mx-auto max-w-7xl space-y-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
          <span>Portal Home</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span>Regulatory Directives</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#00529B] font-semibold">Quality Control Orders (QCOs)</span>
        </div>

        {/* Header & Notice */}
        <div className="rounded-md border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#002B49]">
                Mandatory Quality Control Orders (QCOs) Repository
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Central Government statutory orders making BIS Standard Mark (ISI / CRS) mandatory under Section 16 of the BIS Act, 2016.
              </p>
            </div>
            <div className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded shrink-0">
              <span className="text-slate-500">Orders Active:</span> <strong className="text-[#00529B] font-mono">500+ QCOs</strong>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-8 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search QCO by product, standard (e.g. IS 1293, steel, toys, plywood)..."
                className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#00529B] focus:outline-none"
              />
            </div>
            <div className="sm:col-span-4">
              <select
                value={selectedMinistry}
                onChange={(e) => setSelectedMinistry(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-800 focus:border-[#00529B] focus:outline-none"
              >
                <option value="All">All Issuing Ministries</option>
                <option value="Commerce">DPIIT / Commerce & Industry</option>
                <option value="Heavy Industries">Ministry of Heavy Industries</option>
                <option value="Steel">Ministry of Steel</option>
                <option value="Chemicals">Ministry of Chemicals</option>
              </select>
            </div>
          </div>
        </div>

        {/* QCO Results Table / List */}
        <div className="space-y-2">
          {filteredQcos.map((q) => (
            <div key={q.id} className="rounded-md border border-slate-200 bg-white p-3.5 hover:border-slate-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#00529B] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {q.id}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mr-1"></span>
                      {q.status}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[11px] text-slate-600">{q.ministry}</span>
                  </div>

                  <h2 className="text-xs sm:text-sm font-bold text-slate-900">
                    {q.title}
                  </h2>

                  <div className="text-xs text-slate-700">
                    <strong className="text-slate-800">Covered Products: </strong>{q.products}
                  </div>

                  <div className="text-[11px] text-slate-600 flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="font-medium text-slate-500">Applicable Standards:</span>
                    {q.standards.map((std, idx) => (
                      <span key={idx} className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-semibold border border-slate-200">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => onAskQco(`Provide full compliance timelines, penalties, and testing requirements for ${q.title} covering standards ${q.standards.join(', ')}.`)}
                    className="rounded border border-[#00529B] bg-[#00529B] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#003d75] flex items-center space-x-1"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>Ask BIS-Saathi</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
