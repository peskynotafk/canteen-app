const mongoose = require("mongoose");
const foodService = require("../services/foodService");

async function getAllFoods(req, res, next) {
  try {
    const foods = await foodService.getAllFoods();

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods
    });
  } catch (error) {
    next(error);
  }
}

async function getFoodById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID"
      });
    }

    const food = await foodService.getFoodById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: food
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllFoods,
  getFoodById
};
