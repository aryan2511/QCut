# 🔧 Troubleshooting Guide

## Common Issues & Solutions

---

## 🔴 Backend Issues

### Issue: "Port 8080 already in use"

**Symptoms:**
```
Web server failed to start. Port 8080 was already in use.
```

**Solutions:**

**Option 1: Kill the process using port 8080**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

**Option 2: Change the port**
Edit `application.properties`:
```properties
server.port=8081
```
Then update `frontend/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8081',  // Changed
    changeOrigin: true,
  }
}
```

---

### Issue: "MongoDB connection failed"

**Symptoms:**
```
com.mongodb.MongoTimeoutException: Timed out after 30000 ms
```

**Solutions:**

1. **Check Internet Connection:**
   - MongoDB Atlas requires internet
   - Test: ping google.com

2. **Verify Connection String:**
   - Check `application.properties`
   - Ensure no extra spaces or typos

3. **Check MongoDB Atlas:**
   - Login to MongoDB Atlas
   - Verify cluster is running
   - Check IP whitelist (allow 0.0.0.0/0 for development)

4. **Firewall/VPN:**
   - Disable VPN temporarily
   - Check firewall settings
   - Some corporate networks block MongoDB ports

**Test Connection:**
```bash
# Try to connect using MongoDB Compass or mongo shell
mongodb+srv://hairstylist:5vg57mrTsYcG6SHq@the-stylist-q.8vdqaff.mongodb.net/
```

---

### Issue: "No such method error" or "Cannot find symbol"

**Symptoms:**
```
java.lang.NoSuchMethodError: ...
or
error: cannot find symbol
```

**Solutions:**

1. **Clean and rebuild:**
```bash
mvnw clean install -U
```

2. **Delete target folder:**
```bash
# Windows
rmdir /s /q target

# Mac/Linux
rm -rf target

# Then rebuild
mvnw clean install
```

3. **Check Java version:**
```bash
java -version
# Should be Java 17 or higher
```

4. **Update Maven wrapper:**
```bash
mvnw wrapper:wrapper --maven-version=3.9.5
```

---

### Issue: CORS errors

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**

1. **Verify @CrossOrigin in controllers:**
```java
@CrossOrigin(origins = "*")  // Should be present
@RestController
@RequestMapping("/api/barbers")
public class BarberController { ... }
```

2. **Check if backend is running:**
   - Open `http://localhost:8080/api/barbers` in browser
   - Should see JSON response (not error page)

3. **Try without proxy:**
   - Change `api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```

---

## 🔵 Frontend Issues

### Issue: "Cannot find module" or dependency errors

**Symptoms:**
```
Error: Cannot find module 'react'
or
Module not found: Can't resolve 'axios'
```

**Solutions:**

1. **Install dependencies:**
```bash
npm install
```

2. **Clear cache and reinstall:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

3. **Check Node.js version:**
```bash
node -v
# Should be v18 or higher

npm -v
# Should be v9 or higher
```

4. **Use specific versions:**
```bash
npm install react@18.3.1 react-dom@18.3.1
```

---

### Issue: Blank white screen

**Symptoms:**
- Browser shows blank page
- No visible content

**Solutions:**

1. **Check browser console (F12):**
   - Look for red errors
   - Note any failed network requests

2. **Common errors:**

**"Failed to fetch" errors:**
```javascript
// Make sure backend is running on port 8080
// Test: http://localhost:8080/api/barbers
```

**"Unexpected token" errors:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**"Cannot read property of undefined":**
```javascript
// Check if API responses have expected structure
// Add error handling in useEffect
```

3. **Hard refresh:**
   - Chrome: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - This clears cached JS files

4. **Check network tab:**
   - F12 → Network tab
   - Refresh page
   - Look for failed requests (red)

---

### Issue: "Port 5173 already in use"

**Symptoms:**
```
Port 5173 is in use, trying another one...
or
EADDRINUSE: address already in use
```

**Solutions:**

**Option 1: Kill existing Vite process**
```bash
# Find and kill
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

**Option 2: Use different port**
Edit `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000,  // Changed from 5173
  }
})
```

---

### Issue: Tailwind styles not working

**Symptoms:**
- Page looks unstyled
- No colors, spacing, or layout

**Solutions:**

1. **Check index.css imports:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. **Verify tailwind.config.js:**
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",  // Include all React files
],
```

3. **Restart dev server:**
```bash
# Stop (Ctrl+C)
# Start again
npm run dev
```

4. **Rebuild PostCSS:**
```bash
npm install -D tailwindcss postcss autoprefixer
```

---

### Issue: React Router not working

**Symptoms:**
- 404 on dashboard route
- Routes don't change

**Solutions:**

1. **Check BrowserRouter:**
```javascript
// App.jsx should have:
import { BrowserRouter as Router } from 'react-router-dom';

<Router>
  <Routes>
    ...
  </Routes>
</Router>
```

2. **Use correct Link component:**
```javascript
// Use this:
import { Link } from 'react-router-dom';
<Link to="/dashboard">Dashboard</Link>

// Not this:
<a href="/dashboard">Dashboard</a>  // ❌ Wrong
```

3. **Check exact paths:**
```javascript
<Route path="/" element={<CustomerPage />} />
<Route path="/dashboard" element={<DashboardPage />} />
// Paths must match exactly
```

---

## 🟡 API Integration Issues

### Issue: API calls returning empty data

**Symptoms:**
- Queue shows empty
- Barbers list is empty
- But data exists in database

**Solutions:**

1. **Check API response in Network tab:**
   - F12 → Network
   - Refresh page
   - Click on API call
   - Check "Response" tab
   - Should see actual data

