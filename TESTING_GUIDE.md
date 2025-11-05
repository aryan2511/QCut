# 🧪 Testing Guide

## Quick Demo Data Setup

### Using Browser Console (Easiest)

1. Start both backend and frontend
2. Open the app in browser: `http://localhost:5173`
3. Open browser console: `F12` → Console tab
4. Run this command:
```javascript
await seedDemoData()
```

This will create:
- 3 demo barbers
- 5 demo customers in queue

### Clear All Data
```javascript
await clearAllData()
```

---

## 📋 Manual Testing Scenarios

### Scenario 1: Basic Customer Flow
**Goal:** Customer joins queue and gets served

1. **Join Queue:**
   - Go to homepage (`http://localhost:5173`)
   - Click "Join Queue"
   - Enter name: "Test Customer"
   - Select service: "Haircut"
   - Click "Join Queue"
   - ✅ Verify: Customer appears in queue with position #1

2. **View Queue:**
   - ✅ Verify: Queue size shows 1
   - ✅ Verify: Estimated wait time displays
   - ✅ Verify: "Next Up" badge appears on customer

3. **Add Barber:**
   - Go to Dashboard
   - Click "Add Barber"
   - Name: "Test Barber"
   - Phone: "555-1234"
   - Chair: 1
   - Click "Add"
   - ✅ Verify: Barber appears with "Available" status

4. **Call Customer:**
   - Click "Call Next" on available barber
   - ✅ Verify: Customer moves to "In Progress" section
   - ✅ Verify: Barber status changes to "Busy"
   - ✅ Verify: Queue size decreases to 0

5. **Complete Service:**
   - Click "Complete" on in-progress service
   - ✅ Verify: Barber status changes back to "Available"
   - ✅ Verify: Service removed from in-progress

---

### Scenario 2: Multiple Customers & Barbers
**Goal:** Test queue management with multiple entities

1. **Setup:**
   - Run `await seedDemoData()` in console
   - Or manually add 3 barbers and 5 customers

2. **Call Multiple Customers:**
   - Click "Call Next" on Barber 1
   - ✅ Verify: First customer (position 1) moves to in-progress
   - Click "Call Next" on Barber 2
   - ✅ Verify: Second customer (position 2) moves to in-progress
   - ✅ Verify: Remaining customers renumber (1, 2, 3)

3. **Complete Services:**
   - Complete service for Barber 1
   - ✅ Verify: Barber 1 becomes available
   - Click "Call Next" on Barber 1 again
   - ✅ Verify: Next customer is assigned

4. **Remove from Queue:**
   - Click trash icon on a waiting customer
   - Confirm deletion
   - ✅ Verify: Customer removed
   - ✅ Verify: Remaining customers renumber correctly

---

### Scenario 3: Real-time Updates
**Goal:** Verify auto-refresh functionality

1. **Open Two Browser Windows:**
   - Window 1: Customer view (`http://localhost:5173`)
   - Window 2: Dashboard (`http://localhost:5173/dashboard`)

2. **Test Auto-refresh:**
   - In Window 2: Add a new barber
   - Wait 3-5 seconds
   - ✅ Verify: Window 1 shows new barber in "Our Barbers" section

3. **Test Queue Sync:**
   - In Window 1: Join queue as customer
   - ✅ Verify: Window 2 shows new customer immediately (or within 3 seconds)
   - In Window 2: Call next customer
   - ✅ Verify: Window 1 updates queue positions

---

### Scenario 4: Edge Cases

#### No Barbers Available
1. Ensure all barbers are busy
2. Try to call next customer
3. ✅ Verify: Shows error/alert

#### Empty Queue
1. Remove all customers from queue
2. Try to call next customer
3. ✅ Verify: Shows "No customers in queue" message

#### No Barbers Exist
1. Delete all barbers
2. Join queue as customer
3. ✅ Verify: Customer can still join
4. ✅ Verify: Wait time shows 0 (no barbers to serve)

#### Edit Barber
1. Click edit icon on barber
2. Change name to "Updated Name"
3. Click "Update"
4. ✅ Verify: Name updates immediately
5. ✅ Verify: Status remains same

---

## 🎯 API Testing with Postman/cURL

### Get All Barbers
```bash
curl http://localhost:8080/api/barbers
```

