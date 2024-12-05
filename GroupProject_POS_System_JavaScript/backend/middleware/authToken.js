const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Split header and token.
  if (!token) return res.json({ error: "Access denied" }); // No token.

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // User verified.
    next();
  } catch (err) {
    res.json({ error: "Invalid token" });
  }
}

module.exports = { authenticateToken };
