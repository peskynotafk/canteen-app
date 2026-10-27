const Food = require("../models/Food");

async function getAllFoods() {
  return await Food.find().sort({ name: 1 });
}

async function getFoodById(id) {
  return await Food.findById(id);
}

module.exports = {
  getAllFoods,
  getFoodById
};
