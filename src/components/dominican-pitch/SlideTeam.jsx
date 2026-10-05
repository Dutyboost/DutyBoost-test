import { TEAM_MEMBERS } from "@/data/teamMembers";
import { ACCENT, SlideShell } from "./Shared";
import { useDeckLang } from "./LanguageContext";

export default function SlideTeam() {
  const { t } = useDeckLang();
  const c = t.team;

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={ACCENT}
      title={
        <>
          {c.title} <span style={{ color: ACCENT }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {TEAM_MEMBERS.map((m) => (
          <div
            key={m.name}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 text-center flex flex-col items-center"
          >
            <div
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 mb-4 flex-shrink-0"
              style={{ borderColor: `${ACCENT}22` }}
            >
              <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a0f1e] font-semibold text-sm md:text-base hover:underline transition-colors leading-tight"
            >
              {m.name}
            </a>
            <div className="text-slate-500 text-xs md:text-sm mt-1.5 leading-tight">
              {c.roles[m.name] || m.role}
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}