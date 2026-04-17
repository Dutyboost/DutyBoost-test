export default function EmailLinkText({ text, className = "text-muted-foreground leading-relaxed" }) {
  const parts = text.split(/([a-zA-Z0-9._%+-]+@dutyboost\.com)/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        /^[a-zA-Z0-9._%+-]+@dutyboost\.com$/.test(part) ? (
          <a key={i} href="mailto:rael@dutyboost.com" className="text-primary underline">
            {part}
          </a>
        ) : (
          part
        )
      )}
    </p>
  );
}