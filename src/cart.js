'use strict';

// Prices are in cents to avoid floating-point surprises.
const DISCOUNTS = { WELCOME10: 0.1, STUDENT20: 0.2 };

function subtotal(items) {
  return items.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
}

function applyDiscount(cents, code) {
  if (!code) return cents;
  const rate = DISCOUNTS[code.toUpperCase()];
  if (rate === undefined) throw new Error(`Unknown discount code: ${code}`);
  return Math.round(cents * (1 - rate));
}

function total(items, code) {
  return applyDiscount(subtotal(items), code);
}

module.exports = { subtotal, applyDiscount, total };
