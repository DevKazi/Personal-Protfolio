import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTilt,
  getNextIndex,
  getPrevIndex,
  formatWhatsAppUrl,
  validateEmail,
  verifyPortfolioIntegrity,
} from './portfolio-utils.ts';
import { portfolioData } from './data.ts';

test('calculateTilt returns neutral orientation when mouse is at center', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };
  const result = calculateTilt(200, 200, rect, 10);
  assert.equal(result.rotateX, 0);
  assert.equal(result.rotateY, 0);
  assert.equal(result.glareX, 50);
  assert.equal(result.glareY, 50);
});

test('calculateTilt clamps rotation to maxTiltDegrees', () => {
  const rect = { left: 0, top: 0, width: 100, height: 100 };
  const result = calculateTilt(200, -50, rect, 15);
  assert.equal(result.rotateY, 15);
  assert.equal(result.rotateX, 15);
});

test('getNextIndex and getPrevIndex cycle cyclically through 11 certificates', () => {
  const total = 11;
  assert.equal(getNextIndex(0, total), 1);
  assert.equal(getNextIndex(10, total), 0);
  assert.equal(getPrevIndex(0, total), 10);
  assert.equal(getPrevIndex(5, total), 4);
});

test('formatWhatsAppUrl sanitizes phone numbers and handles custom messages', () => {
  const url1 = formatWhatsAppUrl('+8801715298385');
  assert.equal(url1, 'https://wa.me/8801715298385');

  const url2 = formatWhatsAppUrl('+880 1715-298385', 'Hello Kazi');
  assert.equal(url2, 'https://wa.me/8801715298385?text=Hello%20Kazi');
});

test('validateEmail validates typical professional email addresses', () => {
  assert.equal(validateEmail('mukitul2k9@gmail.com'), true);
  assert.equal(validateEmail('invalid-email'), false);
  assert.equal(validateEmail('test@domain'), false);
});

test('verifyPortfolioIntegrity verifies all required portfolio assets and stats exist', () => {
  const integrity = verifyPortfolioIntegrity(portfolioData);
  assert.equal(integrity.isValid, true, `Integrity errors: ${integrity.errors.join(', ')}`);
  assert.equal(portfolioData.certificates.items.length, 11);
  assert.equal(portfolioData.services.items.length, 6);
  assert.equal(portfolioData.about.stats.length, 4);
  assert.equal(portfolioData.about.skillCategories.length, 4);
});
