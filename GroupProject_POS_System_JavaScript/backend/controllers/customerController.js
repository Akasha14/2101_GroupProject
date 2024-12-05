const Customer = require("../models/customer");

// Add a new customer.
async function addCustomer(req, res) {
  const { firstName, lastName, phoneNumber, email } = req.body;
  try {
    const newCustomer = new Customer({
      firstName,
      lastName,
      phoneNumber,
      email,
    });
    await newCustomer.save();
    res.json({ message: "Customer added successfully" });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

// Search customers by first name, last name, or phone number.
async function searchCustomer(req, res) {
  const { query } = req.params; // Extract query from the path (/customers/search/John).
  try {
    const customers = await Customer.find({
      // $or allows mongoDB to search through each field independantly.
      $or: [{ firstName: query }, { lastName: query }, { phoneNumber: query }],
    });
    res.json(customers); // Return matching customers.
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

module.exports = { addCustomer, searchCustomer };
