'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');

// Saves a receipt as JSON in `dir` and returns the file path.
async function saveReceipt(dir, order) {
  const file = path.join(dir, `receipt-${order.id}.json`);
  const receipt = { id: order.id, email: order.email, totalCents: order.totalCents };
  await fs.writeFile(file, JSON.stringify(receipt, null, 2));
  return file;
}

async function loadReceipt(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

module.exports = { saveReceipt, loadReceipt };
