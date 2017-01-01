::delete old
del  "..\Plataform\windows\JoinJelly\index.html" /y /s
del  "..\Plataform\windows\JoinJelly\assets"  /s /f /q
del  "..\Plataform\windows\JoinJelly\scripts"  /s /f /q
del  "..\Plataform\windows\JoinJelly\data"  /s /f /q
del  "..\Plataform\windows\JoinJelly\style"  /s /f /q

SET target="..\Plataform\windows\JoinJelly\"

::copy all
xcopy index.html %target% /y /s 
xcopy assets %target%\assets /y /s /i 
xcopy scripts %target%\scripts /y /s /i 
xcopy data %target%\data /y /s  /i 
xcopy style %target%\style /y /s /i 
xcopy Windows %target%\Windows /y /s /i 

::remove unused
del "..\Plataform\windows\JoinJelly\assets\sound\*.ogg" /s /f /q
del "..\Plataform\windows\JoinJelly\assets\images\*" /s /f /q
