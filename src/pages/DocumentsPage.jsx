import React, { useState } from 'react';
import {
  Files,
  FileText,
  Search,
  Download,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  FileCheck
} from 'lucide-react';

export const DocumentsPage = ({ onAskDoc, t }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    {
      id: "DOC-2026-01",
      title: "Draft Annexure - II (C) Option-2 Mandatory Fast-Track Standards List",
      file: "a0cf2c6b-5cee-4655-b1ce-46c15d47f28c.pdf",
      category: "Licensing Procedure",
      pages: 27,
      description: "Mandatory utilisation of option - 2 (erstwhile simplified procedure) for 101 domestic and MSME product standards to grant licences within 30 days."
    },
    {
      id: "DOC-2026-02",
      title: "Bureau of Indian Standards Act, 2016 (No. 11 of 2016)",
      file: "BIS_Act_2016_Official_Gazette.pdf",
      category: "Statutory Act",
      pages: 42,
      description: "An Act to provide for the establishment of a national standards body for the harmonious development of standardization, marking and quality certification."
    },
    {
      id: "DOC-2026-03",
      title: "Hallmarking Guidelines for 6-Digit Alphanumeric HUID (IS 1417)",
      file: "Hallmarking_HUID_Framework_v2.pdf",
      category: "Hallmarking Guidelines",
      pages: 18,
      description: "Standard operating procedure for Jewellers, Assaying & Hallmarking Centres (AHCs), and Consumer Verification mechanisms."
    },
    {
      id: "DOC-2026-04",
      title: "LIMS Lab Testing Manual for Ordinary Portland Cement (IS 269:2015)",
      file: "LIMS_Testing_Protocol_IS269.pdf",
      category: "Testing Protocols",
      pages: 35,
      description: "Complete sampling, physical testing, and chemical evaluation manual for ISO/IEC 17025 accredited laboratories."
    }
  ];

  const filteredDocs = documents.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-[#F8FAFC] p-3 sm:p-5 lg:p-6 text-slate-900 font-sans space-y-4">
      <div className="mx-auto max-w-7xl space-y-4">

        {/* Breadcrumb */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
          <span>Portal Home</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span>Documentation</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#00529B] font-semibold">Official Documents & Gazettes</span>
        </div>

        {/* Header */}
        <div className="rounded-md border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#002B49]">
                Official Publications, Acts & Gazette Notifications
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Download and query statutory regulatory publications, annexures, standard operating procedures, and conformity guidelines.
              </p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by title, filename, or category..."
              className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#00529B] focus:outline-none"
            />
          </div>
        </div>

        {/* Documents Table */}
        <div className="space-y-2">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="rounded-md border border-slate-200 bg-white p-3.5 hover:border-slate-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#00529B] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {doc.id}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[11px] text-slate-500 font-mono">{doc.file} ({doc.pages} pages)</span>
                  </div>

                  <h2 className="text-xs sm:text-sm font-bold text-slate-900">
                    {doc.title}
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => onAskDoc(`Summarize key clauses, legal obligations, and statutory requirements from ${doc.title} (${doc.file}).`)}
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
