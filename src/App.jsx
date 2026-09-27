import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzeSpecPage } from './pages/AnalyzeSpecPage';
import { StandardRecommendationPage } from './pages/StandardRecommendationPage';
import { RelatedStandardsPage } from './pages/RelatedStandardsPage';
import { CompliancePage } from './pages/CompliancePage';
import { SourceViewerPage } from './pages/SourceViewerPage';
import { TenderSpecBuilderPage } from './pages/TenderSpecBuilderPage';
import { AiSaathiPage } from './pages/AiSaathiPage';
import { StandardsPage } from './pages/StandardsPage';
import { LaboratoriesPage } from './pages/LaboratoriesPage';
import { CertificationPage } from './pages/CertificationPage';
import { ProfileOrgPage } from './pages/ProfileOrgPage';
import { AdminPage } from './pages/AdminPage';
import { ExtensionPage } from './pages/ExtensionPage';
import { HallmarkingPage } from './pages/HallmarkingPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProcurementPage } from './pages/ProcurementPage';
import { LoginPage } from './pages/LoginPage';
import { SmartSearchModal } from './components/SmartSearchModal';
import { procurementCategories } from './data/procurementData';
import { procurementEngine } from './services/procurementEngine';
import { storageService } from './services/storageService';
import { useTranslation } from 'react-i18next';
import { applyLanguageSettings } from './i18n/config';

