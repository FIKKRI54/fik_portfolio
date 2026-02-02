# Image Conversion Script for WebP
# This script converts all JPG sequence images to WebP format for better compression
# Requires: npm install -g sharp-cli (or use this with Node.js sharp package)

Write-Host "=== Image Sequence Optimizer ===" -ForegroundColor Cyan
Write-Host "Converting JPG images to WebP format..." -ForegroundColor Yellow

$sourceDir = "public\sequence"
$outputDir = "public\sequence-webp"

# Create output directory if it doesn't exist
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    Write-Host "Created output directory: $outputDir" -ForegroundColor Green
}

# Check if sharp is available via npx
$sharpAvailable = $false
try {
    $null = npx sharp-cli --version 2>$null
    $sharpAvailable = $true
} catch {
    $sharpAvailable = $false
}

if ($sharpAvailable) {
    Write-Host "Using Sharp for conversion (high quality)..." -ForegroundColor Green
    
    $files = Get-ChildItem -Path $sourceDir -Filter "*.jpg"
    $total = $files.Count
    $current = 0
    
    foreach ($file in $files) {
        $current++
        $outputName = $file.BaseName + ".webp"
        $outputPath = Join-Path $outputDir $outputName
        
        npx sharp-cli -i $file.FullName -o $outputPath --quality 75 2>$null
        
        $percent = [math]::Round(($current / $total) * 100)
        Write-Progress -Activity "Converting images" -Status "$current of $total ($percent%)" -PercentComplete $percent
    }
    
    Write-Host "`nConversion complete!" -ForegroundColor Green
} else {
    Write-Host "Sharp CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g sharp-cli
    
    Write-Host "Please run this script again after installation." -ForegroundColor Cyan
    exit 1
}

# Calculate size savings
$originalSize = (Get-ChildItem -Path $sourceDir -Filter "*.jpg" | Measure-Object -Property Length -Sum).Sum
$newSize = (Get-ChildItem -Path $outputDir -Filter "*.webp" | Measure-Object -Property Length -Sum).Sum

$originalMB = [math]::Round($originalSize / 1MB, 2)
$newMB = [math]::Round($newSize / 1MB, 2)
$savedMB = [math]::Round(($originalSize - $newSize) / 1MB, 2)
$savedPercent = [math]::Round((1 - ($newSize / $originalSize)) * 100, 1)

Write-Host "`n=== Results ===" -ForegroundColor Cyan
Write-Host "Original size: $originalMB MB" -ForegroundColor White
Write-Host "New size: $newMB MB" -ForegroundColor White
Write-Host "Saved: $savedMB MB ($savedPercent%)" -ForegroundColor Green

Write-Host "`n=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Copy WebP files to replace JPGs: Copy-Item $outputDir\* $sourceDir\" -ForegroundColor Yellow
Write-Host "2. Or update SequenceScroll.tsx to use the new path" -ForegroundColor Yellow
