# Kechy: generates the missing AI page illustrations, then rebuilds the site.
# The OpenAI key is typed here, lives only in this window's memory and is never written to disk.
Set-Location $PSScriptRoot
$sec = Read-Host 'OpenAI API anahtarini yapistir ve Enter (ekranda gorunmez, kaydedilmez)' -AsSecureString
$env:OPENAI_API_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
try { python -X utf8 -u tools\gen_images.py all } finally { Remove-Item Env:OPENAI_API_KEY -ErrorAction SilentlyContinue }
python -X utf8 build.py
Write-Host ''
Write-Host 'Bitti! Claude sohbetine "resimler bitti" yazabilirsin.' -ForegroundColor Green
