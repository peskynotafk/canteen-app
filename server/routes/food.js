const express = require("express");
const foodController = require("../controllers/foodController");
const { createFoodSchema } = require("../validators/foodValidator");
const validate = require("../middleware/validate");
const { protect, staffOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", foodController.getAllFoods);
router.get("/:id", foodController.getFoodById);

module.exports = router;