const axios = require('axios');
const express = require('express');

const {
  addTransaction,
  getAllTransactions,
  searchTransactions,
  getTransactionsByPage,
  getStatisticsByMonth,
  getPriceRangeStatistics,
  getCategoryStatistics
} = require('./data');

const cors = require('cors');

const app = express(); // Initialize the Express app
app.use(cors({
  origin: 'http://localhost:3000', // Allow only requests from this origin
}));

exports.initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    transactions.forEach(addTransaction);
    res.status(200).send('Database initialized with seed data.');
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).send('Error initializing database.');
  }
};

exports.getTransactions = (req, res) => {
  const { page = 1, perPage = 10, search = '' } = req.query;

  const results = search ? searchTransactions(search) : getAllTransactions();
  const paginatedResults = getTransactionsByPage(page, perPage);
  const total = results.length;

  res.status(200).json({ transactions: paginatedResults, total, page, perPage });
};

exports.getStatistics = (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).send('Month is required');
  }

  const statistics = getStatisticsByMonth(month);
  res.status(200).json(statistics);
};

exports.getPriceRangeStatistics = (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month parameter is required.' });
  }

  const priceRangeStats = getPriceRangeStatistics(month);
  res.status(200).json(priceRangeStats);
};

exports.getCategoryStatistics = (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).send('Month is required');
  }

  try {
    const categoryStatistics = getCategoryStatistics(month);
    res.status(200).json(categoryStatistics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCombinedStatistics = (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month parameter is required.' });
  }

  try {
    const salesStatistics = getStatisticsByMonth(month);
    const priceRangeStatistics = getPriceRangeStatistics(month);
    const categoryStatistics = getCategoryStatistics(month);

    const combinedResponse = {
      salesStatistics,
      priceRangeStatistics,
      categoryStatistics,
    };

    res.status(200).json(combinedResponse);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching combined statistics' });
  }
};
