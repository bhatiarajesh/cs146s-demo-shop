'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function scratchDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), `demo-shop-tests-${process.pid}-`));
}

module.exports = { scratchDir };
