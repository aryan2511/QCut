# Barber Shop Queue Management System

A full-stack web application for managing barber shop queues with real-time updates.

## 🚀 Tech Stack

**Backend:**
- Spring Boot 3.x
- MongoDB
- Java 17+
- Maven

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React (icons)

## 📋 Features

### Customer Interface (`/`)
- View current queue position
- Join the queue with name and service type
- Real-time queue updates (auto-refresh every 5 seconds)
- View estimated wait time
- See available barbers
- Live barber status

### Shop Dashboard (`/dashboard`)
- Add, edit, and delete barbers
- View all barbers with their status (available/busy)
- Call next customer for available barbers
- Complete services and free up barbers
- Remove customers from queue
- View queue statistics
- Real-time updates (auto-refresh every 3 seconds)
- Track in-progress services

## 🔧 Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18+ and npm
- MongoDB Atlas account (already configured)
- Maven

### Backend Setup

1. Navigate to the project root:
```bash
cd D:\your-style-buddy\hairstylist
```

2. Build the Spring Boot application:
```bash
mvnw clean install
```

3. Run the backend server:
```bash
mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

**Note:** MongoDB is already configured in `application.properties` with your Atlas connection string.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🌐 API Endpoints

### Barbers API (`/api/barbers`)
- `GET /api/barbers` - Get all barbers
- `GET /api/barbers/{id}` - Get barber by ID
- `POST /api/barbers` - Create new barber
- `PUT /api/barbers/{id}` - Update barber
- `DELETE /api/barbers/{id}` - Delete barber
- `PATCH /api/barbers/{id}/status?status={status}` - Update barber status
- `GET /api/barbers/available` - Get available barbers
- `POST /api/barbers/{id}/finish-service` - Mark service as finished

### Queue API (`/api/queue`)
- `GET /api/queue` - Get all queue entries
- `GET /api/queue/{id}` - Get queue entry by ID
- `POST /api/queue` - Add customer to queue
- `DELETE /api/queue/{id}` - Remove from queue
- `POST /api/queue/call-next?barberId={barberId}` - Call next customer
- `POST /api/queue/{id}/complete` - Complete service
- `GET /api/queue/stats` - Get queue statistics

## 📱 How to Use

### For Customers:
1. Open `http://localhost:5173`
2. View current queue size and wait time
3. Click "Join Queue" button
4. Enter your name and select service type
5. Wait for your turn (your position will update automatically)

### For Shop Owners/Staff:
1. Navigate to Dashboard at `http://localhost:5173/dashboard`
2. **Add Barbers:** Click "Add Barber" button and fill in details
3. **Manage Queue:** 
   - Click "Call Next" on an available barber to assign next customer
   - Click "Complete" when service is done to free up barber
   - Remove customers from queue if needed
4. **Edit/Delete Barbers:** Use edit and delete icons on barber cards

## 🔄 Real-time Updates

The application uses polling for real-time updates:
- **Customer Page:** Refreshes every 5 seconds
- **Dashboard:** Refreshes every 3 seconds

This ensures all users see the latest queue status without manual refresh.

## 🎨 UI Features

- **Responsive Design:** Works on desktop, tablet, and mobile
- **Modern UI:** Clean design with Tailwind CSS
- **Visual Feedback:** Color-coded status indicators
- **Smooth Animations:** Transitions and hover effects
- **Intuitive Icons:** Using Lucide React icon library

## 📊 Database Schema

### Barber Collection
```javascript
{
  barberId: String,
  barberName: String,
  barberPhone: String,
  barberChairNo: Number,
  status: String, // "available" or "busy"
  currentCustomerId: String
}
```

### Queue Entry Collection
```javascript
{
  id: String,
  customerName: String,
  serviceType: String,
  status: QueueStatus, // WAITING, IN_PROGRESS, DONE
  barberId: String,
  joinedAt: LocalDateTime,
  position: Number
}
```

## 🚧 Future Enhancements

- WebSocket integration for true real-time updates
- Authentication for shop owners
- SMS/Email notifications
- Service history and analytics
- Multiple shop locations support
- Appointment booking system
- Customer ratings and reviews

## 🐛 Troubleshooting

### Backend Issues:
- Ensure MongoDB connection string is correct in `application.properties`
- Check if port 8080 is available
- Verify Java version: `java -version`

### Frontend Issues:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall
- Check if port 5173 is available
- Ensure backend is running before starting frontend

### CORS Issues:
- CORS is already configured with `@CrossOrigin(origins = "*")` in controllers
- If issues persist, check browser console for specific errors

## 📝 Development Notes

- The frontend uses Vite proxy to avoid CORS issues in development
- All API calls go through `/api` which is proxied to `http://localhost:8080`
- Tailwind CSS is configured for rapid UI development
- React Router handles client-side routing

## 👥 Contributing

This is a learning project. Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use this project for learning purposes.

---

**Happy Coding! ✂️💈**
