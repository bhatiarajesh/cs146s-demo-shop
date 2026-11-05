'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.join(os.tmpdir(), `demo-shop-tests-${process.pid}`);
let nextDir = 0;

fs.rmSync(ROOT, { recursive: true, force: true });
fs.mkdirSync(ROOT, { recursive: true });

function scratchDir() {
  const dir = path.join(ROOT, `case-${++nextDir}`);
  fs.mkdirSync(dir);
  return dir;
}

module.exports = { scratchDir };