### Create Barber
```bash
curl -X POST http://localhost:8080/api/barbers \
  -H "Content-Type: application/json" \
  -d '{
    "barberName": "API Test Barber",
    "barberPhone": "555-9999",
    "barberChairNo": 5
  }'
```

### Join Queue
```bash
curl -X POST http://localhost:8080/api/queue \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "API Test Customer",
    "serviceType": "Haircut"
  }'
```

### Get Queue Stats
```bash
curl http://localhost:8080/api/queue/stats
```

### Call Next Customer
```bash
# Replace {barberId} with actual barber ID
curl -X POST "http://localhost:8080/api/queue/call-next?barberId={barberId}"
```

---

## 📊 Performance Testing

### Load Testing Queue
Run this in browser console to add 20 customers:

```javascript
async function addMultipleCustomers(count) {
  for (let i = 1; i <= count; i++) {
    await window.seedDemoData.addToQueue({
      customerName: `Customer ${i}`,
      serviceType: 'Haircut'
    });
    console.log(`Added Customer ${i}`);
  }
}

// Add 20 customers
await addMultipleCustomers(20);
```

✅ **Verify:**
- All customers appear in order
- Queue positions are correct (1-20)
- Wait time calculates properly
- Page performance remains smooth

---

## 🐛 Common Issues to Test

### Issue: Barber Stuck in "Busy" State
**Test:**
1. Call next customer
2. Don't complete service
3. Refresh page
4. ✅ Verify: Barber still shows "Busy"
5. Complete the service
6. ✅ Verify: Barber becomes "Available"

### Issue: Queue Position Incorrect
**Test:**
1. Add 5 customers
2. Remove customer at position 3
3. ✅ Verify: Positions renumber (1,2,3,4)
4. Add new customer
5. ✅ Verify: New customer gets position 5

### Issue: Multiple Calls to Call Next
**Test:**
1. Have 1 customer in queue
2. Click "Call Next" rapidly 3 times
3. ✅ Verify: Only 1 customer assigned
4. ✅ Verify: No errors in console

---

## ✅ Testing Checklist

### Customer Page
- [ ] Queue displays correctly
- [ ] Stats cards show accurate numbers
- [ ] Join queue form works
- [ ] Form validation (required fields)
- [ ] Success message after joining
- [ ] "Next Up" badge on first customer
- [ ] Barbers list displays
- [ ] Auto-refresh works (every 5 seconds)
- [ ] Responsive on mobile

### Dashboard Page
- [ ] All barbers display
- [ ] Add barber form works
- [ ] Edit barber works
- [ ] Delete barber works (with confirmation)
- [ ] Call next customer works
- [ ] Complete service works
- [ ] Remove from queue works (with confirmation)
- [ ] "In Progress" section shows active services
- [ ] Stats cards accurate
- [ ] Auto-refresh works (every 3 seconds)
- [ ] Responsive on mobile

### Navigation
- [ ] Navbar displays on all pages
- [ ] Active page highlighted
- [ ] Links work correctly
- [ ] Logo/brand visible

### Error Handling
- [ ] Backend down: Shows error
- [ ] Network error: Shows error
- [ ] Invalid data: Shows validation
- [ ] Empty states: Shows friendly messages

---

## 🎓 Learning Points

While testing, observe:
1. **State Management:** How React updates UI when data changes
2. **API Integration:** How frontend calls backend endpoints
3. **Real-time Updates:** Polling mechanism in action
4. **CRUD Operations:** Create, Read, Update, Delete in action
5. **Responsive Design:** How Tailwind handles different screen sizes
6. **User Experience:** Loading states, confirmations, feedback messages

---

## 📝 Test Report Template

After testing, document:

```markdown
## Test Session Report

**Date:** [Date]
**Tester:** [Name]
**Duration:** [Time]

### Tests Passed: X/Y

#### Passed:
- [ ] Customer can join queue
- [ ] Barber management works
- [ ] Queue updates in real-time
- ...

#### Failed:
- [ ] Issue description
- [ ] Steps to reproduce
- [ ] Expected vs Actual behavior

#### Observations:
- Performance notes
- UI/UX feedback
- Suggestions for improvement
```

---

**Happy Testing! 🧪✨**

Remember: Testing helps you understand how the full stack works together!
