const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const basePath = 'D:/SoftwareProjects/HockeyTools';
  const urls = [
    'index.html',
    'flex-calculator/index.html',
    'stick-length-calculator/index.html',
    'skate-sharpening-guide/index.html',
    'skate-profiling/index.html',
    'best-skate-hollow-for-beginners/index.html',
    'best-stick-flex-by-weight/index.html',
    'how-long-should-my-hockey-stick-be/index.html',
    'youth-hockey-stick-sizing-guide/index.html',
    'ccm-stick-flex-chart/index.html',
    'bauer-stick-flex-chart/index.html',
    '5-8-vs-1-2-skate-sharpening/index.html'
  ];

  const languages = ['sv', 'no', 'da', 'fi', 'de', 'fr']; // skip en

  const results = {};

  for (const url of urls) {
    results[url] = {};
    for (const lang of languages) {
      try {
        const urlObj = new URL(`file:///${basePath}/${url}`);
        await page.goto(urlObj.toString());
        await page.waitForTimeout(500); // wait for initial load

        // Select language
        await page.selectOption('[data-language]', lang);
        await page.waitForTimeout(1000); // wait for translation to apply

        // Evaluate script to find untranslated strings
        const untranslated = await page.evaluate(() => {
          const untranslatedStrings = [];
          // Walk through all text nodes
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
          );
          let node;
          while ((node = walker.nextNode())) {
            const parent = node.parentNode;
            if (!parent) continue;
            // Skip if inside language select or brand
            if (parent.closest('select[data-language]') || parent.closest('.brand')) {
              continue;
            }
            // Check if this text node has an __htOriginal stored on parent and matches
            if (parent.__htOriginal && node.textContent === parent.__htOriginal) {
              untranslatedStrings.push(node.textContent.trim());
            }
          }
          return untranslatedStrings.filter(s => s.length > 0);
        });

        results[url][lang] = untranslated;
        console.log(`${url} [${lang}]: Found ${untranslated.length} untranslated strings`);
        if (untranslated.length > 0) {
          console.log('Untranslated strings:', untranslated);
        }
      } catch (err) {
        console.error(`Error processing ${url} [${lang}]:`, err);
        results[url][lang] = ['ERROR'];
      }
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  let totalUntranslated = 0;
  for (const url of urls) {
    for (const lang of languages) {
      const count = results[url][lang].length;
      totalUntranslated += count;
      if (count > 0) {
        console.log(`${url} [${lang}]: ${count} untranslated`);
      }
    }
  }
  console.log(`Total untranslated strings across all pages and languages: ${totalUntranslated}`);

  await browser.close();
})();