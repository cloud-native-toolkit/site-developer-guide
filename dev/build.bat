
set IMAGE=%1
if "%IMAGE%"=="" (set IMAGE=devguide-dev)

set SCRIPT_DIR=%~dp0
set ROOT_DIR="%SCRIPT_DIR%.."

docker build -t %IMAGE% -f %SCRIPT_DIR%Dockerfile %ROOT_DIR%
