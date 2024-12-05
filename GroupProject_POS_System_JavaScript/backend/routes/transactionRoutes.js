const express = require("express");
const { authenticateToken } = require("../middleware/authToken");
const { authorizeAdmin } = require("../middleware/authAdmin");

const {
  createTransaction,
  getTransactionsByPaymentType,
  getDailyTransactions,
  getTransactionsByEmployeeEmail,
} = require("../controllers/transactionController");

const router = express.Router();

// Create a new transaction
router.post("/", authenticateToken, createTransaction);

// Get a transactions by payment type.
router.get(
  "/paymentType/:paymentType",
  authenticateToken,
  authorizeAdmin,
  getTransactionsByPaymentType
);

// Get daily transactions
router.get("/daily", authenticateToken, authorizeAdmin, getDailyTransactions);

// Get transactions by employee
router.get(
  "/employee/:email",
  authenticateToken,
  authorizeAdmin,
  getTransactionsByEmployeeEmail
);

module.exports = router;
