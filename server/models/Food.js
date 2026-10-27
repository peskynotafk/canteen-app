
const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    pricePaise: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Price must be a whole number of paise"
      }
    },

    category: {
      type: String,
      default: "Other",
      trim: true
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
