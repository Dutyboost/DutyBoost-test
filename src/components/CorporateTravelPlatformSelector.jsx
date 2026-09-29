import { Plane, BedDouble, Car } from "lucide-react";
import TravelPartnerSelector from "@/components/TravelPartnerSelector";
import { CORPORATE_PLATFORMS, CORPORATE_PLATFORM_CONTINENTS } from "@/data/corporateTravelPlatforms";

// Corporate-travel wording for the shared volume selector — the list itself comes
// from the corporate travel platform dataset instead of the travel partner dataset.
const CORPORATE_VERTICAL_CONFIG = {
  flight: {
    label: "corporate travel management company or corporate booking platform",
    placeholder: "Search corporate travel platforms, TMCs…",
    searchHeading: "Search your platform to calculate your potential revenue",
    searchDesc: "Not listed above? Search any corporate travel platform or TMC worldwide",
    Icon: Plane,
  },
  accommodation: {
    label: "corporate booking platform selling hotel nights",
    placeholder: "Search corporate booking platforms, TMCs…",
    searchHeading: "Search your platform to calculate your potential revenue",
    searchDesc: "Not listed above? Search any corporate travel platform or TMC worldwide",
    Icon: BedDouble,
  },
  car: {
    label: "corporate booking platform selling car rental",
    placeholder: "Search corporate booking platforms, TMCs…",
    searchHeading: "Search your platform to calculate your potential revenue",
    searchDesc: "Not listed above? Search any corporate travel platform or TMC worldwide",
    Icon: Car,
  },
};

export default function CorporateTravelPlatformSelector(props) {
  return (
    <TravelPartnerSelector
      {...props}
      dataset={CORPORATE_PLATFORMS}
      continents={CORPORATE_PLATFORM_CONTINENTS}
      config={CORPORATE_VERTICAL_CONFIG}
    />
  );
}