import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { portfolioData } from '../src/lib/data.ts';
import {
  calculateTilt,
  getNextIndex,
  getPrevIndex,
  formatWhatsAppUrl,
  validateEmail,
  verifyPortfolioIntegrity,
} from '../src/lib/portfolio-utils.ts';

describe('Portfolio Utilities & Integrity Tests', () => {
  it('should verify all 11 certificates and data schema', () => {
    const result = verifyPortfolioIntegrity(portfolioData);
    assert.equal(result.isValid, true, `Integrity failed with errors: ${result.errors.join(', ')}`);
  });

  it('should include UY LAB SEO certificate', () => {
    const uyLab = portfolioData.certificates.items.find((c) => c.issuer === 'UY LAB');
    assert.ok(uyLab, 'UY LAB certificate must exist');
    assert.equal(uyLab?.issuer, 'UY LAB');
    assert.equal(uyLab?.studentId, 'SEO-0501010001');
    assert.equal(uyLab?.category, 'Digital Marketing & SEO');
    assert.ok(uyLab?.year.includes('22/01/2025 to 20/04/2025'));
    assert.ok(uyLab?.year.includes('01 May, 2025'));
  });

  it('should include AI Summit Bangladesh certificate', () => {
    const aiSummit = portfolioData.certificates.items.find((c) => c.title.includes('AI Summit Bangladesh'));
    assert.ok(aiSummit, 'AI Summit Bangladesh certificate must exist');
    assert.equal(aiSummit?.issuer, 'AI Academy Bangladesh');
    assert.equal(aiSummit?.category, 'AI Academy');
  });

  it('should calculate tilt angles within specified bounds', () => {
    const rect = { left: 100, top: 100, width: 200, height: 200 };
    // Center point
    const center = calculateTilt(200, 200, rect, 10);
    assert.equal(center.rotateX, 0);
    assert.equal(center.rotateY, 0);

    // Top-left
    const topLeft = calculateTilt(100, 100, rect, 10);
    assert.equal(topLeft.rotateX, 10);
    assert.equal(topLeft.rotateY, -10);
  });

  it('should handle carousel looping indices correctly', () => {
    assert.equal(getNextIndex(10, 11), 0);
    assert.equal(getPrevIndex(0, 11), 10);
    assert.equal(getNextIndex(4, 11), 5);
    assert.equal(getPrevIndex(4, 11), 3);
  });

  it('should format WhatsApp URLs cleanly', () => {
    const url = formatWhatsAppUrl('+880 1715-298385', 'Hello Kazi');
    assert.equal(url, 'https://wa.me/8801715298385?text=Hello%20Kazi');
  });

  it('should validate emails properly', () => {
    assert.equal(validateEmail('kazimukitulislam@gmail.com'), true);
    assert.equal(validateEmail('mukitul2k9@gmail.com'), true);
    assert.equal(validateEmail('invalid-email'), false);
  });

  it('should verify DevKazi official social handles', () => {
    const pills = portfolioData.about.socialPills;
    assert.equal(pills.length, 3);
    assert.equal(pills[0].handle, 'linkedin.com/in/devkazi');
    assert.equal(pills[1].handle, 'facebook.com/DevKazi2k80');
    assert.equal(pills[2].handle, 'github.com/DevKazi');
  });

  it('should verify pure Tech & AI statistics with zero banking references', () => {
    const stats = portfolioData.about.stats;
    assert.equal(stats.length, 4);
    assert.ok(stats.find((s) => s.value === '4+ Years' && s.label === 'Active Web Dev Experience'));
    assert.ok(stats.find((s) => s.value === '50+' && s.label === 'Websites & Applications Built'));
    assert.ok(stats.find((s) => s.value === '20+' && s.label === 'AI Workflows & Automations Crafting'));
    assert.ok(stats.find((s) => s.value === '10+' && s.label === 'Specialized Certifications Completed'));

    // Verify all banking references are completely removed
    const fullJson = JSON.stringify(portfolioData);
    assert.equal(fullJson.includes('Banking'), false, 'Banking should not be referenced in portfolioData');
    assert.equal(fullJson.includes('Islami'), false, 'Islami Bank should not be referenced in portfolioData');
  });

  it('should verify 6 bespoke services', () => {
    const services = portfolioData.services.items;
    assert.equal(services.length, 6);
    assert.ok(services.find((s) => s.title === 'WordPress Development'));
    assert.ok(services.find((s) => s.title === 'Web Design & Branding'));
    assert.ok(services.find((s) => s.title === 'Web Applications'));
    assert.ok(services.find((s) => s.title === 'SEO & Digital Marketing'));
    assert.ok(services.find((s) => s.title === 'AI Automation'));
    assert.ok(services.find((s) => s.title === 'CPA & Affiliate Marketing'));
  });
});
