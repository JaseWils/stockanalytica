const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Get all stocks
router.get('/', async (req, res) => {
  try {
    const { sector, search } = req.query;
    let query = {};

    if (sector && sector !== 'all') {
      query.sector = sector;
    }

    if (search) {
      query.$or = [
        { symbol: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    const stocks = await Stock.find(query);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single stock
router.get('/:id', async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed initial stocks (for development)
router.post('/seed', async (req, res) => {
  try {
    const seedStocks = [
      { symbol: 'TECH01', name: 'TechCorp Inc', sector: 'Technology', currentPrice: 245.67, change: 5.2, volume: '2.4M', pe: 28.5, marketCap: '150B', risk: 'high' },
      { symbol: 'AUTO01', name: 'AutoDrive Motors', sector: 'Automobile', currentPrice: 89.32, change: -2.1, volume: '1.8M', pe: 15.2, marketCap: '45B', risk: 'low' },
      { symbol: 'OIL01', name: 'Global Energy Corp', sector: 'Oil & Gas', currentPrice: 156.78, change: 3.4, volume: '3.1M', pe: 12.8, marketCap: '200B', risk: 'medium' },
      { symbol: 'TECH02', name: 'CloudNet Systems', sector: 'Technology', currentPrice: 312.45, change: 8.7, volume: '1.2M', pe: 45.3, marketCap: '80B', risk: 'high' },
      { symbol: 'AUTO02', name: 'ElectricWheels Co', sector: 'Automobile', currentPrice: 178.90, change: 4.5, volume: '900K', pe: 38.7, marketCap: '65B', risk: 'high' },
      { symbol: 'OIL02', name: 'PetroMax Industries', sector: 'Oil & Gas', currentPrice: 92.15, change: -1.8, volume: '2.7M', pe: 10.5, marketCap: '120B', risk: 'low' },
      { symbol: 'PHARM01', name: 'MediLife Pharma', sector: 'Pharmaceuticals', currentPrice: 267.33, change: 2.9, volume: '1.5M', pe: 22.4, marketCap: '95B', risk: 'medium' },
      { symbol: 'FIN01', name: 'GlobalBank Corp', sector: 'Finance', currentPrice: 134.56, change: -0.5, volume: '3.5M', pe: 14.7, marketCap: '180B', risk: 'low' }
    ];

    await Stock.deleteMany({});
    await Stock.insertMany(seedStocks);
    res.json({ message: 'Stocks seeded successfully', count: seedStocks.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
