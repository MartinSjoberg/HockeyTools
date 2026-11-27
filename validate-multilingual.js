const fs = require("fs");
const path = require("path");

const root = __dirname;
const supportedLanguages = ["en", "sv", "no", "da", "fi", "de", "fr"];
const placeholderPattern = /\b(todo|tbd|lorem ipsum|translation needed|not translated)\b|{{[^}]+}}|\[[^\]]*(placeholder|översättning)[^\]]*\]/i;
const excludedDirectories = new Set(["node_modules", "site-output", ".git", ".wrangler"]);

const sourcePages = [];
const inspectDirectory = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) inspectDirectory(path.join(directory, entry.name));
      continue;
    }
    if (entry.isFile() && entry.name === "index.html") sourcePages.push(path.join(directory, entry.name));
  }
};

inspectDirectory(root);

const errors = [];
const relativePage = (file) => path.relative(root, file).replace(/\\/g, "/");

for (const file of sourcePages) {
  const html = fs.readFileSync(file, "utf8");
  const page = relativePage(file);

  if (!/<html\b[^>]*\blang="en"/i.test(html)) {
    errors.push(`${page}: missing English <html lang="en"> source language`);
  }
  if (!/name="description"/i.test(html) || !/<title>[^<]+<\/title>/i.test(html)) {
    errors.push(`${page}: missing title or meta description`);
  }
  if (!/data-language/i.test(html)) {
    errors.push(`${page}: missing language selector`);
  }

  for (const language of supportedLanguages) {
    if (!html.includes(`value="${language}"`)) {
      errors.push(`${page}: language selector missing "${language}"`);
    }
  }

  const visibleText = html.replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");
  if (placeholderPattern.test(visibleText)) {
    errors.push(`${page}: contains a placeholder or unfinished translation marker`);
  }
}

const seoFile = path.join(root, "assets", "localized-seo.json");
if (!fs.existsSync(seoFile)) {
  errors.push("assets/localized-seo.json: missing localized SEO source");
} else {
  let seo;
  try {
    seo = JSON.parse(fs.readFileSync(seoFile, "utf8"));
  } catch (error) {
    errors.push(`assets/localized-seo.json: invalid JSON (${error.message})`);
  }

  if (seo) {
    for (const language of supportedLanguages) {
      if (!seo.languages || !seo.languages[language]) {
        errors.push(`assets/localized-seo.json: missing language "${language}"`);
        continue;
      }
      if (!seo.languages[language].htmlLang || !seo.languages[language].ogLocale) {
        errors.push(`assets/localized-seo.json: incomplete locale metadata for "${language}"`);
      }
      if (!seo.languages[language].titles || Object.keys(seo.languages[language].titles).length === 0) {
        errors.push(`assets/localized-seo.json: missing titles for "${language}"`);
      }
    }
  }
}

const buildRoot = path.join(root, "site-output");
if (fs.existsSync(buildRoot)) {
  const validateBuiltPage = (file) => {
    const html = fs.readFileSync(file, "utf8");
    const page = path.relative(buildRoot, file).replace(/\\/g, "/");

    if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`site-output/${page}: missing title`);
    if (!/<meta name="description" content="[^"]+">/i.test(html)) errors.push(`site-output/${page}: missing meta description`);
    if (!/<link rel="canonical" href="https:\/\/[^"]+\/[^"]*">/i.test(html)) errors.push(`site-output/${page}: missing HTTPS canonical`);
    if (!/<meta property="og:locale" content="[a-z]{2}_[A-Z]{2}">/i.test(html)) errors.push(`site-output/${page}: missing og:locale`);

    const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)];
    if (hreflangs.length !== supportedLanguages.length + 1) {
      errors.push(`site-output/${page}: expected ${supportedLanguages.length + 1} hreflang entries, found ${hreflangs.length}`);
    }
  };

  const inspectBuiltDirectory = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) inspectBuiltDirectory(file);
      if (entry.isFile() && entry.name === "index.html") validateBuiltPage(file);
    }
  };

  inspectBuiltDirectory(buildRoot);
}

if (errors.length) {
  console.error("Multilingual validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Multilingual validation passed for ${sourcePages.length} source pages.`);
