const express = require("express");

const foodController = require("../controllers/foodController");

const {
  createFoodSchema,
  updateFoodSchema,
  foodQuerySchema
} = require("../validators/foodValidator");

const validate = require("../middleware/validate");
const validateQuery = require("../middleware/validateQuery");

const {
  protect,
  staffOnly
} = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  validateQuery(foodQuerySchema),
  foodController.getAllFoods
);

router.get("/:id", foodController.getFoodById);

router.post(
  "/",
  protect,
  staffOnly,
  validate(createFoodSchema),
  foodController.createFood
);

router.patch(
  "/:id",
  protect,
  staffOnly,
  validate(updateFoodSchema),
  foodController.updateFood
);

router.delete(
  "/:id",
  protect,
  staffOnly,
  foodController.deleteFood
);

module.exports = router;