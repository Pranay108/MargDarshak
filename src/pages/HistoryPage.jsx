import React from 'react';
import { 
  History, 
  Trash2, 
  MessageSquare, 
  ChevronRight,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const HistoryPage = ({ sessions, onSelectSession, onQuickAsk, onDeleteSession, t }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-[#F8FAFC] p-3 sm:p-5 lg:p-6 text-slate-900 font-sans space-y-4">
      <div className="mx-auto max-w-7xl space-y-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
          <span>Portal Home</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span>User Activity</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-[#00529B] font-semibold">Inquiry & Verification History</span>
        </div>

        {/* Header */}
        <div className="rounded-md border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <h1 className="text-lg sm:text-xl font-bold text-[#002B49]">
            Inquiry & Activity Log
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Review past interactions with AI-Saathi, verified standard queries, and HUID checks on this browser.
          </p>
        </div>

        {/* Sessions List */}
        <div className="space-y-2">
          {sessions.map((s) => (
            <div key={s.id} className="rounded-md border border-slate-200 bg-white p-3.5 hover:border-slate-300 transition-colors flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-xs text-slate-900">{s.title || 'General BIS Inquiry'}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {s.messages.length} exchanges
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span>Last active: {new Date(s.updatedAt || Date.now()).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSelectSession(s.id)}
                  className="rounded border border-[#00529B] bg-[#00529B] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#003d75] flex items-center space-x-1"
                >
                  <MessageSquare className="h-3 w-3" />
                  <span>Open Inquiry</span>
                </button>

                <button
                  onClick={() => onDeleteSession(s.id)}
                  className="rounded border border-slate-300 bg-white p-1 text-slate-400 hover:text-red-600 hover:border-red-300"
                  title="Delete Inquiry"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
              No recent session history found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
