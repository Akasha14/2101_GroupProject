const express = require("express");
const { authorizeAdmin } = require("../middleware/authAdmin");
const { authenticateToken } = require("../middleware/authToken");

const {
  getAllEmployees,
  getEmployeeEarnings,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, getAllEmployees);
router.get("/:employeeId/earnings", authenticateToken, getEmployeeEarnings);

module.exports = router;
