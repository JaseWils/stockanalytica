const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  change: Number,
  volume: String,
  pe: Number,
  marketCap: String,
  risk: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stock', stockSchema);