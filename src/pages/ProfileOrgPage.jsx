import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  ShieldCheck, 
  Key, 
  Award, 
  FileText, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  Lock, 
  LogOut,
  Scale,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';

export const ProfileOrgPage = ({
  user,
  onUpdateUser,
  onLogout,
  onNavigateTab,
  currentLang,
  t
}) => {
  const [activeTab, setActiveTab] = useState('officer'); // 'officer' | 'organization' | 'security' | 'history'

  const officerProfile = user || {
    name: "Er. Rajesh Kumar Sharma",
    designation: "Superintending Engineer (Procurement & Contracts)",
    organization: "Central Public Works Department (CPWD)",
    ministry: "Ministry of Housing and Urban Affairs (MoHUA)",
    gemId: "GEM-DL-CPWD-2024-8841",
    email: "rajesh.sharma@cpwd.gov.in",
    phone: "+91 98101 XXXXX",
    officeLocation: "Nirman Bhawan, New Delhi - 110011",
    role: "officer", // 'officer' | 'admin'
    financialLimit: "₹ 50.00 Crores (DoFP Tier-I)",
    joinedDate: "12 Jan 2024"
  };

  const handleRoleToggle = (newRole) => {
    const updated = {
      ...officerProfile,
      role: newRole,
      name: newRole === 'admin' ? "Dr. Ananya Mukherjee" : "Er. Rajesh Kumar Sharma",
      designation: newRole === 'admin' ? "Director General / BIS Standards Directorate" : "Superintending Engineer (Procurement & Contracts)",
      organization: newRole === 'admin' ? "Bureau of Indian Standards (BIS Headquarters)" : "Central Public Works Department (CPWD)",
      gemId: newRole === 'admin' ? "BIS-ADMIN-HQ-001" : "GEM-DL-CPWD-2024-8841"
    };
    if (onUpdateUser) onUpdateUser(updated);
  };

  const recentTenders = [
    { ref: "GEM/2026/B/8912401", title: "Supply of HDPE PE-100 PN-10 Pipes (110mm-315mm)", std: "IS 4984:2016", date: "24 Sep 2026", status: "Spec Approved" },
    { ref: "GEM/2026/B/7714209", title: "Procurement of Ordinary Portland Cement 53 Grade", std: "IS 269:2015", date: "22 Sep 2026", status: "Published" },
    { ref: "GEM/2026/B/6541290", title: "High Ductility TMT Reinforcement Steel Fe 500D", std: "IS 1786:2008", date: "18 Sep 2026", status: "Under Evaluation" },
    { ref: "GEM/2026/B/5412988", title: "1.1 kV XLPE FRLS Armoured Power Cables", std: "IS 7098 (Part 1)", date: "15 Sep 2026", status: "Published" }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#0B2545] text-white rounded-lg">
              <User className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-[#0B2545]">
                  {officerProfile.name}
                </h1>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                  officerProfile.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {officerProfile.role === 'admin' ? 'PORTAL ADMINISTRATOR' : 'PROCUREMENT OFFICER'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {officerProfile.designation} • {officerProfile.organization}
              </p>
            </div>
          </div>

          {/* Role Switcher for paired testing */}
          <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-md border border-slate-200 shrink-0">
            <button
              onClick={() => handleRoleToggle('officer')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                officerProfile.role === 'officer' 
                  ? 'bg-white text-[#0B2545] shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Officer Role
            </button>
            <button
              onClick={() => handleRoleToggle('admin')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                officerProfile.role === 'admin' 
                  ? 'bg-purple-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin Role
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: Officer Metadata Card */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
              <Building2 className="h-4 w-4 text-[#006699]" />
              <h2 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                Organization & Buyer Credentials
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Ministry / Department</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{officerProfile.ministry}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Procuring Entity</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{officerProfile.organization}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">GeM Primary Buyer ID</span>
                <span className="font-mono font-bold text-[#006699] block mt-0.5">{officerProfile.gemId}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Financial Delegation (DoFP)</span>
                <span className="font-semibold text-emerald-800 block mt-0.5">{officerProfile.financialLimit}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Official Email</span>
                <span className="font-mono text-slate-700 block mt-0.5">{officerProfile.email}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Office Location</span>
                <span className="text-slate-700 block mt-0.5">{officerProfile.officeLocation}</span>
              </div>
            </div>
          </div>

          {/* Quick Admin shortcut if role is admin */}
          {officerProfile.role === 'admin' && (
            <div className="bg-purple-900 text-white rounded-lg p-4 shadow-xs space-y-2">
              <span className="text-xs font-bold text-purple-200 uppercase block">
                Administrator Access Enabled
              </span>
              <p className="text-xs text-purple-100">
                You have system privileges to manage the QCO gazette directory, update standard catalog revisions, and review officer audit logs.
              </p>
              <button
                onClick={() => onNavigateTab('admin')}
                className="mt-2 w-full py-2 bg-white text-purple-900 font-semibold text-xs rounded hover:bg-purple-50 transition-colors"
              >
                Launch Admin Management Console →
              </button>
            </div>
          )}

        </div>

        {/* Right 8 Cols: Tender Specifications History & Activity */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-[#006699]" />
                <h2 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                  Recent Tender Specifications Formulated
                </h2>
              </div>
              <span className="text-[11px] text-slate-500">
                Total Specs: <strong>{recentTenders.length}</strong>
              </span>
            </div>

            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 font-bold">Tender Ref No.</th>
                    <th className="py-2.5 px-3 font-bold">Procurement Title</th>
                    <th className="py-2.5 px-3 font-bold">Mandated IS Standard</th>
                    <th className="py-2.5 px-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {recentTenders.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0B2545] text-[11px] whitespace-nowrap">
                        {item.ref}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 text-[11px]">
                        {item.title}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#006699] font-semibold text-[11px] whitespace-nowrap">
                        {item.std}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'Published' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => onNavigateTab('analyze')}
                className="px-4 py-2 bg-[#0B2545] hover:bg-[#134074] text-white font-semibold rounded transition-colors shadow-xs"
              >
                Create New Tender Specification
              </button>

              <button
                onClick={() => onLogout ? onLogout() : null}
                className="text-slate-500 hover:text-red-700 font-medium flex items-center space-x-1"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out of Portal</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
