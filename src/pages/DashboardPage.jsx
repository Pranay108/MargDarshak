import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  UploadCloud,
  Search,
  FileCheck2,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Mail,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ShieldCheck,
  Building2,
  FileCode,
  Download
} from 'lucide-react';
import { procurementCategories } from '../data/procurementData';

export const DashboardPage = ({
  onNavigateTab,
  onSelectCategory,
  user
}) => {
  const { t } = useTranslation();

  const userName = user?.name || 'Pranay Borgaonkar';

  // Statistics Metrics
  const statsMetrics = [
    {
      id: 'active',
      count: '4',
      label: 'Active Analyses',
      sublabel: '↑ 1 today',
      icon: Layers,
      trendColor: 'text-emerald-600',
      iconBg: 'bg-blue-50 text-[#1261C9]'
    },
    {
      id: 'saved',
      count: '7',
      label: 'Saved Specifications',
      sublabel: '↑ 2 today',
      icon: FileText,
      trendColor: 'text-emerald-600',
      iconBg: 'bg-indigo-50 text-indigo-600'
    },
    {
      id: 'tenders',
      count: '3',
      label: 'Generated Tenders',
      sublabel: '↑ 1 this week',
      icon: FileCheck2,
      trendColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'documents',
      count: '12',
      label: 'Recent Documents',
      sublabel: '↑ 3 this week',
      icon: UploadCloud,
      trendColor: 'text-emerald-600',
      iconBg: 'bg-amber-50 text-amber-600'
    }
  ];

  // Recent Analyses Table Data
  const recentAnalysesList = [
    {
      id: 'led-street-light',
      title: 'LED Street Light Specification',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      date: '26 Sep 2026',
      time: '11:45 AM',
      standardsCount: '3 standards',
      status: 'Completed',
      statusType: 'completed',
      isCode: 'IS 10322 (Part 5/Sec 3):2024'
    },
    {
      id: 'water-tank',
      title: 'Water Storage Tank Tender',
      fileType: 'PDF',
      fileSize: '1.8 MB',
      date: '25 Sep 2026',
      time: '03:22 PM',
      standardsCount: '5 standards',
      status: 'Completed',
      statusType: 'completed',
      isCode: 'IS 14333:1996'
    },
    {
      id: 'cement-spec',
      title: 'Cement Specification',
      fileType: 'Image',
      fileSize: '350 KB',
      date: '24 Sep 2026',
      time: '01:15 PM',
      standardsCount: '4 standards',
      status: 'Completed',
      statusType: 'completed',
      isCode: 'IS 269:2015'
    },
    {
      id: 'electrical-rfp',
      title: 'Electrical Equipment RFP',
      fileType: 'DOCX',
      fileSize: '1.2 MB',
      date: '22 Sep 2026',
      time: '10:05 AM',
      standardsCount: '2 standards',
      status: 'In Progress',
      statusType: 'in-progress',
      isCode: 'IS 15885:2024'
    },
    {
      id: 'solar-panel',
      title: 'Solar Panel Specifications',
      fileType: 'PDF',
      fileSize: '3.1 MB',
      date: '20 Sep 2026',
      time: '04:47 PM',
      standardsCount: '6 standards',
      status: 'Completed',
      statusType: 'completed',
      isCode: 'IS 14286 / IS/IEC 61215'
    }
  ];

  const handleOpenAnalysis = (item) => {
    if (onNavigateTab) {
      if (item.id === 'led-street-light' || item.id === 'water-tank') {
        onNavigateTab('procurement');
      } else {
        onNavigateTab('recommendation');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">

      {/* 2-Column Desktop Grid: Main Workspace + Right Panel (~360px) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

        {/* ========================================================================= */}
        {/* MAIN WORKSPACE (Left 8-9 cols on desktop) */}
        {/* ========================================================================= */}
        <div className="xl:col-span-8 space-y-6">

          {/* 1. WELCOME BANNER */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#EAF4FF] via-[#F1F7FE] to-[#FFFFFF] border border-[#BFDBFE] rounded-2xl p-6 sm:p-8 shadow-xs">
            
            {/* Subtle Government Silhouette Architectural Watermark (Right Side) */}
            <svg
              className="absolute right-0 bottom-0 h-40 w-auto opacity-15 pointer-events-none text-[#1261C9]"
              viewBox="0 0 320 120"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="110" x2="310" y2="110" strokeWidth="1.5" />
              <rect x="110" y="55" width="100" height="55" strokeWidth="1.5" />
              <rect x="125" y="42" width="70" height="13" strokeWidth="1.5" />
              <path d="M 135 32 C 135 12, 185 12, 185 32 Z" strokeWidth="1.8" />
              <line x1="160" y1="6" x2="160" y2="14" strokeWidth="1.5" />
              <circle cx="160" cy="5" r="2" strokeWidth="1.2" />
              <line x1="130" y1="55" x2="130" y2="110" strokeWidth="1.2" />
              <line x1="150" y1="55" x2="150" y2="110" strokeWidth="1.2" />
              <line x1="170" y1="55" x2="170" y2="110" strokeWidth="1.2" />
              <line x1="190" y1="55" x2="190" y2="110" strokeWidth="1.2" />
              <rect x="30" y="68" width="80" height="42" strokeWidth="1.5" />
              <rect x="210" y="68" width="80" height="42" strokeWidth="1.5" />
            </svg>

            <div className="relative z-10 space-y-3">
              {/* Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-white/90 border border-blue-200 text-[#1261C9] text-[11px] font-bold rounded-md shadow-2xs">
                  Department of Procurement
                </span>
                <span className="px-2.5 py-1 bg-white/90 border border-blue-200 text-slate-700 text-[11px] font-semibold rounded-md shadow-2xs">
                  Government of India
                </span>
                <span className="px-2.5 py-1 bg-[#1261C9]/10 text-[#0B2342] text-[11px] font-bold rounded-md">
                  Simpler • Smarter • Compliant
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#0B2342] tracking-tight">
                  Welcome, {userName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-normal leading-relaxed">
                  Find the right Indian Standards for your procurement needs.
                </p>
              </div>
            </div>
          </div>

          {/* 2. PRIMARY ACTION CARDS (4 Equal Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Card 1: Analyze Specification */}
            <div
              onClick={() => onNavigateTab && onNavigateTab('recommendation')}
              className="bg-white border border-slate-200 hover:border-[#1261C9] hover:shadow-md rounded-xl p-4 sm:p-5 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1261C9] border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <FileCode className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1261C9] transition-colors">
                    Analyze Specification
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Upload or paste your tender / product requirements to find relevant standards.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1261C9]">
                <span>Analyze Now</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Upload Document (Subtle green-tinted background) */}
            <div
              onClick={() => onNavigateTab && onNavigateTab('recommendation')}
              className="bg-[#F2FBF7] border border-[#A7F3D0] hover:border-emerald-500 hover:shadow-md rounded-xl p-4 sm:p-5 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Upload Document
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Analyze tender documents, RFPs, tech specs and more.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Upload PDF/DOC</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Search Standards (Subtle blue/purple accent) */}
            <div
              onClick={() => onNavigateTab && onNavigateTab('standards')}
              className="bg-[#F8F7FF] border border-[#DDD6FE] hover:border-indigo-500 hover:shadow-md rounded-xl p-4 sm:p-5 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Search Standards
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Find Indian Standards by keyword, product, or technical requirement.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-indigo-200/60 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Search Catalog</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Generate Tender (Light-blue accent) */}
            <div
              onClick={() => onNavigateTab && onNavigateTab('procurement')}
              className="bg-[#F0F7FF] border border-[#BFDBFE] hover:border-[#1261C9] hover:shadow-md rounded-xl p-4 sm:p-5 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1261C9] border border-blue-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1261C9] transition-colors">
                    Generate Tender
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                    Create a complete tender specification with verified standards.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-blue-200 flex items-center justify-between text-xs font-bold text-[#1261C9]">
                <span>Tender Builder</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* 3. STATISTICS ROW (4 Compact Metric Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {statsMetrics.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs flex items-center space-x-3"
                >
                  <div className={`w-9 h-9 rounded-lg ${stat.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900 leading-none">{stat.count}</div>
                    <div className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</div>
                    <div className={`text-[10px] font-semibold ${stat.trendColor} mt-0.5`}>{stat.sublabel}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. RECENT ANALYSES (Large Professional White Card with Table) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#0B2342]">Recent Analyses</h2>
                <p className="text-xs text-slate-500">Processed technical documents and recommended Indian Standards</p>
              </div>
              <button
                onClick={() => onNavigateTab && onNavigateTab('recommendation')}
                className="text-xs font-bold text-[#1261C9] hover:text-blue-800 flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 sm:px-5">Document / Product</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Standards Found</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentAnalysesList.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => handleOpenAnalysis(row)}
                    >
                      {/* Document / Product */}
                      <td className="py-3 px-4 sm:px-5">
                        <div className="font-bold text-slate-900 group-hover:text-[#1261C9] transition-colors">
                          {row.title}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
                          <span className="font-semibold text-slate-600">{row.fileType}</span>
                          <span>•</span>
                          <span>{row.fileSize}</span>
                          <span>•</span>
                          <span className="font-mono text-[#0B2342] font-semibold">{row.isCode}</span>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-medium text-slate-800">{row.date}</div>
                        <div className="text-[10.5px] text-slate-400">{row.time}</div>
                      </td>

                      {/* Standards Found */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-blue-50 text-[#1261C9] font-bold text-[11px] rounded border border-blue-100">
                          {row.standardsCount}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {row.statusType === 'completed' ? (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10.5px] rounded border border-emerald-200 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold text-[10.5px] rounded border border-blue-200 flex items-center gap-1 w-fit">
                            <Clock className="h-3 w-3 text-blue-600" />
                            <span>In Progress</span>
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenAnalysis(row);
                          }}
                          className="text-xs font-bold text-[#1261C9] hover:text-blue-800 inline-flex items-center space-x-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                        >
                          <span>Open</span>
                          <span>→</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDEBAR (3 Stacked Panels, ~360px) */}
        {/* ========================================================================= */}
        <div className="xl:col-span-4 space-y-5">

          {/* Panel 1: QUICK GUIDE */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Quick Guide</h3>
              <span className="text-amber-500 text-sm">💡</span>
            </div>

            <div className="p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-xl space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900">
                <span>💡 Tip</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                Use Sarthi browser extension to analyze text directly from e-procurement portals (GeM, CPPP) and other websites.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab && onNavigateTab('extension')}
              className="w-full py-2.5 px-3 bg-white hover:bg-blue-50 text-[#1261C9] border border-[#1261C9] text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              <span>Install Sarthi Extension</span>
              <span>→</span>
            </button>
          </div>

          {/* Panel 2: HELP & SUPPORT */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Help & Support</h3>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <button
                onClick={() => onNavigateTab && onNavigateTab('standards')}
                className="w-full py-2.5 flex items-center justify-between text-slate-700 hover:text-[#1261C9] font-medium transition-colors cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1261C9]" />
                  <span>User Guide</span>
                </span>
                <span className="text-slate-400 group-hover:text-[#1261C9]">→</span>
              </button>

              <button
                onClick={() => onNavigateTab && onNavigateTab('assistant')}
                className="w-full py-2.5 flex items-center justify-between text-slate-700 hover:text-[#1261C9] font-medium transition-colors cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1261C9]" />
                  <span>Frequently Asked Questions</span>
                </span>
                <span className="text-slate-400 group-hover:text-[#1261C9]">→</span>
              </button>

              <button
                onClick={() => onNavigateTab && onNavigateTab('profile')}
                className="w-full py-2.5 flex items-center justify-between text-slate-700 hover:text-[#1261C9] font-medium transition-colors cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1261C9]" />
                  <span>Contact Support</span>
                </span>
                <span className="text-slate-400 group-hover:text-[#1261C9]">→</span>
              </button>
            </div>
          </div>

          {/* Panel 3: LATEST UPDATES */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Latest Updates</h3>
                <span className="px-1.5 py-0.2 bg-blue-100 text-[#1261C9] text-[10px] font-bold rounded-full">
                  3
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Live Feed</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2.5 text-xs">
                <span className="h-2 w-2 rounded-full bg-[#1261C9] shrink-0 mt-1.5"></span>
                <div>
                  <p className="font-semibold text-slate-900 leading-snug">New BIS standards added to knowledge base</p>
                  <span className="text-[10.5px] text-slate-400 font-medium">24 Sep 2026</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                <div>
                  <p className="font-semibold text-slate-900 leading-snug">Certification requirement database updated</p>
                  <span className="text-[10.5px] text-slate-400 font-medium">18 Sep 2026</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 text-xs">
                <span className="h-2 w-2 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                <div>
                  <p className="font-semibold text-slate-900 leading-snug">System maintenance completed</p>
                  <span className="text-[10.5px] text-slate-400 font-medium">15 Sep 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
