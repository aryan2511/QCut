# 📁 Project Structure Overview

## Directory Layout

```
hairstylist/
├── src/                          # Backend (Spring Boot)
│   ├── main/
│   │   ├── java/com/colorcut/hairstylist/
│   │   │   ├── Controller/       # REST API Controllers
│   │   │   │   ├── BarberController.java
│   │   │   │   └── QueueController.java
│   │   │   ├── Entity/           # Data Models
│   │   │   │   ├── Barber.java
│   │   │   │   ├── QueueEntry.java
│   │   │   │   └── QueueStatus.java
│   │   │   ├── Repository/       # MongoDB Repositories
│   │   │   │   ├── BarberRepository.java
│   │   │   │   └── QueueRepository.java
│   │   │   ├── Service/          # Business Logic
│   │   │   │   ├── BarberService.java
│   │   │   │   └── QueueService.java
│   │   │   └── HairstylistApplication.java  # Main Spring Boot App
│   │   └── resources/
│   │       └── application.properties       # Configuration
│   └── test/                     # Backend Tests
│
├── frontend/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/          # React Components
│   │   │   └── Navbar.jsx       # Navigation Bar
│   │   ├── pages/               # Page Components
│   │   │   ├── CustomerPage.jsx # Customer Interface
│   │   │   └── DashboardPage.jsx # Shop Dashboard
│   │   ├── services/            # API Integration
│   │   │   └── api.js           # Axios API Calls
│   │   ├── utils/               # Utility Functions
│   │   │   └── demoDataSeeder.js # Demo Data Helper
│   │   ├── App.jsx              # Main App Component
│   │   ├── main.jsx             # Entry Point
│   │   └── index.css            # Global Styles
│   ├── index.html               # HTML Template
│   ├── package.json             # Dependencies
│   ├── vite.config.js           # Vite Configuration
│   ├── tailwind.config.js       # Tailwind CSS Config
│   └── postcss.config.js        # PostCSS Config
│
├── pom.xml                      # Maven Configuration
├── QUICK_START.md              # Quick Start Guide
├── TESTING_GUIDE.md            # Testing Documentation
└── README.md                    # This File
```

---

## 🗂️ Backend Structure (Spring Boot)

### Controllers (`Controller/`)
**Purpose:** Handle HTTP requests and return responses

#### BarberController.java
- Manages barber-related endpoints
- CRUD operations for barbers
- Status updates, availability checks

**Key Endpoints:**
- `GET /api/barbers` - List all
- `POST /api/barbers` - Create new
- `PUT /api/barbers/{id}` - Update
- `DELETE /api/barbers/{id}` - Delete
- `POST /api/barbers/{id}/finish-service` - Complete service

#### QueueController.java
- Manages queue operations
- Customer assignment to barbers
- Queue statistics

**Key Endpoints:**
- `GET /api/queue` - List waiting customers
- `POST /api/queue` - Add to queue
- `POST /api/queue/call-next?barberId=X` - Assign customer
- `POST /api/queue/{id}/complete` - Complete service
- `GET /api/queue/stats` - Get statistics

### Entities (`Entity/`)
**Purpose:** Data models (mapped to MongoDB collections)

#### Barber.java
```java
{
  barberId: String          // Unique ID
  barberName: String        // Name
  barberPhone: String       // Contact
  barberChairNo: int        // Chair number
  status: String            // "available" or "busy"
  currentCustomerId: String // Current customer ID (if busy)
}
```

#### QueueEntry.java
```java
{
  id: String                // Unique ID
  customerName: String      // Customer name
  serviceType: String       // Type of service
  status: QueueStatus       // WAITING, IN_PROGRESS, DONE
  barberId: String          // Assigned barber ID
  joinedAt: LocalDateTime   // Timestamp
  position: int             // Position in queue
}
```

#### QueueStatus.java (Enum)
- `WAITING` - Customer in queue
- `IN_PROGRESS` - Being served
- `DONE` - Service completed

### Services (`Service/`)
**Purpose:** Business logic layer

#### BarberService.java
**Responsibilities:**
- CRUD operations on barbers
- Status management
- Assignment/release logic
- Availability queries

**Key Methods:**
- `createBarber()` - Create with default "available" status
- `updateBarberStatus()` - Change status
- `assignCustomerToBarber()` - Set to busy
- `finishService()` - Set to available
- `getAvailableBarbers()` - Filter by status

#### QueueService.java
**Responsibilities:**
- Queue management
- Position tracking
- Customer-barber assignment
- Wait time calculation

**Key Methods:**
- `addToQueue()` - Add customer (auto-position)
- `callNextCustomer()` - Assign to barber
- `completeService()` - Free up barber
- `reorderQueue()` - Fix positions after removal
- `calculateWaitTime()` - Estimate wait based on queue size

### Repositories (`Repository/`)
**Purpose:** Database operations (MongoDB)

#### BarberRepository.java
```java
extends MongoRepository<Barber, String>
- findByStatus(String status) // Custom query
```

#### QueueRepository.java
```java
extends MongoRepository<QueueEntry, String>
- findByStatusOrderByPositionAsc(QueueStatus) // Get waiting queue
- countByStatus(QueueStatus) // Count by status
```

---

## 🎨 Frontend Structure (React)

### Components (`components/`)
**Reusable UI components**

#### Navbar.jsx
- Navigation between pages
- Active route highlighting
- Responsive design

### Pages (`pages/`)
**Main application views**

#### CustomerPage.jsx (Home `/`)
**Features:**
- Queue statistics display
- Join queue form
- Current queue list
- Barber availability
- Auto-refresh (5 seconds)

