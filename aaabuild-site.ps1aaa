param(
  [Parameter(Mandatory = $true)]
  [string]$SiteOrigin,
  [string]$OutputDirectory = (Join-Path $PSScriptRoot 'site-output')
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$output = if ([System.IO.Path]::IsPathRooted($OutputDirectory)) { $OutputDirectory } else { Join-Path $root $OutputDirectory }
$originUri = $null
if (-not [Uri]::TryCreate($SiteOrigin, [UriKind]::Absolute, [ref]$originUri) -or $originUri.Scheme -ne 'https' -or $originUri.AbsolutePath -ne '/') {
  throw 'SiteOrigin must be an HTTPS origin only, for example https://www.example.com'
}
$origin = $originUri.GetLeftPart([UriPartial]::Authority).TrimEnd('/')
$seo = Get-Content -LiteralPath (Join-Path $root 'assets\localized-seo.json') -Raw | ConvertFrom-Json
$languages = @('en', 'sv', 'no', 'da', 'fi', 'de', 'fr')

$pages = @(
  [pscustomobject]@{ Slug = ''; Source = Join-Path $root 'index.html'; Category = 'home'; Key = 'index' }
)
Get-ChildItem -LiteralPath $root -Directory |
  Where-Object { $_.Name -notin @('node_modules', 'site-output', '.git') -and (Test-Path -LiteralPath (Join-Path $_.FullName 'index.html') -PathType Leaf) } |
  Sort-Object Name |
  ForEach-Object {
    $source = Join-Path $_.FullName 'index.html'
    $html = Get-Content -LiteralPath $source -Raw
    $categoryMatch = [regex]::Match($html, '<body[^>]*data-page="([^"]+)"')
    $category = if ($categoryMatch.Success) { $categoryMatch.Groups[1].Value } else { 'home' }
    $pages += [pscustomobject]@{ Slug = $_.Name; Source = $source; Category = $category; Key = $_.Name }
  }

function Get-PageUrl([string]$Language, [string]$Slug) {
  if ($Language -eq 'en') {
    if ([string]::IsNullOrEmpty($Slug)) { return "$origin/" }
    return "$origin/$Slug/"
  }
  if ([string]::IsNullOrEmpty($Slug)) { return "$origin/$Language/" }
  return "$origin/$Language/$Slug/"
}

function Write-LocalizedPage($Page, [string]$Language) {
  $languageData = $seo.languages.$Language
  $metaKey = if ($Page.Category -eq 'home') { 'home' } else { $Page.Category }
  $title = $languageData.titles.($Page.Key)
  if (-not $title) {
    throw "Missing localized title for page '$($Page.Key)' and language '$Language'."
  }
  $description = $languageData.$metaKey.description
  if (-not $description) {
    throw "Missing localized description for page category '$metaKey' and language '$Language'."
  }

  $pageUrl = Get-PageUrl $Language $Page.Slug
  $safeTitle = [System.Net.WebUtility]::HtmlEncode($title)
  $safeDescription = [System.Net.WebUtility]::HtmlEncode($description)
  $html = Get-Content -LiteralPath $Page.Source -Raw
  $languagePattern = [regex]::Escape($Language)
  $html = [regex]::Replace($html, '(?s)<section\b(?=[^>]*\bdata-profile-locale="(?!' + $languagePattern + ')[a-z]{2}"[^>]*)[^>]*>.*?</section>', '')
  $html = [regex]::Replace($html, '(<section\b(?=[^>]*\bdata-profile-locale="' + $languagePattern + '")[^>]*)\shidden(?=[ >])', '$1')
  $html = [regex]::Replace($html, '<html lang="[^"]*"', "<html lang=`"$($languageData.htmlLang)`" data-localized-routing=`"true`"")
  $html = [regex]::Replace($html, '<title>.*?</title>', "<title>$safeTitle</title>", [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $html = [regex]::Replace($html, '<meta name="description" content="[^"]*">', "<meta name=`"description`" content=`"$safeDescription`">")
  $html = [regex]::Replace($html, '<link rel="canonical" href="[^"]*">', "<link rel=`"canonical`" href=`"$pageUrl`">")
  $html = [regex]::Replace($html, '<body(?=[ >])', '<body data-localized-seo="true"')

  $hreflang = foreach ($alternateLanguage in $languages) {
    $alternateUrl = Get-PageUrl $alternateLanguage $Page.Slug
    "  <link rel=`"alternate`" hreflang=`"$alternateLanguage`" href=`"$alternateUrl`">"
  }
  $hreflang += "  <link rel=`"alternate`" hreflang=`"x-default`" href=`"$(Get-PageUrl 'en' $Page.Slug)`">"
  $metaTags = @(
    "  <meta property=`"og:type`" content=`"website`">",
    "  <meta property=`"og:site_name`" content=`"Hockey Tools`">",
    "  <meta property=`"og:title`" content=`"$safeTitle`">",
    "  <meta property=`"og:description`" content=`"$safeDescription`">",
    "  <meta property=`"og:url`" content=`"$pageUrl`">",
    "  <meta property=`"og:locale`" content=`"$($languageData.ogLocale)`">",
    "  <meta name=`"twitter:card`" content=`"summary`">",
    "  <meta name=`"twitter:title`" content=`"$safeTitle`">",
    "  <meta name=`"twitter:description`" content=`"$safeDescription`">"
  )
  $html = $html.Replace('</head>', (($hreflang + $metaTags) -join "`r`n") + "`r`n</head>")

  $webPageSchema = @{
    '@context' = 'https://schema.org'
    '@type' = 'WebPage'
    name = $title
    description = $description
    inLanguage = $languageData.htmlLang
    url = $pageUrl
  } | ConvertTo-Json -Compress
  $safeSchema = $webPageSchema.Replace('<', '\u003c')
  $html = [regex]::Replace($html, '<script type="application/ld\+json">.*?</script>', '', [System.Text.RegularExpressions.RegexOptions]::Singleline)
  $html = $html.Replace('</head>', "<script type=`"application/ld+json`">$safeSchema</script>`r`n</head>")

  $directory = if ($Language -eq 'en') {
    if ([string]::IsNullOrEmpty($Page.Slug)) { $output } else { Join-Path $output $Page.Slug }
  } else {
    $languageRoot = Join-Path $output $Language
    if ([string]::IsNullOrEmpty($Page.Slug)) { $languageRoot } else { Join-Path $languageRoot $Page.Slug }
  }
  New-Item -ItemType Directory -Path $directory -Force | Out-Null
  Set-Content -LiteralPath (Join-Path $directory 'index.html') -Value $html -Encoding utf8
}

foreach ($assetPath in @('assets\app.js', 'assets\styles.css')) {
  $destination = Join-Path $output $assetPath
  New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
  Copy-Item -LiteralPath (Join-Path $root $assetPath) -Destination $destination -Force
}

foreach ($staticFile in @('404.html', 'robots.txt', 'sitemap.xml')) {
  Copy-Item -LiteralPath (Join-Path $root $staticFile) -Destination (Join-Path $output $staticFile) -Force
}

foreach ($language in $languages) {
  if ($language -ne 'en') {
    $languageAssets = Join-Path $output "$language\assets"
    New-Item -ItemType Directory -Path $languageAssets -Force | Out-Null
    Copy-Item -LiteralPath (Join-Path $root 'assets\app.js') -Destination (Join-Path $languageAssets 'app.js') -Force
    Copy-Item -LiteralPath (Join-Path $root 'assets\styles.css') -Destination (Join-Path $languageAssets 'styles.css') -Force
  }
  foreach ($page in $pages) {
    Write-LocalizedPage $page $language
  }
}

Write-Output "Built $($pages.Count) pages for $($languages.Count) languages in '$output'."
Write-Output "Deploy the contents of '$output' as the website root."
