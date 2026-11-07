import { Mail, Phone, Globe } from "lucide-react";

const ROWS = [
  { key: "email", Icon: Mail },
  { key: "phone", Icon: Phone },
  { key: "website", Icon: Globe },
];

export default function BusinessCardBack({ data }) {
  return (
    <div
      className="relative overflow-hidden border border-border"
      style={{ width: "85mm", height: "55mm", background: "#0D1524" }}
    >
      <div
        className="absolute rounded-full"
        style={{ width: "42mm", height: "42mm", right: "-14mm", bottom: "-18mm", background: "rgba(26,95,255,0.35)" }}
      />
      <div className="absolute left-0 top-0 h-full" style={{ width: "1.2mm", background: "#FF7A00" }} />

      <div className="relative h-full flex flex-col justify-between" style={{ padding: "6mm 7mm 6mm 8mm" }}>
        <div>
          <p className="font-heading font-bold" style={{ fontSize: "12pt", color: "#FFFFFF", letterSpacing: "-0.01em" }}>
            DutyBoost<span style={{ fontSize: "6pt", verticalAlign: "super" }}>™</span>
          </p>
          <p style={{ fontSize: "6.5pt", color: "#8FA0C0", marginTop: "0.8mm" }}>
            Pre-activated travellers, more store transactions.
          </p>
        </div>

        <div className="space-y-[1.6mm]">
          {ROWS.map(({ key, Icon }) => (
            <div key={key} className="flex items-center" style={{ gap: "2.2mm" }}>
              <Icon style={{ width: "3.2mm", height: "3.2mm", color: "#FF7A00" }} />
              <span style={{ fontSize: "8pt", color: "#FFFFFF" }}>{data[key] || "—"}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "6pt", color: "#8FA0C0" }}>
          DutyBoost · KvK 42053088 · The Netherlands
        </p>
      </div>
    </div>
  );
}