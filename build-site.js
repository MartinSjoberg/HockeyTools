#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const outputDirectory = path.join(root, "site-output");
const languages = ["en", "sv", "no", "da", "fi", "de", "fr"];
const ignoredDirectories = new Set([
  ".git",
  ".github",
  ".wrangler",
  "node_modules",
  "site-output"
]);
const staticFiles = ["404.html", "robots.txt", "sitemap.xml"];
const assets = ["assets/app.js", "assets/styles.css"];

function getSiteOrigin() {
  const rawOrigin = (process.env.SITE_ORIGIN || "").trim();
  if (!rawOrigin) {
    throw new Error("SITE_ORIGIN is required, for example https://hockeytools.com.");
  }

  let url;
  try {
    url = new URL(rawOrigin);
  } catch {
    throw new Error("SITE_ORIGIN must be a valid HTTPS origin.");
  }

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("SITE_ORIGIN must be an HTTPS origin without a path, query, or fragment.");
  }

  return url.origin;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function replaceRequired(content, pattern, replacement, description) {
  if (!pattern.test(content)) {
    throw new Error(`Could not update ${description}; the source HTML did not match the expected template.`);
  }
  return content.replace(pattern, replacement);
}

function getPageUrl(origin, language, slug) {
  const languagePath = language === "en" ? "" : `/${language}`;
  const pagePath = slug ? `/${slug}` : "";
  return `${origin}${languagePath}${pagePath}/`;
}

function discoverPages() {
  const pages = [{
    slug: "",
    source: path.join(root, "index.html"),
    category: "home",
    key: "index"
  }];

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || ignoredDirectories.has(entry.name)) continue;

    const source = path.join(root, entry.name, "index.html");
    if (!fs.existsSync(source)) continue;

    const html = fs.readFileSync(source, "utf8");
    const category = html.match(/<body\b[^>]*\bdata-page="([^"]+)"/i)?.[1] || "home";
    pages.push({
      slug: entry.name,
      source,
      category,
      key: entry.name
    });
  }

  return pages;
}

function localizeProfileSections(html, language, source) {
  let matchedSections = 0;
  let selectedSections = 0;
  const localizedHtml = html.replace(
    /<section\b([^>]*\bdata-profile-locale="([a-z]{2})"[^>]*)>[\s\S]*?<\/section>/gi,
    (section, _attributes, sectionLanguage) => {
      matchedSections += 1;
      if (sectionLanguage !== language) return "";
      selectedSections += 1;
      return section.replace(/\s+hidden(?=[\s>])/i, "");
    }
  );

  if (matchedSections > 0 && selectedSections !== 1) {
    throw new Error(`${path.relative(root, source)} must contain one article section for ${language}; found ${selectedSections}.`);
  }
  return localizedHtml;
}

function buildLocalizedPage(page, language, origin, seo) {
  const languageData = seo.languages?.[language];
  const metaKey = page.category === "home" ? "home" : page.category;
  const title = languageData?.titles?.[page.key];
  const description = languageData?.[metaKey]?.description;

  if (!title) throw new Error(`Missing localized title for ${page.key} (${language}).`);
  if (!description) throw new Error(`Missing localized description for ${metaKey} (${language}).`);

  const url = getPageUrl(origin, language, page.slug);
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  let html = fs.readFileSync(page.source, "utf8");

  html = localizeProfileSections(html, language, page.source);
  html = replaceRequired(
    html,
    /<html\b[^>]*\blang="[^"]*"[^>]*>/i,
    `<html lang="${languageData.htmlLang}" data-localized-routing="true">`,
    `html language in ${page.key}`
  );
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`, `title in ${page.key}`);
  html = replaceRequired(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${safeDescription}">`,
    `description in ${page.key}`
  );
  html = replaceRequired(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${url}">`,
    `canonical URL in ${page.key}`
  );
  html = replaceRequired(html, /<body\b[^>]*>/i, (match) => {
    if (/\bdata-localized-seo=/.test(match)) return match;
    return match.replace(/>$/, ' data-localized-seo="true">');
  }, `body in ${page.key}`);

  const alternateLinks = languages.map((alternateLanguage) =>
    `  <link rel="alternate" hreflang="${alternateLanguage}" href="${getPageUrl(origin, alternateLanguage, page.slug)}">`
  );
  alternateLinks.push(
    `  <link rel="alternate" hreflang="x-default" href="${getPageUrl(origin, "en", page.slug)}">`
  );

  const socialTags = [
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="Hockey Tools">',
    `  <meta property="og:title" content="${safeTitle}">`,
    `  <meta property="og:description" content="${safeDescription}">`,
    `  <meta property="og:url" content="${url}">`,
    `  <meta property="og:locale" content="${languageData.ogLocale}">`,
    '  <meta name="twitter:card" content="summary">',
    `  <meta name="twitter:title" content="${safeTitle}">`,
    `  <meta name="twitter:description" content="${safeDescription}">`
  ];

  html = replaceRequired(
    html,
    /<\/head>/i,
    `${[...alternateLinks, ...socialTags].join("\n")}\n</head>`,
    `head in ${page.key}`
  );

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    inLanguage: languageData.htmlLang,
    url
  }).replaceAll("<", "\\u003c");

  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
  html = replaceRequired(
    html,
    /<\/head>/i,
    `<script type="application/ld+json">${schema}</script>\n</head>`,
    `structured data in ${page.key}`
  );

  const localizedRoot = language === "en"
    ? path.join(outputDirectory, page.slug)
    : path.join(outputDirectory, language, page.slug);
  fs.mkdirSync(localizedRoot, { recursive: true });
  fs.writeFileSync(path.join(localizedRoot, "index.html"), html, "utf8");
}

function copyStaticFiles(origin) {
  for (const asset of assets) {
    const destination = path.join(outputDirectory, asset);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.join(root, asset), destination);
  }

  for (const file of staticFiles) {
    let content = fs.readFileSync(path.join(root, file), "utf8");
    content = content
      .replaceAll("{{SITE_ORIGIN}}", origin)
      .replaceAll("https://hockeytools.com", origin);
    fs.writeFileSync(path.join(outputDirectory, file), content, "utf8");
  }

  for (const language of languages) {
    if (language === "en") continue;
    const languageAssets = path.join(outputDirectory, language, "assets");
    fs.mkdirSync(languageAssets, { recursive: true });
    for (const asset of assets) {
      fs.copyFileSync(path.join(root, asset), path.join(languageAssets, path.basename(asset)));
    }
  }
}

function build() {
  const origin = getSiteOrigin();
  const seo = JSON.parse(fs.readFileSync(path.join(root, "assets", "localized-seo.json"), "utf8"));
  const pages = discoverPages();

  if (!pages.length) throw new Error("No source pages were found.");

  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(outputDirectory, { recursive: true });
  copyStaticFiles(origin);

  for (const language of languages) {
    if (!seo.languages?.[language]) throw new Error(`Missing SEO configuration for ${language}.`);
    for (const page of pages) buildLocalizedPage(page, language, origin, seo);
  }

  console.log(`Built ${pages.length} pages for ${languages.length} languages in ${path.relative(root, outputDirectory)}.`);
}

try {
  build();
} catch (error) {
  console.error(`Site build failed: ${error.message}`);
  process.exitCode = 1;
}
