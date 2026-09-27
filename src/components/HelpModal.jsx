import React from 'react';
import { HelpCircle, Phone, Mail, Globe, MapPin, X, ExternalLink, ShieldCheck } from 'lucide-react';

export const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-dropdown">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#00529B] ring-1 ring-blue-100">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">Help & Official Support</h3>
              <p className="text-xs text-slate-500">Bureau of Indian Standards Citizen Services</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
              <span>National Toll-Free Helpline</span>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">Toll Free</span>
            </div>
            <div className="text-lg font-bold text-[#00529B] font-mono">1800-11-1250</div>
            <p className="text-[11px] text-slate-500 mt-1">Available 9:00 AM to 5:30 PM (Monday to Friday)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                <Mail className="h-4 w-4 text-[#00529B]" />
                <span>Grievance Email</span>
              </div>
              <p className="text-slate-600 font-mono">complaints@bis.gov.in</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                <Globe className="h-4 w-4 text-[#00529B]" />
                <span>Official Web Portal</span>
              </div>
              <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="text-[#00529B] hover:underline flex items-center space-x-1">
                <span>www.bis.gov.in</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1">
            <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
              <MapPin className="h-4 w-4 text-red-600" />
              <span>Headquarters Address</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002, India
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
