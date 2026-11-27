const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const basePath = 'D:/SoftwareProjects/HockeyTools';
  
  // Test persistence across pages
  console.log('Testing language persistence...');
  
  // Start with index.html, set to Swedish
  await page.goto(`file:///${basePath}/index.html`);
  await page.waitForTimeout(500);
  await page.selectOption('[data-language]', 'sv');
  await page.waitForTimeout(1000);
  
  // Verify Swedish is selected and brand text is translated
  const selectedLang = await page.$eval('[data-language]', el => el.value);
  const brandText = await page.textContent('.brand');
  console.log(`Index page - Selected language: ${selectedLang}, Brand text: '${brandText}'`);
  
  // Navigate to flex-calculator
  await page.goto(`file:///${basePath}/flex-calculator/index.html`);
  await page.waitForTimeout(500);
  
  // Check if language persisted
  const flexLang = await page.$eval('[data-language]', el => el.value);
  const flexBrand = await page.textContent('.brand');
  console.log(`Flex calculator - Selected language: ${flexLang}, Brand text: '${flexBrand}'`);
  
  // Reload the page
  await page.reload();
  await page.waitForTimeout(500);
  
  // Check after reload
  const reloadLang = await page.$eval('[data-language]', el => el.value);
  const reloadBrand = await page.textContent('.brand');
  console.log(`After reload - Selected language: ${reloadLang}, Brand text: '${reloadBrand}'`);
  
  // Test another language
  await page.selectOption('[data-language]', 'de');
  await page.waitForTimeout(1000);
  
  // Navigate to stick-length-calculator
  await page.goto(`file:///${basePath}/stick-length-calculator/index.html`);
  await page.waitForTimeout(500);
  
  const stickLang = await page.$eval('[data-language]', el => el.value);
  const stickBrand = await page.textContent('.brand');
  console.log(`Stick length - Selected language: ${stickLang}, Brand text: '${stickBrand}'`);
  
  await browser.close();
  console.log('Persistence test completed.');
})();