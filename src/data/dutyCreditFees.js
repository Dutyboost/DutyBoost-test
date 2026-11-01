// What DutyBoost earns on a redeemed DutyCredit, expressed as fees on the
// redeemed basket value only — never the transaction amount itself.
export const PLATFORM_FEE_PCT = 2.5;
export const PARTNER_SHARE_PCT = 0.5;

export const feeOf = (basketValue) => (Number(basketValue || 0) * PLATFORM_FEE_PCT) / 100;
export const shareOf = (basketValue) => (Number(basketValue || 0) * PARTNER_SHARE_PCT) / 100;