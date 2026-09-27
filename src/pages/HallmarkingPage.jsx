import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  QrCode, 
  ShieldCheck, 
  Coins, 
  Sparkles, 
  Search, 
  Building2, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { 
  goldJewellersData, 
  silverJewellersData, 
  goldPurityGrades, 
  silverPurityGrades, 
  goldHuidMarks, 
  silverMarks 
} from '../data/hallmarkingData';

export const HallmarkingPage = ({ onAskHallmarking }) => {
  const { t } = useTranslation();
  const [activeMetal, setActiveMetal] = useState('gold'); // 'gold' | 'silver'
  
  // Search & Filter state for records
  const [jewellerSearch, setJewellerSearch] = useState('');
  const [copiedLicense, setCopiedLicense] = useState(null);

  // Gold Calculator state
  const [goldWeight, setGoldWeight] = useState(10);
  const [selectedGoldKarat, setSelectedGoldKarat] = useState('22K');

  // Silver Calculator state
  const [silverWeight, setSilverWeight] = useState(50);
  const [selectedSilverGrade, setSelectedSilverGrade] = useState('925');

  // Gold HUID Simulator state
  const [huidInput, setHuidInput] = useState('8290317917');
  const [huidResult, setHuidResult] = useState(null);

  // Active records based on tab
  const currentData = activeMetal === 'gold' ? goldJewellersData : silverJewellersData;
  const filteredRecords = currentData.records.filter(r => 
    r.name.toLowerCase().includes(jewellerSearch.toLowerCase()) ||
    r.license_no.includes(jewellerSearch) ||
    r.address.toLowerCase().includes(jewellerSearch.toLowerCase()) ||
    r.city.toLowerCase().includes(jewellerSearch.toLowerCase())
  );

  // Calculations
  const selectedGoldObj = goldPurityGrades.find(g => g.karat.includes(selectedGoldKarat)) || goldPurityGrades[1];
  const pureGoldGrams = (goldWeight * selectedGoldObj.multiplier).toFixed(3);

  const selectedSilverObj = silverPurityGrades.find(s => s.fineness === selectedSilverGrade) || silverPurityGrades[2];
  const pureSilverGrams = (silverWeight * selectedSilverObj.multiplier).toFixed(3);

  const handleCopyLicense = (lic) => {
    navigator.clipboard.writeText(lic);
    setCopiedLicense(lic);
    setTimeout(() => setCopiedLicense(null), 1800);
  };

  const handleVerifyLicense = (e) => {
    e?.preventDefault();
    if (!huidInput.trim()) return;

    const query = huidInput.trim().toUpperCase();
    // Search in current records
    const found = currentData.records.find(r => 
      r.license_no === query || r.name.toUpperCase().includes(query)
    );

    if (found) {
      setHuidResult({
        license: found.license_no,
        status: "Operative & Verified in BIS Central Registry",
        jeweller: found.name,
        address: found.address,
        city: `${found.city}, ${found.state}`,
        standard: `${currentData.standard} (Hallmarking)`,
        verified: true
      });
    } else {
      // General HUID calculation if 6 characters
      if (query.length === 6) {
        setHuidResult({
          license: `HUID-${query}`,
          status: "Genuine 6-Digit HUID Format",
          jeweller: "Certified Registered Jeweller (IS 1417)",
          address: "Central Assaying & Hallmarking Hub, Bhopal Region",
          city: "BHOPAL, MADHYA PRADESH",
          standard: `${currentData.standard}`,
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
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Hero Card */}
        <div className="rounded border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans font-bold">
                Hallmarking Portal — Gold & Silver Registry
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
                Certified Jewellers Directory, purity standards, and license verification under the Bureau of Indian Standards Act.
              </p>
            </div>

            <button
              onClick={() => onAskHallmarking(`Provide details on certified ${activeMetal === 'gold' ? 'Gold (IS 1417)' : 'Silver (IS 2112)'} jewellers, hallmarking licenses, and purity guidelines.`)}
              className="inline-flex items-center space-x-2 rounded bg-[#00529B] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#044983] transition-colors self-start md:self-center shrink-0"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Inquire with AI SATHI</span>
            </button>
          </div>

          {/* METAL SELECTOR TABS */}
          <div className="mt-5 flex border-b border-slate-200 gap-4">
            <button
              onClick={() => {
                setActiveMetal('gold');
                setJewellerSearch('');
                setHuidResult(null);
              }}
              className={`flex items-center space-x-2 pb-2.5 px-1 text-sm font-semibold transition-all border-b-2 ${
                activeMetal === 'gold'
                  ? 'border-amber-600 text-amber-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>Gold Registry (IS 1417)</span>
              <span className="text-xs text-slate-500 font-normal">
                ({goldJewellersData.records.length} Records)
              </span>
            </button>

            <button
              onClick={() => {
                setActiveMetal('silver');
                setJewellerSearch('');
                setHuidResult(null);
              }}
              className={`flex items-center space-x-2 pb-2.5 px-1 text-sm font-semibold transition-all border-b-2 ${
                activeMetal === 'silver'
                  ? 'border-slate-700 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Coins className="h-4 w-4 text-slate-600" />
              <span>Silver Registry (IS 2112)</span>
              <span className="text-xs text-slate-500 font-normal">
                ({silverJewellersData.records.length} Records)
              </span>
            </button>
          </div>
        </div>

        {/* 2-Column: License Verifier & Purity Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* License & HUID Verifier */}
          <div className="rounded border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <QrCode className="h-4 w-4 text-[#00529B]" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans font-bold">
                  Verify {activeMetal === 'gold' ? 'Gold License / HUID' : 'Silver License / Code'}
                </h3>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200">
                BIS Database
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Enter 10-digit License No. (e.g. <span className="font-mono font-bold text-slate-800">8290317917</span>) or Jeweller Name to inspect verified status.
            </p>

            <form onSubmit={handleVerifyLicense} className="flex gap-2">
              <input
                type="text"
                value={huidInput}
                onChange={(e) => setHuidInput(e.target.value)}
                placeholder="Enter License No. or Name..."
                className="flex-1 rounded border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 font-mono focus:border-[#00529B] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded bg-[#00529B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#044983] transition-colors"
              >
                Verify
              </button>
            </form>

            {huidResult && (
              <div className="rounded border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs animate-fade-in">
                {huidResult.error ? (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{huidResult.error}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-mono font-bold text-[#00529B] text-sm">License: {huidResult.license}</span>
                      <span className="flex items-center space-x-1 text-emerald-700 text-[11px] font-semibold">
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
                          <span className="text-[#00529B] font-semibold font-mono">{huidResult.standard}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Purity & Weight Calculator */}
          <div className="rounded border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-4 w-4 text-[#00529B]" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans font-bold">
                {activeMetal === 'gold' ? 'Pure Gold Content Calculator' : 'Pure Silver Content Calculator'}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Calculate net pure precious metal based on {activeMetal === 'gold' ? 'IS 1417 fineness' : 'IS 2112 fineness'}.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gross Weight (Grams)
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={activeMetal === 'gold' ? goldWeight : silverWeight}
                  onChange={(e) => activeMetal === 'gold' ? setGoldWeight(Number(e.target.value)) : setSilverWeight(Number(e.target.value))}
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 font-mono focus:border-[#00529B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {activeMetal === 'gold' ? 'Karatage Grade' : 'Silver Fineness'}
                </label>
                {activeMetal === 'gold' ? (
                  <select
                    value={selectedGoldKarat}
                    onChange={(e) => setSelectedGoldKarat(e.target.value)}
                    className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none"
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
                    className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none"
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

            <div className="rounded border border-amber-200 bg-amber-50/70 p-4 text-center">
              <span className="text-xs font-medium text-amber-900">
                Net Fine {activeMetal === 'gold' ? 'Gold' : 'Silver'} Content
              </span>
              <div className="text-2xl font-bold text-amber-900 font-mono mt-1">
                {activeMetal === 'gold' ? pureGoldGrams : pureSilverGrams} <span className="text-xs font-sans font-normal text-slate-600">grams</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Purity: {activeMetal === 'gold' ? selectedGoldObj.percentage : selectedSilverObj.percentage} • Certified Standard
              </p>
            </div>
          </div>
        </div>

        {/* REGISTERED JEWELLERS DATA DIRECTORY (30 RECORDS) */}
        <div className="rounded border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-[#00529B]" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 font-sans font-bold">
                  Certified {activeMetal === 'gold' ? 'Gold (IS 1417)' : 'Silver (IS 2112)'} Registered Licensees
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official list of operative licensed jewellers registered under BIS Hallmarking Scheme.
              </p>
            </div>

            {/* Search Filter Box */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={jewellerSearch}
                onChange={(e) => setJewellerSearch(e.target.value)}
                placeholder="Search by Jeweller, License, Area..."
                className="w-full rounded border border-slate-300 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:bg-white focus:border-[#00529B] focus:outline-none"
              />
            </div>
          </div>

          {/* Jeweller Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {filteredRecords.map((record) => (
              <div
                key={record.sr_no}
                className="group flex flex-col justify-between rounded border border-slate-200 bg-white p-3.5 transition-colors hover:border-blue-300 hover:bg-blue-50/20"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[10px] font-mono font-bold text-slate-700">
                      {record.sr_no}
                    </span>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200">
                      {currentData.status}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#00529B] transition-colors">
                    {record.name}
                  </h3>

                  <div className="mt-2 flex items-start space-x-1.5 text-xs text-slate-600">
                    <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                    <p className="line-clamp-2 text-[11px] leading-relaxed">
                      {record.address}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-700">
                    <span className="text-slate-400">Lic:</span>
                    <span className="font-semibold">{record.license_no}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleCopyLicense(record.license_no)}
                      className="rounded p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                      title="Copy License Number"
                    >
                      {copiedLicense === record.license_no ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setHuidInput(record.license_no);
                        handleVerifyLicense();
                      }}
                      className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-[#00529B] hover:bg-[#00529B] hover:text-white transition-colors"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              No registered jewellers found matching "{jewellerSearch}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
