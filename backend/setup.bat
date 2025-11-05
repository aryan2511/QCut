@echo off
echo ================================================
echo   Barber Shop Queue - Setup Script
echo ================================================
echo.

REM Check if we're in the correct directory
if not exist "pom.xml" (
    echo ERROR: Please run this script from the hairstylist directory!
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo [1/5] Checking Prerequisites...
echo.

REM Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
) else (
    echo ✓ Java found
)

REM Check Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18 or higher
    pause
    exit /b 1
) else (
    echo ✓ Node.js found
)

REM Check npm
npm -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed
    pause
    exit /b 1
) else (
    echo ✓ npm found
)

echo.
echo [2/5] Building Backend (Spring Boot)...
echo.

call mvnw clean install
if errorlevel 1 (
    echo ERROR: Backend build failed
    pause
    exit /b 1
)

echo.
echo ✓ Backend built successfully
echo.

echo [3/5] Installing Frontend Dependencies...
echo.

cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend dependencies installation failed
    cd ..
    pause
    exit /b 1
)

echo.
echo ✓ Frontend dependencies installed
echo.

cd ..

echo [4/5] Setup Complete!
echo.
echo ================================================
echo   Next Steps:
echo ================================================
echo.
echo 1. Start Backend (in this terminal):
echo    cd D:\your-style-buddy\hairstylist
echo    mvnw spring-boot:run
echo.
echo 2. Start Frontend (in a NEW terminal):
echo    cd D:\your-style-buddy\hairstylist\frontend
echo    npm run dev
echo.
echo 3. Open Browser:
echo    http://localhost:5173
echo.
echo ================================================
echo   Quick Commands:
echo ================================================
echo.
echo To run backend:  mvnw spring-boot:run
echo To run frontend: cd frontend ^&^& npm run dev
echo To seed data:    Open browser console and run: await seedDemoData()
echo.
echo ================================================
echo   Documentation:
echo ================================================
echo.
echo - QUICK_START.md      - Quick start guide
echo - TESTING_GUIDE.md    - Testing instructions
echo - PROJECT_STRUCTURE.md - Project overview
echo - TROUBLESHOOTING.md  - Fix common issues
echo - frontend/README.md  - Detailed documentation
echo.

pause
