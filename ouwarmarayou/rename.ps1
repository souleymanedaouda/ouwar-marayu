$files = Get-ChildItem -Path "src", "index.html" -Recurse -Include *.tsx,*.ts,*.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName
    if ($content -match 'Ouwar Marayu') {
        $content -replace 'Ouwar Marayu', 'Ouwar Marayou' | Set-Content $file.FullName
    }
}
$package = Get-Content package.json
$package -replace '"name": ".*"', '"name": "ouwar-marayou"' | Set-Content package.json
