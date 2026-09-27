import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Lock,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  KeyRound,
  AlertCircle,
  Briefcase,
  Globe,
  ExternalLink,
  FileSignature
} from 'lucide-react';
import { MargDarshakIcon, BisOfficialLogo } from '../components/OfficialLogos';
import { storageService } from '../services/storageService';
import { languages } from '../utils/translations';

export const LoginPage = ({ onLoginSuccess, currentLang, onLanguageChange, onNavigateTab }) => {
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'
  const [officerType, setOfficerType] = useState('central'); // 'central' | 'gem' | 'state' | 'psu'

  // Form Fields
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [officerName, setOfficerName] = useState('Pranav Sharma');
  const [department, setDepartment] = useState('Department of Procurement & Central Public Procurement');
  const [designation, setDesignation] = useState('Senior Procurement Officer');
  const [password, setPassword] = useState('');

  // OTP Simulation
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('4821');

  // Error & Status
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Send OTP
  const handleSendOtp = (e) => {
    e?.preventDefault();
    if (!mobile || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit registered mobile number.');
      return;
    }
    setErrorMsg('');
    const simOtp = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(simOtp);
    setOtpSent(true);
    setSuccessMsg(`Simulated SMS OTP sent to +91 ${mobile}: ${simOtp}`);
  };

  // Handle Officer Login Submit
  const handleLoginSubmit = (e) => {
    e?.preventDefault();
    setErrorMsg('');

    if (loginMethod === 'otp') {
      if (!otpSent) {
        handleSendOtp(e);
        return;
      }
      if (enteredOtp !== generatedOtp) {
        setErrorMsg('Invalid OTP. Please enter the 4-digit code shown above.');
        return;
      }
    } else {
      if (!email && !mobile) {
        setErrorMsg('Please enter your official Government Email or Registered Mobile.');
        return;
      }
      if (!password || password.length < 4) {
        setErrorMsg('Please enter your valid password / Parichay PIN (minimum 4 characters).');
        return;
      }
    }

    const officerUser = {
      id: 'po_' + Date.now(),
      name: officerName || 'Pranav Sharma',
      designation: designation || 'Procurement Officer',
      department: department || 'Central Tender Cell',
      mobile: mobile || '9876543210',
      email: email || 'pranav.sharma@gov.in',
      role: 'officer',
      roleLabel: 'Procurement Officer',
      officerType: officerType,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      verified: true,
      extraInfo: 'Verified Public Procurement Authority (GFR 144(i) Compliance)'
    };

    storageService.saveConsumerUser(officerUser);
    onLoginSuccess(officerUser);
  };

  // Instant 1-Click Demo Login
  const handleQuickOfficerLogin = () => {
    const demoOfficer = {
      id: 'po_demo_8841',
      name: 'Pranav Sharma',
      designation: 'Senior Procurement Officer',
      department: 'Department of Public Procurement (GeM / CPPP Division)',
      email: 'pranav.sharma@procurement.gov.in',
      mobile: '9893012345',
      role: 'officer',
      roleLabel: 'Procurement Officer',
      officerType: 'central',
      joinedDate: 'Jan 2026',
      verified: true,
      extraInfo: 'Verified Public Procurement Authority (GFR 144(i) Compliance)'
    };

    storageService.saveConsumerUser(demoOfficer);
    onLoginSuccess(demoOfficer);
  };

  // Skip Login / Guest Procurement Access
  const handleGuestAccess = () => {
    const guestOfficer = {
      id: 'po_guest_' + Date.now(),
      name: 'Procurement Guest Officer',
      designation: 'Tender Spec Reviewer',
      department: 'Public Procurement Division',
      mobile: 'N/A',
      email: 'guest.officer@procurement.gov.in',
      role: 'officer',
      roleLabel: 'Procurement Officer (Guest)',
      officerType: 'central',
      joinedDate: 'Guest Session',
      verified: true
    };
    storageService.saveConsumerUser(guestOfficer);
    onLoginSuccess(guestOfficer);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans flex flex-col justify-between">

      {/* Top Tricolor Utility Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

      {/* Top Header Bar */}
      <header className="border-b border-slate-200 bg-white px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div
          className="flex items-center space-x-3 cursor-pointer select-none"
          onClick={() => onNavigateTab && onNavigateTab('dashboard')}
          title="Back to Dashboard"
        >
          <div className="p-1.5 bg-white rounded-lg shadow-2xs border border-slate-100">
            <MargDarshakIcon className="h-8 w-auto" />
          </div>
          <div className="flex flex-col justify-center leading-none">
            <div className="flex items-baseline space-x-1.5 font-black text-lg">
              <span className="text-[#0A2342]">Marg</span>
              <span className="text-[#0070E0]">Darshak</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">
              Government Procurement & Standards Assistant
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Back to Portal button */}
          <button
            type="button"
            onClick={() => onNavigateTab && onNavigateTab('dashboard')}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <span>← Return to Dashboard</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 rounded border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-700">
            <Globe className="h-3.5 w-3.5 text-[#00529B]" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.native} ({l.name})
                </option>
              ))}
            </select>
          </div>

          <a
            href="https://www.bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1 rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#00529B]"
          >
            <ExternalLink className="h-3 w-3 text-slate-500" />
            <span>bis.gov.in</span>
          </a>
        </div>
      </header>

      {/* Main Login Content Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg rounded-xl border border-slate-300 bg-white shadow-xl overflow-hidden flex flex-col animate-fade-in">

          {/* Brand Welcome Banner */}
          <div className="border-b border-slate-200 bg-gradient-to-b from-[#F0F7FF] to-white p-6 text-center">
            <div className="mx-auto flex justify-center mb-3">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-blue-100 ring-4 ring-blue-50">
                <MargDarshakIcon className="h-12 w-auto" />
              </div>
            </div>
            <h1 className="text-2xl font-black text-[#0B2342] font-sans tracking-tight">
              MargDarshak Login Portal
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-[#00529B] text-xs font-bold mt-2">
              <ShieldCheck className="h-4 w-4 text-[#00529B]" />
              <span>For Procurement Officers & Tender Authorities</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
              Official Single Sign-On for drafting GFR 144(i) compliant tenders, verifying mandatory IS standards & QCOs on GeM & CPPP.
            </p>
          </div>

          {/* Body Section */}
          <div className="p-6 space-y-4 text-xs text-slate-700">

            {/* Instant 1-Click Login for Quick Access */}
            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50/60 p-4 flex items-center justify-between shadow-2xs">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <Sparkles className="h-4 w-4 text-[#00529B]" />
                  <span>Instant Procurement Officer Access</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Log in as verified Officer (<strong>Pranav Sharma</strong>, Senior Procurement Officer)
                </div>
              </div>
              <button
                type="button"
                onClick={handleQuickOfficerLogin}
                className="rounded-lg bg-[#00529B] hover:bg-[#003d75] px-4 py-2 text-xs font-bold text-white transition-all shadow-sm hover:shadow shrink-0 flex items-center space-x-1.5 cursor-pointer"
              >
                <span>1-Click Login</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Alerts */}
            {errorMsg && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-red-700 flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-emerald-800 flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="font-mono">{successMsg}</span>
              </div>
            )}

            {/* Officer Sign In Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
              
              {/* Method Switcher */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="font-bold text-slate-800 text-[11.5px]">Procurement Officer Sign In</span>
                <div className="flex items-center space-x-3 text-xs">
                  <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-slate-700">
                    <input
                      type="radio"
                      name="loginMethod"
                      checked={loginMethod === 'otp'}
                      onChange={() => { setLoginMethod('otp'); setOtpSent(false); }}
                      className="text-[#00529B] focus:ring-[#00529B]"
                    />
                    <span>Mobile OTP</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-slate-700">
                    <input
                      type="radio"
                      name="loginMethod"
                      checked={loginMethod === 'password'}
                      onChange={() => setLoginMethod('password')}
                      className="text-[#00529B] focus:ring-[#00529B]"
                    />
                    <span>Govt SSO / Password</span>
                  </label>
                </div>
              </div>

              {/* Department / Authority Type */}
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Procurement Authority / Organization
                </label>
                <select
                  value={officerType}
                  onChange={(e) => setOfficerType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-xs text-slate-900 focus:border-[#00529B] focus:ring-1 focus:ring-[#00529B] focus:outline-none cursor-pointer"
                >
                  <option value="central">Central Ministry / Department (CPPP / GeM)</option>
                  <option value="gem">GeM Primary / Secondary Buyer</option>
                  <option value="state">State Government Directorate / Tender Cell</option>
                  <option value="psu">Central Public Sector Undertaking (CPSU)</option>
                </select>
              </div>

              {/* Mobile or Email Field */}
              {loginMethod === 'otp' ? (
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Registered Officer Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit registered mobile number"
                      className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-[#00529B] focus:ring-1 focus:ring-[#00529B] focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Official Government Email (.gov.in / .nic.in)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="officer.name@gov.in or @nic.in"
                        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-[#00529B] focus:ring-1 focus:ring-[#00529B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Parichay PIN / SSO Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your official password"
                        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-[#00529B] focus:ring-1 focus:ring-[#00529B] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* OTP Input if sent */}
              {loginMethod === 'otp' && (
                <>
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full rounded-lg bg-[#00529B] py-2.5 text-xs font-bold text-white hover:bg-[#003d75] transition-colors cursor-pointer shadow-xs"
                    >
                      Generate & Send OTP
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-semibold text-slate-800">
                            Enter 4-Digit OTP
                          </label>
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="text-[11px] text-[#00529B] font-semibold hover:underline cursor-pointer"
                          >
                            Resend OTP
                          </button>
                        </div>
                        <div className="relative">
                          <KeyRound className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                          <input
                            type="text"
                            maxLength={4}
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 4-digit code"
                            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 font-mono tracking-widest text-center text-sm font-bold focus:border-[#00529B] focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-lg bg-[#00529B] py-2.5 text-xs font-bold text-white hover:bg-[#003d75] transition-colors cursor-pointer shadow-xs"
                      >
                        Verify & Access MargDarshak Portal
                      </button>
                    </div>
                  )}
                </>
              )}

              {loginMethod === 'password' && (
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#00529B] py-2.5 text-xs font-bold text-white hover:bg-[#003d75] transition-colors cursor-pointer shadow-xs mt-2"
                >
                  Access MargDarshak Portal
                </button>
              )}
            </form>

            {/* Quick Guest Access */}
            <div className="pt-3 text-center border-t border-slate-100">
              <button
                type="button"
                onClick={handleGuestAccess}
                className="text-xs font-medium text-slate-500 hover:text-[#00529B] hover:underline cursor-pointer"
              >
                Skip Login & Continue as Guest Officer →
              </button>
            </div>

          </div>

          {/* Footer Note */}
          <div className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-[11px] text-slate-500 text-center">
            Bureau of Indian Standards • Ministry of Consumer Affairs, Government of India
          </div>

        </div>
      </main>

      {/* Government Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-3 text-center text-xs text-slate-500">
        <div>
          Bureau of Indian Standards (BIS) • Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi-110002
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">
          National Standards Body of India • Right Standards. Better Procurement.
        </div>
      </footer>

    </div>
  );
};
