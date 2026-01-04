# 📈 StockAnalytica - AI-Powered Stock Trading Platform

<div align="center">

![StockAnalytica Banner](https://img.shields.io/badge/StockAnalytica-AI%20Trading%20Platform-blueviolet? style=for-the-badge&logo=chartdotjs)

[![React](https://img.shields.io/badge/React-18. x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node. js-18.x-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python)](https://python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.x-EE4C2C?style=flat-square&logo=pytorch)](https://pytorch.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**A full-stack stock trading simulation platform featuring LSTM neural network predictions, RSA-encrypted authentication, and real-time market analysis.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Architecture](#-architecture) • [API Reference](#-api-reference) • [Contributing](#-contributing)

</div>

---

## 🌟 Features

### 🔐 Security
- **RSA-2048 Encryption** - All passwords are encrypted client-side using RSA public key cryptography before transmission
- **JWT Authentication** - Secure session management with JSON Web Tokens
- **Bcrypt Hashing** - Server-side password hashing for database storage

### 🤖 AI-Powered Predictions
- **LSTM Neural Network** - Deep learning model trained on 2 years of historical data
- **90-Day Price Forecasting** - Predicts future stock prices with confidence intervals
- **Buy/Sell Recommendations** - Automated trading signals based on predicted price changes
  - 🟢 **STRONG BUY**:  Expected gain > 10%
  - 🟢 **BUY**: Expected gain 5-10%
  - 🟡 **HOLD**: Expected change -5% to 5%
  - 🔴 **SELL**: Expected loss 5-10%
  - 🔴 **STRONG SELL**: Expected loss > 10%

### 📊 Data Visualization
- **Historical Price Charts** - 6-month price history with interactive graphs
- **Prediction Visualization** - Future price predictions with confidence bands
- **Trading Volume Analysis** - 60-day volume bar charts
- **Returns Distribution** - Statistical analysis of daily returns

### 💼 Portfolio Management
- **Virtual Trading** - Start with $50,000 virtual balance
- **Real-time Portfolio Tracking** - Monitor holdings and P&L
- **Transaction History** - Complete record of all trades
- **4% Commission Model** - Realistic trading simulation

### 🎨 Modern UI/UX
- **Dark Theme** - Eye-friendly dark mode interface
- **Responsive Design** - Works on desktop and mobile
- **Gradient Accents** - Beautiful blue-purple color scheme
- **Smooth Animations** - Polished user experience

---

## 📸 Demo

### Login Screen with RSA Encryption
![Login Screen](docs/images/login.png)

### Market Overview
![Market Overview](docs/images/market. png)

### AI Prediction Modal
![AI Prediction](docs/images/prediction.png)

### Portfolio Dashboard
![Portfolio](docs/images/portfolio.png)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **AI/ML** | Python, PyTorch, LSTM, scikit-learn |
| **Data** | Yahoo Finance API (yfinance) |
| **Security** | RSA-2048, JWT, Bcrypt |
| **Visualization** | Matplotlib, Chart.js |

---

## 📦 Installation

### Prerequisites

- **Node.js** 18.x or higher
- **Python** 3.10 or higher
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/JaseWils/stockanalytica.git
cd stockanalytica
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
notepad .env  # Windows
# or:  nano .env  # Linux/Mac
```

**Backend `.env` configuration:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stockanalytica
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

```bash
# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp . env.example .env
```

**Frontend `.env` configuration:**
```env
DISABLE_ESLINT_PLUGIN=true
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_PREDICTION_API_URL=http://localhost:5001/api
```

```bash
# Start the frontend
npm start
```

### 4. AI Prediction Service Setup

```bash
# Open new terminal, navigate to prediction service
cd prediction-service

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows: 
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start the prediction service
python app.py
```

### 5. Seed the Database

Open your browser and visit: 
```
http://localhost:5000/api/stocks/seed
```

### 6. Access the Application

Open your browser and visit: 
```
http://localhost:3000
```

---

## 🏗 Architecture

```
stockanalytica/
├── 📂 backend/                 # Node.js Express API
│   ├── 📂 keys/               # RSA key pair (auto-generated)
│   ├── 📂 middleware/         # Auth middleware
│   ├── 📂 models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Stock.js
│   │   ├── Portfolio.js
│   │   └── Transaction.js
│   ├── 📂 routes/             # API routes
│   │   ├── auth.js            # Authentication (RSA + JWT)
│   │   ├── stocks.js          # Stock data
│   │   ├── portfolio.js       # Portfolio management
│   │   └── payment.js         # Buy/Sell operations
│   ├── 📂 utils/
│   │   └── rsaUtils.js        # RSA encryption utilities
│   ├── server.js              # Express server entry
│   └── package.json
│
├── 📂 frontend/                # React Application
│   ├── 📂 src/
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── 📂 services/
│   │   │   └── api.js             # API client
│   │   ├── 📂 utils/
│   │   │   └── rsaEncrypt.js      # Client-side RSA encryption
│   │   └── App.jsx                # Main application
│   └── package.json
│
├── 📂 prediction-service/      # Python ML Service
│   ├── app.py                 # Flask API server
│   ├── requirements.txt       # Python dependencies
│   └── test. html              # Standalone test page
│
├── docker-compose.yml         # Docker configuration
└── README.md                  # This file
```

---

## 🔌 API Reference

### Authentication

#### Get RSA Public Key
```http
GET /api/auth/public-key
```
**Response:**
```json
{
  "publicKey": "-----BEGIN PUBLIC KEY-----\n..."
}
```

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "encryptedPassword": "RSA_ENCRYPTED_STRING",
  "name": "John Doe",
  "profileType": "diversified"
}
```

#### Login
```http
POST /api/auth/login
Content-Type:  application/json

{
  "email":  "user@example. com",
  "encryptedPassword":  "RSA_ENCRYPTED_STRING"
}
```

### Stocks

#### Get All Stocks
```http
GET /api/stocks? sector=Technology&search=apple
```

#### Seed Database
```http
GET /api/stocks/seed
```

### AI Predictions

#### Get Stock Prediction
```http
GET http://localhost:5001/api/predict/{SYMBOL}? days=90
```
**Response:**
```json
{
  "success": true,
  "symbol": "AAPL",
  "prediction": {
    "current_price": 178.50,
    "predicted_price": 195.23,
    "price_change": 16.73,
    "price_change_percent":  9.37,
    "recommendation": "BUY",
    "recommendation_color": "#00ff88"
  },
  "chart":  "BASE64_ENCODED_PNG",
  "model_metrics": {
    "mse": 12.45,
    "r2_score": 0.87
  },
  "stock_info": {
    "sector": "Technology",
    "market_cap": 2800000000000,
    "pe_ratio": 28.5
  }
}
```

### Portfolio

#### Get User Portfolio
```http
GET /api/portfolio
Authorization: Bearer {JWT_TOKEN}
```

#### Buy Stock
```http
POST /api/payment/buy
Authorization:  Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "stockId": "MONGODB_OBJECT_ID",
  "quantity": 10
}
```

---

## 🔐 Security Implementation

### RSA Encryption Flow

```
┌─────────────┐     1. Request Public Key      ┌─────────────┐
│   Frontend  │ ───────────────────────────────▶│   Backend   │
│   (React)   │ ◀─────────────────────────────── │  (Node.js)  │
└─────────────┘     2. Send RSA Public Key      └─────────────┘
       │                                               │
       │  3. Encrypt password                          │
       │     with public key                           │
       ▼                                               ▼
┌─────────────┐     4. Send encrypted password  ┌─────────────┐
│  JSEncrypt  │ ───────────────────────────────▶│   Crypto    │
│   Library   │                                 │   Module    │
└─────────────┘                                 └─────────────┘
                                                       │
                                                       │  5. Decrypt with
                                                       │     private key
                                                       ▼
                                                ┌─────────────┐
                                                │   Bcrypt    │
                                                │   Hashing   │
                                                └─────────────┘
```

### LSTM Model Architecture

```
Input (60 days of prices)
         │
         ▼
┌─────────────────┐
│ LSTM Layer 1    │  (128 units, return_sequences=True)
│ + Dropout(0.2)  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ LSTM Layer 2    │  (64 units, return_sequences=True)
│ + Dropout(0.2)  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ LSTM Layer 3    │  (32 units)
│ + Dropout(0.2)  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Dense Layer     │  (1 unit - predicted price)
└─────────────────┘
```

---

## 🚀 Deployment

### Using Docker

```bash
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Manual Deployment

#### Backend (Heroku/Railway)
```bash
cd backend
heroku create stockanalytica-api
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config: set JWT_SECRET=your_production_secret
git push heroku main
```

#### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy build folder to your hosting platform
```

#### Prediction Service (Railway/DigitalOcean)
```bash
cd prediction-service
# Deploy as a Python web service
# Ensure PORT environment variable is set
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Test Prediction API
```bash
curl http://localhost:5001/api/predict/AAPL? days=90
```

---

## 📈 Performance Optimization

- **Caching**:  Redis caching for frequently accessed stock data
- **Database Indexing**: MongoDB indexes on symbol and sector fields
- **Lazy Loading**: React code splitting for faster initial load
- **Model Caching**:  LSTM predictions cached for 1 hour per stock

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

---

## 👨‍💻 Author

**Bishak Mitra**
- GitHub: [@JaseWils](https://github.com/JaseWils)

---

## 🙏 Acknowledgments

- [Yahoo Finance](https://finance.yahoo.com/) for stock data
- [PyTorch](https://pytorch.org/) for deep learning framework
- [Tailwind CSS](https://tailwindcss. com/) for styling
- [Lucide Icons](https://lucide.dev/) for beautiful icons

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

Made with ❤️ and lots of ☕

</div>