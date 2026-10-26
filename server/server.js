const dbConnection = require("./db");

const Menu = require("./models/Menu");

const express = require("express");

const authRoutes = require("./routes/auth");

const { protect, staffOnly } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = 3000;

const menu = [
  {
    id: 1,
    name: "veg Burger",
    price: 60
  },
  {
    id: 2,
    name: "Masala Maggi",
    price: 40
  },
  {
    id: 3,
    name: "Cold Coffee",
    price: 50
  }
];

app.get("/", (req, res) => {
    res.send("Canteen API is running!");
});

app.get("/api/menu", async (req, res) => {
  try{
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    console.error("Menu fetch error:", error);

    res.status(500).json({
      message: "Failed to fetch menu",
      error: error.message
    });
  }
});

app.get("/api/menu/:id", async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.json(item);

  } catch (error) {
    console.error("Menu fetch error:", error);

    res.status(400).json({
      message: "Invalid menu item ID or request",
    });
  }
});

app.post("/api/menu", protect, staffOnly, async (req, res) => {
  try {
    const newItem = await Menu.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Menu creation error:", error);
    res.status(400).json({
      message: "Failed to create menu item",
      error: error.message
    });
  }
});


console.log("POST route is loaded");

app.patch("/api/menu/:id", async (req, res) => {
  try {
    const updateItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
    { new: true, runValidators: true }
    );

    if (!updateItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.json(updateItem);
  } catch (error) {
    console.error("Menu update error:", error);

    res.status(400).json({
      message: "Failed to update menu item",
      error: error.message
    });
  }
});

app.delete("/api/menu/:id", protect, staffOnly, async (req, res) => {
  console.log("DELETE ROUTE REACHED");
  try {
    console.log("ID received:", req.params.id);

    const deletedItem = await Menu.findByIdAndDelete(req.params.id);

    console.log("Item found:", deletedItem);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Menu item not found"
      });
    }

    res.json({
      message: "Item deleted successfully",
      item: deletedItem
    });
  } catch (error) {
    console.error("Menu deletion error:", error);

    res.status(400).json({
      message: "Failed to delete menu item",
      error: error.message
    });
  }
});


dbConnection
 .then(() => {
   app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
   });
 })
 .catch(() => {
  process.exitCode = 1;
 });

