const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");

/* --------------------------------------------------
   SEED ROUTE — MUST BE AT TOP
-------------------------------------------------- */
router.get("/seed", async (req, res) => {
  try {
    const sampleStocks = [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        sector: "Technology",
        currentPrice: 190.12,
        change: 1.25,
        volume: "98000000",          // FIXED (String)
        pe: 32.5,
        marketCap: "2900000000000",  // FIXED (String)
        risk: "low",                  // FIXED (enum lowercase)
        lastUpdated: new Date(),
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        sector: "Technology",
        currentPrice: 380.55,
        change: -0.85,
        volume: "22000000",          // FIXED (String)
        pe: 34.1,
        marketCap: "3100000000000",  // FIXED (String)
        risk: "low",                 // FIXED (enum lowercase)
        lastUpdated: new Date(),
      },
    ];

    await Stock.deleteMany({});
    await Stock.insertMany(sampleStocks);

    res.json({
      message: "Database seeded successfully",
      count: sampleStocks.length,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* --------------------------------------------------
   GET ALL STOCKS
-------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* --------------------------------------------------
   GET BY ID — MUST BE LAST
-------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ error: "Not found" });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
