const mongoose = require("mongoose");

const transactionDetailSchema = new mongoose.Schema({
  transaction: {
    // Reference to Transaction.
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  service: {
    // Reference to Service.
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  quantity: { type: Number, required: true },
  subtotal: { type: mongoose.Schema.Types.Decimal128, required: true },
});

const TransactionDetail = mongoose.model(
  "TransactionDetail",
  transactionDetailSchema
);

module.exports = TransactionDetail;
