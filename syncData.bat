@ECHO OFF
cls

FOR /F "TOKENS=1* DELIMS= " %%A IN ('DATE/T') DO SET CDATE=%%B
FOR /F "TOKENS=1,2 eol=/ DELIMS=/ " %%A IN ('DATE/T') DO SET mm=%%B
FOR /F "TOKENS=1,2 DELIMS=/ eol=/" %%A IN ('echo %CDATE%') DO SET dd=%%B
FOR /F "TOKENS=2,3 DELIMS=/ " %%A IN ('echo %CDATE%') DO SET yyyy=%%B
SET date=%yyyy%%mm%%dd%
set result=data/result.json.%yyyy%%mm%%dd%.js
echo syncing data to %result% ...
"%JAVA_HOME%\bin\java" -Xmx250m -jar lib/webharvest_all_2.jar plugins=be.pollepel30.SchoolOnlineBeMasterHash config=lib/schoolOnlineBe.xml loglevel=error workdir=. #output=%result%

if exist data\result.json.%yyyy%%mm%%dd%.js (
    copy /Y data\result.json.%yyyy%%mm%%dd%.js  data\result.json.js
    echo sync done.. opening results in browser
) else (
    goto syncerror
)

start firefox SchoolOnlineSummary.html

goto end

:syncerror
echo Error during syncing for schoolonline.be data using webharvest script

goto end

:jreerror
echo Could not locate a java runtime environement. Please install using http://java.com/en/download/index.jsp
goto end

:end
