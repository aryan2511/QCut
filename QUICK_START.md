# 🚀 Quick Start Guide

## Step-by-Step Setup

### 1️⃣ Start the Backend (Spring Boot)

Open a terminal and run:

```bash
# Navigate to project root
cd D:\your-style-buddy\hairstylist

# Run Spring Boot application
mvnw spring-boot:run
```

✅ Backend should start on: `http://localhost:8080`

**Wait for the message:** `Started HairstylistApplication in X seconds`

---

### 2️⃣ Start the Frontend (React)

Open a **NEW terminal** and run:

```bash
# Navigate to frontend folder
cd D:\your-style-buddy\hairstylist\frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

✅ Frontend should start on: `http://localhost:5173`

---

### 3️⃣ Open Your Browser

Visit: **http://localhost:5173**

You should see the Barber Shop Queue homepage!

---

## 🎯 Testing the Application

### Test Customer Flow:
1. Go to `http://localhost:5173`
2. Click **"Join Queue"**
3. Enter a name (e.g., "John Doe")
4. Select service type (e.g., "Haircut")
5. Click **"Join Queue"** button
6. You should see the customer in the queue list!

### Test Dashboard Flow:
1. Click **"Dashboard"** in the navigation
2. Click **"Add Barber"**
3. Fill in barber details:
   - Name: "Mike Smith"
   - Phone: "123-456-7890"
   - Chair Number: 1
4. Click **"Add"**
5. You should see the barber card appear!
6. Click **"Call Next"** on the available barber
7. The customer should move from queue to "In Progress"
8. Click **"Complete"** to finish the service

---

## 🔍 What to Check

### ✅ Backend is Running:
- Open `http://localhost:8080/api/barbers` in browser
- Should see `[]` or barber data (JSON format)

### ✅ Frontend is Running:
- Open `http://localhost:5173`
- Should see the homepage with "Welcome to Our Barber Shop"

### ✅ Connection Works:
- Add a barber in dashboard
- Refresh the page
- Barber should still be there (saved to MongoDB)

---

## ⚠️ Common Issues & Fixes

### Issue: Port 8080 already in use
**Solution:** 
- Stop any other Java applications
- Or change port in `application.properties`:
  ```properties
  server.port=8081
  ```
  Then update `vite.config.js` proxy target to `http://localhost:8081`

### Issue: Port 5173 already in use
**Solution:**
- Close other Vite/React apps
- Or edit `vite.config.js` to use different port:
  ```javascript
  server: {
    port: 3000
  }
  ```

### Issue: "Cannot GET /api/barbers"
**Solution:**
- Make sure backend is running
- Check backend console for errors
- Verify MongoDB connection

### Issue: Frontend shows blank page
**Solution:**
- Open browser console (F12)
- Check for errors
- Run `npm install` again
- Clear browser cache

---

## 📱 URLs to Remember

| Page | URL | Purpose |
|------|-----|---------|
| Customer View | http://localhost:5173 | Join queue, view status |
| Dashboard | http://localhost:5173/dashboard | Manage barbers & queue |
| Backend API | http://localhost:8080/api | REST API endpoints |

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Backend shows: `Started HairstylistApplication`
2. ✅ Frontend shows: `Local: http://localhost:5173`
3. ✅ Browser displays the homepage without errors
4. ✅ You can add a barber and see it saved
5. ✅ You can join queue and see position updates

---

## 🛠️ Development Workflow

### Making Changes:

**Frontend Changes:**
- Edit files in `frontend/src/`
- Changes hot-reload automatically
- No need to restart server

**Backend Changes:**
- Edit files in `src/main/java/`
- Stop backend (Ctrl+C)
- Restart: `mvnw spring-boot:run`

---

## 📞 Need Help?

1. Check the full README.md for detailed information
2. Check browser console (F12) for frontend errors
3. Check terminal for backend errors
4. Verify both servers are running
5. Test API directly: `http://localhost:8080/api/barbers`

---

**Happy Coding! 🎨✨**

Remember: Keep both terminals running while developing!
