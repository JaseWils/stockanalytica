# 📈 StockAnalytica

<div align="center">

![StockAnalytica Logo](screenshots/logo.png)

**Professional Stock Market Analysis & Trading Platform**

<!-- Build Status -->
[![CI/CD Status](https://github.com/JaseWils/stockanalytica/actions/workflows/ci.yml/badge.svg)](https://github.com/JaseWils/stockanalytica/actions/workflows/ci.yml)
[![Build Status](https://img.shields.io/github/workflow/status/JaseWils/stockanalytica/CI)](https://github.com/JaseWils/stockanalytica/actions)

<!-- Repository Stats -->
[![GitHub Stars](https://img.shields.io/github/stars/JaseWils/stockanalytica?style=social)](https://github.com/JaseWils/stockanalytica/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/JaseWils/stockanalytica?style=social)](https://github.com/JaseWils/stockanalytica/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/JaseWils/stockanalytica)](https://github.com/JaseWils/stockanalytica/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/JaseWils/stockanalytica)](https://github.com/JaseWils/stockanalytica/pulls)

<!-- Code Quality -->
[![Maintainability](https://img.shields.io/codeclimate/maintainability/JaseWils/stockanalytica)](https://codeclimate.com/github/JaseWils/stockanalytica)
[![Code Coverage](https://img.shields.io/codecov/c/github/JaseWils/stockanalytica)](https://codecov.io/gh/JaseWils/stockanalytica)
[![Dependencies](https://img.shields.io/librariesio/github/JaseWils/stockanalytica)](https://libraries.io/github/JaseWils/stockanalytica)

<!-- License & Version -->
[![GitHub License](https://img.shields.io/github/license/JaseWils/stockanalytica)](https://github.com/JaseWils/stockanalytica/blob/main/LICENSE)
[![Version](https://img.shields.io/github/package-json/v/JaseWils/stockanalytica?filename=frontend%2Fpackage.json)](https://github.com/JaseWils/stockanalytica)
[![Last Commit](https://img.shields.io/github/last-commit/JaseWils/stockanalytica)](https://github.com/JaseWils/stockanalytica/commits/main)

<!-- Tech Stack -->
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.x+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

<!-- Social & Links -->
[![Website](https://img.shields.io/badge/Website-Live-brightgreen?style=flat&logo=vercel)](https://stockanalytica.vercel.app)
[![Documentation](https://img.shields.io/badge/Docs-Read-blue?style=flat&logo=read-the-docs&logoColor=white)](https://github.com/JaseWils/stockanalytica/wiki)
[![Discord](https://img.shields.io/discord/YOUR_DISCORD_ID?label=Discord&logo=discord&logoColor=white)](https://discord.gg/your-invite)

[🚀 Live Demo](https://stockanalytica.vercel.app) • 
[📖 Documentation](https://github.com/JaseWils/stockanalytica/wiki) • 
[🐛 Report Bug](https://github.com/JaseWils/stockanalytica/issues) • 
[✨ Request Feature](https://github.com/JaseWils/stockanalytica/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**StockAnalytica** is a comprehensive full-stack web application designed to provide users with professional-grade stock market analysis and trading capabilities. Built with modern web technologies, it offers real-time portfolio management, sector-based stock filtering, and intelligent risk assessment tools.

### Why StockAnalytica?

- 🎨 **Beautiful UI/UX** - Modern, responsive design with dark theme
- 🔐 **Secure** - JWT authentication with bcrypt password hashing
- 💼 **Portfolio Management** - Real-time tracking of investments and P&L
- 📊 **Risk Analysis** - AI-powered risk assessment for informed decisions
- 💰 **Commission Tracking** - Transparent 4% commission on all trades
- 🚀 **Fast & Scalable** - Built with performance in mind

---

## ✨ Features

### Core Functionality

- ✅ **User Authentication**
  - Secure registration and login
  - JWT-based session management
  - Profile customization (Focused/Diversified strategies)

- 📈 **Stock Market**
  - Browse stocks across multiple sectors
  - Real-time stock data display
  - Advanced search and filtering
  - Sector categorization (Technology, Automobile, Oil & Gas, Finance, Pharmaceuticals)

- 💼 **Portfolio Management**
  - Real-time portfolio valuation
  - Profit/Loss tracking
  - Average purchase price calculation
  - Holdings overview

- 💸 **Trading**
  - Buy stocks with instant execution
  - 4% commission structure
  - Transaction validation
  - Balance management

- 📊 **Analytics**
  - Risk indicators (High/Medium/Low)
  - P/E ratios
  - Market capitalization
  - Trading volume
  - Price change tracking

- 📜 **Transaction History**
  - Complete audit trail
  - Buy/Sell records
  - Commission breakdown
  - Timestamped entries

---

## 📸 Screenshots

### Authentication Screen
<div align="center">
  <img src="screenshots/login.png" alt="Login Screen" width="800"/>
  <p><em>Beautiful gradient-based authentication interface with dark theme</em></p>
</div>

### Market Overview
<div align="center">
  <img src="screenshots/market-overview.png" alt="Market Overview" width="800"/>
  <p><em>Stock cards with sector filtering and risk indicators</em></p>
</div>

### Portfolio Dashboard
<div align="center">
  <img src="screenshots/portfolio.png" alt="Portfolio" width="800"/>
  <p><em>Real-time P&L tracking with detailed holdings</em></p>
</div>

### Buy Stock Modal
<div align="center">
  <img src="screenshots/buy-modal.png" alt="Buy Modal" width="600"/>
  <p><em>Transaction preview with commission breakdown</em></p>
</div>

### Transaction History
<div align="center">
  <img src="screenshots/transactions.png" alt="Transactions" width="800"/>
  <p><em>Complete transaction history with filters</em></p>
</div>

> **Note:** Add your actual screenshots to a `screenshots/` folder in your repository

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | UI Framework | 18.x |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Styling | 3.x |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | HTTP Client | 1.6.x |
| ![Lucide](https://img.shields.io/badge/Lucide-000000?style=flat&logo=lucide&logoColor=white) | Icons | Latest |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | Runtime | 16.x+ |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | Web Framework | 4.x |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) | Database | 6.x |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | ODM | 8.x |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white) | Authentication | 9.x |
| ![Bcrypt](https://img.shields.io/badge/Bcrypt-3178C6?style=flat) | Password Hashing | Latest |

### DevOps & Tools
| Tool | Purpose |
|------|---------|
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) | Version Control |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) | Repository Hosting |
| ![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white) | IDE |
| ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white) | API Testing |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6.x or higher) - [Download](https://www.mongodb.com/try/download/community) OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recommended)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/JaseWils/stockanalytica.git
cd stockanalytica
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/stockanalytica
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stockanalytica

# Authentication
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# Payment Gateway (Future)
STRIPE_SECRET_KEY=sk_test_your_stripe_key

# API Keys (Future)
ALPHA_VANTAGE_API_KEY=your_api_key
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

#### Database Setup

##### Option A: Local MongoDB

```bash
# Start MongoDB service
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

##### Option B: MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

---

## 💻 Usage

### Starting the Application

#### 1. Start Backend Server

```bash
cd backend
npm run dev
```

Server will start at `http://localhost:5000`

#### 2. Seed Database (First Time Only)

```bash
# In a new terminal or browser
curl -X POST http://localhost:5000/api/stocks/seed
```

Or visit: `http://localhost:5000/api/stocks/seed`

#### 3. Start Frontend

```bash
cd frontend
npm start
```

Frontend will open at `http://localhost:3000`

### Using the Application

1. **Register** - Create a new account
2. **Browse Stocks** - Explore available stocks by sector
3. **Buy Stocks** - Click on a stock and purchase shares
4. **Track Portfolio** - Monitor your investments in real-time
5. **View History** - Check all transactions

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Stock Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/stocks` | Get all stocks | ❌ |
| GET | `/api/stocks/:id` | Get single stock | ❌ |
| POST | `/api/stocks/seed` | Seed database | ❌ |

### Portfolio Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/portfolio` | Get user portfolio | ✅ |
| GET | `/api/portfolio/transactions` | Get transaction history | ✅ |

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/payment/buy` | Buy stock | ✅ |
| POST | `/api/payment/sell` | Sell stock | ✅ |

### Example API Request

```javascript
// Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "user": {
    "id": "123abc",
    "email": "user@example.com",
    "name": "John Doe",
    "profileType": "diversified",
    "balance": 50000
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📁 Project Structure

```
stockanalytica/
│
├── frontend/                    # React Frontend
│   ├── public/                 # Static files
│   │   └── index.html
│   ├── src/
│   │   ├── context/           # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/          # API Services
│   │   │   └── api.js
│   │   ├── App.jsx            # Main component
│   │   ├── index.js           # Entry point
│   │   └── index.css          # Global styles
│   ├── .env                   # Environment variables
│   ├── tailwind.config.js     # Tailwind configuration
│   └── package.json
│
├── backend/                     # Node.js Backend
│   ├── config/                 # Configuration files
│   │   └── db.js              # Database connection
│   ├── models/                 # Mongoose models
│   │   ├── User.js
│   │   ├── Stock.js
│   │   └── Transaction.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── stocks.js
│   │   ├── portfolio.js
│   │   └── payment.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js
│   ├── .env                    # Environment variables
│   ├── server.js               # Server entry point
│   └── package.json
│
├── screenshots/                 # Application screenshots
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
└── README.md                   # Project documentation
```

---

## 🗺️ Roadmap

### Version 1.0 (Current) ✅
- [x] User authentication (Register/Login)
- [x] Stock browsing with filters
- [x] Buy stock functionality
- [x] Portfolio management
- [x] Transaction history
- [x] Commission calculations (4%)

### Version 1.5 (Next Release) 🔄
- [ ] Sell stock functionality
- [ ] Real-time stock price updates
- [ ] Stock price charts
- [ ] Watchlist feature
- [ ] Email notifications
- [ ] Password reset functionality

### Version 2.0 (Future) 📅
- [ ] Real-time market data API integration (Alpha Vantage/Yahoo Finance)
- [ ] Advanced technical indicators
- [ ] News feed integration
- [ ] Price alerts
- [ ] Social features (follow other traders)
- [ ] Mobile app (React Native)

### Version 3.0 (Long-term) 🌟
- [ ] Stripe payment integration
- [ ] Admin dashboard
- [ ] Multiple currency support
- [ ] AI-powered stock recommendations
- [ ] Paper trading mode
- [ ] Educational resources

See the [open issues](https://github.com/JaseWils/stockanalytica/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and constructive

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2025 Bisha Mitra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

**Bishak Mitra**

[![GitHub](https://img.shields.io/badge/GitHub-JaseWils-181717?style=flat&logo=github)](https://github.com/JaseWils)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/bishakmitra/)
[![Email](https://img.shields.io/badge/Email-bishakmitra@gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:bishakmitra@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-4285F4?style=flat&logo=google-chrome&logoColor=white)](https://bishakmitra.vercel.app/)

**Project Link:** [https://github.com/JaseWils/stockanalytica](https://github.com/JaseWils/stockanalytica)

**Live Demo:** [https://stockanalytica.demo.com](https://stockanalytica.demo.com) *(Coming Soon)*

---

## 🙏 Acknowledgments

Special thanks to:

- [React.js](https://reactjs.org/) - For the amazing UI library
- [Node.js](https://nodejs.org/) - For the powerful runtime
- [MongoDB](https://www.mongodb.com/) - For the flexible database
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - For beautiful icons
- [JWT.io](https://jwt.io/) - For secure authentication
- [Express.js](https://expressjs.com/) - For the minimal web framework
- [Mongoose](https://mongoosejs.com/) - For elegant MongoDB object modeling

### Inspiration & Resources

- [Best Practices for REST API Design](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [React Context API Documentation](https://react.dev/reference/react/useContext)
- [MongoDB Atlas Tutorial](https://www.mongodb.com/docs/atlas/)
- [JWT Authentication Guide](https://jwt.io/introduction)

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/JaseWils/stockanalytica)
![GitHub code size](https://img.shields.io/github/languages/code-size/JaseWils/stockanalytica)
![GitHub last commit](https://img.shields.io/github/last-commit/JaseWils/stockanalytica)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/JaseWils/stockanalytica)

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JaseWils/stockanalytica&type=Date)](https://star-history.com/#JaseWils/stockanalytica&Date)

---

<div align="center">

### Show your support by giving a ⭐ if you like this project!

Made with ❤️ by [Bisha Mitra](https://github.com/JaseWils)

**[⬆ Back to Top](#-stockanalytica)**

</div>