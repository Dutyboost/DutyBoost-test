import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
const legalLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/dpa", label: "Data Processing Agreement" },
  { to: "/refunds", label: "Billing & Dispute Policy" },
  { to: "/code-of-conduct", label: "Code of Conduct" },
  { to: "/cookies", label: "Cookie Policy" },
];

export default function FooterLinks() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-wrap justify-center md:justify-between gap-y-2 text-xs text-muted-foreground border-t border-border pt-4 items-center">
      <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 items-center">
      {/* Legal dropdown */}
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          Legal <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute bottom-full mb-2 left-0 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 w-52">
            {legalLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-xs hover:bg-muted hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
      <Link to="/user-guide" className="hover:text-primary transition-colors">User Guide</Link>
      </div>
    </div>
  );
}