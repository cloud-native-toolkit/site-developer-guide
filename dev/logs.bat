
set NAME=%1
if "%NAME%"=="" (set NAME=devguide-dev)

docker logs -f %NAME%
