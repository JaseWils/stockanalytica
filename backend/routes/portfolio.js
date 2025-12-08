const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Stock = require('../models/Stock');

// Get user portfolio
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId })
      .populate('stock')
      .sort({ createdAt: -1 });

    // Calculate holdings
    const holdings = {};
    
    transactions.forEach(trans => {
      const symbol = trans.stock.symbol;
      if (!holdings[symbol]) {
        holdings[symbol] = {
          stock: trans.stock,
          totalQuantity: 0,
          totalCost: 0,
          transactions: []
        };
      }

      if (trans.type === 'buy') {
        holdings[symbol].totalQuantity += trans.quantity;
        holdings[symbol].totalCost += trans.totalAmount - trans.commission;
      } else {
        holdings[symbol].totalQuantity -= trans.quantity;
        holdings[symbol].totalCost -= trans.pricePerShare * trans.quantity;
      }

      holdings[symbol].transactions.push(trans);
    });

    // Filter out sold positions and calculate current values
    const portfolio = Object.values(holdings)
      .filter(h => h.totalQuantity > 0)
      .map(h => ({
        stock: h.stock,
        quantity: h.totalQuantity,
        avgPrice: h.totalCost / h.totalQuantity,
        currentValue: h.stock.currentPrice * h.totalQuantity,
        profitLoss: (h.stock.currentPrice * h.totalQuantity) - h.totalCost
      }));

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction history
router.get('/transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId })
      .populate('stock')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;