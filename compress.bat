@echo off
del CocoonPackage.zip
"C:\Program Files\7-Zip\7z" a CocoonPackage.zip index.html assets scripts data
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage.zip assets/imagens assets/images *.map  *.db  *.mp3 *.wav *.xmp  *.tmp *.map *.bat -r
