
@echo off
del CocoonPackage.zip

"C:\Program Files\7-Zip\7z" a CocoonPackage2.zip index.html assets scripts data
timeout 1
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage2.zip assets/imagens assets/images *.map  *.db  *.mp3 *.wav *.xmp  *.tmp *.map *.bat -r
