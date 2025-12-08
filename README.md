# 📈 StockAnalytica

Professional Stock Market Analysis & Trading Platform

## 🚀 Features

- **Real-time Stock Market Data** - Browse stocks across multiple sectors
- **Portfolio Management** - Track your investments and P&L
- **Sector-based Filtering** - Technology, Automobile, Oil & Gas, Finance, Pharmaceuticals
- **Risk Analysis** - Color-coded risk indicators (High/Medium/Low potential)
- **Transaction History** - Complete audit trail of all trades
- **Commission-based Trading** - 4% commission on all transactions
- **User Authentication** - Secure JWT-based authentication
- **Profile Types** - Choose between Focused (single sector) or Diversified strategies

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Tailwind CSS 3
- Axios for API calls
- Lucide React Icons
- React Context API for state management

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- Bcrypt password hashing
- Stripe Payment Gateway (planned)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local installation or MongoDB Atlas account)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/JaseWils/stockanalytica.git
cd stockanalytica
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stockanalytica
JWT_SECRET=your_secret_key_minimum_32_characters_long
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. **Start the Application**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

6. **Seed Database with Sample Stocks**
```bash
curl -X POST http://localhost:5000/api/stocks/seed
```

The app will open at `http://localhost:3000`

## 📁 Project Structure
```
stockanalytica/
├── frontend/              # React frontend application
│   ├── public/           # Static files
│   ├── src/
│   │   ├── context/      # React Context (Auth)
│   │   ├── services/     # API service layer
│   │   ├── App.jsx       # Main application component
│   │   └── index.js      # Entry point
│   ├── .env              # Frontend environment variables
│   └── package.json
│
├── backend/              # Node.js backend API
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware (auth)
│   ├── controllers/     # Business logic
│   ├── .env            # Backend environment variables
│   ├── server.js       # Server entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🎯 Current Status

✅ Frontend UI complete with authentication  
✅ Login/Register screens functional  
✅ Stock browsing with filters  
✅ Portfolio tracking interface  
🔄 Backend API in progress  
⏳ MongoDB integration pending  
⏳ Real stock data API integration pending  
⏳ Payment gateway integration pending  

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt (10 rounds)
- Secure HTTP-only cookies (planned)
- CORS protection
- Environment variables for sensitive data
- Input validation and sanitization

## 🚧 Development Roadmap

### Phase 1 - Core Functionality ✅
- [x] Frontend UI design
- [x] Authentication screens
- [x] Stock listing interface
- [ ] Backend API setup
- [ ] MongoDB integration
- [ ] User registration/login

### Phase 2 - Trading Features
- [ ] Buy stock functionality
- [ ] Sell stock functionality  
- [ ] Real-time portfolio updates
- [ ] Transaction history
- [ ] Commission calculations

### Phase 3 - Advanced Features
- [ ] Real-time stock data (Alpha Vantage API)
- [ ] Stock charts and analytics
- [ ] Watchlists
- [ ] Price alerts
- [ ] Email notifications
- [ ] News integration

### Phase 4 - Payments & Production
- [ ] Stripe payment integration
- [ ] Admin dashboard
- [ ] User profiles
- [ ] Mobile responsive enhancements
- [ ] Production deployment

## 🎨 Screenshots

### Login Screen
Beautiful gradient-based authentication interface with dark theme

### Market Overview
Stock cards with sector filtering and risk indicators

### Portfolio
Real-time P&L tracking with detailed holdings

## 🤝 Contributing

This is a learning project. Contributions, issues, and feature requests are welcome!

## 📄 License

MIT License - feel free to use this project for learning purposes

## 👨‍💻 Author

**Bisha Mitra**
- GitHub: [@JaseWils](https://github.com/JaseWils)

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

**⚠️ Note:** This is an educational project. Not intended for production use without proper security audits and regulatory compliance.