@echo off
echo ================================================
echo   Starting Barber Shop Queue - Frontend
echo ================================================
echo.

REM Check if frontend directory exists
if not exist "frontend" (
    echo ERROR: frontend directory not found!
    echo Please run setup.bat first
    pause
    exit /b 1
)

cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        cd ..
        pause
        exit /b 1
    )
)

echo Starting React frontend on port 5173...
echo Press Ctrl+C to stop the server
echo.
echo Backend must be running on port 8080
echo Open http://localhost:5173 in your browser
echo.

call npm run dev
