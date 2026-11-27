// Simple translation validation script
(function() {
  const languages = ['en', 'sv', 'no', 'da', 'fi', 'de', 'fr'];
  const currentLang = document.documentElement.lang || 'en';
  
  console.log('Starting translation validation for language:', currentLang);
  
  // Function to check if a string looks like English (basic check)
  function looksLikeEnglish(text) {
    // Remove numbers, punctuation, whitespace
    const cleaned = text.replace(/[\d\s\.\,\:\;\-\_\(\)\[\]\{\}\?\!]+/g, '');
    // If empty or very short, it's probably not meaningful text
    if (cleaned.length < 2) return false;
    // Check if it contains mostly ASCII letters (basic English check)
    return /^[A-Za-z\s\-\,\.\:\;\?\!\(\)0-9]+$/.test(text) && 
           !text.match(/[\u00C0-\u00FF]/) && // No Latin-1 supplement chars
           text.length > 3;
  }
  
  // Function to collect all visible text nodes
  function getVisibleTextNodes() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
      // Skip if inside language select or brand
      const parent = node.parentNode;
      if (!parent) continue;
      if (parent.closest('select[data-language]') || parent.closest('.brand')) {
        continue;
      }
      
      const text = node.textContent.trim();
      if (text && looksLikeEnglish(text)) {
        textNodes.push({
          text: text,
          element: parent.tagName,
          context: node.textContent.substring(0, 100)
        });
      }
    }
    
    return textNodes;
  }
  
  // Function to check if translation system has processed this text
  function isTranslated(textNode) {
    const parent = textNode.element;
    // Check if the parent has __htOriginal attribute and it matches the text
    // This is how our translation system tracks original text
    return !(parent.__htOriginal && textNode.text === parent.__htOriginal);
  }
  
  // Run validation
  const untranslated = getVisibleTextNodes()
    .filter(node => !isTranslated(node));
  
  console.log(`Found ${untranslated.length} potentially untranslated strings:`);
  untranslated.forEach((item, index) => {
    console.log(`${index + 1}. "${item.text}" in <${item.element}>`);
    console.log(`   Context: ...${item.context}...`);
  });
  
  if (untranslated.length === 0) {
    console.log('✅ All text appears to be translated!');
  } else {
    console.log(`❌ Found ${untranslated.length} untranslated strings`);
  }
  
  // Return results for external consumption
  window.__translationValidationResults = {
    language: currentLang,
    untranslatedCount: untranslated.length,
    untranslated: untranslated
  };
  
})();