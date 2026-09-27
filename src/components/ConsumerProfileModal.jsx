import React from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  CheckCircle2,
  Building2,
  Briefcase,
  FlaskConical,
  ExternalLink,
  Award
} from 'lucide-react';

export const ConsumerProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  if (!isOpen || !user) return null;

  const roleIcons = {
    consumer: User,
    industry: Building2,
    officer: Briefcase,
    lab: FlaskConical
  };

  const Icon = roleIcons[user.role] || User;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-md border border-slate-300 bg-white shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3.5">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#00529B] text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#003366]">
                {user.roleLabel || 'User Account Profile'}
              </span>
              <div className="text-[10px] text-slate-500 font-medium">
                BIS-Saathi Authorized Profile
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

        {/* Content */}
        <div className="overflow-y-auto p-5 space-y-4 text-xs text-slate-700">
          
          {/* User Hero Identity Card */}
          <div className="rounded border border-slate-200 bg-slate-50 p-4 flex items-center space-x-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00529B] text-white font-bold text-lg">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 flex-wrap">
                <span className="font-bold text-sm text-slate-900">{user.name}</span>
                <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3 mr-0.5 text-emerald-600" />
                  {user.roleLabel}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                ID / Code: {user.cmlNumber || user.labCode || user.id}
              </div>
            </div>
          </div>

          {/* Account Details Grid */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Account Credentials & Scope
            </div>

            <div className="rounded border border-slate-200 bg-white p-3 space-y-2">
              
              {user.designation && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Designation:</span>
                  <span className="font-semibold text-slate-900">{user.designation}</span>
                </div>
              )}

              {user.cmlNumber && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">CM/L Licence:</span>
                  <span className="font-mono font-bold text-[#00529B]">{user.cmlNumber}</span>
                </div>
              )}

              {user.standard && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Standard Scope:</span>
                  <span className="font-mono font-semibold text-slate-900">{user.standard}</span>
                </div>
              )}

              {user.labCode && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">LIMS Lab Code:</span>
                  <span className="font-mono font-bold text-emerald-800">{user.labCode}</span>
                </div>
              )}

              {user.department && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-900">{user.department}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>Contact Mobile:</span>
                </span>
                <span className="font-mono font-bold text-slate-900">+91 {user.mobile}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Official Email:</span>
                </span>
                <span className="font-medium text-slate-900">{user.email}</span>
              </div>

              {(user.city || user.location) && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center space-x-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>Location:</span>
                  </span>
                  <span className="font-medium text-slate-900">{user.location || `${user.city}, ${user.state}`}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Status:</span>
                </span>
                <span className="font-medium text-slate-700">{user.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Role Status Notice */}
          <div className="rounded border border-blue-200 bg-blue-50/60 p-3 text-slate-800 space-y-1">
            <div className="font-bold text-[#00529B]">
              {user.role === 'consumer' ? 'Citizen Rights & Features' :
               user.role === 'industry' ? 'Manakonline Option-2 Integration' :
               user.role === 'officer' ? 'BIS Officer & Auditor Clearance' :
               'LIMS Laboratory Authorization'}
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              {user.extraInfo || 'Authorized BIS portal access enabled for technical inquiries and evidence-backed verification.'}
            </p>
          </div>

        </div>

        {/* Modal Footer (Logout & Close) */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center space-x-1.5 text-xs font-semibold text-red-600 hover:text-red-800 hover:underline"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="rounded border border-slate-300 bg-white px-3.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
