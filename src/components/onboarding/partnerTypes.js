/**
 * Shared labels for the non-retail partner onboarding flows. Both the travel
 * and corporate partners follow the same shape as the retail one — a partner
 * company plus the units underneath it that get switched live — so the form
 * and the list stay a single pair of components driven by this config.
 */
export const PARTNER_TYPES = {
  "Travel Partner": {
    value: "Travel Partner",
    addTitle: "Add a new travel partner",
    addBlurb:
      "Take the details from the signed Order Form. Channels are saved as not live and only count towards the shared platform fee once you activate them below.",
    companyLabel: "Travel partner / company name",
    companyPlaceholder: "Start typing, e.g. Sun…",
    unitLabel: "Booking channel / agency branch",
    unitPlaceholder: "e.g. Amsterdam city branch",
    detailLabel: "Market / countries served",
    detailPlaceholder: "e.g. NL, BE",
    categoryLabel: "Partner category",
    categories: [
      "Travel Agency",
      "OTA",
      "Airline",
      "Hotel / Accommodation",
      "Car Rental",
      "Cruise",
      "Rail",
      "Tour Operator",
      "Other",
    ],
    listTitle: "Participating travel partner channels",
    listEmpty: "No travel partners yet — add the first one above.",
    searchPlaceholder: "Filter by company, channel or country…",
  },
  "Corporate Partner": {
    value: "Corporate Partner",
    addTitle: "Add a new corporate partner",
    addBlurb:
      "Take the details from the signed Order Form. Departments are saved as not live and only count towards the shared platform fee once you activate them below.",
    companyLabel: "Corporate partner / company name",
    companyPlaceholder: "Start typing, e.g. Acme…",
    unitLabel: "Department / cost centre",
    unitPlaceholder: "e.g. Sales EMEA",
    detailLabel: "Budget holder / travel policy",
    detailPlaceholder: "e.g. Global Travel, €250 daily cap",
    categoryLabel: "Industry",
    categories: [
      "Technology",
      "Financial Services",
      "Consulting",
      "Manufacturing",
      "Energy",
      "Pharmaceutical",
      "Legal",
      "Media",
      "Public Sector",
      "Other",
    ],
    listTitle: "Participating corporate departments",
    listEmpty: "No corporate partners yet — add the first one above.",
    searchPlaceholder: "Filter by company, department or country…",
  },
};

export const PARTNER_TYPE_LIST = Object.values(PARTNER_TYPES);