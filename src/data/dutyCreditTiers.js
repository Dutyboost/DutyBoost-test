// DutyCredit savings tiers — base values are in EUR.
// Currency conversion to the traveller's local airport currency is handled
// at render time via fmtMoney() so the same tiers display in €, Afl., etc.
export const DUTY_CREDIT_TIERS = [
  { name: "Entry DutyCredit",   min: 20,  max: 49,  discountMin: 1,    discount: 2.50, color: "text-amber-600" },
  { name: "Boarding DutyCredit", min: 50,  max: 99,  discountMin: 2.50, discount: 5,    color: "text-slate-500" },
  { name: "Standard DutyCredit", min: 100, max: 149, discountMin: 5,    discount: 10,   color: "text-yellow-600" },
  { name: "Plus DutyCredit",    min: 150, max: 199, discountMin: 10,   discount: 20,   color: "text-blue-600" },
  { name: "Lounge DutyCredit",  min: 200, max: 249, discountMin: 20,   discount: 30,   color: "text-green-600" },
  { name: "Premium DutyCredit", min: 250, max: 299, discountMin: 30,   discount: 45,   color: "text-pink-600" },
  { name: "VIP DutyCredit",     min: 300, max: null, discountMin: 45,  discount: 60,   color: "text-purple-600" },
];

// Minimum qualifying spend to redeem a DutyCredit (EUR base).
export const MIN_SPEND_EUR = 20;