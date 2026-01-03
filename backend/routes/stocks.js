const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Seed stocks data
router.get('/seed', async (req, res) => {
  try {
    // Clear existing stocks
    await Stock.deleteMany({});
    
    const stocks = [
      // Technology
      { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', currentPrice: 178.50, change: 2.3, volume: '52.3M', pe: '28.5', risk: 'medium', marketCap: '$2.8T' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', currentPrice: 378.90, change: 1.8, volume: '23.1M', pe: '35.2', risk: 'low', marketCap:  '$2.8T' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', currentPrice: 141.25, change: -0.5, volume: '18.7M', pe: '25.1', risk: 'medium', marketCap: '$1.7T' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Technology', currentPrice: 178.25, change: 3.2, volume: '45.2M', pe: '62.3', risk: 'medium', marketCap:  '$1.8T' },
      { symbol:  'NVDA', name: 'NVIDIA Corporation', sector:  'Technology', currentPrice: 875.30, change: 4.5, volume: '35.8M', pe: '65.2', risk: 'high', marketCap: '$2.1T' },
      { symbol: 'META', name: 'Meta Platforms Inc. ', sector: 'Technology', currentPrice:  505.75, change: 1.2, volume: '12.4M', pe: '32.8', risk: 'medium', marketCap: '$1.3T' },
      { symbol: 'NFLX', name:  'Netflix Inc. ', sector: 'Technology', currentPrice:  628.50, change: 2.1, volume: '5.2M', pe: '45.3', risk: 'medium', marketCap:  '$272B' },
      { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Technology', currentPrice: 298.40, change: 1.5, volume: '4.8M', pe: '42.1', risk: 'medium', marketCap: '$287B' },
      { symbol: 'ORCL', name:  'Oracle Corporation', sector: 'Technology', currentPrice: 125.80, change: 0.9, volume: '8.1M', pe: '22.4', risk: 'low', marketCap:  '$345B' },
      { symbol: 'INTC', name: 'Intel Corporation', sector: 'Technology', currentPrice: 42.30, change: -1.2, volume: '32.5M', pe: '15.2', risk: 'medium', marketCap: '$178B' },
      { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', currentPrice: 178.90, change: 3.8, volume: '42.1M', pe: '48.5', risk: 'high', marketCap:  '$289B' },
      { symbol: 'CSCO', name: 'Cisco Systems Inc.', sector: 'Technology', currentPrice: 48.75, change: 0.4, volume: '18.2M', pe: '14.8', risk: 'low', marketCap:  '$198B' },
      
      // Financial
      { symbol:  'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial', currentPrice: 198.40, change: 0.8, volume: '8.2M', pe: '11.5', risk: 'low', marketCap:  '$571B' },
      { symbol: 'V', name: 'Visa Inc. ', sector: 'Financial', currentPrice:  280.15, change: 1.5, volume: '5.8M', pe: '30.1', risk: 'low', marketCap:  '$574B' },
      { symbol: 'MA', name: 'Mastercard Inc.', sector: 'Financial', currentPrice: 458.20, change: 1.3, volume: '3.2M', pe: '35.8', risk: 'low', marketCap: '$428B' },
      { symbol: 'BAC', name: 'Bank of America Corp.', sector: 'Financial', currentPrice: 35.80, change: 0.6, volume: '35.2M', pe: '10.2', risk: 'medium', marketCap:  '$278B' },
      { symbol: 'WFC', name: 'Wells Fargo & Co.', sector: 'Financial', currentPrice: 58.40, change: -0.3, volume: '15.8M', pe: '12.1', risk: 'medium', marketCap: '$212B' },
      { symbol: 'GS', name: 'Goldman Sachs Group', sector: 'Financial', currentPrice: 425.60, change: 1.1, volume: '2.1M', pe: '14.5', risk: 'medium', marketCap: '$142B' },
      { symbol: 'MS', name: 'Morgan Stanley', sector: 'Financial', currentPrice: 98.50, change: 0.7, volume: '6.8M', pe: '13.2', risk: 'medium', marketCap:  '$165B' },
      { symbol: 'AXP', name:  'American Express Co.', sector: 'Financial', currentPrice: 225.80, change: 1.4, volume: '3.5M', pe: '18.9', risk: 'low', marketCap:  '$165B' },
      
      // Healthcare
      { symbol: 'JNJ', name:  'Johnson & Johnson', sector: 'Healthcare', currentPrice:  156.80, change: -0.3, volume: '6.1M', pe: '15.2', risk: 'low', marketCap:  '$378B' },
      { symbol: 'UNH', name:  'UnitedHealth Group', sector:  'Healthcare', currentPrice: 528.90, change: 0.9, volume: '3.1M', pe: '22.1', risk: 'low', marketCap: '$487B' },
      { symbol: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', currentPrice: 28.50, change: -0.8, volume: '42.3M', pe: '12.5', risk: 'medium', marketCap:  '$160B' },
      { symbol: 'MRK', name: 'Merck & Co.  Inc.', sector: 'Healthcare', currentPrice: 125.40, change: 0.5, volume: '8.2M', pe: '18.3', risk: 'low', marketCap: '$318B' },
      { symbol: 'ABBV', name: 'AbbVie Inc. ', sector: 'Healthcare', currentPrice:  168.90, change: 0.3, volume: '5.8M', pe: '14.2', risk: 'low', marketCap:  '$298B' },
      { symbol: 'LLY', name:  'Eli Lilly and Co.', sector: 'Healthcare', currentPrice: 785.20, change: 2.8, volume: '3.5M', pe: '85.2', risk: 'high', marketCap:  '$745B' },
      { symbol: 'TMO', name: 'Thermo Fisher Scientific', sector: 'Healthcare', currentPrice: 578.40, change: 1.2, volume: '1.8M', pe: '32.5', risk: 'medium', marketCap: '$223B' },
      
      // Consumer Goods
      { symbol:  'PG', name: 'Procter & Gamble Co. ', sector: 'Consumer Goods', currentPrice: 165.20, change: 0.4, volume: '4.2M', pe: '27.3', risk: 'low', marketCap:  '$389B' },
      { symbol: 'KO', name:  'Coca-Cola Company', sector:  'Consumer Goods', currentPrice: 62.50, change: 0.2, volume: '12.5M', pe: '24.8', risk: 'low', marketCap:  '$270B' },
      { symbol: 'PEP', name: 'PepsiCo Inc. ', sector: 'Consumer Goods', currentPrice: 175.80, change: 0.5, volume: '5.2M', pe: '26.2', risk: 'low', marketCap:  '$242B' },
      { symbol: 'COST', name: 'Costco Wholesale Corp.', sector: 'Consumer Goods', currentPrice: 725.40, change: 1.8, volume: '2.1M', pe: '48.5', risk: 'medium', marketCap: '$322B' },
      { symbol: 'WMT', name:  'Walmart Inc.', sector: 'Consumer Goods', currentPrice: 165.20, change: 0.6, volume: '8.5M', pe:  '28.2', risk: 'low', marketCap: '$445B' },
      { symbol: 'NKE', name:  'Nike Inc. ', sector: 'Consumer Goods', currentPrice: 98.50, change: -0.5, volume: '6.2M', pe: '28.5', risk: 'medium', marketCap:  '$148B' },
      
      // Energy
      { symbol:  'XOM', name: 'Exxon Mobil Corporation', sector: 'Energy', currentPrice:  105.60, change: -1.2, volume: '15.3M', pe: '12.8', risk: 'medium', marketCap: '$421B' },
      { symbol: 'CVX', name: 'Chevron Corporation', sector: 'Energy', currentPrice:  155.80, change: -0.8, volume: '8.5M', pe: '11.5', risk: 'medium', marketCap: '$292B' },
      { symbol: 'COP', name: 'ConocoPhillips', sector: 'Energy', currentPrice: 118.40, change: -1.5, volume: '5.8M', pe: '10.2', risk: 'medium', marketCap: '$138B' },
      { symbol: 'SLB', name:  'Schlumberger Ltd. ', sector: 'Energy', currentPrice:  52.30, change: -0.6, volume: '8.2M', pe: '15.8', risk: 'high', marketCap:  '$74B' },
      
      // Automotive
      { symbol:  'TSLA', name:  'Tesla Inc. ', sector: 'Automotive', currentPrice: 248.50, change: -2.1, volume: '98.5M', pe: '72.1', risk: 'high', marketCap:  '$789B' },
      { symbol: 'F', name: 'Ford Motor Company', sector: 'Automotive', currentPrice: 12.80, change: 0.4, volume: '52.3M', pe: '11.5', risk: 'medium', marketCap: '$51B' },
      { symbol: 'GM', name: 'General Motors Co.', sector: 'Automotive', currentPrice: 42.50, change: 0.8, volume: '12.5M', pe: '5.8', risk: 'medium', marketCap: '$49B' },
      { symbol: 'TM', name: 'Toyota Motor Corp.', sector: 'Automotive', currentPrice: 245.80, change: 0.3, volume: '1.2M', pe: '10.5', risk: 'low', marketCap:  '$320B' },
      
      // Retail
      { symbol: 'HD', name: 'Home Depot Inc. ', sector: 'Retail', currentPrice: 345.70, change: 1.1, volume: '4.5M', pe: '23.4', risk: 'medium', marketCap: '$345B' },
      { symbol: 'LOW', name: 'Lowes Companies Inc.', sector: 'Retail', currentPrice: 225.80, change: 0.8, volume: '3.2M', pe: '18.5', risk: 'medium', marketCap:  '$132B' },
      { symbol: 'TGT', name: 'Target Corporation', sector: 'Retail', currentPrice: 155.40, change: -0.4, volume: '4.8M', pe: '16.2', risk: 'medium', marketCap:  '$72B' },
      { symbol: 'SBUX', name: 'Starbucks Corporation', sector: 'Retail', currentPrice: 92.50, change: 0.6, volume: '8.5M', pe: '25.8', risk: 'medium', marketCap: '$105B' },
      
      // Entertainment
      { symbol:  'DIS', name: 'Walt Disney Company', sector:  'Entertainment', currentPrice: 112.30, change: -0.8, volume: '9.8M', pe: '45.2', risk: 'medium', marketCap: '$205B' },
      { symbol: 'CMCSA', name:  'Comcast Corporation', sector: 'Entertainment', currentPrice: 42.80, change: 0.3, volume: '18.5M', pe: '11.2', risk: 'low', marketCap: '$168B' },
      { symbol: 'WBD', name: 'Warner Bros. Discovery', sector: 'Entertainment', currentPrice:  8.50, change: -1.2, volume: '25.8M', pe: '0', risk: 'high', marketCap:  '$21B' },
      
      // Telecommunications
      { symbol:  'T', name: 'AT&T Inc.', sector: 'Telecommunications', currentPrice:  17.80, change: 0.2, volume: '35.2M', pe: '8.5', risk: 'medium', marketCap: '$127B' },
      { symbol: 'VZ', name: 'Verizon Communications', sector: 'Telecommunications', currentPrice: 42.50, change: 0.1, volume: '15.8M', pe: '9.2', risk: 'low', marketCap:  '$179B' },
      { symbol: 'TMUS', name: 'T-Mobile US Inc.', sector: 'Telecommunications', currentPrice: 165.80, change: 1.2, volume: '4.5M', pe: '24.5', risk: 'medium', marketCap: '$194B' }
    ];

    const insertedStocks = await Stock.insertMany(stocks);
    
    res.json({ 
      message: 'Stocks seeded successfully!', 
      count: insertedStocks.length,
      stocks: insertedStocks 
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: error.message });
  }
});

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
        { symbol: { $regex:  search, $options:  'i' } },
        { name: { $regex:  search, $options:  'i' } }
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
    const stock = await Stock.findById(req.params. id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;