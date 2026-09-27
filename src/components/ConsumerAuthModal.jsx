import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  KeyRound,
  AlertCircle,
  Building2,
  Briefcase,
  FlaskConical,
  ExternalLink
} from 'lucide-react';
import { storageService } from '../services/storageService';

export const ConsumerAuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  if (!isOpen) return null;

  const [selectedRole, setSelectedRole] = useState('consumer'); // 'consumer' | 'industry' | 'officer' | 'lab'
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'

  // Form Fields
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [stateName, setStateName] = useState('Madhya Pradesh');
  const [cityName, setCityName] = useState('Bhopal');
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
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    const simOtp = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(simOtp);
    setOtpSent(true);
    setSuccessMsg(`Simulated OTP sent to +91 ${mobile}: ${simOtp}`);
  };

  // Handle Consumer Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
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
      if (!mobile && !email) {
        setErrorMsg('Please enter your registered mobile or email.');
        return;
      }
      if (!password || password.length < 4) {
        setErrorMsg('Please enter your valid password (minimum 4 characters).');
        return;
      }
    }

    const user = {
      id: 'cons_' + Date.now(),
      name: name || 'Verified Consumer',
      mobile: mobile || '9876543210',
      email: email || 'consumer@bis.gov.in',
      state: stateName,
      city: cityName,
      role: 'consumer',
      roleLabel: 'Consumer / Citizen',
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      verified: true
    };

    storageService.saveConsumerUser(user);
    onAuthSuccess(user);
    onClose();
  };

  // Handle Registration Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!mobile || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    const newUser = {
      id: 'cons_' + Date.now(),
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim() || `${mobile}@consumer.bis.gov.in`,
      state: stateName,
      city: cityName,
      role: 'consumer',
      roleLabel: 'Consumer / Citizen',
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      verified: true
    };

    storageService.saveConsumerUser(newUser);
    onAuthSuccess(newUser);
    onClose();
  };

  // Role-Specific Quick Logins
  const handleRoleQuickLogin = (roleType) => {
    let profile = null;

    if (roleType === 'consumer') {
      profile = {
        id: 'cons_demo_982',
        name: 'Pranav Sharma',
        mobile: '9893012345',
        email: 'pranav.consumer@gmail.com',
        state: 'Madhya Pradesh',
        city: 'Bhopal',
        role: 'consumer',
        roleLabel: 'Consumer / Citizen',
        joinedDate: 'Sep 2026',
        verified: true,
        extraInfo: 'Verified Public Consumer Account'
      };
    } else if (roleType === 'industry') {
      profile = {
        id: 'ind_lic_8181373',
        name: 'Ultratech Cement Ltd',
        designation: 'Authorized Signatory / Plant Head',
        cmlNumber: 'CM/L-8181373',
        standard: 'IS 269:2015 (OPC 53 Grade)',
        location: 'Bela Works, Rewa (MP)',
        email: 'compliance@ultratech.adityabirla.com',
        mobile: '9826011223',
        role: 'industry',
        roleLabel: 'Industry / Licensee',
        joinedDate: 'Operative Licensee',
        verified: true,
        extraInfo: 'Option-2 (30-Day Fast-Track) Enabled'
      };
    } else if (roleType === 'officer') {
      profile = {
        id: 'bis_off_4412',
        name: 'Dr. Rajesh Verma',
        designation: 'Senior Director & Chief Technical Auditor',
        department: 'Central Marks Department-II (CMD-II)',
        email: 'rajesh.verma@bis.gov.in',
        mobile: '9811099887',
        role: 'officer',
        roleLabel: 'BIS Officer / Auditor',
        joinedDate: 'Govt SSO Active',
        verified: true,
        extraInfo: 'Standard Review & Audit Authority'
      };
    } else if (roleType === 'lab') {
      profile = {
        id: 'lims_lab_002',
        name: 'BIS Central Laboratory (CL)',
        designation: 'Head of Chemical & Physical Testing',
        labCode: 'CL-SAHIBABAD-01',
        accreditation: 'ISO/IEC 17025:2017 Accredited',
        location: 'Site 4, Sahibabad (UP)',
        email: 'sample.cl@bis.gov.in',
        mobile: '01204177115',
        role: 'lab',
        roleLabel: 'Accredited Laboratory (LIMS)',
        joinedDate: 'LIMS Node Active',
        verified: true,
        extraInfo: 'LIMS Test Certificate Generation Active'
      };
    }

    if (profile) {
      storageService.saveConsumerUser(profile);
      onAuthSuccess(profile);
      onClose();
    }
  };

  const roles = [
    {
      id: 'consumer',
      title: 'Consumer / Citizen',
      subtitle: 'Standards, HUID, Inquiries',
      icon: User,
      color: 'blue'
    },
    {
      id: 'industry',
      title: 'Industry / Licensee',
      subtitle: 'Manakonline • Option-2 30-Day',
      icon: Building2,
      color: 'amber'
    },
    {
      id: 'officer',
      title: 'BIS Officer / Auditor',
      subtitle: 'Standard Review & Audits',
      icon: Briefcase,
      color: 'purple'
    },
    {
      id: 'lab',
      title: 'Accredited Lab (LIMS)',
      subtitle: 'Sample Testing & Reports',
      icon: FlaskConical,
      color: 'emerald'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-md border border-slate-300 bg-white shadow-xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#00529B] text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#003366]">
                BIS Portal Authentication
              </span>
              <div className="text-[10px] text-slate-500 font-medium">
                National Consumer & Industry Access Gateway
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 4 Role Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1 text-center">
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  setSelectedRole(r.id);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`py-2 px-1 rounded flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-white text-[#00529B] font-bold shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 mb-0.5 ${isSelected ? 'text-[#00529B]' : 'text-slate-500'}`} />
                <span className="text-[11px] leading-tight font-semibold">{r.title.split('/')[0]}</span>
                <span className="text-[9px] text-slate-400 font-normal hidden sm:inline truncate max-w-full">
                  {r.id === 'consumer' ? 'Citizen' : r.id === 'industry' ? 'Manakonline' : r.id === 'officer' ? 'Auditor' : 'LIMS Lab'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Form Body */}
        <div className="overflow-y-auto p-5 space-y-4 text-xs text-slate-700">
          
          {/* Consumer Role: Live Full Interactive Flow */}
          {selectedRole === 'consumer' && (
            <div className="space-y-3">
              
              {/* Quick Demo Login Option */}
              <div className="rounded border border-blue-200 bg-blue-50/60 p-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-xs flex items-center space-x-1">
                    <Sparkles className="h-3.5 w-3.5 text-[#00529B]" />
                    <span>Instant Consumer Demo</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Log in as verified citizen (Pranav Sharma, Bhopal)
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRoleQuickLogin('consumer')}
                  className="rounded bg-[#00529B] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#003d75] shrink-0"
                >
                  1-Click Login
                </button>
              </div>

              {/* Tab Switcher (Sign In vs Register) */}
              <div className="grid grid-cols-2 border border-slate-200 rounded bg-slate-50 p-0.5 gap-0.5">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`py-1.5 text-xs font-bold rounded transition-colors ${
                    mode === 'login' ? 'bg-white text-[#00529B] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Consumer Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`py-1.5 text-xs font-bold rounded transition-colors ${
                    mode === 'register' ? 'bg-white text-[#00529B] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  New Registration
                </button>
              </div>

              {/* Feedback Alerts */}
              {errorMsg && (
                <div className="rounded border border-red-200 bg-red-50 p-2 text-red-700 flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="rounded border border-emerald-200 bg-emerald-50 p-2 text-emerald-800 flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="font-mono">{successMsg}</span>
                </div>
              )}

              {/* Consumer Sign In Form */}
              {mode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs border-b border-slate-100 pb-2">
                    <label className="flex items-center space-x-1 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="loginMethod"
                        checked={loginMethod === 'otp'}
                        onChange={() => { setLoginMethod('otp'); setOtpSent(false); }}
                        className="text-[#00529B]"
                      />
                      <span>Mobile OTP</span>
                    </label>
                    <label className="flex items-center space-x-1 cursor-pointer font-medium">
                      <input
                        type="radio"
                        name="loginMethod"
                        checked={loginMethod === 'password'}
                        onChange={() => setLoginMethod('password')}
                        className="text-[#00529B]"
                      />
                      <span>Password</span>
                    </label>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Registered Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full rounded border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none"
                      />
                    </div>
                  </div>

                  {loginMethod === 'otp' && (
                    <>
                      {!otpSent ? (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="w-full rounded bg-[#00529B] py-2 text-xs font-bold text-white hover:bg-[#003d75] transition-colors"
                        >
                          Generate & Send OTP
                        </button>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block font-semibold text-slate-800">
                              Enter 4-Digit OTP
                            </label>
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="text-[11px] text-[#00529B] hover:underline"
                            >
                              Resend OTP
                            </button>
                          </div>
                          <div className="relative">
                            <KeyRound className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                            <input
                              type="text"
                              value={enteredOtp}
                              onChange={(e) => setEnteredOtp(e.target.value.slice(0, 4))}
                              placeholder="e.g. 4821"
                              maxLength={4}
                              className="w-full rounded border border-slate-300 bg-white py-2 pl-8 pr-3 font-mono font-bold text-sm tracking-widest text-slate-900 focus:border-[#00529B] focus:outline-none"
                            />
                          </div>
                          <button
                            type="submit"
                            className="mt-3 w-full rounded bg-[#00529B] py-2 text-xs font-bold text-white hover:bg-[#003d75] transition-colors"
                          >
                            Verify & Sign In
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {loginMethod === 'password' && (
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full rounded border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-3 w-full rounded bg-[#00529B] py-2 text-xs font-bold text-white hover:bg-[#003d75] transition-colors"
                      >
                        Sign In to Consumer Account
                      </button>
                    </div>
                  )}
                </form>
              )}

              {/* Consumer Registration Form */}
              {mode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        required
                        className="w-full rounded border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit mobile number"
                        required
                        className="w-full rounded border border-slate-300 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">State</label>
                      <input
                        type="text"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full rounded border border-slate-300 bg-white py-1.5 px-2.5 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">City / District</label>
                      <input
                        type="text"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        className="w-full rounded border border-slate-300 bg-white py-1.5 px-2.5 text-xs text-slate-900 focus:border-[#00529B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded bg-[#00529B] py-2 text-xs font-bold text-white hover:bg-[#003d75] transition-colors"
                  >
                    Create Consumer Account
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Industry / Licensee (Manakonline) Portal Option */}
          {selectedRole === 'industry' && (
            <div className="space-y-3">
              <div className="rounded border border-amber-200 bg-amber-50/60 p-3.5 space-y-2">
                <div className="flex items-center space-x-2 text-amber-900 font-bold">
                  <Building2 className="h-4 w-4 text-amber-700" />
                  <span>Manakonline Industry Portal SSO</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  BIS Manakonline provides single sign-on for domestic manufacturers, MSMEs, and foreign licensees.
                </p>
                <div className="bg-white p-2.5 rounded border border-amber-200/80 text-[11px] text-slate-700 space-y-1">
                  <div>⚡ <strong>Option-2 Fast-Track (30 Days):</strong> Apply directly under Annexure-II(C).</div>
                  <div>📄 <strong>Licence Renewal:</strong> Automated surveillance audit and fee processing.</div>
                  <div>🧪 <strong>Test Requests:</strong> Submit sample testing requests to BIS Central and Regional labs.</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('industry')}
                className="w-full rounded bg-[#00529B] py-2.5 text-xs font-bold text-white hover:bg-[#003d75] flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Login as Verified Licensee (Ultratech Cement CM/L-8181373)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* BIS Officer / Auditor Portal Option */}
          {selectedRole === 'officer' && (
            <div className="space-y-3">
              <div className="rounded border border-purple-200 bg-purple-50/60 p-3.5 space-y-2">
                <div className="flex items-center space-x-2 text-purple-900 font-bold">
                  <Briefcase className="h-4 w-4 text-purple-700" />
                  <span>BIS Officer & Auditor SSO</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Internal portal for BIS Scientists, Technical Directors, and Quality Auditors.
                </p>
                <div className="bg-white p-2.5 rounded border border-purple-200/80 text-[11px] text-slate-700 space-y-1">
                  <div>📋 <strong>Technical Review:</strong> Standard formulation drafts and committee votes.</div>
                  <div>🛡️ <strong>Audit Approvals:</strong> Factory inspection reports and surveillance verification.</div>
                  <div>⚖️ <strong>QCO Enforcement:</strong> Substandard product seizure and legal actions.</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('officer')}
                className="w-full rounded bg-[#00529B] py-2.5 text-xs font-bold text-white hover:bg-[#003d75] flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Login as BIS Officer (Dr. Rajesh Verma, CMD-II)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Accredited Laboratory (LIMS) Portal Option */}
          {selectedRole === 'lab' && (
            <div className="space-y-3">
              <div className="rounded border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                  <FlaskConical className="h-4 w-4 text-emerald-700" />
                  <span>LIMS Laboratory Management Gateway</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Access ISO/IEC 17025 accredited laboratory workflows for product testing.
                </p>
                <div className="bg-white p-2.5 rounded border border-emerald-200/80 text-[11px] text-slate-700 space-y-1">
                  <div>🧪 <strong>Sample Receipts:</strong> Digital QR code chain-of-custody logging.</div>
                  <div>📊 <strong>Test Certificate Generation:</strong> Automated conformity evaluation under IS standards.</div>
                  <div>🔍 <strong>Batch Reporting:</strong> Real-time integration with BIS Manakonline licensing.</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRoleQuickLogin('lab')}
                className="w-full rounded bg-[#00529B] py-2.5 text-xs font-bold text-white hover:bg-[#003d75] flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Login as Accredited Lab (BIS Central Lab Sahibabad)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Note */}
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-[11px] text-slate-500 text-center">
          Bureau of Indian Standards • Unified Access Architecture
        </div>

      </div>
    </div>
  );
};
