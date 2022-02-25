
set NAME=%1
if "%NAME%"=="" (set NAME=devguide-dev)

ECHO "Cleaning up old container '%NAME%'..."
docker rm "%NAME%" --force 1>NUL 2>NUL

echo "Finished clean up"
