# 💈 QCut

A modern, full-stack web application for managing barber shop queues with real-time updates.

![Tech Stack](https://img.shields.io/badge/Spring%20Boot-3.x-green)
![Tech Stack](https://img.shields.io/badge/React-18-blue)
![Tech Stack](https://img.shields.io/badge/MongoDB-Atlas-green)
![Tech Stack](https://img.shields.io/badge/Tailwind-CSS-blue)

---

## ✨ Features

### 👥 Customer Interface
- 📱 View real-time queue position
- ⏱️ See estimated wait time
- 👤 Join queue with name and service type
- 👀 Monitor available barbers
- 🔄 Auto-refresh every 5 seconds

### 🏪 Shop Dashboard
- ✂️ Add, edit, and delete barbers
- 📊 Track barber availability (available/busy)
- 🔔 Call next customer for available barbers
- ✅ Complete services and free up barbers
- 🗑️ Remove customers from queue
- 📈 View queue statistics and analytics
- 🔄 Auto-refresh every 3 seconds

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
# Run setup script
setup.bat

# Then start backend in one terminal
start-backend.bat

# Start frontend in another terminal
start-frontend.bat
```

**Mac/Linux:**
```bash
# Make scripts executable
chmod +x setup.sh start-backend.sh start-frontend.sh

# Run setup
./setup.sh

# Start backend in one terminal
./start-backend.sh

# Start frontend in another terminal
./start-frontend.sh
```

### Option 2: Manual Setup

**Prerequisites:**
- Java 17+
- Node.js 18+
- Maven

**Backend:**
```bash
cd D:\your-style-buddy\hairstylist
mvnw clean install
mvnw spring-boot:run
```
✅ Backend runs on `http://localhost:8080`

**Frontend:**
```bash
cd D:\your-style-buddy\hairstylist\frontend
npm install
npm run dev
```
✅ Frontend runs on `http://localhost:5173`

**Open Browser:** `http://localhost:5173`

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| 🚀 [QUICK_START.md](QUICK_START.md) | Step-by-step setup guide |
| 🧪 [TESTING_GUIDE.md](TESTING_GUIDE.md) | How to test the application |
| 📁 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Architecture overview |
| 🔧 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Fix common issues |
| 📖 [frontend/README.md](frontend/README.md) | Detailed documentation |

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.x
- **Database:** MongoDB Atlas
- **Build Tool:** Maven
- **Language:** Java 17

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router
- **Icons:** Lucide React

---

## 📱 Screenshots

### Customer Interface
```
┌─────────────────────────────────────────┐
│  Welcome to Our Barber Shop             │
│  ┌─────┐  ┌─────┐  ┌─────┐             │
│  │  5  │  │ 25  │  │ 2/3 │             │
│  │Queue│  │ min │  │Avail│             │
│  └─────┘  └─────┘  └─────┘             │
│                                         │
│  [+ Join Queue]                         │
│                                         │
│  Current Queue:                         │
│  1️⃣ John Doe - Haircut    [Next Up]   │
│  2️⃣ Jane Smith - Shave                 │
│  3️⃣ Bob Wilson - Haircut & Shave      │
│                                         │
│  Our Barbers:                          │
│  • Mike (Chair 1) - Available          │
│  • Sarah (Chair 2) - Busy              │
│  • James (Chair 3) - Available         │
└─────────────────────────────────────────┘
```

### Shop Dashboard
```
┌─────────────────────────────────────────┐
│  Shop Dashboard         [🔄 Refresh]    │
│  ┌─────┐  ┌─────┐  ┌─────┐             │
│  │  3  │  │  5  │  │  2  │             │
│  │Barbs│  │Queue│  │Avail│             │
│  └─────┘  └─────┘  └─────┘             │
│                                         │
│  Barbers              [+ Add Barber]   │
│  ┌────────────────────────────────┐    │
│  │ Mike Johnson                   │    │
│  │ Chair #1 | 555-0101           │    │
│  │ Status: Available              │    │
│  │                [Call Next] ✏️🗑️│    │
│  └────────────────────────────────┘    │
│                                         │
│  In Progress:                          │
│  ┌────────────────────────────────┐    │
│  │ Jane Smith - Sarah (Chair 2)  │    │
│  │                    [Complete]  │    │
│  └────────────────────────────────┘    │
│                                         │
│  Waiting Queue:                        │
│  1️⃣ John Doe - Haircut           🗑️   │
│  2️⃣ Bob Wilson - Shave           🗑️   │
└─────────────────────────────────────────┘
```

---

## 🎯 Use Cases

### For Barber Shops
- Eliminate physical queues
- Reduce waiting room crowding
- Improve customer experience
- Track barber productivity
- Optimize staff allocation

### For Customers
- Join queue remotely
- Check wait time before arriving
- Know exact position in queue
- Receive real-time updates
- Plan visit timing

---

## 🔌 API Endpoints

### Barbers (`/api/barbers`)
```
GET    /api/barbers              - Get all barbers
GET    /api/barbers/{id}         - Get barber by ID
POST   /api/barbers              - Create barber
PUT    /api/barbers/{id}         - Update barber
DELETE /api/barbers/{id}         - Delete barber
PATCH  /api/barbers/{id}/status  - Update status
GET    /api/barbers/available    - Get available barbers
POST   /api/barbers/{id}/finish  - Finish service
```

### Queue (`/api/queue`)
```
GET    /api/queue                  - Get waiting customers
GET    /api/queue/{id}             - Get queue entry
POST   /api/queue                  - Add to queue
DELETE /api/queue/{id}             - Remove from queue
POST   /api/queue/call-next        - Assign customer
POST   /api/queue/{id}/complete    - Complete service
GET    /api/queue/stats            - Get statistics
```

---

## 🧪 Testing

### Quick Test with Demo Data

1. Open browser console (F12)
2. Run: `await seedDemoData()`
3. Refreshes page automatically

This creates:
- 3 demo barbers
- 5 demo customers

### Manual Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing scenarios.

---

## 🗂️ Project Structure

```
hairstylist/
├── src/main/java/              # Backend code
│   └── com/colorcut/hairstylist/
│       ├── Controller/         # REST endpoints
│       ├── Entity/            # Data models
│       ├── Service/           # Business logic
│       └── Repository/        # Database access
├── frontend/                   # React application
│   └── src/
│       ├── components/        # UI components
│       ├── pages/            # Main views
│       ├── services/         # API calls
│       └── utils/            # Helper functions
├── *.bat                      # Windows scripts
├── *.sh                       # Mac/Linux scripts
└── *.md                       # Documentation
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed architecture.

---

## 🔄 Data Flow

### Customer Joins Queue
```
Customer → Frontend → API → Service → MongoDB
           ↓
        Updates UI (auto-refresh)
```

### Barber Calls Next
```
Dashboard → API → Service → Assign Customer
                           → Update Barber Status
                           → Save to MongoDB
           ↓
        Both Pages Update
```

### Complete Service
```
Dashboard → API → Service → Mark Complete
                           → Free Barber
                           → Update MongoDB
           ↓
        UI Refreshes
```

---

## 🚧 Troubleshooting

### Common Issues

**Port already in use:**
- Backend: Change port in `application.properties`
- Frontend: Change port in `vite.config.js`

**MongoDB connection failed:**
- Check internet connection
- Verify connection string in `application.properties`
- Check MongoDB Atlas whitelist

**Blank page:**
- Check browser console (F12)
- Verify backend is running
- Clear browser cache (Ctrl+Shift+R)

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.

---

## 🌟 Future Enhancements

- [ ] WebSocket for true real-time updates
- [ ] User authentication (JWT)
- [ ] Role-based access control
- [ ] SMS/Email notifications
- [ ] Appointment booking system
- [ ] Service history and analytics
- [ ] Multiple shop locations
- [ ] Customer ratings and reviews
- [ ] Payment integration
- [ ] Mobile apps (React Native)

---

## 📖 Learning Outcomes

This project teaches:
- ✅ Full-stack development
- ✅ REST API design
- ✅ MongoDB integration
- ✅ React hooks and state management
- ✅ Responsive design with Tailwind
- ✅ Real-time data updates (polling)
- ✅ CRUD operations
- ✅ Error handling
- ✅ User experience design

---

## 🤝 Contributing

This is a learning project. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Free for learning and commercial use

---

## 🙏 Acknowledgments

- Spring Boot community
- React community
- MongoDB Atlas
- Tailwind CSS
- Vite team

---

## 📞 Support

Having issues?

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Read [QUICK_START.md](QUICK_START.md)
3. Review [documentation](frontend/README.md)
4. Open an issue on GitHub

---

## 🎓 About This Project

**Purpose:** Full-stack learning project
**Complexity:** Low to Medium
**Time to Build:** 2-3 days
**Best For:** Beginners learning full-stack development

**What makes it great:**
- Clear, achievable scope
- Real-world use case
- Covers all CRUD operations
- Teaches real-time updates
- Production-ready patterns
- Well-documented code

---

<div align="center">

**Built with ❤️ for learning**

[Documentation](frontend/README.md) • [Issues](../../issues) • [Discussions](../../discussions)

⭐ Star this project if it helped you learn!

</div>

---

## 🚦 Getting Started Checklist

- [ ] Clone/download repository
- [ ] Install Java 17+
- [ ] Install Node.js 18+
- [ ] Run `setup.bat` (Windows) or `setup.sh` (Mac/Linux)
- [ ] Start backend with `start-backend.bat`
- [ ] Start frontend with `start-frontend.bat`
- [ ] Open `http://localhost:5173`
- [ ] Add a barber in dashboard
- [ ] Join queue as customer
- [ ] Call next customer
- [ ] Complete service
- [ ] Try `await seedDemoData()` for demo data

**Ready to start? Run `setup.bat` now! 🚀**
