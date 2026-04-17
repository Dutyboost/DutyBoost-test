// Renders a string, turning any *@dutyboost.com address into a real mailto link
export default function EmailLinkText({ text, className = "text-muted-foreground leading-relaxed", as: Tag = "p" }) {
  const parts = text.split(/([a-zA-Z0-9._%+-]+@dutyboost\.com)/g);
  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        /^[a-zA-Z0-9._%+-]+@dutyboost\.com$/.test(part) ? (
          <a
            key={i}
            href={`mailto:${part}`}
            className="text-primary underline cursor-pointer"
            onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${part}`; }}
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </Tag>
  );
}