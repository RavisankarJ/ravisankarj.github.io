@echo off
set "HTML_FILE=index.html"

if not exist "%HTML_FILE%" (
  echo Error: %HTML_FILE% not found!
  exit /b 1
)

set "PORT=8055"


python --version 2>nul
if errorlevel 1 (
  python3 --version 2>nul
  if errorlevel 1 (
	echo Python or Python3 is not installed. Please install one of them.
  ) else (
    echo Using python3 to start the HTTP server
    start /b python3 -m http.server %PORT%
  )
) else (
  echo Using python to start the HTTP server
  start /b python -m http.server %PORT%
)


ping 127.0.0.1 -n 2 >nul 

start http://localhost:%PORT%/%HTML_FILE%

echo Press any key to continue . . .
