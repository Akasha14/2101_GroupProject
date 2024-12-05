const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true }, // Use Decimal128 for precise decimal representation.
  transactionDetails: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TransactionDetail" },
  ], // Reference to transaction details.
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
