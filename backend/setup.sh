#!/bin/bash

echo "================================================"
echo "  Barber Shop Queue - Setup Script"
echo "================================================"
echo ""

# Check if we're in the correct directory
if [ ! -f "pom.xml" ]; then
    echo "ERROR: Please run this script from the hairstylist directory!"
    echo "Current directory: $(pwd)"
    exit 1
fi

echo "[1/5] Checking Prerequisites..."
echo ""

# Check Java
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed or not in PATH"
    echo "Please install Java 17 or higher"
    exit 1
else
    echo "✓ Java found"
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js 18 or higher"
    exit 1
else
    echo "✓ Node.js found"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed"
    exit 1
else
    echo "✓ npm found"
fi

echo ""
echo "[2/5] Building Backend (Spring Boot)..."
echo ""

./mvnw clean install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend build failed"
    exit 1
fi

echo ""
echo "✓ Backend built successfully"
echo ""

echo "[3/5] Installing Frontend Dependencies..."
echo ""

cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend dependencies installation failed"
    cd ..
    exit 1
fi

echo ""
echo "✓ Frontend dependencies installed"
echo ""

cd ..

echo "[4/5] Setup Complete!"
echo ""
echo "================================================"
echo "  Next Steps:"
echo "================================================"
echo ""
echo "1. Start Backend (in this terminal):"
echo "   cd $(pwd)"
echo "   ./mvnw spring-boot:run"
echo ""
echo "2. Start Frontend (in a NEW terminal):"
echo "   cd $(pwd)/frontend"
echo "   npm run dev"
echo ""
echo "3. Open Browser:"
echo "   http://localhost:5173"
echo ""
echo "================================================"
echo "  Quick Commands:"
echo "================================================"
echo ""
echo "To run backend:  ./mvnw spring-boot:run"
echo "To run frontend: cd frontend && npm run dev"
echo "To seed data:    Open browser console and run: await seedDemoData()"
echo ""
echo "================================================"
echo "  Documentation:"
echo "================================================"
echo ""
echo "- QUICK_START.md      - Quick start guide"
echo "- TESTING_GUIDE.md    - Testing instructions"
echo "- PROJECT_STRUCTURE.md - Project overview"
echo "- TROUBLESHOOTING.md  - Fix common issues"
echo "- frontend/README.md  - Detailed documentation"
echo ""
