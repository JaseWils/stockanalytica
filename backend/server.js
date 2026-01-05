const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stocks');
const portfolioRoutes = require('./routes/portfolio');
const paymentRoutes = require('./routes/payment');
const watchlistRoutes = require('./routes/watchlist');

const { generateKeyPair } = require('./utils/rsaUtils');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure RSA keys exist
console.log('Ensuring RSA keys are generated...');
generateKeyPair();
console.log('RSA keys ready.');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stockanalytica';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env. PORT || 5000;
    app.listen(PORT, () => {
      console.log('Server running on port ' + PORT);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });