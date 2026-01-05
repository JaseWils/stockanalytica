const mongoose = require('mongoose');

const watchlistSchema = new mongoose. Schema({
  user: {
    type: mongoose.Schema. Types.ObjectId,
    ref: 'User',
    required: true
  },
  stock: {
    type: mongoose.Schema. Types.ObjectId,
    ref: 'Stock',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  },
  targetPrice: {
    type: Number,
    default: null
  }
});

// Ensure a user can't add the same stock twice
watchlistSchema. index({ user: 1, stock: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);