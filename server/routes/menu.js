const express = require("express");
const Menu = require("../models/Menu");
const { protect, staffOnly } = require("../middleware/auth");

const router = express.Router();

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    console.error("Failed to fetch menu:", error.message);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
});

// GET one menu item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Failed to fetch menu item:", error.message);
    res.status(400).json({
      message: "Invalid menu item ID or request"
    });
  }
});

// POST a new menu item — staff/admin only
router.post("/", protect, staffOnly, async (req, res) => {
  try {
    const newItem = await Menu.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Failed to create menu item:", error.message);
    res.status(400).json({
      message: "Failed to create menu item",
      error: error.message
    });
  }
});

// PATCH an existing menu item — staff/admin only
router.patch("/:id", protect, staffOnly, async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Failed to update menu item:", error.message);
    res.status(400).json({
      message: "Failed to update menu item",
      error: error.message
    });
  }
});

// DELETE a menu item — staff/admin only
router.delete("/:id", protect, staffOnly, async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({
      message: "Item deleted successfully",
      item: deletedItem
    });
  } catch (error) {
    console.error("Failed to delete menu item:", error.message);
    res.status(400).json({
      message: "Failed to delete menu item"
    });
  }
});

module.exports = router;
