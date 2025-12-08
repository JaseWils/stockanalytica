const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Stock = require('../models/Stock');
const User = require('../models/User');

// Buy stock
router.post('/buy', auth, async (req, res) => {
  try {
    const { stockId, quantity } = req.body;

    if (!stockId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid stock ID or quantity' });
    }

    const stock = await Stock.findById(stockId);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    const subtotal = stock.currentPrice * quantity;
    const commission = subtotal * 0.04;
    const totalAmount = subtotal + commission;

    const user = await User.findById(req.userId);
    if (user.balance < totalAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct from balance
    user.balance -= totalAmount;
    await user.save();

    // Create transaction
    const transaction = new Transaction({
      user: req.userId,
      stock: stockId,
      type: 'buy',
      quantity,
      pricePerShare: stock.currentPrice,
      commission,
      totalAmount
    });
    await transaction.save();

    res.json({
      message: 'Stock purchased successfully',
      transaction,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sell stock
router.post('/sell', auth, async (req, res) => {
  try {
    const { stockId, quantity } = req.body;

    if (!stockId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid stock ID or quantity' });
    }

    const stock = await Stock.findById(stockId);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    // Check if user has enough shares
    const buyTransactions = await Transaction.find({
      user: req.userId,
      stock: stockId,
      type: 'buy'
    });

    const sellTransactions = await Transaction.find({
      user: req.userId,
      stock: stockId,
      type: 'sell'
    });

    const totalBought = buyTransactions.reduce((sum, t) => sum + t.quantity, 0);
    const totalSold = sellTransactions.reduce((sum, t) => sum + t.quantity, 0);
    const currentHoldings = totalBought - totalSold;

    if (currentHoldings < quantity) {
      return res.status(400).json({ error: 'Insufficient shares' });
    }

    const subtotal = stock.currentPrice * quantity;
    const commission = subtotal * 0.04;
    const totalAmount = subtotal - commission;

    const user = await User.findById(req.userId);
    user.balance += totalAmount;
    await user.save();

    // Create transaction
    const transaction = new Transaction({
      user: req.userId,
      stock: stockId,
      type: 'sell',
      quantity,
      pricePerShare: stock.currentPrice,
      commission,
      totalAmount
    });
    await transaction.save();

    res.json({
      message: 'Stock sold successfully',
      transaction,
      newBalance: user.balance
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;