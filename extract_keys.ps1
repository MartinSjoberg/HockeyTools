$appjs = [System.IO.File]::ReadAllText("d:\SoftwareProjects\HockeyTools\assets\app.js", [System.Text.Encoding]::UTF8)
# Extract string keys from the translation objects
# Match patterns like: "English text": (next char is opening of value)
# We look for key patterns: "text": "value" or "text": [...]
$keys = @{}
# Match all quoted strings followed by : (these are object keys)
$regex = '(?m)\s*"([^"]{1,200})"\s*:\s*'
$matches = [regex]::Matches($appjs, $regex)
foreach ($m in $matches) {
    $key = $m.Groups[1].Value
    if ($key -and $key.Length -gt 0 -and $key -notmatch '^[a-z]+$') {
        if (-not $keys.ContainsKey($key)) { $keys[$key] = $true }
    }
}
$result = $keys.Keys | Sort-Object
$result | Out-File "d:\SoftwareProjects\HockeyTools\app_js_keys.txt" -Encoding UTF8
Write-Output "Total keys: $($keys.Keys.Count)"
