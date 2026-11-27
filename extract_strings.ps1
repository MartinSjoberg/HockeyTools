$root = "d:\SoftwareProjects\HockeyTools"
$htmlFiles = Get-ChildItem -Path $root -Recurse -Filter "*.html" | Sort-Object

$amp = [char]38
function Extract-Text($html) {
    $html = $html -replace "(?s)<script[^>]*>.*?</script>", ""
    $html = $html -replace "(?s)<style[^>]*>.*?</style>", ""
    $html = $html -replace "(?s)<head[^>]*>.*?</head>", ""
    $html = $html -replace "<[^>]+>", "`n"
    $html = $html -replace "&#38;", $amp
    $html = $html -replace "&amp;", $amp
    $html = $html -replace "&lt;", "<"
    $html = $html -replace "&gt;", ">"
    $html = $html -replace "&quot;", '"'
    $html = $html -replace "&nbsp;", " "
    $html = $html -replace "&#8594;", "?"
    $html = $html -replace "&#[0-9]+;", ""
    $lines = $html -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }
    return $lines
}

$allStrings = @{}
foreach ($file in $htmlFiles) {
    $html = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $texts = Extract-Text $html
    foreach ($t in $texts) {
        if ($t -and $t.Length -gt 0) {
            if (-not $allStrings.ContainsKey($t)) { $allStrings[$t] = @() }
            $allStrings[$t] += $file.Name
        }
    }
}

$result = $allStrings.Keys | Sort-Object
$result | Out-File "d:\SoftwareProjects\HockeyTools\english_strings.txt" -Encoding UTF8
Write-Output "Total: $($allStrings.Keys.Count)"
