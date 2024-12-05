const express = require("express");
const { authenticateToken } = require("../middleware/authToken");
const {
  getAllServices,
  createService,
  getServiceByName,
} = require("../controllers/serviceController");

const router = express.Router();

// Get all services.
router.get("/", getAllServices);

// Get a service by name.
router.get("/services/name/:name", getServiceByName);

// Create a new service.
router.post("/", authenticateToken, createService);

module.exports = router;
