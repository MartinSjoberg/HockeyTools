#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const rawOrigin = (process.env.SITE_ORIGIN || "").trim();
if (!rawOrigin) {
  console.error("Set SITE_ORIGIN to the HTTPS website origin.");
  process.exit(1);
}
if (!/^https:\/\//i.test(rawOrigin)) {
  console.error("SITE_ORIGIN must start with https://");
  process.exit(1);
}
const siteOrigin = rawOrigin.replace(/\/+$/, "");

const root = __dirname;
const outDir = path.join(root, "site-output");
const SKIP = new Set([".git", "node_modules", "site-output", ".github"]);

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

function copy(src, dest) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copy(from, to);
    } else if (/\.(html|css|js|json|svg|png|jpg|jpeg|webp|ico|txt|xml|woff2?)$/i.test(entry.name)) {
      let content = fs.readFileSync(from);
      if (/\.(html|css|js|json|xml|txt)$/i.test(entry.name)) {
        content = Buffer.from(
          content.toString("utf8").replace(/\{\{\s*SITE_ORIGIN\s*\}\}/g, siteOrigin)
        );
      }
      fs.writeFileSync(to, content);
    }
  }
}

copy(root, outDir);
console.log(`Built site-output from ${siteOrigin}`);
