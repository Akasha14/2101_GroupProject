const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // MongoDB connection function
const seed = require("./seed"); // Seed database function

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB connected");

    // Seed the database (only if it's empty)
    seed();
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const customerRoutes = require("./routes/customerRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/services", serviceRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
