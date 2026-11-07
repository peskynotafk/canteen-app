const mongoose = require("mongoose");
const crypto = require("crypto");

const Order = require("../models/Order");
const Food = require("../models/Food");

async function createOrder(userId, items) {
  for (const item of items) {
    if (!mongoose.isValidObjectId(item.foodId)) {
      const error = new Error(`Invalid food ID: ${item.foodId}`);
      error.statusCode = 400;
      throw error;
    }
  }
  const foodIds = items.map((item) => item.foodId.toString());
  const uniqueFoodIds = new Set(foodIds);

  if (uniqueFoodIds.size !== foodIds.length) {
    const error = new Error(
      "Each food item can appear only once. Combine its quantity."
    );
    error.statusCode = 400;
    throw error;
  }

  const foods = await Food.find({
    _id: { $in: foodIds },
    isAvailable: true,
    isDeleted: { $ne: true }
  });

  if (foods.length !== items.length) {
    const error = new Error(
      "One or more food items do not exist or are unavailable."
    );
    error.statusCode = 400;
    throw error;
  }

  const foodById = new Map(
    foods.map((food) => [food._id.toString(), food])
  );

  let totalPaise = 0;

  const orderItems = items.map((item) => {
    const food = foodById.get(item.foodId.toString());

    const unitPricePaise = food.pricePaise;
    const subtotalPaise = unitPricePaise * item.quantity;

    if (
      !Number.isSafeInteger(unitPricePaise) ||
      !Number.isSafeInteger(subtotalPaise)
    ) {
      const error = new Error("Food price calculation is invalid.");
      error.statusCode = 400;
      throw error;
    }

    totalPaise += subtotalPaise;

    if (!Number.isSafeInteger(totalPaise)) {
      const error = new Error("Order total is too large.");
      error.statusCode = 400;
      throw error;
    }

    return {
      food: food._id,
      name: food.name,
      unitPricePaise,
      quantity: item.quantity,
      subtotalPaise
    };
  });

  const orderNumber =
    `ORD-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

  return await Order.create({
    orderNumber,
    user: userId,
    items: orderItems,
    totalPaise,
    status: "PENDING"
  });
}

async function getMyOrders(userId) {
  return await Order.find({ user: userId })
    .sort({ createdAt: -1 });
}

async function getAllOrders() {
  return await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
}

async function getOrderById(orderId) {
  return await Order.findById(orderId)
    .populate("user", "name email");
}

const allowedTransitions = {
  PENDING: ["ACCEPTED", "REJECTED"],
  ACCEPTED: ["PREPARING"],
  PREPARING: ["READY"],
  READY: ["COLLECTED"],
  COLLECTED: [],
  REJECTED: [],
  CANCELLED: []
};

async function updateOrderStatus(orderId, nextStatus) {
  const order = await Order.findById(orderId);

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedStatuses = allowedTransitions[order.status];

  if (!allowedStatuses.includes(nextStatus)) {
    const error = new Error(
      `Cannot change order status from ${order.status} to ${nextStatus}`
    );
    error.statusCode = 409;
    throw error;
  }

  order.status = nextStatus;
  await order.save();

  return order;
}

async function cancelOrder(orderId, userId) {
  const order = await Order.findById(orderId);

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  if (order.user.toString() !== userId) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  if (order.status !== "PENDING") {
    const error = new Error(
      "Only pending orders can be cancelled"
    );
    error.statusCode = 409;
    throw error;
  }

  order.status = "CANCELLED";
  await order.save();

  return order;
}

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
};