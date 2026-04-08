$files = Get-ChildItem -Path "src", "index.html" -Recurse -Include *.tsx,*.ts,*.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName
    if ($content -match 'Ouwar Marayou') {
        $content -replace 'Ouwar Marayou', 'Ouwar Marayu' | Set-Content $file.FullName
    }
}
