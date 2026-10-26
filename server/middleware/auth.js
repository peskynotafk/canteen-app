
const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}


function staffOnly(req, res, next) {
  if (!req.user || !["staff", "admin"].includes(req.user.role)) {
    return res.status(403).json({
      message: "Access denied. Staff access required."
    });
  }

  next();
}


module.exports = { protect, staffOnly };
