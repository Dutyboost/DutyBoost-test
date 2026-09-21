import { Link } from "react-router-dom";
import RoleAvatar from "../avatars/RoleAvatar";
import { getEnvironment } from "@/data/stakeholderEnvironments";

// A stakeholder shown inside their own environment, behind their own signage board.
export default function StakeholderEnvironmentCard({
  envKey,
  Icon,
  AdditionalIcons = [],
  title,
  person,
  description,
  benefits,
  link,
}) {
  const env = getEnvironment(envKey);

  const content = (
    <>
      {env && (
        <img
          src={env.image}
          alt={`${title} environment`}
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-terminal-navy via-terminal-navy/85 to-terminal-navy/35" />
      <div className="relative flex flex-col h-full min-h-[280px] p-4">
        <div className="flex items-start gap-2 mb-3">
          <span className="w-9 h-9 bg-terminal-orange flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-white" />
          </span>
          {AdditionalIcons.map((AdIcon, idx) => (
            <span
              key={idx}
              className="w-9 h-9 bg-white/10 border border-white/15 flex items-center justify-center shrink-0"
            >
              <AdIcon className="w-4 h-4 text-white/80" />
            </span>
          ))}
          {person && <RoleAvatar person={person} size={40} active className="ml-auto" />}
        </div>

        <h3 className="font-heading font-bold text-white text-base leading-tight uppercase tracking-wide">
          {title}
        </h3>
        {env && (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-terminal-orange mt-1">
            {env.zone}
          </p>
        )}
        {person && (
          <p className="text-[11px] text-terminal-amber font-semibold mt-0.5">
            {person.person} · {person.personRole}
          </p>
        )}

        <p className="text-white/70 text-xs leading-snug mt-2">{description}</p>

        <ul className="space-y-1.5 mt-auto pt-3">
          {benefits.map((b) => (
            <li key={b} className="flex gap-2 text-[11px] leading-snug text-white/85">
              <span className="mt-1.5 w-1.5 h-1.5 bg-terminal-orange shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const classes =
    "group relative block overflow-hidden rounded-sm border border-white/10 bg-terminal-navy shadow-lg hover:shadow-2xl transition-shadow";

  return link ? (
    <Link to={link} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}