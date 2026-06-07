import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle2, ChevronDown, Clock, Users, PenLine } from "lucide-react";

const STATUS_COLOR = {
  pending: "bg-yellow-500/20 text-yellow-300",
  reviewed: "bg-blue-500/20 text-blue-300",
  accepted: "bg-green-500/20 text-green-300",
  rejected: "bg-red-500/20 text-red-300",
};

export default function LOITab() {
  const [lois, setLois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    base44.entities.LetterOfIntent.list("-created_date", 200).then(data => {
      setLois(data);
      setLoading(false);
    });
    const unsub = base44.entities.LetterOfIntent.subscribe(() => {
      base44.entities.LetterOfIntent.list("-created_date", 200).then(setLois);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-7 h-7 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <PenLine className="w-4 h-4 mx-auto mb-2 text-indigo-300" />
          <p className="text-xs text-slate-400 mb-1">Total Signed LOIs</p>
          <p className="text-2xl font-bold text-white">{lois.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <Clock className="w-4 h-4 mx-auto mb-2 text-yellow-300" />
          <p className="text-xs text-slate-400 mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-300">{lois.filter(l => l.status === "pending").length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <CheckCircle2 className="w-4 h-4 mx-auto mb-2 text-green-300" />
          <p className="text-xs text-slate-400 mb-1">Accepted</p>
          <p className="text-2xl font-bold text-green-300">{lois.filter(l => l.status === "accepted").length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <Users className="w-4 h-4 mx-auto mb-2 text-purple-300" />
          <p className="text-xs text-slate-400 mb-1">Companies</p>
          <p className="text-2xl font-bold text-purple-300">{new Set(lois.map(l => l.partner_company_name)).size}</p>
        </div>
      </div>

      {lois.length === 0 ? (
        <p className="text-center text-slate-500 py-16 text-sm">No signed Letters of Intent yet.</p>
      ) : (
        <div className="space-y-3">
          {lois.map(loi => (
            <div key={loi.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === loi.id ? null : loi.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-700/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${expanded === loi.id ? "rotate-180" : ""}`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold">{loi.partner_company_name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLOR[loi.status] || "bg-slate-600 text-slate-300"}`}>
                        {loi.status}
                      </span>
                      {loi.signed && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {loi.partner_representative_name} · {loi.partner_email}
                      {loi.signed_date && ` · Signed ${new Date(loi.signed_date).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 ml-3">
                  <select
                    value={loi.status}
                    onChange={async (e) => {
                      e.stopPropagation();
                      await base44.entities.LetterOfIntent.update(loi.id, { status: e.target.value });
                      setLois(prev => prev.map(l => l.id === loi.id ? { ...l, status: e.target.value } : l));
                    }}
                    onClick={e => e.stopPropagation()}
                    className="text-xs bg-slate-700 border border-slate-600 text-slate-300 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="pending">pending</option>
                    <option value="reviewed">reviewed</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>
              </button>

              {expanded === loi.id && (
                <div className="border-t border-slate-700 px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {[
                    ["Company", loi.partner_company_name],
                    ["Partner Type", loi.partner_type],
                    ["Address", loi.partner_address],
                    ["Country", loi.partner_country],
                    ["Registration Nr.", loi.partner_registration_number],
                    ["VAT / Tax Nr.", loi.partner_vat],
                    ["Representative", loi.partner_representative_name],
                    ["Title", loi.partner_representative_title],
                    ["Email", loi.partner_email],
                    ["Signed Date", loi.signed_date ? new Date(loi.signed_date).toLocaleString() : "—"],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label}>
                      <p className="text-slate-500">{label}</p>
                      <p className="text-slate-200 break-all">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}