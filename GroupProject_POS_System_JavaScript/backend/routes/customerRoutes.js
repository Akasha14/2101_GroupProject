const express = require("express");
const { authenticateToken } = require("../middleware/authToken");
const {
  addCustomer,
  searchCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", authenticateToken, addCustomer);

router.get("/search/:query", authenticateToken, searchCustomer);

module.exports = router;