export default function App() {
  const { t, i18n } = useTranslation();
  // Default tab is 'home' (Markdarshak Portal Homepage)
  const [currentTab, setCurrentTab] = useState('home');
  const [currentLang, setCurrentLang] = useState(i18n.language || storageService.getLanguage() || 'en');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // User State (Procurement Officer by default)
  const [user, setUser] = useState(() => {
    return storageService.getConsumerUser() || {
      name: "Er. Rajesh Kumar Sharma",
      designation: "Superintending Engineer (Procurement & Contracts)",
      organization: "Central Public Works Department (CPWD)",
      ministry: "Ministry of Housing and Urban Affairs (MoHUA)",
      gemId: "GEM-DL-CPWD-2024-8841",
      email: "rajesh.sharma@cpwd.gov.in",
      phone: "+91 98101 XXXXX",
      officeLocation: "Nirman Bhawan, New Delhi - 110011",
      role: "officer",
      financialLimit: "₹ 50.00 Crores (DoFP Tier-I)",
      joinedDate: "12 Jan 2024"
    };
  });

  // Active Procurement State
  const [selectedCategory, setSelectedCategory] = useState(procurementCategories[0]);
  const [inputText, setInputText] = useState(procurementCategories[0].sampleTenderText);
  const [analysisResult, setAnalysisResult] = useState(() => {
    const res = procurementEngine.analyzeTenderSpec(procurementCategories[0].sampleTenderText, currentLang);
    return {
      ...res,
      category: procurementCategories[0],
      primaryStandards: procurementCategories[0].primaryStandards,
      alliedStandards: procurementCategories[0].alliedStandards,
      mandatoryCertification: procurementCategories[0].mandatoryCertification,
      tenderClause: procurementCategories[0].tenderClauseTemplate,
      extractedRequirements: procurementCategories[0].extractedRequirements
    };
  });

  // Keyboard shortcut for Smart Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
    storageService.setLanguage(lang);
    applyLanguageSettings(lang);
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setInputText(cat.sampleTenderText);
    const res = procurementEngine.analyzeTenderSpec(cat.sampleTenderText, currentLang);
    setAnalysisResult({
      ...res,
      category: cat,
      primaryStandards: cat.primaryStandards,
      alliedStandards: cat.alliedStandards,
      mandatoryCertification: cat.mandatoryCertification,
      tenderClause: cat.tenderClauseTemplate,
      extractedRequirements: cat.extractedRequirements
    });
  };

  const handleQuickAsk = (query) => {
    setCurrentTab('assistant');
  };

  // If currentTab is 'login', render the full BIS Portal Login Page
  if (currentTab === 'login') {
    return (
      <LoginPage
        onLoginSuccess={(userData) => {
          setUser(userData);
          storageService.saveConsumerUser(userData);
          setCurrentTab('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // If currentTab is 'home', render the full Markdarshak Portal Homepage layout
  if (currentTab === 'home') {
    return (
      <div className="min-h-screen bg-white text-[#0B2545] antialiased font-sans flex flex-col">
        <HomePage
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSearch={() => setSearchModalOpen(true)}
          onAskAi={(query) => {
            setCurrentTab('assistant');
          }}
          onOpenLoginModal={() => {
            setCurrentTab('login');
          }}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          t={t}
        />

        <SmartSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectQuery={handleQuickAsk}
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentLang={currentLang}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans flex">

      {/* 1. Left Persistent Sidebar Layout */}
      <Sidebar
        currentTab={currentTab}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenSearch={() => setSearchModalOpen(true)}
        isOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        t={t}
      />

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[315px]">

        {/* Top Header Strip */}
        <Navbar
          currentTab={currentTab}
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          user={user}
          onOpenSearch={() => setSearchModalOpen(true)}
          onToggleSidebar={() => setMobileSidebarOpen(prev => !prev)}
          t={t}
        />

        {/* Dynamic Page Component View */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">

          {currentTab === 'dashboard' && (
            <DashboardPage
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCategory={handleSelectCategory}
              user={user}
              t={t}
            />
          )}

          {currentTab === 'procurement' && (
            <ProcurementPage
              inputText={inputText}
              setInputText={setInputText}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              analysisResult={analysisResult}
              setAnalysisResult={setAnalysisResult}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'analyze' && (
            <AnalyzeSpecPage
              inputText={inputText}
              setInputText={setInputText}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              analysisResult={analysisResult}
              setAnalysisResult={setAnalysisResult}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'recommendation' && (
            <StandardRecommendationPage
              inputText={inputText}
              setInputText={setInputText}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              analysisResult={analysisResult}
              setAnalysisResult={setAnalysisResult}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'related' && (
            <RelatedStandardsPage
              analysisResult={analysisResult}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'compliance' && (
            <CompliancePage
              analysisResult={analysisResult}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'source' && (
            <SourceViewerPage
              analysisResult={analysisResult}
              inputText={inputText}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'builder' && (
            <TenderSpecBuilderPage
              analysisResult={analysisResult}
              user={user}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'assistant' && (
            <AiSaathiPage
              currentLang={currentLang}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              t={t}
            />
          )}

          {currentTab === 'standards' && (
            <StandardsPage
              onAskStandard={handleQuickAsk}
              t={t}
            />
          )}

          {currentTab === 'laboratories' && (
            <LaboratoriesPage
              onAskLab={handleQuickAsk}
              t={t}
            />
          )}

          {currentTab === 'licensing' && (
            <CertificationPage
              onAskScheme={handleQuickAsk}
              t={t}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileOrgPage
              user={user}
              onUpdateUser={(updated) => {
                setUser(updated);
                storageService.saveConsumerUser(updated);
              }}
              onLogout={() => {
                setUser(null);
                storageService.removeConsumerUser();
              }}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'admin' && (
            <AdminPage
              user={user}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

          {currentTab === 'hallmarking' && (
            <HallmarkingPage
              onAskHallmark={handleQuickAsk}
              t={t}
            />
          )}

          {currentTab === 'formulation' && (
            <DocumentsPage
              onAskDoc={handleQuickAsk}
              t={t}
            />
          )}

          {currentTab === 'saved' && (
            <HistoryPage
              sessions={storageService.getSessions ? storageService.getSessions() : []}
              onSelectSession={(id) => {
                setCurrentTab('assistant');
              }}
              onQuickAsk={handleQuickAsk}
              onDeleteSession={() => { }}
              t={t}
            />
          )}

          {currentTab === 'extension' && (
            <ExtensionPage
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentLang={currentLang}
              t={t}
            />
          )}

        </main>

        {/* Footer */}
        <Footer
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

      </div>

      {/* Global Smart Search Modal */}
      <SmartSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectQuery={handleQuickAsk}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
      />

    </div>
  );
}
