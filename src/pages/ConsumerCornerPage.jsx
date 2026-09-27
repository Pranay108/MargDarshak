import React, { useState } from 'react';
import { 
  Smartphone, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  FileWarning, 
  ExternalLink, 
  MessageSquare,
  QrCode,
  ShieldAlert,
  Send
} from 'lucide-react';

export const ConsumerCornerPage = ({ onAskConsumer, t }) => {
  const [cmlInput, setCmlInput] = useState('8400123');
  const [cmlResult, setCmlResult] = useState(null);

  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [complaintText, setComplaintText] = useState('');
  const [complaintProduct, setComplaintProduct] = useState('');

  const handleVerifyCML = (e) => {
    e.preventDefault();
    if (!cmlInput.trim()) return;

    const cleaned = cmlInput.trim();
    if (cleaned.length !== 7 || isNaN(cleaned)) {
      setCmlResult({
        error: "CM/L License Number must be exactly a 7-digit numeric code (e.g. 8400123)."
      });
      return;
    }

    setCmlResult({
      cml: cleaned,
      status: "Active & Valid (Operative)",
      company: "Bisleri International Pvt. Ltd. (Plant 04)",
      address: "Plot No. 12, Industrial Area, Sahibabad, Ghaziabad, UP",
      standard: "IS 14543:2016",
      standardName: "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
      brand: "Bisleri",
      validTill: "31 March 2026",
      verified: true
    });
  };

  const handleLodgeComplaint = (e) => {
    e.preventDefault();
    if (!complaintText.trim()) return;
    setComplaintSubmitted(true);
    setTimeout(() => {
      setComplaintSubmitted(false);
      setComplaintText('');
      setComplaintProduct('');
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4.25rem)] w-full overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Hero */}
        <div className="rounded border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans font-bold">
                Consumer Protection & License Verification
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
                Verify manufacturer CM/L licenses, learn how to identify fake ISI marks, and report substandard or misleading quality claims.
              </p>
            </div>

            <button
              onClick={() => onAskConsumer("How can I check if an ISI mark is genuine or counterfeit, and how do I report fake goods on BIS Care App?")}
              className="flex items-center space-x-2 rounded bg-[#00529B] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#044983] transition-colors self-start md:self-center"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Ask Sathi About Consumer Rights</span>
            </button>
          </div>
        </div>

        {/* 2-Column: CM/L Verifier Simulator + Spotting Fake ISI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* CM/L License Verifier */}
          <div className="rounded border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-[#00529B]" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans font-bold">
                  Verify 7-Digit CM/L License No.
                </h3>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200">
                BIS Database
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Enter the 7-digit CM/L number printed directly beneath the ISI Mark on any product (e.g. <span className="text-slate-800 font-mono font-bold">8400123</span>).
            </p>

            <form onSubmit={handleVerifyCML} className="flex gap-2">
              <input
                type="text"
                maxLength={7}
                value={cmlInput}
                onChange={(e) => setCmlInput(e.target.value)}
                placeholder="e.g. 8400123"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-white font-mono tracking-wider focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-500"
              >
                Verify CM/L
              </button>
            </form>

            {cmlResult && (
              <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-4 space-y-2 text-xs animate-fade-in">
                {cmlResult.error ? (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{cmlResult.error}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-mono font-bold text-amber-400 text-sm">CM/L - {cmlResult.cml}</span>
                      <span className="flex items-center space-x-1 text-emerald-400 text-[11px] font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{cmlResult.status}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Manufacturer / Licensee:</span>
                        <span className="text-white font-medium">{cmlResult.company}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Factory Location:</span>
                        <span className="text-slate-300">{cmlResult.address}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <span className="text-slate-500 block">Indian Standard:</span>
                          <span className="text-blue-300 font-mono">{cmlResult.standard}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Valid Until:</span>
                          <span className="text-slate-300 font-mono">{cmlResult.validTill}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* How to Spot Fake ISI Marks */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
              <h3 className="text-base font-bold text-white font-sans font-bold">
                How to Spot a Fake / Counterfeit ISI Mark
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              A genuine ISI Mark must ALWAYS have three distinct components present together:
            </p>

            <div className="space-y-2 text-xs">
              <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800 flex items-start space-x-2.5">
                <span className="text-amber-400 font-bold font-mono">1.</span>
                <div>
                  <span className="font-semibold text-white">Indian Standard Number on Top:</span>
                  <p className="text-slate-400 mt-0.5">e.g. \`IS 14543\` must be clearly legible above the ISI logo.</p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800 flex items-start space-x-2.5">
                <span className="text-amber-400 font-bold font-mono">2.</span>
                <div>
                  <span className="font-semibold text-white">Official ISI Monogram in the Middle:</span>
                  <p className="text-slate-400 mt-0.5">Correct proportions with stylized 'I-S-I' letters.</p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800 flex items-start space-x-2.5">
                <span className="text-amber-400 font-bold font-mono">3.</span>
                <div>
                  <span className="font-semibold text-white">7-Digit CM/L License Number at the Bottom:</span>
                  <p className="text-slate-400 mt-0.5">If the CM/L number is missing, the mark is ILLEGAL & counterfeit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BIS Care App Features Showcase */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white font-sans font-bold">
                BIS Care Mobile Application (Android & iOS)
              </h3>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.bis.mobile"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-xs text-blue-400 hover:underline"
            >
              <span>Download on Google Play</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-amber-400 font-bold block mb-1">🔍 Verify License (ISI)</span>
              <p className="text-slate-400 leading-relaxed">Check authentic manufacturing licenses and scope of products.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-amber-400 font-bold block mb-1">🏅 Verify HUID (Gold)</span>
              <p className="text-slate-400 leading-relaxed">Trace jewelers, hallmarking center code, and purity of gold items.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-amber-400 font-bold block mb-1">💻 Verify CRS (Electronics)</span>
              <p className="text-slate-400 leading-relaxed">Validate R-numbers on laptops, TVs, batteries, and chargers.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-amber-400 font-bold block mb-1">📢 Complaints & Grievance</span>
              <p className="text-slate-400 leading-relaxed">Directly lodge geo-tagged complaints on counterfeit products.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
