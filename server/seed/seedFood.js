require("../config/env");

const mongoose = require("mongoose");
const dbConnection = require("../db");
const Food = require("../models/Food");

const sampleFoods = [
  {
    name: "Veg Burger",
    description: "Vegetable patty burger",
    pricePaise: 6000,
    category: "Snacks",
    isAvailable: true
  },
  {
    name: "Masala Maggi",
    description: "Instant noodles with masala",
    pricePaise: 4000,
    category: "Snacks",
    isAvailable: true
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee",
    pricePaise: 5000,
    category: "Drinks",
    isAvailable: true
  }
];

async function seedFood() {
  try {
    await dbConnection;

    for (const food of sampleFoods) {
      await Food.updateOne(
        { name: food.name },
        { $set: food },
        { upsert: true, runValidators: true }
      );
    }

    console.log("Food seed completed successfully.");
  } catch (error) {
    console.error("Food seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedFood();
