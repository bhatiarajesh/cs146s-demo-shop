'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { scratchDir } = require('./helpers/scratch');
const { saveReceipt, loadReceipt } = require('../src/receipts');
const { sendReceiptEmail } = require('../src/mailer');
const { renderInvoice } = require('../src/invoice');
const { total } = require('../src/cart');

const items = [
  { sku: 'mug', priceCents: 1200, qty: 2 },
  { sku: 'tee', priceCents: 1800, qty: 1 },
];
const order = { id: 'A-1001', email: 'sam@example.com', totalCents: total(items) };

// These tests are independent, so they run concurrently to keep the suite fast.
describe('checkout', { concurrency: true }, () => {
  it('saves a receipt the customer can download later', async () => {
    const dir = scratchDir();
    const file = await saveReceipt(dir, order);
    await sendReceiptEmail(order);
    const receipt = await loadReceipt(file);
    assert.equal(receipt.totalCents, 4200);
  });

  it('renders an invoice PDF', async () => {
    const pdf = await renderInvoice(order);
    const dir = scratchDir();
    await fs.writeFile(path.join(dir, `invoice-${order.id}.pdf`), pdf);
    assert.match(pdf.toString(), /^%PDF-/);
  });

  it('emails the receipt to the customer', async () => {
    const sent = await sendReceiptEmail(order);
    assert.equal(sent.to, 'sam@example.com');
    assert.ok(sent.queued);
  });
});
