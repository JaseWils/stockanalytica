const express = require('express');
const router = express. Router();
const Watchlist = require('../models/Watchlist');
const Stock = require('../models/Stock');
const auth = require('../middleware/auth');

// Get user's watchlist
router.get('/', auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.userId })
      .populate('stock')
      .sort({ addedAt: -1 });
    
    res.json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add stock to watchlist
router.post('/add', auth, async (req, res) => {
  try {
    const { stockId, notes, targetPrice } = req.body;

    // Check if stock exists
    const stock = await Stock.findById(stockId);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    // Check if already in watchlist
    const existing = await Watchlist.findOne({ 
      user: req.userId, 
      stock: stockId 
    });

    if (existing) {
      return res.status(400).json({ error: 'Stock already in watchlist' });
    }

    // Create watchlist entry
    const watchlistItem = new Watchlist({
      user: req.userId,
      stock: stockId,
      notes: notes || '',
      targetPrice: targetPrice || null
    });

    await watchlistItem.save();

    // Populate and return
    const populated = await Watchlist.findById(watchlistItem._id).populate('stock');
    
    console.log('Stock added to watchlist:', stock. symbol);
    res.status(201).json(populated);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Stock already in watchlist' });
    }
    res. status(500).json({ error: error. message });
  }
});

// Remove stock from watchlist
router.delete('/remove/: stockId', auth, async (req, res) => {
  try {
    const { stockId } = req.params;

    const result = await Watchlist.findOneAndDelete({
      user:  req.userId,
      stock: stockId
    });

    if (!result) {
      return res. status(404).json({ error: 'Stock not found in watchlist' });
    }

    console.log('Stock removed from watchlist');
    res.json({ message: 'Stock removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ error: error. message });
  }
});

// Update watchlist item (notes, target price)
router.put('/update/:stockId', auth, async (req, res) => {
  try {
    const { stockId } = req.params;
    const { notes, targetPrice } = req. body;

    const watchlistItem = await Watchlist.findOneAndUpdate(
      { user: req. userId, stock: stockId },
      { 
        notes: notes !== undefined ? notes : undefined,
        targetPrice: targetPrice !== undefined ? targetPrice : undefined
      },
      { new: true }
    ).populate('stock');

    if (!watchlistItem) {
      return res.status(404).json({ error: 'Stock not found in watchlist' });
    }

    res.json(watchlistItem);
  } catch (error) {
    console.error('Error updating watchlist:', error);
    res.status(500).json({ error: error. message });
  }
});

// Check if stock is in watchlist
router.get('/check/:stockId', auth, async (req, res) => {
  try {
    const { stockId } = req.params;
    
    const exists = await Watchlist.findOne({
      user: req. userId,
      stock: stockId
    });

    res.json({ inWatchlist: !!exists });
  } catch (error) {
    console. error('Error checking watchlist:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;