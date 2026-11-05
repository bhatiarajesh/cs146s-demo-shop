'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

// Each test worker gets its own scratch folder, wiped clean at the start of every test.
const DIR = path.join(os.tmpdir(), `demo-shop-tests-${process.pid}`);

function scratchDir() {
  fs.rmSync(DIR, { recursive: true, force: true });
  fs.mkdirSync(DIR, { recursive: true });
  return DIR;
}

module.exports = { scratchDir };
