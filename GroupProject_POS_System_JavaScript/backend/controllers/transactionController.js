const Transaction = require("../models/transaction");
const TransactionDetail = require("../models/transactionDetails");
const Service = require("../models/service");
const { reset } = require("nodemon");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { employee, customer, paymentType, transactionDetails } = req.body;

    // Calculate the total amount
    let totalAmount = 0;
    const transactionDetailsDocs = await Promise.all(
      transactionDetails.map(async (detail) => {
        const service = await Service.findById(detail.service);
        if (!service)
          throw new Error(`Service with ID ${detail.service} not found`);

        const subtotal = parseFloat(service.price) * detail.quantity;
        totalAmount += subtotal;

        return {
          service: service._id,
          quantity: detail.quantity,
          subtotal,
        };
      })
    );

    // Create the transaction
    const transaction = new Transaction({
      employee,
      customer,
      paymentType,
      transactionDate: new Date(),
      totalAmount,
      transactionDetails: transactionDetailsDocs,
    });

    await transaction.save();

    reset.json({ message: "Transaction created successfully", transaction });
  } catch (err) {
    res.json({ message: "Failed to create transaction", error: err.message });
  }
};

// Get transactions by payment type
const getTransactionsByPaymentType = async (req, res) => {
  try {
    const { paymentType } = req.params; // Extract payment type from the URL params

    // Find all transactions where the payment type matches
    const transactions = await Transaction.find({ paymentType })
      .populate("customer", "name")
      .populate("transactionDetails.service", "serviceName price");

    if (!transactions || transactions.length === 0) {
      return res.json({
        message: "No transactions found for the specified payment type",
      });
    }

    res.json(transactions); // Return the list of matching transactions
  } catch (err) {
    res.json({
      message: "Failed to retrieve transactions",
      error: err.message,
    });
  }
};

// Get daily transactions
const getDailyTransactions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const transactions = await Transaction.find({
      transactionDate: { $gte: today }, // $Greater than or equal to.
    })
      .populate("employee", "name")
      .populate("transactionDetails.service", "serviceName price");

    res.json(transactions);
  } catch (err) {
    res.json({
      message: "Failed to retrieve daily transactions",
      error: err.message,
    });
  }
};

// Get transactions by employee email
const getTransactionsByEmployeeEmail = async (req, res) => {
  try {
    const { email } = req.params; // Extract email from the URL params

    // Find the employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.json({ message: "Employee not found" });
    }

    // Find all transactions associated with the employee
    const transactions = await Transaction.find({ employee: employee._id })
      .populate("employee", "name")
      .populate("transactionDetails.service", "serviceName price");

    if (!transactions || transactions.length === 0) {
      return res.json({ message: "No transactions found for this employee" });
    }

    res.json(transactions); // Return the list of transactions for the employee
  } catch (err) {
    res.json({
      message: "Failed to retrieve transactions",
      error: err.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByPaymentType,
  getDailyTransactions,
  getTransactionsByEmployeeEmail,
};
