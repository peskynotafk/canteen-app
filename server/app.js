const express = require("express");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const foodRoutes = require("./routes/food");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payments");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Canteen API is running!");
});

function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
}

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;