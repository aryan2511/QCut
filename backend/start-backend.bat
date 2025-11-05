@echo off
echo ================================================
echo   Starting Barber Shop Queue - Backend
echo ================================================
echo.

REM Check if we're in the correct directory
if not exist "pom.xml" (
    echo ERROR: Please run this script from the hairstylist directory!
    pause
    exit /b 1
)

echo Starting Spring Boot backend on port 8080...
echo Press Ctrl+C to stop the server
echo.

call mvnw spring-boot:run