**State Management:**
```javascript
- queue: Array of QueueEntry
- stats: { queueSize, estimatedWaitTime }
- barbers: Array of Barber
- showForm: boolean
- formData: { customerName, serviceType }
```

#### DashboardPage.jsx (`/dashboard`)
**Features:**
- Barber management (CRUD)
- Queue overview
- In-progress services
- Call next customer
- Complete services
- Auto-refresh (3 seconds)

**State Management:**
```javascript
- barbers: Array of Barber
- queue: Array of QueueEntry
- stats: Queue statistics
- showBarberForm: boolean
- editingBarber: Barber | null
- barberForm: { name, phone, chairNo }
```

### Services (`services/`)
**API communication layer**

#### api.js
**Purpose:** Centralized API calls using Axios

**barberAPI:**
```javascript
- getAllBarbers()
- getBarberById(id)
- createBarber(barber)
- updateBarber(id, barber)
- deleteBarber(id)
- updateBarberStatus(id, status)
- getAvailableBarbers()
- finishService(id)
```

**queueAPI:**
```javascript
- getAllQueueEntries()
- getQueueEntryById(id)
- addToQueue(queueEntry)
- removeFromQueue(id)
- callNextCustomer(barberId)
- completeService(id)
- getQueueStats()
```

### Utils (`utils/`)
**Helper functions**

#### demoDataSeeder.js
- `seedDemoData()` - Add sample data
- `clearAllData()` - Delete all data
- Exposed to `window` for console access

---

## 🔄 Data Flow

### Customer Joins Queue
```
1. User fills form in CustomerPage
2. Form submit → queueAPI.addToQueue()
3. POST /api/queue → QueueController
4. QueueService.addToQueue() → sets position, status=WAITING
5. Save to MongoDB via QueueRepository
6. Response sent back to frontend
7. Page refreshes to show new queue
```

### Barber Calls Next Customer
```
1. Click "Call Next" in Dashboard
2. handleCallNext(barberId) → queueAPI.callNextCustomer()
3. POST /api/queue/call-next?barberId=X
4. QueueService.callNextCustomer():
   - Get first waiting customer
   - Set status=IN_PROGRESS
   - Assign barberId
   - Call BarberService.assignCustomerToBarber()
5. Save changes to MongoDB
6. Response sent back
7. UI updates (customer moves to "In Progress")
```

### Complete Service
```
1. Click "Complete" on in-progress service
2. handleCompleteService(queueId) → queueAPI.completeService()
3. POST /api/queue/{id}/complete
4. QueueService.completeService():
   - Set queue entry status=DONE
   - Call BarberService.finishService()
   - Set barber status=available
5. Save to MongoDB
6. Response sent back
7. UI updates (barber available, service removed)
```

---

## 🎯 Key Concepts

### Auto-Refresh (Polling)
Both pages use `setInterval` to fetch fresh data:
```javascript
useEffect(() => {
  fetchData(); // Initial load
  const interval = setInterval(fetchData, 5000); // Every 5s
  return () => clearInterval(interval); // Cleanup
}, []);
```

### CORS Handling
Backend uses `@CrossOrigin(origins = "*")` on controllers.
Frontend uses Vite proxy in development:
```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  }
}
```

### State Management
React `useState` hooks for local state.
No global state management (Redux, Context) needed for this scope.

### Responsive Design
Tailwind CSS utility classes:
- `md:grid-cols-2` - 2 columns on medium screens
- `lg:grid-cols-3` - 3 columns on large screens
- `space-x-4` - Horizontal spacing
- `p-6` - Padding

---

## 🔐 Security Considerations (Future)

Current implementation has no authentication. For production:

1. **Add Authentication:**
   - JWT tokens for API calls
   - Separate roles (customer, barber, admin)
   - Protect dashboard routes

2. **Input Validation:**
   - Backend: Bean Validation (@Valid)
   - Frontend: Form validation library

3. **Rate Limiting:**
   - Prevent API abuse
   - Throttle queue joins

4. **CORS:**
   - Restrict origins in production
   - Use environment variables

---

## 📦 Dependencies

### Backend (pom.xml)
- `spring-boot-starter-web` - REST API
- `spring-boot-starter-data-mongodb` - MongoDB
- `lombok` - Reduce boilerplate

### Frontend (package.json)
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `vite` - Build tool

---

## 🚀 Build & Deploy

### Development
```bash
# Backend
mvnw spring-boot:run

# Frontend
npm run dev
```

### Production Build
```bash
# Backend (creates JAR)
mvnw clean package

# Frontend (creates dist/ folder)
npm run build

# Serve frontend build
npm run preview
```

### Deploy Options
- **Backend:** AWS EC2, Heroku, Railway
- **Frontend:** Vercel, Netlify, AWS S3 + CloudFront
- **Database:** MongoDB Atlas (already configured)

---

## 📚 Learning Resources

**Spring Boot:**
- Official Docs: https://spring.io/projects/spring-boot
- MongoDB Integration: https://spring.io/guides/gs/accessing-data-mongodb/

**React:**
- Official Docs: https://react.dev
- React Router: https://reactrouter.com

**Tailwind CSS:**
- Docs: https://tailwindcss.com/docs

**Vite:**
- Docs: https://vitejs.dev

---

**Project Structure designed for:**
- ✅ Easy navigation
- ✅ Clear separation of concerns
- ✅ Scalability
- ✅ Maintainability
- ✅ Learning full-stack development

Happy Coding! 🎨✨
