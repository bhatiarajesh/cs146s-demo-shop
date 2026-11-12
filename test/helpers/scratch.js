'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), `demo-shop-tests-${process.pid}-`));

process.once('exit', () => {
  fs.rmSync(DIR, { recursive: true, force: true });
});

function scratchDir() {
  return fs.mkdtempSync(path.join(DIR, 'case-'));
}

module.exports = { scratchDir };
