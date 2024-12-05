// Middleware to restrict admin-only routes
function authorizeAdmin(req, res, next) {
  if (req.user.role !== "Admin") {
    return res.json({ error: "Access forbidden" });
  }
  next();
}

module.exports = { authorizeAdmin };
