import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Sparkles,
  Link2,
  Scale,
  FileText,
  ShieldCheck,
  FileSignature,
  Search,
  ChevronRight,
  ExternalLink,
  Layers,
  X
} from 'lucide-react';
import { MargDarshakIcon, RashtrapatiBhavanSilhouette } from './OfficialLogos';

export const Sidebar = ({
  currentTab,
  onNavigateTab,
  onSelectSearchQuery,
  isOpen,
  onCloseMobile,
  user
}) => {
  const { t } = useTranslation();

  const mainNavItems = [
    { id: 'dashboard', labelKey: 'navHome', defaultLabel: '1. Dashboard', icon: Home, badgeKey: '' },
    { id: 'recommendation', labelKey: 'navRecommendation', defaultLabel: '2. Standard Recommendation', icon: Sparkles, badgeKey: '' },
    { id: 'related', labelKey: 'navRelated', defaultLabel: '3. Related & Normative Standards', icon: Link2, badgeKey: '' },
    { id: 'source', labelKey: 'navSource', defaultLabel: '4. Standard Comparison', icon: Scale, badgeKey: '' },
    { id: 'standards', labelKey: 'navStandards', defaultLabel: '5. Standard Details & Versions', icon: FileText, badgeKey: '' },
    { id: 'compliance', labelKey: 'navCompliance', defaultLabel: '6. Certification & Compliance', icon: ShieldCheck, badgeKey: '' },
    { id: 'procurement', labelKey: 'navProcurement', defaultLabel: '7. Procurement Tender Engine (PDF Generator)', icon: FileSignature, badgeKey: '' },
  ];

  const officerName = user?.name || 'Pranay Borgaonkar';
  const officerRole = user?.designation || 'Procurement Officer';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar (315px on Desktop) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-[315px] flex-col bg-[#0B2342] text-slate-200 transition-transform duration-200 ease-in-out border-r border-[#15325B] lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* 1. Top Header Branding */}
        <div className="p-4 sm:p-5 border-b border-[#173764] flex items-center justify-between shrink-0">
          <div
            onClick={() => {
              onNavigateTab('dashboard');
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
              <MargDarshakIcon className="h-7 w-auto" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline font-black tracking-tight text-lg leading-tight font-sans">
                <span className="text-white">Marg</span>
                <span className="text-[#38BDF8]">Darshak</span>
              </div>
              <span className="text-[10px] text-slate-300 font-medium tracking-tight mt-0.5">
                Indian Standards & Tender Assistant
              </span>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1 text-slate-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 2. Main Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 text-xs font-medium relative z-10 no-scrollbar">

          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const itemLabel = t(item.labelKey, item.defaultLabel);
              const badgeText = item.badgeKey ? t(item.badgeKey, 'Core') : null;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all text-left cursor-pointer ${isActive
                      ? 'bg-[#1261C9] text-white font-semibold shadow-md shadow-[#1261C9]/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{itemLabel}</span>
                  </div>
                  {badgeText && (
                    <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 rounded shadow-xs shrink-0">
                      {badgeText}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 3. Sarthi Browser Extension Card */}
          <div
            onClick={() => {
              onNavigateTab('extension');
              if (onCloseMobile) onCloseMobile();
            }}
            className="p-3.5 bg-[#081B33] border border-[#1E4378] rounded-xl cursor-pointer hover:border-blue-400/80 transition-all group shadow-sm"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
                <span className="text-blue-400">🧭</span> Sarthi Browser Extension
              </span>
              <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-semibold border border-blue-500/30">
                Chrome / Edge
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Analyze directly from any webpage
            </p>
            <div className="mt-2.5 text-[10.5px] font-bold text-[#38BDF8] group-hover:text-blue-200 flex items-center space-x-1">
              <span>Install Sarthi Extension</span>
              <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* 4. User Profile Box */}
          <div
            onClick={() => {
              onNavigateTab('profile');
              if (onCloseMobile) onCloseMobile();
            }}
            className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#1261C9] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              {officerName.slice(0, 1)}
            </div>
            <div className="truncate flex-1">
              <div className="text-xs font-bold text-white truncate">{officerName}</div>
              <div className="text-[10.5px] text-slate-400 truncate">{officerRole}</div>
            </div>
          </div>

        </div>

        {/* 5. Lower Architectural Watermark & Version Section */}
        <div className="pt-4 pb-3 px-4 border-t border-[#173764] relative overflow-hidden bg-[#07162B] shrink-0 flex flex-col justify-between">

          {/* Version Header */}
          <div className="flex items-center justify-between relative z-10 text-[10.5px] text-slate-400 font-mono tracking-wide mb-2">
            <span className="font-semibold text-slate-300">MargDarshak</span>
            <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 font-bold text-[10px]">
              v1.0.0
            </span>
          </div>

          {/* Architectural Line-Art Illustration of Rashtrapati Bhavan (Properly Aligned Vector) */}
          <div className="relative w-full overflow-hidden flex items-center justify-center my-1">
            <RashtrapatiBhavanSilhouette className="w-[92%] max-w-[280px] h-auto text-[#60A5FA] opacity-40 hover:opacity-60 transition-opacity" />
          </div>

          <div className="text-[9.5px] text-slate-400 text-center font-sans tracking-tight relative z-10 mt-1">
            Government of India • Indian Standards Portal
          </div>
        </div>

      </aside>
    </>
  );
};
