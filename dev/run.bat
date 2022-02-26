
set NAME=%1
if "%NAME%"=="" (set NAME=devguide-dev)

set PORT=%2
if "%PORT%"=="" (set PORT=8000)

set IMAGE=%3
if "%IMAGE%"=="" (set IMAGE=devguide-dev)

docker run --name %NAME% -d -p %PORT%:%PORT% -v "%cd%:/site" %IMAGE%
echo "Dev environment running with live reloading enabled. Open http://localhost:%PORT% to see the site"
echo "For live logs run:"
echo "docker logs -f %NAME%"
