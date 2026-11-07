const mongoose = require("mongoose");
const foodService = require("../services/foodService");

async function getAllFoods(req, res, next) {
  try {
    const result = await foodService.getAllFoods(
      req.validatedQuery
    );

    res.status(200).json({
      success: true,
      count: result.foods.length,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages
      },
      data: result.foods
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

async function createFood(req, res, next) {
  try {
    const food = await foodService.createFood(req.body);

    res.status(201).json({
      success: true,
      message: "Food item created successfully",
      data: food
    });
  } catch (error) {
    next(error);
  }
}

async function updateFood(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID"
      });
    }

    const food = await foodService.updateFood(id, req.body);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      data: food
    });
  } catch (error) {
    next(error);
  }
}

async function deleteFood(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID"
      });
    }

    const food = await foodService.deleteFood(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item soft-deleted successfully",
      data: food
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};