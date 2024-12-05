const Employee = require("../models/employee");
const Transaction = require("../models/transaction");

// Get all employees.
async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find().select("-passwordHash"); // Exclude password.
    res.json(employees);
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

// Calculate total amount by employee email.
async function getEmployeeEarnings(req, res) {
  const { email } = req.params; // Extract email from the URL params.
  try {
    // Find the employee using the email.
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.json({ error: "Employee not found" });
    }

    // Find all transactions associated with this employee's id.
    const transactions = await Transaction.find({ employee: employee._id });

    // Calculate the total earnings by summing the totalAmount of each transaction.
    const totalEarnings = transactions.reduce(
      (sum, t) => sum + parseFloat(t.totalAmount),
      0
    );

    // Return total earnings.
    res.json({ totalEarnings });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

module.exports = { getAllEmployees, getEmployeeEarnings };
