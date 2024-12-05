// models/employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
