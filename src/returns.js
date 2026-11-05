'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');

async function recordReturn(dir, orderId, reason) {
  const file = path.join(dir, `return-${orderId}.json`);
  await fs.writeFile(file, JSON.stringify({ orderId, reason }));
  return file;
}

async function listReturns(dir) {
  const names = await fs.readdir(dir);
  return names.filter((name) => name.startsWith('return-')).sort();
}

module.exports = { recordReturn, listReturns };
