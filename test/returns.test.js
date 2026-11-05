'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { scratchDir } = require('./helpers/scratch');
const { recordReturn, listReturns } = require('../src/returns');

describe('returns', () => {
  it('records a return', async () => {
    const dir = scratchDir();
    await recordReturn(dir, 'A-1001', 'wrong size');
    assert.deepEqual(await listReturns(dir), ['return-A-1001.json']);
  });

  it('lists returns in order', async () => {
    const dir = scratchDir();
    await recordReturn(dir, 'A-1002', 'damaged');
    await recordReturn(dir, 'A-1001', 'wrong size');
    assert.deepEqual(await listReturns(dir), ['return-A-1001.json', 'return-A-1002.json']);
  });
});
