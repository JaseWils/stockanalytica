const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Seed stocks data
router.get('/seed', async (req, res) => {
  try {
    // Clear existing stocks
    await Stock.deleteMany({});
    
    const stocks = [
      // ============== TECHNOLOGY (25 stocks) ==============
      { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', currentPrice: 178.50, change: 2.3, volume: '52.3M', pe: '28.5', risk: 'medium', marketCap: '$2.8T' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', currentPrice: 378.90, change: 1.8, volume: '23.1M', pe: '35.2', risk: 'low', marketCap:  '$2.8T' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', currentPrice: 141.25, change: -0.5, volume: '18.7M', pe: '25.1', risk: 'medium', marketCap: '$1.7T' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Technology', currentPrice: 178.25, change: 3.2, volume: '45.2M', pe: '62.3', risk: 'medium', marketCap:  '$1.8T' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', sector:  'Technology', currentPrice: 875.30, change: 4.5, volume: '35.8M', pe: '65.2', risk: 'high', marketCap: '$2.1T' },
      { symbol: 'META', name: 'Meta Platforms Inc. ', sector: 'Technology', currentPrice:  505.75, change: 1.2, volume: '12.4M', pe: '32.8', risk: 'medium', marketCap: '$1.3T' },
      { symbol: 'NFLX', name:  'Netflix Inc. ', sector: 'Technology', currentPrice: 628.50, change: 2.1, volume: '5.2M', pe: '45.3', risk: 'medium', marketCap:  '$272B' },
      { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Technology', currentPrice: 298.40, change: 1.5, volume: '4.8M', pe: '42.1', risk: 'medium', marketCap: '$287B' },
      { symbol: 'ORCL', name:  'Oracle Corporation', sector: 'Technology', currentPrice: 125.80, change: 0.9, volume: '8.1M', pe: '22.4', risk: 'low', marketCap:  '$345B' },
      { symbol: 'INTC', name: 'Intel Corporation', sector: 'Technology', currentPrice: 42.30, change: -1.2, volume: '32.5M', pe: '15.2', risk: 'medium', marketCap: '$178B' },
      { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', currentPrice: 178.90, change: 3.8, volume: '42.1M', pe: '48.5', risk: 'high', marketCap: '$289B' },
      { symbol: 'CSCO', name: 'Cisco Systems Inc.', sector: 'Technology', currentPrice: 48.75, change: 0.4, volume: '18.2M', pe: '14.8', risk: 'low', marketCap:  '$198B' },
      { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Technology', currentPrice: 485.60, change: 1.8, volume: '3.2M', pe: '38.5', risk: 'medium', marketCap: '$218B' },
      { symbol: 'NOW', name: 'ServiceNow Inc.', sector: 'Technology', currentPrice: 752.30, change: 2.4, volume: '1.5M', pe: '85.2', risk: 'high', marketCap:  '$152B' },
      { symbol: 'UBER', name: 'Uber Technologies', sector: 'Technology', currentPrice: 78.40, change: 1.9, volume: '22.5M', pe: '125.3', risk: 'high', marketCap:  '$162B' },
      { symbol: 'SHOP', name: 'Shopify Inc. ', sector: 'Technology', currentPrice:  78.90, change: 2.8, volume: '8.5M', pe: '75.2', risk: 'high', marketCap:  '$99B' },
      { symbol: 'SQ', name: 'Block Inc.', sector: 'Technology', currentPrice: 82.50, change: -1.5, volume: '9.8M', pe: '45.8', risk: 'high', marketCap:  '$48B' },
      { symbol: 'PYPL', name: 'PayPal Holdings', sector: 'Technology', currentPrice: 62.80, change: -0.8, volume: '12.3M', pe: '18.5', risk: 'medium', marketCap:  '$68B' },
      { symbol: 'SNOW', name: 'Snowflake Inc.', sector: 'Technology', currentPrice: 158.40, change: 3.2, volume: '4.5M', pe: '0', risk: 'high', marketCap:  '$52B' },
      { symbol: 'PLTR', name: 'Palantir Technologies', sector: 'Technology', currentPrice: 24.80, change: 4.5, volume: '45.2M', pe: '225.5', risk: 'high', marketCap: '$54B' },
      { symbol: 'TWLO', name: 'Twilio Inc.', sector: 'Technology', currentPrice: 65.40, change: 1.2, volume: '3.8M', pe: '0', risk: 'high', marketCap: '$12B' },
      { symbol: 'ZM', name: 'Zoom Video Communications', sector: 'Technology', currentPrice:  68.90, change: -0.5, volume: '4.2M', pe: '22.5', risk: 'medium', marketCap: '$21B' },
      { symbol: 'DOCU', name: 'DocuSign Inc.', sector: 'Technology', currentPrice: 58.20, change: 0.8, volume: '3.5M', pe: '0', risk: 'high', marketCap: '$12B' },
      { symbol: 'NET', name: 'Cloudflare Inc.', sector: 'Technology', currentPrice: 98.50, change: 2.8, volume: '5.2M', pe: '0', risk: 'high', marketCap: '$33B' },
      { symbol: 'CRWD', name: 'CrowdStrike Holdings', sector: 'Technology', currentPrice:  325.80, change: 3.5, volume: '2.8M', pe: '85.2', risk: 'high', marketCap: '$78B' },
      
      // ============== FINANCIAL (20 stocks) ==============
      { symbol:  'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial', currentPrice: 198.40, change: 0.8, volume: '8.2M', pe: '11.5', risk: 'low', marketCap:  '$571B' },
      { symbol: 'V', name: 'Visa Inc. ', sector: 'Financial', currentPrice:  280.15, change: 1.5, volume: '5.8M', pe: '30.1', risk: 'low', marketCap:  '$574B' },
      { symbol: 'MA', name: 'Mastercard Inc. ', sector: 'Financial', currentPrice:  458.20, change: 1.3, volume: '3.2M', pe: '35.8', risk: 'low', marketCap: '$428B' },
      { symbol: 'BAC', name:  'Bank of America Corp.', sector: 'Financial', currentPrice: 35.80, change: 0.6, volume: '35.2M', pe: '10.2', risk: 'medium', marketCap:  '$278B' },
      { symbol: 'WFC', name: 'Wells Fargo & Co.', sector: 'Financial', currentPrice: 58.40, change: -0.3, volume: '15.8M', pe: '12.1', risk: 'medium', marketCap: '$212B' },
      { symbol: 'GS', name: 'Goldman Sachs Group', sector: 'Financial', currentPrice: 425.60, change: 1.1, volume: '2.1M', pe: '14.5', risk: 'medium', marketCap: '$142B' },
      { symbol: 'MS', name: 'Morgan Stanley', sector: 'Financial', currentPrice: 98.50, change: 0.7, volume: '6.8M', pe: '13.2', risk: 'medium', marketCap:  '$165B' },
      { symbol: 'AXP', name:  'American Express Co.', sector: 'Financial', currentPrice: 225.80, change: 1.4, volume: '3.5M', pe: '18.9', risk: 'low', marketCap:  '$165B' },
      { symbol: 'C', name: 'Citigroup Inc.', sector: 'Financial', currentPrice: 58.90, change: 0.5, volume: '12.5M', pe: '8.5', risk: 'medium', marketCap: '$112B' },
      { symbol: 'BLK', name: 'BlackRock Inc.', sector: 'Financial', currentPrice: 825.40, change: 1.2, volume: '0.8M', pe: '22.5', risk: 'low', marketCap:  '$125B' },
      { symbol: 'SCHW', name: 'Charles Schwab Corp. ', sector: 'Financial', currentPrice:  72.80, change: 0.9, volume: '8.5M', pe: '18.2', risk: 'medium', marketCap: '$132B' },
      { symbol: 'USB', name: 'U.S.  Bancorp', sector: 'Financial', currentPrice: 42.50, change: 0.4, volume: '6.2M', pe: '10.8', risk: 'low', marketCap:  '$66B' },
      { symbol: 'PNC', name: 'PNC Financial Services', sector: 'Financial', currentPrice:  158.90, change: 0.6, volume: '2.5M', pe: '11.5', risk: 'low', marketCap:  '$63B' },
      { symbol: 'TFC', name: 'Truist Financial Corp.', sector: 'Financial', currentPrice: 38.20, change: -0.2, volume: '8.5M', pe: '9.8', risk: 'medium', marketCap:  '$51B' },
      { symbol: 'COF', name: 'Capital One Financial', sector: 'Financial', currentPrice: 145.80, change: 1.8, volume: '3.2M', pe: '10.5', risk: 'medium', marketCap: '$56B' },
      { symbol: 'SPGI', name: 'S&P Global Inc. ', sector: 'Financial', currentPrice:  452.30, change: 0.8, volume: '1.2M', pe: '42.5', risk: 'low', marketCap:  '$142B' },
      { symbol: 'MCO', name: 'Moodys Corporation', sector: 'Financial', currentPrice:  398.50, change: 0.6, volume: '0.8M', pe: '38.2', risk: 'low', marketCap:  '$72B' },
      { symbol: 'ICE', name: 'Intercontinental Exchange', sector: 'Financial', currentPrice: 135.80, change: 0.4, volume: '2.5M', pe: '25.8', risk: 'low', marketCap:  '$78B' },
      { symbol: 'CME', name: 'CME Group Inc.', sector: 'Financial', currentPrice: 218.40, change: 0.3, volume: '1.8M', pe: '24.5', risk: 'low', marketCap:  '$78B' },
      { symbol: 'AON', name: 'Aon plc', sector: 'Financial', currentPrice: 325.60, change: 0.5, volume: '0.9M', pe: '28.5', risk: 'low', marketCap:  '$68B' },
      
      // ============== HEALTHCARE (20 stocks) ==============
      { symbol:  'JNJ', name:  'Johnson & Johnson', sector: 'Healthcare', currentPrice:  156.80, change: -0.3, volume: '6.1M', pe: '15.2', risk: 'low', marketCap: '$378B' },
      { symbol: 'UNH', name:  'UnitedHealth Group', sector:  'Healthcare', currentPrice: 528.90, change: 0.9, volume: '3.1M', pe: '22.1', risk: 'low', marketCap: '$487B' },
      { symbol: 'PFE', name:  'Pfizer Inc.', sector: 'Healthcare', currentPrice: 28.50, change: -0.8, volume: '42.3M', pe: '12.5', risk: 'medium', marketCap:  '$160B' },
      { symbol: 'MRK', name:  'Merck & Co.  Inc.', sector: 'Healthcare', currentPrice: 125.40, change: 0.5, volume: '8.2M', pe: '18.3', risk: 'low', marketCap: '$318B' },
      { symbol: 'ABBV', name: 'AbbVie Inc. ', sector: 'Healthcare', currentPrice:  168.90, change: 0.3, volume: '5.8M', pe: '14.2', risk: 'low', marketCap:  '$298B' },
      { symbol: 'LLY', name: 'Eli Lilly and Co.', sector: 'Healthcare', currentPrice: 785.20, change: 2.8, volume: '3.5M', pe: '85.2', risk: 'high', marketCap:  '$745B' },
      { symbol: 'TMO', name: 'Thermo Fisher Scientific', sector: 'Healthcare', currentPrice: 578.40, change: 1.2, volume: '1.8M', pe: '32.5', risk: 'medium', marketCap: '$223B' },
      { symbol: 'ABT', name: 'Abbott Laboratories', sector:  'Healthcare', currentPrice: 112.50, change: 0.6, volume: '4.5M', pe: '22.8', risk: 'low', marketCap: '$195B' },
      { symbol: 'DHR', name: 'Danaher Corporation', sector: 'Healthcare', currentPrice:  252.80, change: 0.8, volume: '2.2M', pe: '28.5', risk: 'low', marketCap: '$185B' },
      { symbol: 'BMY', name: 'Bristol-Myers Squibb', sector: 'Healthcare', currentPrice:  52.40, change: -0.4, volume: '12.5M', pe: '8.5', risk: 'medium', marketCap:  '$106B' },
      { symbol: 'AMGN', name:  'Amgen Inc.', sector: 'Healthcare', currentPrice: 285.60, change: 0.5, volume: '2.8M', pe: '18.2', risk: 'low', marketCap: '$153B' },
      { symbol: 'GILD', name: 'Gilead Sciences Inc.', sector: 'Healthcare', currentPrice: 78.90, change: 0.3, volume: '6.5M', pe: '12.5', risk: 'medium', marketCap:  '$98B' },
      { symbol:  'VRTX', name: 'Vertex Pharmaceuticals', sector: 'Healthcare', currentPrice: 425.80, change: 1.5, volume: '1.2M', pe: '28.5', risk: 'medium', marketCap: '$109B' },
      { symbol: 'REGN', name: 'Regeneron Pharmaceuticals', sector:  'Healthcare', currentPrice: 985.40, change: 1.8, volume: '0.6M', pe: '22.5', risk: 'medium', marketCap:  '$108B' },
      { symbol: 'ISRG', name:  'Intuitive Surgical', sector: 'Healthcare', currentPrice: 398.50, change: 2.2, volume: '1.5M', pe: '65.8', risk: 'high', marketCap: '$142B' },
      { symbol: 'MDT', name: 'Medtronic plc', sector: 'Healthcare', currentPrice: 82.40, change: 0.2, volume: '5.8M', pe: '15.2', risk: 'low', marketCap: '$110B' },
      { symbol: 'SYK', name: 'Stryker Corporation', sector: 'Healthcare', currentPrice: 342.80, change: 1.1, volume: '1.2M', pe: '32.5', risk: 'medium', marketCap: '$130B' },
      { symbol: 'ZTS', name: 'Zoetis Inc.', sector: 'Healthcare', currentPrice: 178.90, change: 0.8, volume: '2.5M', pe: '35.8', risk: 'low', marketCap:  '$82B' },
      { symbol: 'CI', name: 'The Cigna Group', sector: 'Healthcare', currentPrice:  352.40, change: 0.6, volume: '1.8M', pe: '12.8', risk: 'low', marketCap: '$102B' },
      { symbol: 'HUM', name: 'Humana Inc. ', sector: 'Healthcare', currentPrice:  368.90, change: -0.5, volume: '0.9M', pe: '15.2', risk: 'medium', marketCap:  '$45B' },
      
      // ============== CONSUMER GOODS (15 stocks) ==============
      { symbol:  'PG', name: 'Procter & Gamble Co.', sector: 'Consumer Goods', currentPrice:  165.20, change: 0.4, volume: '4.2M', pe: '27.3', risk: 'low', marketCap:  '$389B' },
      { symbol: 'KO', name:  'Coca-Cola Company', sector:  'Consumer Goods', currentPrice: 62.50, change: 0.2, volume: '12.5M', pe: '24.8', risk: 'low', marketCap:  '$270B' },
      { symbol: 'PEP', name: 'PepsiCo Inc.', sector: 'Consumer Goods', currentPrice: 175.80, change: 0.5, volume: '5.2M', pe: '26.2', risk: 'low', marketCap:  '$242B' },
      { symbol: 'COST', name: 'Costco Wholesale Corp.', sector: 'Consumer Goods', currentPrice: 725.40, change: 1.8, volume: '2.1M', pe: '48.5', risk: 'medium', marketCap: '$322B' },
      { symbol: 'WMT', name:  'Walmart Inc.', sector: 'Consumer Goods', currentPrice: 165.20, change: 0.6, volume: '8.5M', pe: '28.2', risk: 'low', marketCap:  '$445B' },
      { symbol: 'NKE', name:  'Nike Inc. ', sector: 'Consumer Goods', currentPrice: 98.50, change: -0.5, volume: '6.2M', pe: '28.5', risk: 'medium', marketCap: '$148B' },
      { symbol: 'MCD', name:  'McDonalds Corporation', sector: 'Consumer Goods', currentPrice: 285.60, change: 0.8, volume: '3.2M', pe: '24.5', risk: 'low', marketCap: '$205B' },
      { symbol: 'SBUX', name: 'Starbucks Corporation', sector: 'Consumer Goods', currentPrice: 92.50, change: 0.6, volume: '8.5M', pe: '25.8', risk: 'medium', marketCap: '$105B' },
      { symbol: 'PM', name: 'Philip Morris International', sector: 'Consumer Goods', currentPrice: 95.80, change: 0.3, volume: '4.5M', pe: '18.2', risk: 'medium', marketCap: '$148B' },
      { symbol: 'MO', name: 'Altria Group Inc.', sector: 'Consumer Goods', currentPrice: 42.50, change: 0.2, volume: '8.2M', pe: '8.5', risk: 'medium', marketCap: '$75B' },
      { symbol: 'CL', name: 'Colgate-Palmolive Co.', sector: 'Consumer Goods', currentPrice:  92.40, change: 0.4, volume: '3.5M', pe: '28.5', risk: 'low', marketCap:  '$76B' },
      { symbol: 'EL', name: 'Estee Lauder Companies', sector: 'Consumer Goods', currentPrice: 145.80, change: -1.2, volume: '2.8M', pe: '42.5', risk: 'medium', marketCap: '$52B' },
      { symbol: 'KMB', name: 'Kimberly-Clark Corp.', sector: 'Consumer Goods', currentPrice: 128.50, change: 0.3, volume: '1.8M', pe: '22.5', risk: 'low', marketCap: '$43B' },
      { symbol: 'GIS', name: 'General Mills Inc.', sector: 'Consumer Goods', currentPrice: 68.90, change: 0.2, volume: '3.2M', pe: '16.8', risk: 'low', marketCap:  '$39B' },
      { symbol: 'K', name: 'Kellanova', sector: 'Consumer Goods', currentPrice: 58.40, change: 0.4, volume: '2.5M', pe: '18.2', risk: 'low', marketCap:  '$20B' },
      
      // ============== ENERGY (15 stocks) ==============
      { symbol:  'XOM', name: 'Exxon Mobil Corporation', sector: 'Energy', currentPrice:  105.60, change: -1.2, volume: '15.3M', pe: '12.8', risk: 'medium', marketCap: '$421B' },
      { symbol: 'CVX', name: 'Chevron Corporation', sector: 'Energy', currentPrice:  155.80, change: -0.8, volume: '8.5M', pe: '11.5', risk: 'medium', marketCap: '$292B' },
      { symbol: 'COP', name: 'ConocoPhillips', sector: 'Energy', currentPrice: 118.40, change: -1.5, volume: '5.8M', pe: '10.2', risk: 'medium', marketCap: '$138B' },
      { symbol: 'SLB', name: 'Schlumberger Ltd.', sector: 'Energy', currentPrice: 52.30, change: -0.6, volume: '8.2M', pe: '15.8', risk: 'high', marketCap:  '$74B' },
      { symbol: 'EOG', name: 'EOG Resources Inc.', sector: 'Energy', currentPrice: 125.80, change: -0.9, volume: '3.5M', pe: '9.8', risk: 'medium', marketCap: '$73B' },
      { symbol: 'PXD', name: 'Pioneer Natural Resources', sector: 'Energy', currentPrice: 225.40, change: -1.1, volume: '2.2M', pe: '8.5', risk: 'medium', marketCap: '$52B' },
      { symbol: 'MPC', name: 'Marathon Petroleum Corp.', sector: 'Energy', currentPrice: 168.90, change: -0.5, volume: '3.8M', pe: '6.2', risk: 'medium', marketCap: '$62B' },
      { symbol: 'VLO', name: 'Valero Energy Corp.', sector: 'Energy', currentPrice: 145.60, change: -0.8, volume: '3.2M', pe: '5.8', risk: 'medium', marketCap: '$48B' },
      { symbol: 'PSX', name: 'Phillips 66', sector: 'Energy', currentPrice: 142.80, change: -0.6, volume: '2.5M', pe: '7.5', risk: 'medium', marketCap: '$58B' },
      { symbol: 'OXY', name: 'Occidental Petroleum', sector: 'Energy', currentPrice: 62.50, change: -1.8, volume: '12.5M', pe: '8.2', risk: 'high', marketCap:  '$55B' },
      { symbol: 'HAL', name: 'Halliburton Company', sector: 'Energy', currentPrice:  38.90, change: -0.5, volume: '8.5M', pe: '12.5', risk: 'high', marketCap:  '$35B' },
      { symbol: 'DVN', name: 'Devon Energy Corp.', sector: 'Energy', currentPrice: 48.20, change: -1.2, volume: '8.2M', pe: '7.8', risk: 'high', marketCap:  '$30B' },
      { symbol: 'BKR', name: 'Baker Hughes Company', sector: 'Energy', currentPrice:  35.60, change: -0.4, volume: '5.8M', pe: '18.5', risk: 'medium', marketCap:  '$35B' },
      { symbol: 'KMI', name: 'Kinder Morgan Inc.', sector: 'Energy', currentPrice: 18.50, change: 0.2, volume: '12.5M', pe: '15.2', risk: 'low', marketCap: '$41B' },
      { symbol: 'WMB', name: 'Williams Companies Inc.', sector: 'Energy', currentPrice: 38.90, change: 0.3, volume: '6.8M', pe: '18.5', risk: 'low', marketCap:  '$47B' },
      
      // ============== AUTOMOTIVE (10 stocks) ==============
      { symbol:  'TSLA', name:  'Tesla Inc. ', sector: 'Automotive', currentPrice: 248.50, change: -2.1, volume: '98.5M', pe: '72.1', risk: 'high', marketCap: '$789B' },
      { symbol: 'F', name: 'Ford Motor Company', sector:  'Automotive', currentPrice: 12.80, change: 0.4, volume: '52.3M', pe: '11.5', risk: 'medium', marketCap: '$51B' },
      { symbol: 'GM', name: 'General Motors Co.', sector: 'Automotive', currentPrice: 42.50, change: 0.8, volume: '12.5M', pe: '5.8', risk: 'medium', marketCap: '$49B' },
      { symbol: 'TM', name: 'Toyota Motor Corp.', sector: 'Automotive', currentPrice: 245.80, change: 0.3, volume: '1.2M', pe: '10.5', risk: 'low', marketCap:  '$320B' },
      { symbol: 'RIVN', name: 'Rivian Automotive', sector: 'Automotive', currentPrice:  18.50, change: -3.5, volume: '28.5M', pe: '0', risk: 'high', marketCap: '$18B' },
      { symbol: 'LCID', name: 'Lucid Group Inc.', sector: 'Automotive', currentPrice: 4.80, change: -2.8, volume: '32.5M', pe: '0', risk: 'high', marketCap: '$11B' },
      { symbol: 'NIO', name: 'NIO Inc.', sector: 'Automotive', currentPrice: 8.20, change: -1.5, volume: '45.2M', pe: '0', risk: 'high', marketCap: '$16B' },
      { symbol: 'XPEV', name: 'XPeng Inc.', sector: 'Automotive', currentPrice: 12.50, change: -2.2, volume: '12.8M', pe: '0', risk: 'high', marketCap: '$11B' },
      { symbol: 'STLA', name: 'Stellantis N.V.', sector: 'Automotive', currentPrice: 22.80, change: 0.5, volume: '5.8M', pe: '3.5', risk: 'medium', marketCap: '$68B' },
      { symbol: 'HMC', name: 'Honda Motor Co.', sector: 'Automotive', currentPrice: 38.50, change: 0.4, volume: '2.5M', pe: '8.2', risk: 'low', marketCap:  '$65B' },
      
      // ============== RETAIL (12 stocks) ==============
      { symbol:  'HD', name: 'Home Depot Inc. ', sector: 'Retail', currentPrice: 345.70, change: 1.1, volume: '4.5M', pe: '23.4', risk: 'medium', marketCap:  '$345B' },
      { symbol: 'LOW', name: 'Lowes Companies Inc.', sector: 'Retail', currentPrice: 225.80, change: 0.8, volume: '3.2M', pe: '18.5', risk: 'medium', marketCap:  '$132B' },
      { symbol: 'TGT', name: 'Target Corporation', sector: 'Retail', currentPrice: 155.40, change: -0.4, volume: '4.8M', pe: '16.2', risk: 'medium', marketCap: '$72B' },
      { symbol: 'TJX', name:  'TJX Companies Inc.', sector: 'Retail', currentPrice: 98.50, change: 0.6, volume: '4.2M', pe: '25.8', risk: 'low', marketCap:  '$112B' },
      { symbol: 'ROST', name: 'Ross Stores Inc.', sector: 'Retail', currentPrice:  145.80, change: 0.8, volume: '2.5M', pe: '22.5', risk: 'low', marketCap:  '$49B' },
      { symbol: 'DG', name: 'Dollar General Corp.', sector: 'Retail', currentPrice: 135.60, change: -0.5, volume: '2.8M', pe: '18.2', risk: 'medium', marketCap: '$30B' },
      { symbol: 'DLTR', name: 'Dollar Tree Inc.', sector: 'Retail', currentPrice: 142.80, change: -0.3, volume: '2.2M', pe: '22.5', risk: 'medium', marketCap: '$31B' },
      { symbol: 'ORLY', name: 'OReilly Automotive', sector: 'Retail', currentPrice: 985.40, change: 1.2, volume: '0.4M', pe: '28.5', risk: 'low', marketCap:  '$58B' },
      { symbol: 'AZO', name: 'AutoZone Inc.', sector: 'Retail', currentPrice:  2850.60, change: 0.8, volume: '0.2M', pe: '22.5', risk: 'low', marketCap:  '$52B' },
      { symbol: 'BBY', name: 'Best Buy Co.  Inc.', sector: 'Retail', currentPrice: 78.50, change: 0.5, volume: '3.5M', pe: '12.5', risk: 'medium', marketCap: '$17B' },
      { symbol: 'ULTA', name: 'Ulta Beauty Inc.', sector: 'Retail', currentPrice: 485.60, change: 1.5, volume: '0.8M', pe: '18.2', risk: 'medium', marketCap: '$24B' },
      { symbol: 'LULU', name: 'Lululemon Athletica', sector:  'Retail', currentPrice: 398.50, change: 2.2, volume: '1.2M', pe: '32.5', risk: 'medium', marketCap:  '$50B' },
      
      // ============== ENTERTAINMENT (10 stocks) ==============
      { symbol:  'DIS', name: 'Walt Disney Company', sector:  'Entertainment', currentPrice: 112.30, change: -0.8, volume: '9.8M', pe: '45.2', risk: 'medium', marketCap:  '$205B' },
      { symbol: 'CMCSA', name:  'Comcast Corporation', sector: 'Entertainment', currentPrice: 42.80, change: 0.3, volume: '18.5M', pe: '11.2', risk: 'low', marketCap:  '$168B' },
      { symbol: 'WBD', name: 'Warner Bros. Discovery', sector: 'Entertainment', currentPrice:  8.50, change: -1.2, volume: '25.8M', pe: '0', risk: 'high', marketCap:  '$21B' },
      { symbol: 'PARA', name: 'Paramount Global', sector: 'Entertainment', currentPrice:  12.80, change: -0.8, volume: '15.2M', pe: '0', risk: 'high', marketCap: '$8B' },
      { symbol: 'LYV', name: 'Live Nation Entertainment', sector: 'Entertainment', currentPrice:  98.50, change: 1.5, volume: '2.5M', pe: '85.2', risk: 'high', marketCap: '$22B' },
      { symbol: 'SPOT', name: 'Spotify Technology', sector: 'Entertainment', currentPrice:  285.60, change: 2.8, volume: '2.2M', pe: '0', risk: 'high', marketCap: '$55B' },
      { symbol: 'RBLX', name: 'Roblox Corporation', sector: 'Entertainment', currentPrice: 42.50, change: 3.2, volume: '8.5M', pe: '0', risk: 'high', marketCap: '$25B' },
      { symbol: 'EA', name: 'Electronic Arts Inc.', sector: 'Entertainment', currentPrice: 138.90, change: 0.5, volume: '2.8M', pe: '32.5', risk: 'medium', marketCap: '$38B' },
      { symbol: 'TTWO', name: 'Take-Two Interactive', sector: 'Entertainment', currentPrice: 158.40, change: 0.8, volume: '1.5M', pe: '0', risk: 'high', marketCap: '$27B' },
      { symbol: 'MTCH', name: 'Match Group Inc.', sector: 'Entertainment', currentPrice: 35.80, change: -1.2, volume: '4.5M', pe: '22.5', risk: 'high', marketCap:  '$10B' },
      
      // ============== TELECOMMUNICATIONS (8 stocks) ==============
      { symbol:  'T', name: 'AT&T Inc.', sector: 'Telecommunications', currentPrice:  17.80, change: 0.2, volume: '35.2M', pe: '8.5', risk: 'medium', marketCap: '$127B' },
      { symbol: 'VZ', name: 'Verizon Communications', sector: 'Telecommunications', currentPrice: 42.50, change: 0.1, volume: '15.8M', pe: '9.2', risk: 'low', marketCap:  '$179B' },
      { symbol: 'TMUS', name: 'T-Mobile US Inc.', sector: 'Telecommunications', currentPrice: 165.80, change: 1.2, volume: '4.5M', pe: '24.5', risk: 'medium', marketCap: '$194B' },
      { symbol: 'CHTR', name: 'Charter Communications', sector: 'Telecommunications', currentPrice: 285.60, change: 0.5, volume: '1.2M', pe: '10.5', risk: 'medium', marketCap: '$42B' },
      { symbol: 'AMT', name: 'American Tower Corp.', sector: 'Telecommunications', currentPrice: 198.50, change: 0.8, volume: '2.5M', pe: '42.5', risk: 'low', marketCap:  '$92B' },
      { symbol: 'CCI', name: 'Crown Castle Inc.', sector: 'Telecommunications', currentPrice: 112.80, change: 0.4, volume: '2.8M', pe: '35.8', risk: 'low', marketCap:  '$49B' },
      { symbol: 'SBAC', name: 'SBA Communications', sector: 'Telecommunications', currentPrice: 225.40, change: 0.6, volume: '0.8M', pe: '45.2', risk: 'medium', marketCap: '$24B' },
      { symbol: 'LBRDK', name: 'Liberty Broadband', sector: 'Telecommunications', currentPrice: 58.90, change: 0.3, volume: '0.5M', pe: '15.8', risk: 'medium', marketCap: '$9B' },
      
      // ============== AEROSPACE & DEFENSE (8 stocks) ==============
      { symbol:  'BA', name: 'Boeing Company', sector:  'Aerospace', currentPrice: 185.60, change: -1.5, volume: '5.8M', pe: '0', risk: 'high', marketCap: '$112B' },
      { symbol: 'LMT', name: 'Lockheed Martin Corp.', sector: 'Aerospace', currentPrice: 458.90, change: 0.8, volume: '1.2M', pe: '18.5', risk: 'low', marketCap:  '$110B' },
      { symbol: 'RTX', name: 'RTX Corporation', sector:  'Aerospace', currentPrice: 98.50, change: 0.5, volume: '4.5M', pe: '35.2', risk: 'medium', marketCap: '$132B' },
      { symbol: 'NOC', name: 'Northrop Grumman Corp.', sector: 'Aerospace', currentPrice: 468.90, change: 0.6, volume: '0.8M', pe: '18.2', risk: 'low', marketCap:  '$70B' },
      { symbol: 'GD', name: 'General Dynamics Corp.', sector: 'Aerospace', currentPrice: 285.60, change: 0.4, volume: '1.2M', pe: '22.5', risk: 'low', marketCap:  '$78B' },
      { symbol: 'LHX', name: 'L3Harris Technologies', sector: 'Aerospace', currentPrice: 218.40, change: 0.5, volume: '0.9M', pe: '25.8', risk: 'low', marketCap:  '$42B' },
      { symbol: 'TDG', name: 'TransDigm Group Inc. ', sector: 'Aerospace', currentPrice: 1285.60, change: 1.2, volume: '0.3M', pe: '42.5', risk: 'medium', marketCap:  '$72B' },
      { symbol: 'HII', name: 'Huntington Ingalls', sector: 'Aerospace', currentPrice:  268.90, change: 0.3, volume: '0.4M', pe: '15.8', risk: 'low', marketCap:  '$11B' },
      
      // ============== INDUSTRIALS (10 stocks) ==============
      { symbol:  'CAT', name: 'Caterpillar Inc.', sector: 'Industrials', currentPrice:  342.80, change: 1.2, volume: '2.5M', pe: '18.5', risk: 'medium', marketCap: '$168B' },
      { symbol: 'DE', name: 'Deere & Company', sector: 'Industrials', currentPrice: 385.60, change: 0.8, volume: '1.5M', pe: '12.5', risk: 'medium', marketCap: '$112B' },
      { symbol: 'UPS', name: 'United Parcel Service', sector: 'Industrials', currentPrice: 145.80, change: 0.5, volume: '3.2M', pe: '15.8', risk: 'low', marketCap:  '$125B' },
      { symbol: 'FDX', name: 'FedEx Corporation', sector: 'Industrials', currentPrice: 268.90, change: 0.9, volume: '1.8M', pe: '15.2', risk: 'medium', marketCap: '$68B' },
      { symbol: 'HON', name: 'Honeywell International', sector: 'Industrials', currentPrice: 198.50, change: 0.4, volume: '2.5M', pe: '22.5', risk: 'low', marketCap:  '$132B' },
      { symbol: 'MMM', name: '3M Company', sector: 'Industrials', currentPrice: 98.50, change: -0.5, volume: '3.8M', pe: '12.5', risk: 'medium', marketCap: '$55B' },
      { symbol: 'GE', name: 'General Electric Co.', sector: 'Industrials', currentPrice: 158.90, change: 1.5, volume: '5.2M', pe: '32.5', risk: 'medium', marketCap: '$172B' },
      { symbol: 'EMR', name: 'Emerson Electric Co.', sector: 'Industrials', currentPrice: 108.50, change: 0.6, volume: '2.2M', pe: '22.8', risk: 'low', marketCap: '$62B' },
      { symbol: 'ETN', name: 'Eaton Corporation', sector: 'Industrials', currentPrice: 298.60, change: 1.2, volume: '1.5M', pe: '32.5', risk: 'medium', marketCap: '$118B' },
      { symbol: 'WM', name: 'Waste Management Inc.', sector: 'Industrials', currentPrice:  205.80, change: 0.4, volume: '1.8M', pe: '32.8', risk: 'low', marketCap:  '$83B' },
      
      // ============== REAL ESTATE (8 stocks) ==============
      { symbol:  'PLD', name: 'Prologis Inc.', sector: 'Real Estate', currentPrice: 128.50, change: 0.8, volume: '4.5M', pe: '42.5', risk: 'low', marketCap:  '$118B' },
      { symbol: 'EQIX', name: 'Equinix Inc.', sector: 'Real Estate', currentPrice:  825.60, change: 1.2, volume: '0.5M', pe: '85.2', risk: 'medium', marketCap: '$78B' },
      { symbol: 'SPG', name: 'Simon Property Group', sector:  'Real Estate', currentPrice: 152.80, change: 0.5, volume: '2.2M', pe: '22.5', risk: 'medium', marketCap: '$50B' },
      { symbol: 'O', name: 'Realty Income Corp.', sector: 'Real Estate', currentPrice:  58.90, change: 0.3, volume: '5.8M', pe: '42.8', risk: 'low', marketCap:  '$51B' },
      { symbol: 'WELL', name: 'Welltower Inc.', sector: 'Real Estate', currentPrice: 98.50, change: 0.6, volume: '2.5M', pe: '125.5', risk: 'medium', marketCap: '$58B' },
      { symbol: 'DLR', name: 'Digital Realty Trust', sector: 'Real Estate', currentPrice: 142.80, change: 0.8, volume: '1.8M', pe: '85.2', risk: 'medium', marketCap: '$43B' },
      { symbol: 'AVB', name: 'AvalonBay Communities', sector: 'Real Estate', currentPrice:  198.50, change: 0.4, volume: '0.8M', pe: '32.5', risk: 'low', marketCap: '$28B' },
      { symbol: 'EQR', name: 'Equity Residential', sector:  'Real Estate', currentPrice: 68.90, change: 0.3, volume: '1.5M', pe: '35.8', risk: 'low', marketCap:  '$26B' }
    ];

    const insertedStocks = await Stock.insertMany(stocks);
    
    res.json({ 
      message: 'Stocks seeded successfully! ', 
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
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }
    res.json(stock);
  } catch (error) {
    res. status(500).json({ error: error. message });
  }
});

module.exports = router;