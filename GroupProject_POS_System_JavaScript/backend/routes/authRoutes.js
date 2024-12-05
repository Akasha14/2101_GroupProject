const express = require("express");
const { login } = require("../controllers/loginController");
const { register } = require("../controllers/registerController");
const { authorizeAdmin } = require("../middleware/authAdmin");
const { authenticateToken } = require("../middleware/authToken");

const router = express.Router();

router.post("/login", login);
router.post("/register", authorizeAdmin, register); // Admin can use this route to register new staff.

module.exports = router;
