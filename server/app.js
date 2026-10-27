const express = require("express");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const foodRoutes = require("./routes/food");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Canteen API is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/foods", foodRoutes);

module.exports = app;
