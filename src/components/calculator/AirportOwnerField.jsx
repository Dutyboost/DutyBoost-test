import { useState } from "react";
import { UserCircle2, Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Inline editor that assigns a sales / commercial lead to a single airport.
// Lifted state lives in EnterpriseCalculator (airportOwners[code] = { name, email }).
export default function AirportOwnerField({ code, owner, onSetOwner }) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(owner?.name || "");
  const [email, setEmail] = useState(owner?.email || "");

  const startEdit = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setName(owner?.name || "");
    setEmail(owner?.email || "");
    setEditing(true);
  };

  const save = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const trimmed = name.trim();
    onSetOwner(code, trimmed ? { name: trimmed, email: email.trim() } : null);
    setEditing(false);
  };

  const cancel = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") save(e); if (e.key === "Escape") cancel(e); }}
          placeholder={t("entCalc.owner_name_ph")}
          className="w-24 sm:w-32 text-[11px] px-2 py-1 rounded border border-slate-300 focus:border-primary outline-none bg-white"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") save(e); if (e.key === "Escape") cancel(e); }}
          placeholder={t("entCalc.owner_email_ph")}
          className="hidden sm:block w-32 text-[11px] px-2 py-1 rounded border border-slate-300 focus:border-primary outline-none bg-white"
        />
        <button type="button" onClick={save} className="p-1 rounded text-emerald-600 hover:bg-emerald-50" title={t("entCalc.owner_save")}>
          <Check className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={cancel} className="p-1 rounded text-slate-400 hover:bg-slate-100" title={t("entCalc.owner_cancel")}>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  if (owner?.name) {
    return (
      <button
        type="button"
        onClick={startEdit}
        className="flex items-center gap-1 text-[11px] text-primary hover:underline shrink-0 max-w-[45%]"
        title={owner.email ? `${owner.name} · ${owner.email}` : owner.name}
      >
        <UserCircle2 className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{owner.name}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={startEdit}
      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-primary shrink-0"
      title={t("entCalc.owner_assign")}
    >
      <UserCircle2 className="w-3.5 h-3.5" />
      <span className="hidden md:inline">{t("entCalc.owner_assign")}</span>
    </button>
  );
}