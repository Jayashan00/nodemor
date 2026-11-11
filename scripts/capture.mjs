// Bakes real desktop + mobile screenshots of each project into /screenshots.
// Run once:  npm i -D playwright && npx playwright install chromium && npm run shots
import { chromium, devices } from 'playwright';
import { mkdirSync } from 'node:fs';
const sites = ['https://denoahlankaholidays.com/','https://aimode.lk/','https://rentacarkandy.com/','https://directbooking.lk/'];
mkdirSync('screenshots', { recursive: true });
const browser = await chromium.launch();
for (const url of sites) {
  const host = new URL(url).hostname.replace(/^www\./, '');
  const desk = await browser.newPage({ viewport: { width: 1280, height: 1400 } });
  await desk.goto(url, { waitUntil: 'networkidle', timeout: 60000 }); await desk.waitForTimeout(1500);
  await desk.screenshot({ path: `screenshots/${host}-desktop.png` }); await desk.close();
  const mob = await browser.newPage({ ...devices['iPhone 13'] });
  await mob.goto(url, { waitUntil: 'networkidle', timeout: 60000 }); await mob.waitForTimeout(1500);
  await mob.screenshot({ path: `screenshots/${host}-mobile.png` }); await mob.close();
  console.log('captured', host);
}
await browser.close();
