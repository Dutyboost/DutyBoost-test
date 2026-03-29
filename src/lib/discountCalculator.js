export function calculateDiscount({ ticketPrice, travelers, travelType }) {
  let discount = 5; // Base discount

  // Add 1% per additional traveler beyond 1
  if (travelers > 1) {
    discount += (travelers - 1) * 1;
  }

  // Ticket price bonuses
  if (ticketPrice > 2000) {
    discount += 10;
  } else if (ticketPrice > 1000) {
    discount += 5;
  }

  // Long-haul bonus
  if (travelType === 'Long-haul') {
    discount += 5;
  }

  // Cap at 25%
  return Math.min(discount, 25);
}

export function generateVoucherCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DB-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}