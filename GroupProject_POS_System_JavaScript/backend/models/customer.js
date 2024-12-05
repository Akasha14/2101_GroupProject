const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }], // Reference to transactions.
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
