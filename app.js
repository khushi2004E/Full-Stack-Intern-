const express = require('express');
const transactionRoutes = require('./transactionRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Use transaction routes
app.use('/api', transactionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
