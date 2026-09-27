import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  RefreshCw, 
  Search, 
  Download,
  Building2,
  Lock
} from 'lucide-react';
import { procurementCategories } from '../data/procurementData';

export const AdminPage = ({
  user,
  onNavigateTab,
  currentLang,
  t
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState('qco'); // 'qco' | 'standards' | 'logs' | 'users'
  const [searchTerm, setSearchTerm] = useState('');

  const qcoOrders = [
    { id: "QCO-2026/11", title: "Pipes and Fittings (Quality Control) Order", ministry: "Ministry of Chemicals & Fertilizers", gazette: "S.O. 1245(E)", standards: "IS 4984, IS 14333", status: "Active Mandatory" },
    { id: "QCO-2026/09", title: "Cement (Quality Control) Order", ministry: "DPIIT, Ministry of Commerce", gazette: "S.O. 1412(E)", standards: "IS 269:2015, IS 1489", status: "Active Mandatory" },
    { id: "QCO-2026/04", title: "Steel and Steel Products (Quality Control) Order", ministry: "Ministry of Steel", gazette: "S.O. 167(E)", standards: "IS 1786:2008, IS 2062", status: "Active Mandatory" },
    { id: "QCO-2025/48", title: "Electrical Wires and Cables (Quality Control) Order", ministry: "DPIIT", gazette: "S.O. 2209(E)", standards: "IS 694, IS 7098", status: "Active Mandatory" },
    { id: "QCO-2025/32", title: "Solar Photovoltaic Systems & Devices (Compulsory Registration)", ministry: "MNRE", gazette: "Order 238/45", standards: "IS 14286, IS/IEC 61730", status: "Active Mandatory" }
  ];

  const auditLogs = [
    { id: "AUD-88410", officer: "Er. Rajesh Kumar Sharma", dept: "CPWD New Delhi", item: "HDPE Pipes PE-100 PN-10", std: "IS 4984:2016", time: "24 Sep 2026, 14:32" },
    { id: "AUD-88409", officer: "Shri. Anil Verma (EE)", dept: "NHAI Highway Div", item: "OPC 53 Grade Cement", std: "IS 269:2015", time: "24 Sep 2026, 11:15" },
    { id: "AUD-88408", officer: "Ms. Priyanka Sen (SE)", dept: "DMRC Metro Rail", item: "TMT Fe 500D Rebars", std: "IS 1786:2008", time: "23 Sep 2026, 16:45" },
    { id: "AUD-88407", officer: "Dr. K. Ramanathan (GM)", dept: "NTPC Energy Hub", item: "Solar PV Modules (ALMM)", std: "IS 14286", time: "23 Sep 2026, 09:20" }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Admin Header */}
      <div className="bg-purple-900 text-white rounded-lg p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded">
              <Lock className="h-6 w-6 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight">
                  MargDarshak Administration & Standards Registry
                </h1>
                <span className="px-2 py-0.5 bg-purple-700 text-purple-100 text-[10px] font-bold rounded">
                  ADMIN ONLY
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Manage Quality Control Orders (QCO), synchronize BIS 21,000+ standards catalog, and review GFR 144 audit logs.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded transition-colors"
            >
              Exit to Officer View
            </button>
          </div>
        </div>
      </div>

      {/* 2. Admin Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-xs flex flex-wrap gap-1.5 text-xs font-semibold">
        <button
          onClick={() => setActiveAdminTab('qco')}
          className={`px-3 py-2 rounded flex items-center space-x-2 transition-colors ${
            activeAdminTab === 'qco' ? 'bg-[#0B2545] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Quality Control Orders (QCOs)</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('standards')}
          className={`px-3 py-2 rounded flex items-center space-x-2 transition-colors ${
            activeAdminTab === 'standards' ? 'bg-[#0B2545] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Database className="h-4 w-4" />
          <span>Standards Catalog Sync</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`px-3 py-2 rounded flex items-center space-x-2 transition-colors ${
            activeAdminTab === 'logs' ? 'bg-[#0B2545] text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Tender Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        
        {/* Tab 1: QCO Database */}
        {activeAdminTab === 'qco' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                  Active Statutory Quality Control Orders (QCO)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Gazette notifications enforcing mandatory BIS certification for public procurement under Section 16 of BIS Act.
                </p>
              </div>

              <button
                onClick={() => alert("New QCO gazette entry modal opened.")}
                className="px-3.5 py-1.5 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded flex items-center space-x-1.5 shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Gazette Notification</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 font-bold">Order ID</th>
                    <th className="py-2.5 px-3 font-bold">QCO Notification Title</th>
                    <th className="py-2.5 px-3 font-bold">Issuing Ministry</th>
                    <th className="py-2.5 px-3 font-bold">Mandated Standards</th>
                    <th className="py-2.5 px-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {qcoOrders.map((qco, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0B2545] text-[11px] whitespace-nowrap">
                        {qco.id}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 text-[11px]">
                        {qco.title}
                        <div className="text-[10px] text-slate-400 font-mono">{qco.gazette}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {qco.ministry}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#006699] font-semibold text-[11px]">
                        {qco.standards}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          {qco.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Standards Catalog Sync */}
        {activeAdminTab === 'standards' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                  BIS Standards Catalog Synchronization
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time bridge connecting MargDarshak database with Manakonline & National Standards Repository.
                </p>
              </div>

              <button
                onClick={() => alert("Standards database synchronized successfully: 21,480 standards verified.")}
                className="px-3.5 py-1.5 bg-[#0B2545] hover:bg-[#134074] text-white text-xs font-semibold rounded flex items-center space-x-1.5 shadow-xs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Sync with Manakonline</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Indian Standards</span>
                <span className="text-2xl font-bold text-[#0B2545] mt-1 block">21,480</span>
                <span className="text-[11px] text-emerald-700 font-medium">100% indexed & searchable</span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Recent Amendments (2026)</span>
                <span className="text-2xl font-bold text-[#0B2545] mt-1 block">142</span>
                <span className="text-[11px] text-blue-700 font-medium">All corrigenda active</span>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Option-2 Fast-Track Standards</span>
                <span className="text-2xl font-bold text-[#0B2545] mt-1 block">753</span>
                <span className="text-[11px] text-purple-700 font-medium">Annexure-II(C) verified</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tender Audit Logs */}
        {activeAdminTab === 'logs' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                GFR Rule 144 Tender Formulation Audit Log
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Chronological log of tender specifications generated by procurement officers across departments.
              </p>
            </div>

            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 font-bold">Audit Ref</th>
                    <th className="py-2.5 px-3 font-bold">Procurement Officer</th>
                    <th className="py-2.5 px-3 font-bold">Department</th>
                    <th className="py-2.5 px-3 font-bold">Procured Item & Mandated IS</th>
                    <th className="py-2.5 px-3 font-bold">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {auditLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0B2545] text-[11px] whitespace-nowrap">
                        {log.id}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800 text-[11px]">
                        {log.officer}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {log.dept}
                      </td>
                      <td className="py-2.5 px-3 text-[11px]">
                        <span className="font-semibold text-slate-900">{log.item}</span>
                        <span className="ml-1 font-mono text-[#006699]">({log.std})</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                        {log.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
