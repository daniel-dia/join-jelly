@echo off
SET PATH=%PATH%;C:\Users\artsj_000\Documents\Trabalhos\Games\Tools\pngquant

setlocal enabledelayedexpansion
call:copyAndResize images images_1x 100%%%% 
call:copyAndResize images images_0.5x 50%%%% 
call:copyAndResize images images_0.25x 25%%%% 

echo DONE
PAUSE

goto:eof

:copyAndResize
echo. ---------- Resising "%~1" to "%~2"  at "%~3" ---------- 
for /f %%a in ('xcopy "%~1"  "%~2" /L /D /S /Y') do @(
	if exist "%%a" (
		echo. %%a 
		xcopy "%%a" "%~2" /D /Y /Q > nul
		convert %~2/%%~nxa -resize %~3 %~2/%%~nxa 
		pngquant --force --quality=35-85 %~2/%%~nxa --ext .png

	)
)
goto:eof

