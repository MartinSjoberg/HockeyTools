# Translation and localization workflow

## Supported languages

The source content is English. Supported target languages are:

- Swedish (`sv`)
- Norwegian (`no`)
- Danish (`da`)
- Finnish (`fi`)
- German (`de`)
- French (`fr`)

Every visible source page must include all seven language options, with English as the default.

## Content workflow

1. Update English source content first.
2. Add the complete translated text in the source page or translation table.
3. Do not add word-for-word fallbacks or generic placeholder words.
4. Keep hockey terminology coherent and verify manufacturer or profile names against official sources.
5. Keep beginner, advanced and professional guidance in one article where relevant.
6. Update FAQ questions and answers in every supported language at the same time.
7. Update title, description, Open Graph locale and hreflang metadata through `assets/localized-seo.json`; `build-site.js` generates the localized output.

## Internal linking

- English pages link to English routes.
- Built localized pages use relative links that remain in the current language route.
- Never link an English article from a localized page unless that page intentionally has no translation.
- Verify forward and back links between calculators and guides after build.

## Terminology

Use established hockey terms and avoid machine translation artifacts. Preserve technical terms only when the target language uses them consistently. Verify Swedish terms such as `skridskosliparen`, `skålradie`, `klubbflex`, `framhållning`, `målvakt` and `kick point` before publication.

## SEO requirements

Each built page must contain:

- A complete `<title>`
- A complete localized meta description
- One HTTPS canonical URL
- One hreflang entry for all supported languages
- An `x-default` entry pointing to English
- `og:locale`
- Localized WebPage JSON-LD

## Quality control

Run:

```powershell
npm test
$env:SITE_ORIGIN='https://www.example.com'
npm run build
npm test
```

## Cloudflare Workers Static Assets

The Wrangler configuration targets Workers Static Assets, not Cloudflare Pages:

- Build command: `npm run build`
- Static assets directory: `site-output` (configured in `wrangler.jsonc`)
- Set `SITE_ORIGIN` to the canonical HTTPS origin before building.
- Use Node.js 22; `.nvmrc` selects it and `package.json` requires Node.js 20 or newer.

The build is platform-independent Node.js and does not require PowerShell. Install dependencies with `npm ci` in CI before running the build.

Before publication, manually verify:

- All seven language selectors change both text and page language.
- No English text remains in localized articles except intentionally documented names or external references.
- FAQ questions and answers match in meaning and structure.
- Titles and descriptions are natural in the target language.
- Internal links stay in the selected language.
- Brand names, profile names and product names are current and correctly capitalized.
- Pro shop and manufacturer claims are clearly separated from site heuristics.
