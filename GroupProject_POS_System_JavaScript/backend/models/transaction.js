const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  employee: {
    // Reference to Employee.
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // Reference to Customer (optional for walk-ins).
  transactionDate: { type: Date, default: Date.now },
  totalAmount: { type: mongoose.Schema.Types.Decimal128, required: true },
  paymentType: { type: String, required: true },
  transactionDetails: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
      quantity: { type: Number, required: true },
      subtotal: { type: mongoose.Schema.Types.Decimal128, required: true },
    },
  ],
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
