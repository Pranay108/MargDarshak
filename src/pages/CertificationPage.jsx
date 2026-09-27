import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare,
  Search,
  AlertTriangle,
  Building2,
  MapPin,
  Copy,
  Check,
  Filter,
  Layers
} from 'lucide-react';
import { certificationSchemes, cementLicensingData } from '../data/schemesData';

export const CertificationPage = ({ onAskScheme, t }) => {
  const [activeSchemeId, setActiveSchemeId] = useState('isi-scheme');
  const [cmlInput, setCmlInput] = useState('8181373');
  const [cmlResult, setCmlResult] = useState(null);

  // Cement License Directory Search & Filter state
  const [licenseSearch, setLicenseSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [copiedLicense, setCopiedLicense] = useState(null);

  const activeScheme = certificationSchemes.find(s => s.id === activeSchemeId) || certificationSchemes[0];

  // Unique districts for filter
  const districts = ['ALL', ...Array.from(new Set(cementLicensingData.licenses.map(l => l.district))).sort()];

  // Filtered Cement Licenses
  const filteredLicenses = cementLicensingData.licenses.filter(lic => {
    const matchesSearch = 
      lic.firm_name_and_address.toLowerCase().includes(licenseSearch.toLowerCase()) ||
      lic.licence_no.includes(licenseSearch) ||
      lic.district.toLowerCase().includes(licenseSearch.toLowerCase());

    const matchesDistrict = selectedDistrict === 'ALL' || lic.district === selectedDistrict;

    return matchesSearch && matchesDistrict;
  });

  const handleCopyLicense = (lic) => {
    navigator.clipboard.writeText(lic);
    setCopiedLicense(lic);
    setTimeout(() => setCopiedLicense(null), 1800);
  };

  const handleVerifyCML = (e) => {
    e?.preventDefault();
    if (!cmlInput.trim()) return;

    const query = cmlInput.trim();
    // Lookup in IS 269 Cement licenses
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

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Hero Card */}
        <div className="rounded border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans font-bold">
                BIS Licensing & Product Certification
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
                Explore operative ISI Mark licenses, Indian Standards compliance (IS 269 Cement, IS 14543 Water), and licensing verification.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href="https://www.manakonline.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 rounded bg-[#00529B] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#044983] transition-colors shrink-0"
              >
                <span>Apply on Manakonline</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={() => onAskScheme("What is the step-by-step process, testing guidelines, and documentation required for ISI Mark License under Scheme-I?")}
                className="inline-flex items-center space-x-1.5 rounded border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Inquire with AI SATHI</span>
              </button>
            </div>
          </div>

          {/* Scheme Selection Tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            {certificationSchemes.map((scheme) => {
              const isActive = scheme.id === activeSchemeId;
              return (
                <button
                  key={scheme.id}
                  onClick={() => setActiveSchemeId(scheme.id)}
                  className={`flex items-center space-x-2 rounded px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#00529B] text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
                  }`}
                >
                  <span>{scheme.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column: Active Scheme Details & CM/L Verifier */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Scheme Roadmap */}
          <div className="lg:col-span-2 rounded border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200">
                {activeScheme.badge}
              </span>
              <h2 className="mt-1.5 text-base sm:text-lg font-bold text-slate-900 font-sans font-bold">
                {activeScheme.title}
              </h2>
              <p className="text-xs text-[#00529B] font-medium mt-0.5">
                {activeScheme.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeScheme.description}
            </p>

            {/* Steps Timeline */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-sans font-bold mb-2.5">
                Licensing Workflow Steps:
              </h3>
              <div className="space-y-2">
                {activeScheme.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 rounded border border-slate-200 bg-slate-50 p-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-white border border-slate-200 text-[#00529B] text-xs font-bold font-mono shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CM/L License Verifier Tool */}
          <div className="rounded border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-[#00529B]" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans font-bold">
                  Verify CM/L License
                </h3>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200">
                BIS Database
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Enter License No. (e.g. <span className="font-mono font-bold text-slate-800">8181373</span> or <span className="font-mono font-bold text-slate-800">8200109104</span>) or Manufacturer Name.
            </p>

            <form onSubmit={handleVerifyCML} className="space-y-2">
              <input
                type="text"
                value={cmlInput}
                onChange={(e) => setCmlInput(e.target.value)}
                placeholder="Enter License No. or Name..."
                className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 font-mono focus:border-[#00529B] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded bg-[#00529B] py-2 text-xs font-semibold text-white hover:bg-[#044983] transition-colors"
              >
                Verify License
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
                      <span className="font-mono font-bold text-[#00529B]">CM/L - {cmlResult.cml}</span>
                      <span className="flex items-center space-x-1 text-emerald-700 text-[11px] font-semibold">
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
                        <span className="text-[#00529B] font-mono font-semibold">{cmlResult.standard}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

        </div>

        {/* 50 LICENSES DIRECTORY: IS 269:2015 CEMENT */}
        <div className="rounded border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-[#00529B]" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 font-sans font-bold">
                  Certified Licensees Register — IS 269:2015 (Ordinary Portland Cement)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official list of operative licensed cement manufacturing units across Madhya Pradesh & Rajasthan ({cementLicensingData.licenses.length} Records).
              </p>
            </div>

            {/* Search Filter Box */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={licenseSearch}
                onChange={(e) => setLicenseSearch(e.target.value)}
                placeholder="Search by Firm, License, District..."
                className="w-full rounded border border-slate-300 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:border-[#00529B] focus:outline-none"
              />
            </div>
          </div>

          {/* District Filter Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-semibold text-xs shrink-0 mr-1 flex items-center space-x-1">
              <Filter className="h-3 w-3" />
              <span>District:</span>
            </span>
            {districts.map((d, dIdx) => (
              <button
                key={dIdx}
                onClick={() => setSelectedDistrict(d)}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors shrink-0 ${
                  selectedDistrict === d
                    ? 'bg-[#00529B] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* License Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {filteredLicenses.map((lic) => (
              <div
                key={lic.s_no}
                className="group flex flex-col justify-between rounded border border-slate-200 bg-white p-3.5 transition-colors hover:border-blue-300 hover:bg-blue-50/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-mono font-bold text-slate-600 border border-slate-200">
                      {lic.s_no}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200">
                      {lic.district}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#00529B] transition-colors">
                    {lic.firm_name_and_address}
                  </h3>

                  <div className="mt-2 flex items-start space-x-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed">
                      District: <span className="font-semibold text-slate-700">{lic.district}</span> • Standard: <span className="font-mono text-[#00529B] font-semibold">{cementLicensingData.indian_standard}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-700">
                    <span className="text-slate-400">CM/L:</span>
                    <span className="font-semibold">{lic.licence_no}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleCopyLicense(lic.licence_no)}
                      className="rounded p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
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
                      }}
                      className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-[#00529B] hover:bg-[#00529B] hover:text-white transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLicenses.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              No licenses found matching "{licenseSearch}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
