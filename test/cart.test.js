'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { subtotal, applyDiscount, total } = require('../src/cart');

const items = [
  { sku: 'mug', priceCents: 1200, qty: 2 },
  { sku: 'tee', priceCents: 1800, qty: 1 },
];

describe('cart', () => {
  it('adds up line items', () => {
    assert.equal(subtotal(items), 4200);
  });

  it('applies a discount code', () => {
    assert.equal(applyDiscount(4200, 'student20'), 3360);
  });

  it('rejects an unknown code', () => {
    assert.throws(() => applyDiscount(4200, 'FREESTUFF'), /Unknown discount code/);
  });

  it('totals an order with no code', () => {
    assert.equal(total(items), 4200);
  });
});
