import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  BookOpen,
  FlaskConical,
  ShieldCheck,
  FileCheck2,
  ShoppingCart,
  Sparkles,
  Globe,
  ChevronDown,
  Check,
  Users,
  Building2,
  ChevronRight,
  Volume2,
  User,
  FileText,
  BadgeCheck,
  Zap
} from 'lucide-react';
import { MargDarshakIcon } from '../components/OfficialLogos';
import { supportedLanguages } from '../i18n/config';

export const HomePage = ({
  onNavigateTab,
  onOpenSearch,
  onAskAi,
  onOpenLoginModal,
  currentLang = 'en',
  onLanguageChange,
  t = (k, def) => def || k
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const currentLangObj = supportedLanguages.find(l => l.code === currentLang) || supportedLanguages[0];

  const handleLangSelect = (code) => {
    if (onLanguageChange) onLanguageChange(code);
    setLangDropdownOpen(false);
  };

  const handleHeroSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchVal.trim()) {
      if (onAskAi) onAskAi(searchVal.trim());
      else if (onNavigateTab) onNavigateTab('assistant');
    } else {
      if (onOpenSearch) onOpenSearch();
    }
  };

  const quickActionChips = [
    { label: "Latest Indian Standards", tab: "standards", query: "What are the latest published Indian Standards and amendments?" },
    { label: "BIS Certification Process", tab: "licensing", query: "What is the step-by-step process for BIS Product Certification?" },
    { label: "Lab Testing Centres", tab: "laboratories", query: "Find recognized and accredited testing laboratories across India." },
    { label: "Procurement Guidelines", tab: "procurement", query: "Explain BIS procurement guidelines and GFR 144 compliance clauses." },
    { label: "QCOs & Regulations", tab: "standards", query: "What are the mandatory Quality Control Orders (QCOs) currently notified?" }
  ];

  const statCards = [
    {
      number: "27,000+",
      title: "Consumers & Citizens",
      subtitle: "Accessing standards & services",
      icon: Users,
      tab: "standards"
    },
    {
      number: "27,000+",
      title: "Registered Businesses",
      subtitle: "For BIS certification & compliance",
      icon: Building2,
      tab: "licensing"
    },
    {
      number: "700+",
      title: "Accredited Labs",
      subtitle: "For quality testing & certification",
      icon: FlaskConical,
      tab: "laboratories"
    },
    {
      number: "100%",
      title: "Compliance Support",
      subtitle: "For Government & Procurement",
      icon: ShieldCheck,
      tab: "compliance"
    }
  ];

  const popularServices = [
    {
      id: "standards",
      title: "Indian Standards",
      desc: "Search & view standards",
      icon: FileText,
      tab: "standards"
    },
    {
      id: "certification",
      title: "BIS Certification",
      desc: "Process & guidelines",
      icon: ShieldCheck,
      tab: "licensing"
    },
    {
      id: "labs",
      title: "Lab Testing",
      desc: "Find BIS accredited labs",
      icon: FlaskConical,
      tab: "laboratories"
    },
    {
      id: "procurement",
      title: "Procurement",
      desc: "Guidelines & updates",
      icon: ShoppingCart,
      tab: "procurement"
    },
    {
      id: "qcos",
      title: "QCOs & Regulations",
      desc: "Latest notifications",
      icon: FileCheck2,
      tab: "standards"
    }
  ];

  const quickLinks = [
    { title: "Indian Standards", icon: FileText, tab: "standards" },
    { title: "BIS Certification Process", icon: ShoppingCart, tab: "licensing" },
    { title: "Lab Testing Centres", icon: FlaskConical, tab: "laboratories" },
    { title: "Procurement Guidelines", icon: ShoppingCart, tab: "procurement" },
    { title: "QCOs & Notifications", icon: FileCheck2, tab: "standards" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex flex-col justify-between selection:bg-[#2563EB] selection:text-white">

      {/* Top Tricolor Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] z-50"></div>

      {/* Top Navigation Bar on Homepage */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">

          {/* Left: Brand Logo & Title */}
          <div
            onClick={() => onNavigateTab && onNavigateTab('home')}
            className="flex items-center space-x-3 cursor-pointer select-none shrink-0"
          >
            <div className="p-1.5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg shadow-2xs flex items-center justify-center">
              <MargDarshakIcon className="h-7 w-auto" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-lg font-black tracking-tight text-[#0A2540]">
                  Mark<span className="text-[#2563EB]">darshak</span>
                </span>
                <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 uppercase tracking-wider">
                  BIS PORTAL
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:inline leading-none">
                Bureau of Indian Standards • Ministry of Consumer Affairs
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Quick Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-700">
            <button
              onClick={() => onNavigateTab && onNavigateTab('standards')}
              className="hover:text-[#2563EB] transition-colors py-1 cursor-pointer"
            >
              Indian Standards
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('licensing')}
              className="hover:text-[#2563EB] transition-colors py-1 cursor-pointer"
            >
              Certification & Schemes
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('laboratories')}
              className="hover:text-[#2563EB] transition-colors py-1 cursor-pointer"
            >
              Testing Labs
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('procurement')}
              className="hover:text-[#2563EB] transition-colors py-1 cursor-pointer"
            >
              Procurement (GeM)
            </button>
          </nav>

          {/* Right: Actions (Search, AI Sathi, Language, Login) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">

            {/* Smart Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-600 transition-colors shadow-2xs cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <span>Search</span>
              <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Ask AI Sathi */}
            <button
              onClick={() => onNavigateTab && onNavigateTab('assistant')}
              className="inline-flex items-center space-x-1.5 bg-[#EBF2FE] hover:bg-[#DDEBFC] text-[#2563EB] border border-[#BFDBFE] px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs group cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform">
                🤖
              </div>
              <span className="hidden sm:inline">Ask AI Sāthi</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-[#2563EB]" />
                <span className="hidden sm:inline">{currentLangObj.label || 'English'}</span>
                <span className="sm:hidden uppercase">{currentLangObj.code || 'EN'}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 max-h-72 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-xl py-1 text-xs z-50">
                  {supportedLanguages.slice(0, 8).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors cursor-pointer ${currentLang === lang.code ? 'text-[#2563EB] font-bold bg-blue-50/50' : 'text-slate-700'
                        }`}
                    >
                      <span>{lang.native} <span className="text-[10px] text-slate-400 font-normal">({lang.label})</span></span>
                      {currentLang === lang.code && <Check className="h-3.5 w-3.5 text-[#2563EB]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

            {/* 👤 Login Button */}
            <button
              onClick={() => {
                if (onOpenLoginModal) onOpenLoginModal();
                if (onNavigateTab) onNavigateTab('login');
              }}
              id="hero-login-button"
              className="inline-flex items-center space-x-1.5 bg-[#0F5FC2] hover:bg-[#0C4EA3] text-white px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs hover:shadow hover:scale-[1.02] cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              <span>Login</span>
            </button>

          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION WITH SEAMLESS GRADIENT INTEGRATION                       */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F7FBFF] via-[#EEF7FF] to-[#E3F1FF] border-b border-slate-200 min-h-[440px] flex items-center">

        {/* Seamless Photographic Background layer on Right with Feathered Gradient Transition */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[60%] pointer-events-none z-0 overflow-hidden">
          <img
            src="/images/hero-scientist-banner.jpg"
            alt="Quality Control Scientist in Standards Testing Lab"
            className="w-full h-full object-cover object-right"
          />
          {/* Soft multi-stage gradient mask on the left edge of the photo */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#F7FBFF] via-[#EEF7FF]/90 to-transparent"></div>
          {/* Subtle top and bottom fades */}
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#F7FBFF]/60 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#E3F1FF]/60 to-transparent"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Col (7 cols): Main Headline & AI Search */}
            <div className="lg:col-span-7 space-y-4 max-w-2xl">

              {/* Platform Title Tag */}
              <div className="inline-flex items-center space-x-2 text-xs">
                <span className="inline-flex items-center space-x-1.5 bg-[#E0EDFE] text-[#2563EB] font-bold px-3 py-1 rounded-full border border-[#BFDBFE] shadow-2xs">
                  <span className="text-[11px]">🚀</span>
                  <span>Markdarshak</span>
                </span>
                <span className="text-slate-600 font-medium text-xs hidden sm:inline">
                  Your Trusted Guide to BIS Standards, Services & Compliance
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-[#0A2540] tracking-tight leading-[1.15]">
                  Quality Standards for a <br className="hidden sm:inline" />
                  <span className="text-[#2563EB]">Stronger India</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
                  Access Indian Standards, BIS certification, lab testing and procurement services — all in one place. For safer products, better services and a more self-reliant India.
                </p>
              </div>

              {/* Central Floating AI Search / Chat Bar */}
              <div className="pt-1">
                <div className="rounded-2xl border border-blue-200/90 bg-white/95 backdrop-blur-md p-2 sm:p-2.5 shadow-lg shadow-blue-950/5 transition-all focus-within:border-[#2563EB] focus-within:ring-3 focus-within:ring-blue-100 max-w-2xl">
                  <form onSubmit={handleHeroSearchSubmit} className="flex items-center gap-2">

                    {/* Cute Bot Icon */}
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                      🤖
                    </div>

                    {/* Input field */}
                    <div className="flex-1 flex flex-col justify-center min-w-0 pr-2">
                      <span className="text-[11px] font-extrabold text-[#0A2540] leading-none mb-0.5">
                        Ask Markdarshak...
                      </span>
                      <input
                        type="text"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="e.g. IS 302-2-1, BIS certification process, lab testing centres, procurement guidelines..."
                        className="w-full bg-transparent text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none truncate py-0.5"
                      />
                    </div>

                    {/* Blue Send Action Button */}
                    <button
                      type="submit"
                      className="w-9 h-9 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white flex items-center justify-center transition-all shrink-0 shadow-xs hover:scale-105 cursor-pointer"
                      title="Search Standards & Inquiries"
                    >
                      <ChevronRight className="h-5 w-5 font-bold stroke-[2.5]" />
                    </button>

                  </form>
                </div>
              </div>

              {/* Quick Action Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {quickActionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onAskAi) onAskAi(chip.query);
                      else if (onNavigateTab) onNavigateTab(chip.tab);
                    }}
                    className="inline-flex items-center space-x-1.5 rounded-full border border-blue-200/80 bg-white/90 hover:bg-blue-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#1D4ED8] hover:border-blue-300 transition-all shadow-2xs backdrop-blur-xs"
                  >
                    <span className="text-[11px]">
                      {idx === 0 && '🔍'}
                      {idx === 1 && '📄'}
                      {idx === 2 && '⚗️'}
                      {idx === 3 && '🛒'}
                      {idx === 4 && '⚖️'}
                    </span>
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>

            </div>

            {/* Right Col (5 cols): Floating Tag Stamp */}
            <div className="lg:col-span-5 relative flex justify-end">
              <div className="hidden lg:block text-right bg-white/85 backdrop-blur-md px-4 py-2 rounded-xl border border-blue-100 shadow-md">
                <p className="text-xs font-bold text-slate-800 leading-tight">Standardized Products.</p>
                <p className="text-xs font-black text-[#2563EB] leading-tight">A Safer Tomorrow.</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. 4 KEY STAT METRIC CARDS ROW                                           */}
      {/* ========================================================================= */}
      <section className="py-5 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {statCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onNavigateTab && onNavigateTab(card.tab)}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3.5">
                    {/* Blue Icon Box */}
                    <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-[#0A2540] tracking-tight leading-none">
                        {card.number}
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1">
                        {card.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {card.subtitle}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. BOTTOM 3-COLUMN DASHBOARD SECTION                                     */}
      {/* ========================================================================= */}
      <section className="py-6 bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

            {/* ------------------------------------------------------------------- */}
            {/* Card 1 (Span 6 / 12): Popular Services + Latest Updates Ticker     */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">

              <div>
                {/* Header */}
                <div className="mb-4">
                  <h2 className="text-base font-extrabold text-[#0A2540]">
                    Popular Services
                  </h2>
                  <p className="text-xs text-slate-500">
                    Quick access to key services and information
                  </p>
                </div>

                {/* 5 Service Cards in a responsive flex grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5">
                  {popularServices.map((srv) => {
                    const Icon = srv.icon;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => onNavigateTab && onNavigateTab(srv.tab)}
                        className="p-3 rounded-xl border border-slate-100 bg-[#F8FAFC] hover:bg-white hover:border-blue-300 hover:shadow-2xs transition-all cursor-pointer flex flex-col justify-between text-center group"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-2 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] transition-colors leading-tight">
                            {srv.title}
                          </h3>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                          {srv.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Latest Updates Ticker Strip */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-2 text-slate-700 min-w-0">
                  <div className="flex items-center space-x-1.5 font-bold text-[#2563EB] shrink-0">
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Latest Updates</span>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <div className="text-[11.5px] text-slate-600 truncate">
                    <span className="font-semibold text-slate-800">New revision of IS 302-2-1:2024 published</span>
                    <span className="mx-2 text-slate-300">•</span>
                    <span>Online certification portal launched</span>
                    <span className="mx-2 text-slate-300">•</span>
                    <span>Additional testing facilities at 5 new labs</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab && onNavigateTab('formulation')}
                  className="font-bold text-[#2563EB] hover:underline text-[11px] shrink-0 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

            </div>


            {/* ------------------------------------------------------------------- */}
            {/* Card 2 (Span 3 / 12): Quick Links Panel                             */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <h2 className="text-base font-extrabold text-[#0A2540]">
                    Quick Links
                  </h2>
                  <p className="text-xs text-slate-500">
                    Frequently used links
                  </p>
                </div>

                <div className="space-y-1.5">
                  {quickLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => onNavigateTab && onNavigateTab(link.tab)}
                        className="py-2 px-2.5 rounded-lg hover:bg-blue-50/60 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <Icon className="h-4 w-4 text-[#2563EB] shrink-0" />
                          <span className="text-xs font-semibold text-slate-800 group-hover:text-[#2563EB] truncate">
                            {link.title}
                          </span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>


            {/* ------------------------------------------------------------------- */}
            {/* Card 3 (Span 3 / 12): Simplify Procurement Card                     */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-blue-900 bg-gradient-to-br from-[#0A2540] via-[#0F3966] to-[#0A2540] text-white p-5 shadow-sm flex flex-col justify-between relative group">

              {/* Subtle background image overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url('/images/bis-procurement-workspace.jpg')` }}
              ></div>

              <div className="relative z-10 space-y-2.5">
                <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                  Simplify Procurement with MargDarshak
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed opacity-90">
                  Access compliant products, certified suppliers and faster approvals.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('procurement')}
                    className="inline-flex items-center space-x-1.5 bg-white text-[#0A2540] hover:bg-blue-50 px-4 py-2 rounded-full text-xs font-extrabold shadow-sm transition-all group-hover:scale-105 cursor-pointer"
                  >
                    <span>Explore Now</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#2563EB]" />
                  </button>
                </div>
              </div>

              {/* Bottom 3 Badges */}
              <div className="relative z-10 pt-4 mt-4 border-t border-white/10 grid grid-cols-3 gap-1.5 text-center text-[9.5px]">
                <div className="flex flex-col items-center">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-400 mb-0.5" />
                  <span className="text-blue-100 leading-tight">Verified Suppliers</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-sky-400 mb-0.5" />
                  <span className="text-blue-100 leading-tight">Compliance Ready</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="h-3.5 w-3.5 text-yellow-400 mb-0.5" />
                  <span className="text-blue-100 leading-tight">Faster Approvals</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. MINIMAL CLEAN GOVERNMENT PORTAL FOOTER                                */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 py-3 text-xs text-slate-500">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[11px]">
            <span className="font-bold text-slate-700">Markdarshak</span>
            <span>—</span>
            <span>National Standards Recommendation & Procurement Portal</span>
          </div>
          <div className="text-[11px] text-slate-400">
            © 2026 Markdarshak Digital Portal. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};
