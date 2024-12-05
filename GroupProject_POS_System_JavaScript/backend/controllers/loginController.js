const bcrypt = require("bcrypt"); // For password hashing.
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

async function login(req, res) {
  const { email, password } = req.body;
  try {
    // Find user by email.
    const user = await Employee.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    // Check password.
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.json({ error: "Invalid password" });

    // Generate JWT token.
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "9h" }
    );

    res.json({ token });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

module.exports = { login };
