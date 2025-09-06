let transactions = [];

// Function to add a transaction
const addTransaction = (transaction) => {
    transactions.push(transaction);
};

// Function to get all transactions
const getAllTransactions = () => {
    return transactions;
};

// Function to search transactions based on title, description, or price
const searchTransactions = (search) => {
    return transactions.filter(transaction =>
        transaction.productTitle.includes(search) ||
        transaction.productDescription.includes(search) ||
        transaction.price.toString().includes(search)
    );
};

// Function to get transactions by page
const getTransactionsByPage = (page, perPage) => {
    const startIndex = (page - 1) * perPage;
    return transactions.slice(startIndex, startIndex + perPage);
};

// Function to get statistics by month
const getStatisticsByMonth = (month) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = monthNames.indexOf(month);

    if (monthIndex === -1) {
        throw new Error('Invalid month');
    }

    const filteredTransactions = transactions.filter(transaction => {
        const date = new Date(transaction.dateOfSale);
        return date.getMonth() === monthIndex; // Check if the month matches
    });

    const totalSaleAmount = filteredTransactions.reduce((total, transaction) => {
        return total + (transaction.sold ? transaction.price : 0);
    }, 0);

    const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = filteredTransactions.length - totalSoldItems;

    return {
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems,
    };
};

// Function to get price range statistics
const getPriceRangeStatistics = (month) => {
    const priceRanges = {
        '0-100': 0,
        '101-200': 0,
        '201-300': 0,
        '301-400': 0,
        '401-500': 0,
        '501-600': 0,
        '601-700': 0,
        '701-800': 0,
        '801-900': 0,
        '901-above': 0
    };

    const filteredTransactions = transactions.filter(transaction => {
        const dateOfSale = new Date(transaction.dateOfSale);
        return dateOfSale.getMonth() + 1 === parseInt(month);
    });

    filteredTransactions.forEach(transaction => {
        const price = transaction.price;

        if (price <= 100) priceRanges['0-100']++;
        else if (price <= 200) priceRanges['101-200']++;
        else if (price <= 300) priceRanges['201-300']++;
        else if (price <= 400) priceRanges['301-400']++;
        else if (price <= 500) priceRanges['401-500']++;
        else if (price <= 600) priceRanges['501-600']++;
        else if (price <= 700) priceRanges['601-700']++;
        else if (price <= 800) priceRanges['701-800']++;
        else if (price <= 900) priceRanges['801-900']++;
        else priceRanges['901-above']++;
    });

    return priceRanges;
};

// Function to get category statistics
const getCategoryStatistics = (month) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = monthNames.indexOf(month);
  
    if (monthIndex === -1) {
      throw new Error('Invalid month');
    }
  
    // Filter transactions by the selected month
    const filteredTransactions = transactions.filter(transaction => {
      const dateOfSale = new Date(transaction.dateOfSale);
      return dateOfSale.getMonth() === monthIndex;
    });
  
    // Create an object to store category counts
    const categoryCount = {};
  
    filteredTransactions.forEach(transaction => {
      const category = transaction.category || 'Unknown'; // Handle undefined categories
  
      if (categoryCount[category]) {
        categoryCount[category]++;
      } else {
        categoryCount[category] = 1;
      }
    });
  
    return categoryCount;
};

// Exporting the functions
module.exports = {
    addTransaction,
    getAllTransactions,
    searchTransactions,
    getTransactionsByPage,
    getStatisticsByMonth,
    getPriceRangeStatistics,
    getCategoryStatistics
};
