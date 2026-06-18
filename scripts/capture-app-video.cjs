const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:80';
const OUT_DIR = '/tmp/app-screenshots';
const VIDEO_OUT = path.join(__dirname, '../artifacts/mana-rythu-video/public/app-demo.mp4');

fs.mkdirSync(OUT_DIR, { recursive: true });

const STEPS = [
  { route: '/marketplace',          label: 'Marketplace — Direct Farm Listings',    waitFor: '.listing-card, [class*="card"], h1, h2' },
  { route: '/farmer',               label: 'Farmer Dashboard — Crops & Earnings',   waitFor: '[role="tablist"], h1, h2' },
  { route: '/farmer?tab=pest',      label: 'AI Pest Detection — Telugu Diagnosis',  waitFor: '[role="tablist"]' },
  { route: '/farmer?tab=transport', label: 'Logistics Estimator — TS & AP Routes',  waitFor: '[role="tablist"]' },
  { route: '/fair-price',           label: 'AI Price Intelligence — APMC Rates',    waitFor: 'h1, h2, input, button' },
  { route: '/chat',                 label: 'Real-Time Chat — Farmer ↔ Buyer',       waitFor: 'h1, h2, [class*="chat"], input' },
];

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({
    executablePath: '/nix/store/qa9cnw4v5xkxyip6mb9kxqfq1z4x2dx1-chromium-138.0.7204.100/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const ctx = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  // ── Login ──────────────────────────────────────────────────────────────────
  console.log('Logging in...');
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
  await page.fill('#email', 'jerrey943@gmail.com');
  await page.fill('#password', 'Yuvaraj@07');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2500);
  console.log('Logged in, current URL:', page.url());

  const shots = [];

  for (let i = 0; i < STEPS.length; i++) {
    const step = STEPS[i];
    console.log(`Navigating to ${step.route}...`);
    await page.goto(`${BASE}${step.route}`, { waitUntil: 'networkidle' });
    try { await page.waitForSelector(step.waitFor, { timeout: 4000 }); } catch {}
    await page.waitForTimeout(1200);

    const file = path.join(OUT_DIR, `frame-${String(i).padStart(2,'0')}.png`);
    await page.screenshot({ path: file, fullPage: false });
    shots.push(file);
    console.log(`Screenshot saved: ${file}`);
  }

  await browser.close();

  // ── Build video with ffmpeg ────────────────────────────────────────────────
  // Each frame shown for 4s, crossfade 0.6s
  console.log('\nBuilding video with ffmpeg...');

  // Write concat list — each image displayed for 4 seconds
  const DURATION = 4;
  const listFile = path.join(OUT_DIR, 'list.txt');
  const lines = shots.map(f => `file '${f}'\nduration ${DURATION}`).join('\n');
  // ffmpeg concat demuxer needs a final file entry
  fs.writeFileSync(listFile, lines + `\nfile '${shots[shots.length - 1]}'`);

  const cmd = [
    'ffmpeg -y',
    `-f concat -safe 0 -i "${listFile}"`,
    `-vf "scale=860:1864:flags=lanczos,fps=30,format=yuv420p"`,
    `-c:v libx264 -preset fast -crf 22`,
    `"${VIDEO_OUT}"`,
  ].join(' ');

  console.log('Running:', cmd);
  execSync(cmd, { stdio: 'inherit' });
  console.log('\n✅ Video saved to:', VIDEO_OUT);
}

run().catch(err => { console.error(err); process.exit(1); });
