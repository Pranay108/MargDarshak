import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  ChevronDown,
  Globe,
  Check,
  Bell,
  Sparkles,
  User,
  ShieldCheck,
  LogOut,
  Settings
} from 'lucide-react';
import { MargDarshakIcon } from './OfficialLogos';
import { supportedLanguages } from '../i18n/config';

export const Navbar = ({
  onOpenSearch,
  onToggleSidebar,
  user,
  onNavigateTab,
  currentLang = 'en',
  onLanguageChange
}) => {
  const { t, i18n } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const activeLangCode = i18n.language || currentLang || 'en';
  const currentLangObj = supportedLanguages.find(l => l.code === activeLangCode) || supportedLanguages[0];

  const handleLangSelect = (code) => {
    i18n.changeLanguage(code);
    if (onLanguageChange) onLanguageChange(code);
    setLangDropdownOpen(false);
  };

  const userName = user?.name || 'Pranay Sharma';
  const userRole = user?.designation || 'Procurement Officer';
  const userInitials = userName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'PS';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs h-[68px]">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Left Side: Mobile Menu Button & Platform Context */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            title="Toggle Navigation Menu"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <span className="font-semibold text-slate-800">MargDarshak</span>
            <span>/</span>
            <span className="text-[#1261C9] font-semibold">Procurement Dashboard</span>
          </div>
        </div>

        {/* Right Side: Connection Status, AI Saathi, Language, Notification, User Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0 ml-auto">

          {/* 1. Connection Status Badge */}
          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Connected</span>
          </div>

          {/* 2. Ask AI Saathi CTA Button */}
          <button
            onClick={() => onNavigateTab && onNavigateTab('assistant')}
            className="inline-flex items-center space-x-2 bg-[#EAF4FF] hover:bg-[#D9EBFF] text-[#1261C9] border border-[#BFDBFE] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer group"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#1261C9] group-hover:scale-110 transition-transform" />
            <span>Ask AI Saathi</span>
          </button>

          {/* 3. Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-[#1261C9]" />
              <span>{currentLangObj.label || 'English'}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 max-h-72 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-xl py-1 text-xs z-50 animate-fade-in">
                {supportedLanguages.slice(0, 8).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                      activeLangCode === lang.code ? 'text-[#1261C9] font-bold bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.native} <span className="text-[10px] text-slate-400 font-normal">({lang.label})</span></span>
                    {activeLangCode === lang.code && <Check className="h-3.5 w-3.5 text-[#1261C9]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#1261C9] ring-2 ring-white"></span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-1.5 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs animate-fade-in space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-900">
                  <span>System Notifications</span>
                  <span className="text-[10px] text-[#1261C9] font-semibold cursor-pointer">Mark read</span>
                </div>
                <div className="space-y-1.5">
                  <div className="p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                    <p className="font-semibold text-slate-800 text-[11px]">New BIS standards added to knowledge base</p>
                    <span className="text-[10px] text-slate-400">24 Sep 2026 • 11:30 AM</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="font-semibold text-slate-800 text-[11px]">Certification requirement database updated</p>
                    <span className="text-[10px] text-slate-400">18 Sep 2026</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

          {/* 5. User Avatar & Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B2342] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                P
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">{userName}</span>
                <span className="text-[10.5px] text-slate-500 leading-tight">{userRole}</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 text-xs z-50 animate-fade-in divide-y divide-slate-100">
                <div className="px-3.5 py-2">
                  <p className="font-bold text-slate-900">{userName}</p>
                  <p className="text-[11px] text-slate-500">{user?.email || 'pranay.sharma@gov.in'}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-[#1261C9] text-[9.5px] font-bold rounded">
                    GOI Procurement Officer
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onNavigateTab('profile');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>My Profile & Organization</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigateTab('compliance');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                    <span>Compliance Credentials</span>
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onNavigateTab('login');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3.5 py-2 text-red-600 hover:bg-red-50 text-left cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
