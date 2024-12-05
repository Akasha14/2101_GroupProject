const bcrypt = require("bcrypt"); // For password hashing.

async function register(req, res) {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    // New email required.
    const existingUser = await Employee.findOne({ email });
    if (existingUser) return res.json({ error: "Email already in use" });

    // Generate salt (long string) with bcrypt, then hash with plain text password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      role,
    });

    // Save to DB.
    await newEmployee.save();
    res.json({ message: "Employee registered successfully" });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}
module.exports = { register };