2. **Verify data structure:**
```javascript
// Make sure response.data is accessed correctly
const response = await barberAPI.getAllBarbers();
console.log('Response:', response.data);  // Log to see structure
setBarbers(response.data);  // Use correct path
```

3. **Check for errors in console:**
```javascript
try {
  const response = await barberAPI.getAllBarbers();
  setBarbers(response.data);
} catch (error) {
  console.error('Error fetching barbers:', error);
  // Add this to see actual error
}
```

---

### Issue: "Queue stats showing 0 but customers exist"

**Symptoms:**
- Customers visible in queue
- Stats card shows 0

**Solutions:**

1. **Check customer status:**
   - Only `WAITING` status counts
   - `IN_PROGRESS` or `DONE` don't count

2. **Verify stats endpoint:**
```bash
# Test directly
curl http://localhost:8080/api/queue/stats

# Should return:
{"queueSize": 3, "estimatedWaitTime": 25}
```

3. **Check fetchData function:**
```javascript
const fetchData = async () => {
  try {
    const [queueRes, statsRes] = await Promise.all([
      queueAPI.getAllQueueEntries(),
      queueAPI.getQueueStats(),
    ]);
    console.log('Stats:', statsRes.data);  // Debug log
    setStats(statsRes.data);
  } catch (error) {
    console.error(error);
  }
};
```

---

### Issue: Auto-refresh not working

**Symptoms:**
- Page doesn't update automatically
- Need manual refresh

**Solutions:**

1. **Check useEffect cleanup:**
```javascript
useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 5000);
  return () => clearInterval(interval);  // Important!
}, []);  // Empty deps array
```

2. **Verify interval is running:**
```javascript
useEffect(() => {
  console.log('Setting up interval');  // Should log once
  const interval = setInterval(() => {
    console.log('Fetching data...');  // Should log every 5s
    fetchData();
  }, 5000);
  return () => clearInterval(interval);
}, []);
```

3. **Check browser tab:**
   - Some browsers pause timers on inactive tabs
   - Keep tab active to see updates

---

## 🟢 General Issues

### Issue: Changes not reflecting

**Symptoms:**
- Made code changes but don't see them

**Solutions:**

1. **Frontend changes:**
   - Vite has hot reload
   - Save file and check if page updated
   - If not, restart dev server

2. **Backend changes:**
   - Spring Boot needs restart
   - Stop (Ctrl+C) and run again: `mvnw spring-boot:run`

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R
   - Or open in Incognito mode

4. **Check file path:**
   - Make sure you're editing the right file
   - Check `frontend/src/...` not just `src/...`

---

### Issue: Database not persisting data

**Symptoms:**
- Add data but it disappears after restart

**Solutions:**

1. **Check MongoDB connection:**
   - Login to MongoDB Atlas
   - Go to Browse Collections
   - Verify `the-stylist-q` database exists

2. **Check collection names:**
   - Should have `barbers` and `queue_entries`

3. **Repository methods:**
```java
// Should use save() not insert()
barberRepository.save(barber);  // ✅ Upsert
```

---

### Issue: Demo data seeder not working

**Symptoms:**
- `seedDemoData()` not found or errors

**Solutions:**

1. **Check console:**
```javascript
// Type this in browser console
window.seedDemoData

// Should show function
// If undefined, check import in main.jsx
```

2. **Verify import:**
```javascript
// main.jsx
import './utils/demoDataSeeder';  // Must be imported
```

3. **Check for errors:**
```javascript
// Use await
await seedDemoData()

// Not just:
seedDemoData()  // ❌ Won't work properly
```

---

## 🆘 Emergency Debug Mode

If nothing works, try this systematic approach:

### 1. Verify Backend is Running
```bash
curl http://localhost:8080/api/barbers
# Should return: [] or data, not error
```

### 2. Verify Frontend is Running
```bash
# Should see: Local: http://localhost:5173
# Browser should load page (even if broken)
```

### 3. Check Network Tab
- F12 → Network
- Refresh page
- Look for:
  - ✅ Status 200 (success)
  - ❌ Status 404 (not found)
  - ❌ Status 500 (server error)
  - ❌ Status 0 (no connection)

### 4. Check Console Errors
- F12 → Console
- Red errors = problems
- Yellow warnings = usually ok

### 5. Test API Directly
```bash
# Test backend without frontend
curl -X POST http://localhost:8080/api/barbers \
  -H "Content-Type: application/json" \
  -d '{"barberName":"Test","barberPhone":"555-0000","barberChairNo":1}'

# Should return: Created barber JSON
```

### 6. Clean Slate
```bash
# Backend
mvnw clean
mvnw install

# Frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📞 Getting Help

If still stuck:

1. **Check error message:**
   - Copy full error text
   - Google it
   - Search Stack Overflow

2. **Minimal reproducible example:**
   - Isolate the problem
   - Test one thing at a time

3. **Documentation:**
   - Spring Boot: https://spring.io/projects/spring-boot
   - React: https://react.dev
   - Vite: https://vitejs.dev

4. **Community:**
   - Stack Overflow
   - Reddit: r/springboot, r/reactjs
   - Discord servers

---

## 📋 Debugging Checklist

- [ ] Backend running on port 8080
- [ ] Frontend running on port 5173
- [ ] MongoDB connection working
- [ ] No CORS errors in console
- [ ] Network tab shows successful API calls
- [ ] No red errors in browser console
- [ ] No errors in backend terminal
- [ ] Both servers restarted after changes
- [ ] Browser cache cleared
- [ ] Correct file being edited

---

**Remember:** Most issues are simple configuration problems. Check the basics first! 🔍

**Still stuck?** Create a new issue on GitHub with:
- Error message
- Steps to reproduce
- Your environment (OS, Node version, Java version)
- Screenshots if helpful
