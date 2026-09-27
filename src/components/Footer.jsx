import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  FileText,
  Globe,
  CheckCircle2,
  Scale,
  Building2
} from 'lucide-react';
import { AshokaEmblem, IsiMarkLogo, CrsMarkLogo } from './OfficialLogos';

export const Footer = ({ onNavigateTab }) => {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-[#081B2E] text-slate-300 border-t border-slate-800 text-xs select-none">

      {/* Top Banner: National Quality & Standards Infrastructure */}
      <div className="border-b border-slate-800/80 bg-[#0B2545]/70 py-6 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-2.5 rounded bg-white/10 border border-white/15">
              <AshokaEmblem className="h-8 w-auto text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                MARGDARSHAK (मार्गदर्शक) • National Standards Portal for Procurement
              </h4>
              <p className="text-xs text-slate-300">
                Bureau of Indian Standards (BIS) • Ministry of Consumer Affairs, Food & Public Distribution
              </p>
            </div>
          </div>

          {/* Official Marks Badges */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <IsiMarkLogo className="h-8 w-auto bg-white p-1 rounded" />
              <div className="text-[11px] leading-tight text-slate-300">
                <span className="font-bold text-white block">ISI Mark (Scheme-I)</span>
                <span>Mandatory Certification</span>
              </div>
            </div>
            <div className="h-7 w-[1px] bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center space-x-2">
              <CrsMarkLogo className="h-8 w-auto bg-white p-1 rounded" />
              <div className="text-[11px] leading-tight text-slate-300">
                <span className="font-bold text-white block">CRS (Scheme-II)</span>
                <span>Electronics & Solar Goods</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation Grid */}
      <div className="mx-auto max-w-7xl py-10 px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Col 1: Platform Overview */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-500/40 pb-1.5 inline-block">
            About MargDarshak
          </h5>
          <p className="text-xs text-slate-400 leading-relaxed">
            Government of India decision-support system designed specifically for procurement officers in Ministries, PSUs, and procurement agencies to prepare accurate, legally compliant tender specifications.
          </p>
          <div className="pt-1 text-[11px] text-emerald-400 font-medium">
            ✔ GFR 2017 Rule 144(i) Standards Verified
          </div>
        </div>

        {/* Col 2: Procurement Workflow Links */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-500/40 pb-1.5 inline-block">
            Procurement Lifecycle
          </h5>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button
                onClick={() => onNavigateTab('analyze')}
                className="hover:text-white transition-colors"
              >
                1. Analyze Specification
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('recommendation')}
                className="hover:text-white transition-colors"
              >
                2. Indian Standards Recommendation
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('related')}
                className="hover:text-white transition-colors"
              >
                3. Normative & Allied Standards
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('compliance')}
                className="hover:text-white transition-colors"
              >
                4. Statutory Certification & QCOs
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('builder')}
                className="hover:text-white transition-colors"
              >
                5. Generate Tender Spec PDF
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Government Directives */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-500/40 pb-1.5 inline-block">
            Statutory Directives
          </h5>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start space-x-1.5">
              <span className="text-blue-400">•</span>
              <span>General Financial Rules (GFR), 2017</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-blue-400">•</span>
              <span>Bureau of Indian Standards Act, 2016</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-blue-400">•</span>
              <span>Government e-Marketplace (GeM) Directives</span>
            </li>
            <li className="flex items-start space-x-1.5">
              <span className="text-blue-400">•</span>
              <span>Public Procurement (Preference to Make in India)</span>
            </li>
          </ul>
        </div>

        {/* Col 4: National Standards Body Contact */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-500/40 pb-1.5 inline-block">
            Headquarters & Support
          </h5>
          <div className="space-y-2 text-slate-400">
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
              <span>Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-slate-500 shrink-0" />
              <span>National Procurement Desk: 1800-11-4000</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-slate-500 shrink-0" />
              <span>procurement@bis.gov.in</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-slate-800 bg-[#061423] py-4 px-4 sm:px-8 text-slate-500 text-[11px]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            © 2026 Bureau of Indian Standards (BIS). Portal designed & developed for Public Procurement Entities.
          </div>
          <div className="flex items-center space-x-4">
            <span>Website conforms to GIGW Guidelines</span>
            <span>•</span>
            <span>NIC Hosted Platform</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
