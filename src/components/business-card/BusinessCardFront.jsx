import DutyBoostLogo from "@/components/DutyBoostLogo";

export default function BusinessCardFront({ data }) {
  return (
    <div
      className="relative overflow-hidden bg-white border border-border"
      style={{ width: "85mm", height: "55mm" }}
    >
      {/* Left accent rail */}
      <div className="absolute left-0 top-0 h-full" style={{ width: "3mm", background: "#1A5FFF" }} />
      <div className="absolute left-0 bottom-0" style={{ width: "3mm", height: "16mm", background: "#FF7A00" }} />

      {/* Soft brand bloom */}
      <div
        className="absolute rounded-full"
        style={{ width: "48mm", height: "48mm", right: "-16mm", top: "-16mm", background: "rgba(26,95,255,0.07)" }}
      />
      <div
        className="absolute rounded-full"
        style={{ width: "26mm", height: "26mm", right: "2mm", bottom: "-12mm", background: "rgba(255,122,0,0.08)" }}
      />

      <div
        className="relative h-full flex flex-col justify-between"
        style={{ padding: "6mm 7mm 6mm 9mm" }}
      >
        <DutyBoostLogo height={36} linkTo={null} />

        <div>
          <p className="font-heading font-bold leading-tight" style={{ fontSize: "13pt", color: "#0D1524" }}>
            {data.name || "Your Name"}
          </p>
          <p style={{ fontSize: "8.5pt", color: "#6B7590", marginTop: "0.6mm" }}>
            {data.title || "Job Title"}
          </p>
          <div style={{ width: "14mm", height: "0.7mm", background: "#FF7A00", marginTop: "2.4mm" }} />
          <p style={{ fontSize: "6.5pt", color: "#6B7590", marginTop: "2mm", letterSpacing: "0.06em" }}>
            THE TRAVEL RETAIL CONVERSION LAYER
          </p>
        </div>
      </div>
    </div>
  );
}