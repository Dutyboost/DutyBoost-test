import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageBackdrop from "../components/PageBackdrop";
import PartnerPassCard from "../components/dutycredit-examples/PartnerPassCard";
import { exportDutyCreditExamplesPdf } from "@/utils/exportDutyCreditExamplesPdf";

const VALID_UNTIL = "31 Dec 2026";
const DUTYBOOST_TAGLINE = "Your Discount Partner";

const EXAMPLES = [
  {
    id: "dutyboost",
    vertical: "Direct — DutyBoost",
    token: "DB-FLT2K8-1A4",
    brand: "DutyBoost",
    tagline: DUTYBOOST_TAGLINE,
    tiles: [
      { label: "Airport of departure", value: "AMS — Amsterdam" },
      { label: "Airport of arrival", value: "LHR — London" },
      { label: "Status", value: "Active", valueClass: "text-green-600" },
      { label: "Valid until", value: VALID_UNTIL },
    ],
  },
  {
    id: "klm",
    vertical: "Flight — KLM",
    token: "DB-ML4K2X-9F7",
    brand: "KLM",
    tagline: "Your Flight Travel Partner",
    tiles: [
      { label: "Airport of departure", value: "AMS — Amsterdam" },
      { label: "Airport of arrival", value: "LHR — London" },
      { label: "Status", value: "Active", valueClass: "text-green-600" },
      { label: "Valid until", value: VALID_UNTIL },
    ],
  },
  {
    id: "costa",
    vertical: "Cruise — Costa Cruises",
    token: "DB-CR4T7M-2K9",
    brand: "Costa Cruises",
    tagline: "Your Cruise Travel Partner",
    tiles: [
      { label: "Port of departure", value: "GEN — Genoa" },
      { label: "Port of arrival", value: "BCN — Barcelona" },
      { label: "Status", value: "Active", valueClass: "text-green-600" },
      { label: "Valid until", value: VALID_UNTIL },
    ],
  },
  {
    id: "ns",
    vertical: "Train — NS",
    token: "DB-TR8N4S-6P2",
    brand: "NS",
    tagline: "Your Train Travel Partner",
    tiles: [
      { label: "Station of departure", value: "Amsterdam Centraal" },
      { label: "Station of arrival", value: "Rotterdam Centraal" },
      { label: "Status", value: "Active", valueClass: "text-green-600" },
      { label: "Valid until", value: VALID_UNTIL },
    ],
  },
  {
    id: "blablacar",
    vertical: "Coach — BlaBlaCar",
    token: "DB-CCH5B7-3M1",
    brand: "BlaBlaCar",
    tagline: "Your Coach Travel Partner",
    tiles: [
      { label: "Station of departure", value: "Amsterdam Sloterdijk" },
      { label: "Station of arrival", value: "Paris Bercy" },
      { label: "Status", value: "Active", valueClass: "text-green-600" },
      { label: "Valid until", value: VALID_UNTIL },
    ],
  },
  {
    id: "enterprise",
    vertical: "Car rental — Enterprise Rent-A-Car",
    token: "DB-CAR9X2-4T8",
    brand: "Enterprise Rent-A-Car",
    tagline: "Your Car Rental Travel Partner",
    tiles: [
      { label: "Pick-up", value: "AMS — Amsterdam" },
      { label: "Return", value: "AMS — Amsterdam" },
      { label: "Status", value: "Active", valueClass: "text-green-600" },
      { label: "Valid until", value: VALID_UNTIL },
    ],
  },
  {
    id: "barcelo",
    vertical: "Accommodation — Barceló",
    token: "DB-HTL3B8-7Q5",
    brand: "Barceló",
    tagline: "Your Accommodation Travel Partner",
    tiles: [
      { label: "Stay", value: "Barcelona city centre", wide: true },
      { label: "Status", value: "Active", valueClass: "text-green-600" },
      { label: "Valid until", value: VALID_UNTIL },
    ],
  },
];

export default function DutyCreditExamples() {
  const pdfRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await exportDutyCreditExamplesPdf(pdfRef.current);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen font-body relative">
      <PageBackdrop />

      <nav className="sticky top-0 z-50 backdrop-blur border-b border-border bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <DutyBoostLogo height={45} />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight">
            DutyCredit pass — partner examples
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One reference pass per travel vertical. The traveller always sees the same card; only the
            travel details and the partner shown under “Brought to you by” change.
          </p>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleDownload} disabled={downloading} size="lg" className="gap-2">
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {downloading ? "Preparing PDF…" : "Download PDF"}
          </Button>
        </div>

        <div ref={pdfRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {EXAMPLES.map((example) => (
            <div key={example.id} className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {example.vertical}
              </p>
              <PartnerPassCard
                token={example.token}
                brand={example.brand}
                tagline={example.tagline}
                tiles={example.tiles}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}