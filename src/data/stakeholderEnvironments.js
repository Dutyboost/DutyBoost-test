// One photorealistic environment per stakeholder, in the DutyBoost terminal
// wayfinding language: navy signage, polished floors, caution-orange accents.
export const ENVIRONMENTS = {
  travelers: {
    key: "travelers",
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/e96492112_generated_image.png",
    zone: "Terminal Concourse",
  },
  agencies: {
    key: "agencies",
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/a089e8e81_generated_image.png",
    zone: "Travel Desk",
  },
  airports: {
    key: "airports",
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/3dfb34ff9_generated_image.png",
    zone: "Departures Hall",
  },
  retailers: {
    key: "retailers",
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/82724eae0_generated_image.png",
    zone: "Duty Free Floor",
  },
  posPartner: {
    key: "posPartner",
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/b60fcf599_generated_image.png",
    zone: "Point of Sale",
  },
  wholesale: {
    key: "wholesale",
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/3764c193a_generated_image.png",
    zone: "Distribution",
  },
  corporate: {
    key: "corporate",
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9d8e9e4a8_generated_image.png",
    zone: "Business Travel",
  },
  dutyboost: {
    key: "dutyboost",
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/f1a8ff9d2_generated_image.png",
    zone: "Network Operations",
  },
};

export const getEnvironment = (key) => ENVIRONMENTS[key] || null;