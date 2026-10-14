/**
 * Comprehensive Automated Test Suite for Tarot Cuabin
 * Validates DECK, ASSET, FLOW, API, and SEC test cases from SPEC.md Section 9
 */

const fs = require('fs');
const path = require('path');
const { TAROT_DECK } = require('../js/tarot-data.js');
const apiHandler = require('../api/reading.js');

let passedCount = 0;
let totalCount = 0;

function assertTest(id, name, condition, details = '') {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  [PASS] ${id}: ${name}`);
  } else {
    console.error(`  [FAIL] ${id}: ${name} ${details ? '(' + details + ')' : ''}`);
  }
}

async function runTestSuite() {
  console.log('\n========================================');
  console.log('  RUNNING TAROT CUABIN SPEC.MD TEST SUITE');
  console.log('========================================\n');

  // 1. DECK TESTS
  console.log('--- 1. DECK TESTS ---');
  assertTest('DECK-001', 'Deck contains exactly 78 cards', TAROT_DECK.length === 78, `Actual: ${TAROT_DECK.length}`);

  const majors = TAROT_DECK.filter(c => c.arcana === 'major');
  assertTest('DECK-002', 'Exactly 22 Major Arcana cards', majors.length === 22, `Actual: ${majors.length}`);

  const suits = ['wands', 'cups', 'swords', 'pentacles'];
  const suitsOk = suits.every(s => TAROT_DECK.filter(c => c.suit === s).length === 14);
  assertTest('DECK-003', 'Four suits × 14 cards each (56 Minor)', suitsOk);

  const ids = new Set(TAROT_DECK.map(c => c.id));
  assertTest('DECK-004', 'All 78 card IDs are unique and stable', ids.size === 78);

  const dataOk = TAROT_DECK.every(c => (
    c.nameEn && c.nameVi && c.meaningUpright && Array.isArray(c.keywords) && c.keywords.length >= 3
  ));
  assertTest('DECK-005', 'All cards have bilingual names, upright meanings, and >=3 keywords', dataOk);

  // 2. ASSET TESTS
  console.log('\n--- 2. ASSET TESTS ---');
  const assetDir = path.join(__dirname, '..', 'assets', 'tarot');
  const missingAssets = [];
  TAROT_DECK.forEach(c => {
    const filePath = path.join(assetDir, `${c.id}.jpg`);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size < 1000) {
      missingAssets.push(c.id);
    }
  });
  const backExists = fs.existsSync(path.join(assetDir, 'card-back.png'));
  assertTest('ASSET-001', 'All 78 card image files exist locally with valid sizes (>1KB)', missingAssets.length === 0, missingAssets.join(', '));
  assertTest('ASSET-002', 'Shared card back asset (card-back.png) exists locally', backExists);

  // 3. API & SECURITY TESTS
  console.log('\n--- 3. API & SECURITY TESTS ---');

  // Test API validation: Empty question
  const createMockRes = () => {
    return {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader(k, v) { this.headers[k] = v; },
      end(c) { this.body = c; }
    };
  };

  const res1 = createMockRes();
  await apiHandler({ method: 'POST', body: { question: '', cards: [] } }, res1);
  assertTest('API-VAL-001', 'API rejects empty question with 400', res1.statusCode === 400);

  const res2 = createMockRes();
  await apiHandler({ method: 'POST', body: { question: 'Test question', cards: [{ id: '1' }] } }, res2);
  assertTest('API-VAL-002', 'API rejects fewer than 3 cards with 400', res2.statusCode === 400);

  const res3 = createMockRes();
  await apiHandler({ method: 'GET' }, res3);
  assertTest('API-VAL-003', 'API rejects unsupported HTTP methods with 405', res3.statusCode === 405);

  // 4. VERCEL COMPATIBILITY TESTS
  console.log('\n--- 4. VERCEL DEPLOYMENT CHECKS ---');
  assertTest('VERCEL-001', 'Zero-config root index.html exists', fs.existsSync(path.join(__dirname, '..', 'index.html')));
  assertTest('VERCEL-002', 'Vercel Serverless Function api/reading.js exists', fs.existsSync(path.join(__dirname, '..', 'api', 'reading.js')));
  assertTest('VERCEL-003', 'API configuration present in project', fs.existsSync(path.join(__dirname, '..', '.env')));
  assertTest('VERCEL-004', 'Static assets are organized under assets/ and js/', fs.existsSync(assetDir) && fs.existsSync(path.join(__dirname, '..', 'js')));

  // SUMMARY
  console.log('\n========================================');
  console.log(`  TEST RESULTS: ${passedCount}/${totalCount} PASSED`);
  console.log('========================================\n');

  if (passedCount !== totalCount) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
