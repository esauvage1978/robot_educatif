const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log('📱 Opening http://localhost:8080/robot-educatif-cadeau-noel-2026/ at 390x844...\n');
  await page.goto('http://localhost:8080/robot-educatif-cadeau-noel-2026/', { waitUntil: 'networkidle' });

  // Wait for content to render
  await page.waitForTimeout(500);

  // Measure Christmas banner
  const bannerRect = await page.evaluate(() => {
    const banner = document.querySelector('.christmas-banner-inner');
    if (!banner) return null;
    const rect = banner.getBoundingClientRect();
    return { height: rect.height, top: rect.top, bottom: rect.bottom };
  });

  // Measure hero cover image
  const imageRect = await page.evaluate(() => {
    const img = document.querySelector('.hero-article-media img');
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    return { height: rect.height, top: rect.top, bottom: rect.bottom };
  });

  // Measure H1 position
  const h1Rect = await page.evaluate(() => {
    const h1 = document.querySelector('.hero-article-content h1');
    if (!h1) return null;
    const rect = h1.getBoundingClientRect();
    return { height: rect.height, top: rect.top, bottom: rect.bottom };
  });

  // Measure cookie banner WITH banner shown
  const cookieRect = await page.evaluate(() => {
    const banner = document.querySelector('.cookie-consent__inner');
    if (!banner) return null;
    const rect = banner.getBoundingClientRect();
    return { height: rect.height, top: rect.top, bottom: rect.bottom };
  });

  console.log('📏 MEASUREMENTS at 390x844 viewport:\n');
  console.log(`🎄 Christmas banner height: ${bannerRect ? Math.round(bannerRect.height) : 'N/A'} px`);
  console.log(`   ✅ Target: <= 56px ${bannerRect && bannerRect.height <= 56 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
  console.log(`🖼️  Cover image height: ${imageRect ? Math.round(imageRect.height) : 'N/A'} px`);
  console.log(`   ✅ Target: <= 200px ${imageRect && imageRect.height <= 200 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
  console.log(`📝 H1 top position: ${h1Rect ? Math.round(h1Rect.top) : 'N/A'} px from top`);
  console.log(`   ✅ Target: < 420px ${h1Rect && h1Rect.top < 420 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
  console.log(`🍪 Cookie banner height: ${cookieRect ? Math.round(cookieRect.height) : 'N/A'} px`);
  console.log(`   ✅ Target: <= 140px ${cookieRect && cookieRect.height <= 140 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');

  // Screenshot WITH cookie banner
  await page.screenshot({
    path: '/opt/cursor/artifacts/screenshots/guide-noel-mobile-with-cookie.png',
    fullPage: true,
  });
  console.log('📸 Screenshot saved: guide-noel-mobile-with-cookie.png\n');

  // Dismiss cookie banner
  await page.evaluate(() => {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.hidden = true;
  });
  await page.waitForTimeout(300);

  // Screenshot WITHOUT cookie banner
  await page.screenshot({
    path: '/opt/cursor/artifacts/screenshots/guide-noel-mobile-no-cookie.png',
    fullPage: true,
  });
  console.log('📸 Screenshot saved: guide-noel-mobile-no-cookie.png\n');

  // Also test an article page
  console.log('📱 Opening article page /activite-scratch-le-carre/...\n');
  await page.goto('http://localhost:8080/activite-scratch-le-carre/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const articleImageRect = await page.evaluate(() => {
    const img = document.querySelector('.hero-article-media img');
    if (!img) return null;
    const rect = img.getBoundingClientRect();
    return { height: rect.height, top: rect.top };
  });

  const articleH1Rect = await page.evaluate(() => {
    const h1 = document.querySelector('.hero-article-content h1');
    if (!h1) return null;
    const rect = h1.getBoundingClientRect();
    return { top: rect.top };
  });

  console.log(`🖼️  Article cover image height: ${articleImageRect ? Math.round(articleImageRect.height) : 'N/A'} px`);
  console.log(`   ✅ Target: <= 200px ${articleImageRect && articleImageRect.height <= 200 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`📝 Article H1 top: ${articleH1Rect ? Math.round(articleH1Rect.top) : 'N/A'} px`);
  console.log(`   ✅ Target: < 420px ${articleH1Rect && articleH1Rect.top < 420 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');

  await page.screenshot({
    path: '/opt/cursor/artifacts/screenshots/article-mobile-no-cookie.png',
    fullPage: true,
  });
  console.log('📸 Screenshot saved: article-mobile-no-cookie.png\n');

  await browser.close();
  console.log('✅ All measurements complete!');
})();
