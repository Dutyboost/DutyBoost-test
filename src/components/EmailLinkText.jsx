// Renders a string, turning any *@dutyboost.com address into a real mailto link
// that opens the user's email client addressed to rael@dutyboost.com
export default function EmailLinkText({ text, className = "text-muted-foreground leading-relaxed" }) {
  const parts = text.split(/([a-zA-Z0-9._%+-]+@dutyboost\.com)/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        /@dutyboost\.com$/.test(part) ? (
          <a
            key={i}
            href="mailto:rael@dutyboost.com"
            className="text-primary hover:underline"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </p>
  );
}