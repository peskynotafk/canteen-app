const mongoose = require("mongoose");
const crypto = require("crypto");

const Payment = require("../models/Payment");
const Order = require("../models/Order");

async function simulatePayment(orderId, userId, method, outcome) {
  if (!mongoose.isValidObjectId(orderId)) {
    const error = new Error("Invalid order ID");
    error.statusCode = 400;
    throw error;
  }

  const order = await Order.findById(orderId);

  if (!order || order.user.toString() !== userId) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  if (order.status !== "PENDING") {
    const error = new Error(
      "Payment can only be initiated for pending orders"
    );
    error.statusCode = 409;
    throw error;
  }

  const existingSuccessfulPayment = await Payment.findOne({
    order: orderId,
    status: "SUCCESS"
  });

  if (existingSuccessfulPayment) {
    const error = new Error("This order has already been paid");
    error.statusCode = 409;
    throw error;
  }

  const paymentStatus = outcome === "SUCCESS" ? "SUCCESS" : "FAILED";

  const transactionReference =
    paymentStatus === "SUCCESS"
      ? `SIM-${crypto.randomBytes(8).toString("hex").toUpperCase()}`
      : null;

  try {
    return await Payment.create({
      order: order._id,
      user: userId,
      amountPaise: order.totalPaise,
      method,
      status: paymentStatus,
      transactionReference
    });
  } catch (error) {
   if (error.code === 11000) {
      const duplicateError = new Error(
        "This order has already been paid"
      );
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
}

async function getMyPayments(userId) {
  return await Payment.find({ user: userId })
    .populate("order", "orderNumber totalPaise status")
    .sort({ createdAt: -1 });
}

// Staff view: every payment, newest first.
// The user populate selects only name and email, so the password hash
// and role never leave the database.
async function getAllPayments() {
  return await Payment.find()
    .populate("order", "orderNumber totalPaise status")
    .populate("user", "name email")
    .sort({ createdAt: -1 });
}

async function getPaymentById(paymentId) {
  return await Payment.findById(paymentId)
    .populate("order", "orderNumber totalPaise status")
    .populate("user", "name email");
}

module.exports = {
  simulatePayment,
  getMyPayments,
  getAllPayments,
  getPaymentById
};