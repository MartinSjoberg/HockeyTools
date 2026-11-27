$root = "d:\SoftwareProjects\HockeyTools"
# Read all English strings from HTML pages
$htmlStrings = Get-Content "d:\SoftwareProjects\HockeyTools\english_strings.txt" -Encoding UTF8
# Read all keys from app.js
$appKeys = Get-Content "d:\SoftwareProjects\HockeyTools\app_js_keys.txt" -Encoding UTF8

# Build a set of app.js keys for fast lookup
$keySet = @{}
foreach ($k in $appKeys) {
    $keySet[$k.Trim()] = $true
}

# Find strings that are NOT in app.js keys (missing translations)
$missing = @()
$found = @()
foreach ($s in $htmlStrings) {
    $s = $s.Trim()
    if ([string]::IsNullOrWhiteSpace($s)) { continue }
    # Skip short strings like "?", "01", "HT", "Yes", "No"
    if ($s.Length -lt 3 -or $s -match '^[?0-9.]+$') { continue }
    # Skip strings with numbers/special chars that are data
    if ($s -match '^\d' -and $s -match '[a-zA-Z]') { continue }
    if ($s -match '^\(?\d' ) { continue }
    if ($keySet.ContainsKey($s)) {
        $found += $s
    } else {
        $missing += $s
    }
}

Write-Output "=== MISSING TRANSLATIONS ($($missing.Count) strings) ==="
$missing | Sort-Object | ForEach-Object { "`t$_" }
Write-Output ""
Write-Output "=== Already translated ($($found.Count) strings) ==="
