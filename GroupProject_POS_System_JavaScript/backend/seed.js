const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For hashing passwords

const Customer = require("./models/customer");
const Employee = require("./models/employee");
const Service = require("./models/service");
const Transaction = require("./models/transaction");
const TransactionDetail = require("./models/transactionDetails");

async function seed() {
  try {
    // Check if collections already contain data, only seed if empty
    const employeeCount = await Employee.countDocuments();
    const serviceCount = await Service.countDocuments();
    const customerCount = await Customer.countDocuments();
    const transactionCount = await Transaction.countDocuments();

    if (
      employeeCount > 0 ||
      serviceCount > 0 ||
      customerCount > 0 ||
      transactionCount > 0
    ) {
      console.log("Database already seeded, skipping seed.");
      return; // Exit if data already exists
    }

    // Seed Employees
    const alice = new Employee({
      firstName: "Alice",
      lastName: "Kosh",
      email: "alice.kosh@example.com",
      passwordHash: await bcrypt.hash("alicepassword", 10),
      role: "Staff",
    });
    const bob = new Employee({
      firstName: "Bob",
      lastName: "Mash",
      email: "bob.mash@example.com",
      passwordHash: await bcrypt.hash("bobpassword", 10),
      role: "Admin",
    });

    await alice.save();
    await bob.save();

    // Seed Services
    const menHaircut = new Service({
      serviceName: "Men's Haircut",
      category: "Haircut",
      price: 25.0,
    });
    const womenHaircut = new Service({
      serviceName: "Women's Haircut",
      category: "Haircut",
      price: 35.0,
    });

    await menHaircut.save();
    await womenHaircut.save();

    // Seed Customers
    const john = new Customer({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
      email: "john.doe@example.com",
    });
    const jane = new Customer({
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "987-654-3210",
      email: "jane.smith@example.com",
    });

    await john.save();
    await jane.save();

    // Seed Transactions
    const transaction = new Transaction({
      employee: alice._id,
      customer: john._id,
      totalAmount: 60.0,
      paymentType: "Cash",
      transactionDate: new Date(),
      transactionDetails: [
        {
          service: menHaircut._id,
          quantity: 1,
          subtotal: 25.0,
        },
        {
          service: womenHaircut._id,
          quantity: 1,
          subtotal: 35.0,
        },
      ],
    });

    await transaction.save();

    // Seed Transaction Details
    const transactionDetail1 = new TransactionDetail({
      transaction: transaction._id,
      service: menHaircut._id,
      quantity: 1,
      subtotal: 25.0,
    });
    const transactionDetail2 = new TransactionDetail({
      transaction: transaction._id,
      service: womenHaircut._id,
      quantity: 1,
      subtotal: 35.0,
    });

    await transactionDetail1.save();
    await transactionDetail2.save();

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

module.exports = seed;
