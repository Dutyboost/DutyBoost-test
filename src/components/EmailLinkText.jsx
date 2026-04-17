import { useState } from "react";

export default function EmailLinkText({ text, className = "text-muted-foreground leading-relaxed" }) {
  const parts = text.split(/([a-zA-Z0-9._%+-]+@dutyboost\.com)/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        /^[a-zA-Z0-9._%+-]+@dutyboost\.com$/.test(part) ? (
          <EmailLink key={i} display={part} />
        ) : (
          part
        )
      )}
    </p>
  );
}

function EmailLink({ display }) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e) => {
    // Try mailto first
    const mailtoWindow = window.open("mailto:rael@dutyboost.com", "_self");
    // If it didn't open a mail client (hard to detect), also copy to clipboard as fallback
    navigator.clipboard?.writeText("rael@dutyboost.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <span className="inline-flex items-center gap-1">
      <a
        href="mailto:rael@dutyboost.com"
        onClick={handleClick}
        className="text-primary underline"
      >
        {display}
      </a>
      {copied && (
        <span className="text-xs text-green-600 font-medium">copied!</span>
      )}
    </span>
  );
}