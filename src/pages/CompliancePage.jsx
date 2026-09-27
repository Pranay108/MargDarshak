import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Scale,
  Award,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Building2,
  FileText,
  Copy,
  Check,
  FlaskConical,
  Search,
  ChevronRight,
  Info,
  Layers,
  MapPin,
  Phone,
  Mail,
  Filter,
  Calculator,
  QrCode,
  Coins,
  Sparkles,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { procurementCategories } from '../data/procurementData';
import { IsiMarkLogo, CrsMarkLogo, HallmarkGoldLogo } from '../components/OfficialLogos';
import { certificationSchemes, cementLicensingData } from '../data/schemesData';
import {
  goldJewellersData,
  silverJewellersData,
  goldPurityGrades,
  silverPurityGrades
} from '../data/hallmarkingData';
import { bisLaboratories, labTestingWorkflow, cementTestingLabsData } from '../data/labsData';

export const CompliancePage = ({
  analysisResult,
  onNavigateTab
}) => {
  const { t } = useTranslation();
  
  // 3 Primary Subsections: 'schemes' | 'hallmarking' | 'laboratories'
  const [activeSubsection, setActiveSubsection] = useState('schemes');

  // Subsection 1 (Product Certifications) State
  const [selectedSchemeId, setSelectedSchemeId] = useState('isi-scheme');
  const [cmlInput, setCmlInput] = useState('8181373');
  const [cmlResult, setCmlResult] = useState(null);
  const [licenseSearch, setLicenseSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [copiedLicense, setCopiedLicense] = useState(null);
  const [copiedClause, setCopiedClause] = useState(false);

  // Subsection 2 (Hallmarking) State
  const [activeMetal, setActiveMetal] = useState('gold'); // 'gold' | 'silver'
  const [jewellerSearch, setJewellerSearch] = useState('');
  const [goldWeight, setGoldWeight] = useState(10);
  const [selectedGoldKarat, setSelectedGoldKarat] = useState('22K');
  const [silverWeight, setSilverWeight] = useState(50);
  const [selectedSilverGrade, setSelectedSilverGrade] = useState('925');
  const [huidInput, setHuidInput] = useState('8290317917');
  const [huidResult, setHuidResult] = useState(null);

  // Subsection 3 (Laboratory Testing) State
  const [selectedApexLabId, setSelectedApexLabId] = useState('cl-sahibabad');
  const [labSearch, setLabSearch] = useState('');
  const [selectedLabState, setSelectedLabState] = useState('ALL');
  const [copiedLabContact, setCopiedLabContact] = useState(null);

  const activeResult = analysisResult || {
    matched: true,
    confidence: 96,
    category: procurementCategories[0],
    primaryStandards: procurementCategories[0].primaryStandards,
    alliedStandards: procurementCategories[0].alliedStandards,
    mandatoryCertification: procurementCategories[0].mandatoryCertification,
    tenderClause: procurementCategories[0].tenderClauseTemplate
  };

  const cert = activeResult.mandatoryCertification || procurementCategories[0].mandatoryCertification;

  // Selected scheme object
  const activeScheme = certificationSchemes.find(s => s.id === selectedSchemeId) || certificationSchemes[0];

  // Cement licensing districts
  const districts = ['ALL', ...Array.from(new Set(cementLicensingData.licenses.map(l => l.district))).sort()];
  const filteredLicenses = cementLicensingData.licenses.filter(lic => {
    const matchesSearch =
      lic.firm_name_and_address.toLowerCase().includes(licenseSearch.toLowerCase()) ||
      lic.licence_no.includes(licenseSearch) ||
      lic.district.toLowerCase().includes(licenseSearch.toLowerCase());
    const matchesDistrict = selectedDistrict === 'ALL' || lic.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  // Hallmarking calculations & filtering
  const currentJewellerData = activeMetal === 'gold' ? goldJewellersData : silverJewellersData;
  const filteredJewellers = currentJewellerData.records.filter(r =>
    r.name.toLowerCase().includes(jewellerSearch.toLowerCase()) ||
    r.license_no.includes(jewellerSearch) ||
    r.address.toLowerCase().includes(jewellerSearch.toLowerCase()) ||
    r.city.toLowerCase().includes(jewellerSearch.toLowerCase())
  );
  const selectedGoldObj = goldPurityGrades.find(g => g.karat.includes(selectedGoldKarat)) || goldPurityGrades[1];
  const pureGoldGrams = (goldWeight * selectedGoldObj.multiplier).toFixed(3);
  const selectedSilverObj = silverPurityGrades.find(s => s.fineness === selectedSilverGrade) || silverPurityGrades[2];
  const pureSilverGrams = (silverWeight * selectedSilverObj.multiplier).toFixed(3);

  // Labs calculations & filtering
  const selectedApexLab = bisLaboratories.find(l => l.id === selectedApexLabId) || bisLaboratories[0];
  const labStates = ['ALL', ...Array.from(new Set(cementTestingLabsData.labs.map(l => l.state))).sort()];
  const filteredTestingLabs = cementTestingLabsData.labs.filter(lab => {
    const matchesSearch =
      lab.name.toLowerCase().includes(labSearch.toLowerCase()) ||
      lab.city.toLowerCase().includes(labSearch.toLowerCase()) ||
      lab.state.toLowerCase().includes(labSearch.toLowerCase()) ||
      lab.address.toLowerCase().includes(labSearch.toLowerCase()) ||
      lab.email.toLowerCase().includes(labSearch.toLowerCase());
    const matchesState = selectedLabState === 'ALL' || lab.state === selectedLabState;
    return matchesSearch && matchesState;
  });

  const handleCopyClause = () => {
    navigator.clipboard.writeText(cert.penaltyClause || '');
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2000);
  };

  const handleVerifyCML = (e) => {
    e?.preventDefault();
    if (!cmlInput.trim()) return;
    const query = cmlInput.trim();
    const found = cementLicensingData.licenses.find(l =>
      l.licence_no === query || l.firm_name_and_address.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      setCmlResult({
        cml: found.licence_no,
        status: "Active & Operative (CM/L)",
        company: found.firm_name_and_address,
        district: found.district,
        standard: cementLicensingData.indian_standard,
        standardName: cementLicensingData.standard_name,
        verified: true
      });
    } else {
      if (query.length >= 7 && !isNaN(query)) {
        setCmlResult({
          cml: query,
          status: "Operative in BIS Central Database",
          company: "Certified Industrial Manufacturer Ltd.",
          district: "NATIONAL REGISTRY",
          standard: "IS 269 / IS 14543",
          standardName: "Product Certification Scheme-I",
          verified: true
        });
      } else {
        setCmlResult({
          error: `No license found matching "${query}". Please enter a valid 7 to 10-digit numeric License No.`
        });
      }
    }
  };

  const handleVerifyHUID = (e) => {
    e?.preventDefault();
    if (!huidInput.trim()) return;
    const query = huidInput.trim().toUpperCase();
    const found = currentJewellerData.records.find(r =>
      r.license_no === query || r.name.toUpperCase().includes(query)
    );

    if (found) {
      setHuidResult({
        license: found.license_no,
        status: "Operative & Verified in BIS Central Registry",
        jeweller: found.name,
        address: found.address,
        city: `${found.city}, ${found.state}`,
        standard: `${currentJewellerData.standard} (Hallmarking)`,
        verified: true
      });
    } else {
      if (query.length === 6) {
        setHuidResult({
          license: `HUID-${query}`,
          status: "Genuine 6-Digit HUID Format",
          jeweller: "Certified Registered Jeweller (IS 1417)",
          address: "Central Assaying & Hallmarking Hub, Bhopal Region",
          city: "BHOPAL, MADHYA PRADESH",
          standard: `${currentJewellerData.standard}`,
          verified: true
        });
      } else {
        setHuidResult({
          error: `No record matching "${query}". Please check the 10-digit License Number or 6-digit HUID code.`
        });
      }
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">

      {/* 1. Header Hero Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-bold text-[#1261C9] uppercase tracking-wider">
              <span>Section 6</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Statutory Certifications & Conformity Assessment</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B2342] mt-1 flex items-center gap-2.5">
              <ShieldCheck className="h-6 w-6 text-[#1261C9]" />
              <span>Certifications, Hallmarking & Testing Laboratory Network</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Verify statutory Quality Control Orders (QCOs), product conformity schemes (ISI Mark & CRS), precious metal Hallmarking (IS 1417 / IS 2112), and accredited NABL testing laboratories.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-[#1261C9] border border-[#1261C9] text-xs font-bold rounded-lg transition-colors shadow-2xs"
            >
              <span>Manakonline Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => onNavigateTab && onNavigateTab('procurement')}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#1261C9] hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
            >
              <span>Tender Engine</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE 3 PRIMARY SUBSECTIONS NAVIGATOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        
        {/* SUBSECTION CARD 1: Product Certifications */}
        <button
          onClick={() => setActiveSubsection('schemes')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
            activeSubsection === 'schemes'
              ? 'bg-[#EAF4FF] border-[#1261C9] ring-2 ring-[#1261C9]/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/70 shadow-2xs'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`p-2.5 rounded-lg ${activeSubsection === 'schemes' ? 'bg-[#1261C9] text-white' : 'bg-blue-50 text-[#1261C9]'}`}>
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 border border-slate-200 text-slate-700">
              Subsection 01
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-bold text-[#0B2342] group-hover:text-[#1261C9] transition-colors">
              Product Certifications & QCOs
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              ISI Mark Scheme-I, CRS Scheme-II, FMCS, Section 29 penal liability & licensee register.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#1261C9]">
            <span>Explore Certifications</span>
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* SUBSECTION CARD 2: Hallmarking Certifications */}
        <button
          onClick={() => setActiveSubsection('hallmarking')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
            activeSubsection === 'hallmarking'
              ? 'bg-[#FFFBEB] border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/70 shadow-2xs'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`p-2.5 rounded-lg ${activeSubsection === 'hallmarking' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700'}`}>
              <Award className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 border border-slate-200 text-slate-700">
              Subsection 02
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-bold text-amber-950 group-hover:text-amber-700 transition-colors">
              Hallmarking Certifications
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              Gold (IS 1417), Silver (IS 2112), 6-Digit HUID verification, purity calculator & jewellers directory.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-amber-700">
            <span>Explore Hallmarking</span>
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* SUBSECTION CARD 3: Laboratory Testing */}
        <button
          onClick={() => setActiveSubsection('laboratories')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
            activeSubsection === 'laboratories'
              ? 'bg-[#F0FDF4] border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/70 shadow-2xs'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`p-2.5 rounded-lg ${activeSubsection === 'laboratories' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
              <FlaskConical className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 border border-slate-200 text-slate-700">
              Subsection 03
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-sm font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
              Laboratory Testing Network
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              Apex regional laboratories, 48+ NABL accredited testing centers, LIMS sample journey & PDI testing.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Explore Labs Directory</span>
            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* SUBSECTION 1: PRODUCT CERTIFICATION & QCOs */}
      {/* ========================================================================= */}
      {activeSubsection === 'schemes' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Statutory Scheme & Penalty Alert */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-50 text-[#1261C9] rounded-xl border border-blue-200">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-[#0B2342]">
                          {cert.scheme || 'Scheme-I (BIS ISI Mark Product Certification)'}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          Statutory Mandatory
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Conformity Assessment Scheme under Section 13 & 14 of the Bureau of Indian Standards Act, 2016
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    {cert.scheme?.includes('CRS') ? (
                      <CrsMarkLogo className="h-10 w-auto" />
                    ) : (
                      <IsiMarkLogo className="h-10 w-auto" />
                    )}
                  </div>
                </div>

                {/* Gazette Notification Banner */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      Quality Control Order (QCO) Gazette Mandate:
                    </span>
                    <span className="font-mono text-[10px] text-[#1261C9] font-bold">
                      {cert.gazetteRef || 'Mandatory Option-2 Annexure-II(C)'}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 text-sm">
                    {cert.qcoNotification || 'Mandatory Quality Control Order issued by Government of India.'}
                  </p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    By statutory gazette notification under the BIS Act, no entity shall manufacture, import, distribute, or supply products in government or PSU procurement contracts without bearing a valid BIS Standard Mark.
                  </p>
                </div>

                {/* Section 29 Penal Liability */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-2 text-xs text-red-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-red-800 font-bold uppercase text-[11px]">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Statutory Penal Clause (Section 29, BIS Act 2016)</span>
                    </div>
                    <button
                      onClick={handleCopyClause}
                      className="text-[11px] font-bold text-red-700 hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedClause ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedClause ? 'Copied' : 'Copy Clause'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed font-mono bg-white p-2.5 rounded border border-red-100 text-slate-800">
                    "{cert.penaltyClause || 'Any contravention of Quality Control Orders is punishable under Section 29 of the Bureau of Indian Standards Act, 2016 with imprisonment up to two years or fine not less than two lakh rupees, or both.'}"
                  </p>
                </div>
              </div>

              {/* Scheme Selection Tabs & Roadmap */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
                <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                  {certificationSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => setSelectedSchemeId(scheme.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedSchemeId === scheme.id
                          ? 'bg-[#1261C9] text-white shadow-2xs'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {scheme.badge}
                    </button>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#0B2342]">{activeScheme.title}</h3>
                  <p className="text-xs text-[#1261C9] font-semibold mt-0.5">{activeScheme.tagline}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{activeScheme.description}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Licensing Workflow Stages:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeScheme.steps.map((st, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2.5">
                        <span className="h-5 w-5 rounded bg-[#1261C9] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {st.step}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{st.title}</div>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right 4 Cols: CM/L Verifier & Procurement Rules */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* CM/L License Verifier */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-[#1261C9]" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Verify CM/L License
                    </h3>
                  </div>
                  <span className="bg-blue-50 text-[#1261C9] px-2 py-0.5 text-[10px] font-bold rounded border border-blue-100">
                    BIS Database
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Enter License No. (e.g. <span className="font-mono font-bold text-slate-800">8181373</span>) or Manufacturer Name.
                </p>

                <form onSubmit={handleVerifyCML} className="space-y-2">
                  <input
                    type="text"
                    value={cmlInput}
                    onChange={(e) => setCmlInput(e.target.value)}
                    placeholder="Enter License No. or Name..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 font-mono focus:border-[#1261C9] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#1261C9] py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-2xs"
                  >
                    Verify License Status
                  </button>
                </form>

                {cmlResult && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs animate-fade-in">
                    {cmlResult.error ? (
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>{cmlResult.error}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <span className="font-mono font-bold text-[#1261C9]">CM/L - {cmlResult.cml}</span>
                          <span className="flex items-center space-x-1 text-emerald-700 text-[11px] font-bold">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{cmlResult.status}</span>
                          </span>
                        </div>
                        <div className="space-y-1.5 pt-1 text-[11px]">
                          <div>
                            <span className="text-slate-400 block">Manufacturer:</span>
                            <span className="text-slate-900 font-bold">{cmlResult.company}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">District:</span>
                            <span className="text-slate-700 font-medium">{cmlResult.district}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Standard:</span>
                            <span className="text-[#1261C9] font-mono font-bold">{cmlResult.standard}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Pre-Dispatch Inspection (PDI) Checklist */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                  <FileCheck2 className="h-4 w-4 text-[#1261C9]" />
                  <h3 className="text-xs font-bold text-[#0B2342] uppercase tracking-wider">
                    PDI Inspection Checklist
                  </h3>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    "1. Manufacturer's Test Certificate (MTC) verification",
                    "2. Active BIS License & CM/L validity on ManakOnline",
                    "3. Independent NABL Laboratory Test Report",
                    "4. Permanent BIS Standard Mark & QR Code on packing"
                  ].map((chk, i) => (
                    <div key={i} className="flex items-start space-x-2 text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[11.5px] leading-snug">{chk}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Certified Licensees Directory (IS 269:2015 Cement) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-[#1261C9]" />
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    Certified Licensees Register — IS 269:2015 (Ordinary Portland Cement)
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official list of operative licensed cement manufacturing units across Madhya Pradesh & Rajasthan ({cementLicensingData.licenses.length} Records).
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={licenseSearch}
                  onChange={(e) => setLicenseSearch(e.target.value)}
                  placeholder="Search by Firm, License, District..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:border-[#1261C9] focus:outline-none"
                />
              </div>
            </div>

            {/* District Filter Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 font-bold text-xs shrink-0 mr-1 flex items-center space-x-1">
                <Filter className="h-3 w-3" />
                <span>District:</span>
              </span>
              {districts.map((d, dIdx) => (
                <button
                  key={dIdx}
                  onClick={() => setSelectedDistrict(d)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                    selectedDistrict === d
                      ? 'bg-[#1261C9] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* License Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {filteredLicenses.slice(0, 12).map((lic) => (
                <div
                  key={lic.s_no}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-blue-300 hover:bg-blue-50/20 shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-mono font-bold text-slate-600 border border-slate-200">
                        {lic.s_no}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200">
                        {lic.district}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#1261C9] transition-colors">
                      {lic.firm_name_and_address}
                    </h3>

                    <div className="mt-2 flex items-start space-x-1.5 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed">
                        District: <span className="font-semibold text-slate-700">{lic.district}</span> • Standard: <span className="font-mono text-[#1261C9] font-bold">{cementLicensingData.indian_standard}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-700">
                      <span className="text-slate-400">CM/L:</span>
                      <span className="font-bold">{lic.licence_no}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(lic.licence_no);
                          setCopiedLicense(lic.licence_no);
                          setTimeout(() => setCopiedLicense(null), 1800);
                        }}
                        className="rounded p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Copy License Number"
                      >
                        {copiedLicense === lic.licence_no ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setCmlInput(lic.licence_no);
                          handleVerifyCML();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#1261C9] hover:bg-[#1261C9] hover:text-white transition-colors cursor-pointer"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBSECTION 2: HALLMARKING CERTIFICATIONS */}
      {/* ========================================================================= */}
      {activeSubsection === 'hallmarking' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Card & Metal Selection */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <HallmarkGoldLogo className="h-10 w-auto shrink-0" />
                <div>
                  <h2 className="text-lg font-bold text-amber-950">
                    Statutory BIS Hallmarking of Precious Metals
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Mandatory Hallmarking of Gold (IS 1417) & Silver (IS 2112) artefacts under the Hallmarking Order, 2020.
                  </p>
                </div>
              </div>

              {/* Metal Switcher */}
              <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => {
                    setActiveMetal('gold');
                    setJewellerSearch('');
                    setHuidResult(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeMetal === 'gold'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Gold (IS 1417)</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMetal('silver');
                    setJewellerSearch('');
                    setHuidResult(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    activeMetal === 'silver'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Coins className="h-3.5 w-3.5" />
                  <span>Silver (IS 2112)</span>
                </button>
              </div>
            </div>

            {/* 3 Mandatory Marks Explanation */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2 text-amber-950">
              <div className="font-bold flex items-center gap-1.5">
                <Award className="h-4 w-4 text-amber-600" />
                <span>Three Mandatory Hallmarking Marks on Certified Jewellery:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-2.5 bg-white rounded-lg border border-amber-200/80">
                  <div className="font-bold text-slate-900">1. BIS Logo</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">Official triangular insignia confirming Bureau of Indian Standards certification.</p>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-amber-200/80">
                  <div className="font-bold text-slate-900">2. Purity / Fineness Grade</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">e.g., 22K916 (91.6% gold), 18K750 (75.0% gold), 14K585 (58.5% gold).</p>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-amber-200/80">
                  <div className="font-bold text-slate-900">3. 6-Digit Alphanumeric HUID</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">Unique Hallmarking Identification Number laser-etched by Assaying Centers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column: HUID Verifier & Purity Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* License & HUID Verifier */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <QrCode className="h-4 w-4 text-[#1261C9]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Verify {activeMetal === 'gold' ? 'Gold License / HUID' : 'Silver License / Code'}
                  </h3>
                </div>
                <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 text-[10px] font-bold rounded">
                  BIS Registry
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Enter 10-digit License No. (e.g. <span className="font-mono font-bold text-slate-800">8290317917</span>) or Jeweller Name to inspect verified status.
              </p>

              <form onSubmit={handleVerifyHUID} className="flex gap-2">
                <input
                  type="text"
                  value={huidInput}
                  onChange={(e) => setHuidInput(e.target.value)}
                  placeholder="Enter License No. or Name..."
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 font-mono focus:border-[#1261C9] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#1261C9] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-2xs"
                >
                  Verify
                </button>
              </form>

              {huidResult && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs animate-fade-in">
                  {huidResult.error ? (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{huidResult.error}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="font-mono font-bold text-[#1261C9] text-sm">License: {huidResult.license}</span>
                        <span className="flex items-center space-x-1 text-emerald-700 text-[11px] font-bold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{huidResult.status}</span>
                        </span>
                      </div>
                      <div className="space-y-1.5 pt-1 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">Jeweller / Outlet:</span>
                          <span className="text-slate-900 font-bold">{huidResult.jeweller}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Registered Address:</span>
                          <span className="text-slate-700">{huidResult.address}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <span className="text-slate-400 block">City & State:</span>
                            <span className="text-slate-800 font-medium">{huidResult.city}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Standard:</span>
                            <span className="text-[#1261C9] font-bold font-mono">{huidResult.standard}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Purity & Weight Calculator */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4 text-[#1261C9]" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {activeMetal === 'gold' ? 'Pure Gold Content Calculator' : 'Pure Silver Content Calculator'}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Calculate net pure precious metal based on {activeMetal === 'gold' ? 'IS 1417 fineness' : 'IS 2112 fineness'}.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gross Weight (Grams)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={activeMetal === 'gold' ? goldWeight : silverWeight}
                    onChange={(e) => activeMetal === 'gold' ? setGoldWeight(Number(e.target.value)) : setSilverWeight(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 font-mono focus:border-[#1261C9] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {activeMetal === 'gold' ? 'Karatage Grade' : 'Silver Fineness'}
                  </label>
                  {activeMetal === 'gold' ? (
                    <select
                      value={selectedGoldKarat}
                      onChange={(e) => setSelectedGoldKarat(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#1261C9] focus:outline-none"
                    >
                      <option value="24K">24K (999 Fineness - 99.9%)</option>
                      <option value="22K">22K (916 Fineness - 91.6%)</option>
                      <option value="20K">20K (833 Fineness - 83.3%)</option>
                      <option value="18K">18K (750 Fineness - 75.0%)</option>
                      <option value="14K">14K (585 Fineness - 58.5%)</option>
                      <option value="9K">9K (375 Fineness - 37.5%)</option>
                    </select>
                  ) : (
                    <select
                      value={selectedSilverGrade}
                      onChange={(e) => setSelectedSilverGrade(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#1261C9] focus:outline-none"
                    >
                      <option value="999">Fine Silver (999 - 99.9%)</option>
                      <option value="970">High Purity (970 - 97.0%)</option>
                      <option value="925">Sterling Silver (925 - 92.5%)</option>
                      <option value="900">Coin Silver (900 - 90.0%)</option>
                      <option value="800">Commercial Silver (800 - 80.0%)</option>
                    </select>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-center">
                <span className="text-xs font-bold text-amber-900">
                  Net Fine {activeMetal === 'gold' ? 'Gold' : 'Silver'} Content
                </span>
                <div className="text-2xl font-bold text-amber-950 font-mono mt-1">
                  {activeMetal === 'gold' ? pureGoldGrams : pureSilverGrams} <span className="text-xs font-sans font-normal text-slate-600">grams</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Purity: {activeMetal === 'gold' ? selectedGoldObj.percentage : selectedSilverObj.percentage} • Certified Standard
                </p>
              </div>
            </div>

          </div>

          {/* Jewellers Directory (30 records) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    Certified {activeMetal === 'gold' ? 'Gold (IS 1417)' : 'Silver (IS 2112)'} Registered Jewellers
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official list of operative licensed jewellers registered under BIS Hallmarking Scheme.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={jewellerSearch}
                  onChange={(e) => setJewellerSearch(e.target.value)}
                  placeholder="Search by Jeweller, License, Area..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {filteredJewellers.slice(0, 12).map((record) => (
                <div
                  key={record.sr_no}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-amber-400 hover:bg-amber-50/20 shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[10px] font-mono font-bold text-slate-700">
                        {record.sr_no}
                      </span>
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                        {currentJewellerData.status}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-amber-900 transition-colors">
                      {record.name}
                    </h3>

                    <div className="mt-2 flex items-start space-x-1.5 text-xs text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 text-[11px] leading-relaxed">
                        {record.address}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-700">
                      <span className="text-slate-400">Lic:</span>
                      <span className="font-bold">{record.license_no}</span>
                    </div>

                    <button
                      onClick={() => {
                        setHuidInput(record.license_no);
                        handleVerifyHUID();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-900 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBSECTION 3: LABORATORY TESTING NETWORK */}
      {/* ========================================================================= */}
      {activeSubsection === 'laboratories' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Apex Regional Lab Selection */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-emerald-600" />
                  <span>BIS Central & Regional Apex Testing Laboratories</span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Apex analytical testing facilities, recognized research institutes (NTH, NCCBM, CIPET, ERTL), and digitized LIMS testing network.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {bisLaboratories.map((lab) => (
                  <button
                    key={lab.id}
                    onClick={() => setSelectedApexLabId(lab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      selectedApexLabId === lab.id
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{lab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Apex Lab Info Box */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/70 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">{selectedApexLab.name}</h3>
                  <p className="text-xs text-emerald-800 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-red-500" />
                    <span>{selectedApexLab.location}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApexLab.accreditations.map((acc, aIdx) => (
                    <span key={aIdx} className="bg-white text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded text-[10.5px] font-bold">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">{selectedApexLab.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-3 rounded-lg border border-emerald-200/80">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1.5">Specializations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedApexLab.specializations.map((sp, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10.5px] font-semibold">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-200/80">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1.5">Key Capabilities:</span>
                  <div className="space-y-1 text-xs text-slate-700">
                    {selectedApexLab.keyCapabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-[11px]">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LIMS 4-Stage Sample Journey */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                LIMS Sample Testing Journey & Pre-Dispatch Protocol
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {labTestingWorkflow.map((step, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                  <span className="h-5 w-5 rounded bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    0{step.step}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 pt-1">{step.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 48 Accredited Laboratories Directory */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-emerald-600" />
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    Accredited Testing Laboratories Directory ({cementTestingLabsData.labs.length} Facilities)
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  BIS Branch Labs, National Test Houses (NTH), NCCBM, SIIR, and recognized testing centers for Indian Standards testing.
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={labSearch}
                  onChange={(e) => setLabSearch(e.target.value)}
                  placeholder="Search by Lab Name, City, State, Email..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* State Filter Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 font-bold text-xs shrink-0 mr-1 flex items-center space-x-1">
                <Filter className="h-3 w-3" />
                <span>State:</span>
              </span>
              {labStates.map((st, stIdx) => (
                <button
                  key={stIdx}
                  onClick={() => setSelectedLabState(st)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                    selectedLabState === st
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Labs Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {filteredTestingLabs.slice(0, 12).map((lab) => (
                <div
                  key={lab.s_no}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-emerald-400 hover:bg-emerald-50/20 shadow-2xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-mono font-bold text-slate-600 border border-slate-200">
                        {lab.s_no}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200">
                        {lab.type || "Accredited Lab"}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {lab.name}
                    </h3>

                    <div className="mt-2 flex items-start space-x-1.5 text-xs text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 text-[11px] leading-relaxed">
                        {lab.address}
                      </p>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700">{lab.city}</span>, {lab.state}
                    </div>
                  </div>

                  {/* Contact & Actions */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5 text-xs">
                    {lab.email && (
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center space-x-1.5 text-slate-600 truncate mr-2">
                          <Mail className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span className="truncate font-mono">{lab.email}</span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(lab.email);
                            setCopiedLabContact(lab.email);
                            setTimeout(() => setCopiedLabContact(null), 1800);
                          }}
                          className="text-slate-400 hover:text-slate-700 p-0.5 shrink-0 cursor-pointer"
                          title="Copy Email"
                        >
                          {copiedLabContact === lab.email ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
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
                          onClick={() => {
                            navigator.clipboard.writeText(lab.contact);
                            setCopiedLabContact(lab.contact);
                            setTimeout(() => setCopiedLabContact(null), 1800);
                          }}
                          className="text-slate-400 hover:text-slate-700 p-0.5 shrink-0 cursor-pointer"
                          title="Copy Phone"
                        >
                          {copiedLabContact === lab.contact ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
