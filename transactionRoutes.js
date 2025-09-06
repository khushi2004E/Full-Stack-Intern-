const express = require('express');
const router = express.Router();
const {
  initializeDatabase,
  getTransactions,
  getStatistics,
  getPriceRangeStatistics,
  getCategoryStatistics,
  getCombinedStatistics
} = require('./transactionController');

// Define routes
router.get('/initialize', initializeDatabase);
router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/price-range-statistics', getPriceRangeStatistics);
router.get('/category-statistics', getCategoryStatistics);
router.get('/combined-statistics', getCombinedStatistics); // Updated route

module.exports = router;
