const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    unitPricePaise: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "Quantity must be a whole number"
      }
    },

    subtotalPaise: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "An order must contain at least one item"
      }
    },

    totalPaise: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ACCEPTED",
        "PREPARING",
        "READY",
        "COLLECTED",
        "REJECTED",
        "CANCELLED"
      ],
      default: "PENDING",
      required: true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
