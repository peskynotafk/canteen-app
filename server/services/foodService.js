const Food = require("../models/Food");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function getAllFoods(query = {}) {
  const {
    q,
    category,
    isAvailable,
    page = 1,
    limit = 10
  } = query;

  // Never return soft-deleted food items
  const filter = {
    isDeleted: { $ne: true }
  };

  // Search by food name or description
  if (q) {
    const searchRegex = new RegExp(escapeRegex(q), "i");

    filter.$or = [
      { name: searchRegex },
      { description: searchRegex }
    ];
  }

  // Filter by category, ignoring letter case
  if (category) {
    filter.category = new RegExp(
      `^${escapeRegex(category)}$`,
      "i"
    );
  }

  // Filter by availability
  if (isAvailable !== undefined) {
    filter.isAvailable = isAvailable === "true";
  }

  const skip = (page - 1) * limit;

  const [foods, total] = await Promise.all([
    Food.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit),

    Food.countDocuments(filter)
  ]);

  return {
    foods,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

async function getFoodById(id) {
  return await Food.findOne({
    _id: id,
    isDeleted: { $ne: true }
  });
}

async function createFood(foodData) {
  return await Food.create(foodData);
}

async function updateFood(id, updates) {
  return await Food.findOneAndUpdate(
    {
      _id: id,
      isDeleted: { $ne: true }
    },
    updates,
    {
      new: true,
      runValidators: true
    }
  );
}

async function deleteFood(id) {
  return await Food.findOneAndUpdate(
    {
      _id: id,
      isDeleted: { $ne: true }
    },
    {
      $set: { isDeleted: true }
    },
    {
      new: true,
      runValidators: true
    }
  );
}

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
};