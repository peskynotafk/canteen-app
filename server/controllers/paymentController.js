const mongoose = require("mongoose");
const paymentService = require("../services/paymentService");

async function simulatePayment(req, res, next) {
  try {
    const { orderId } = req.params;
    const { method, outcome } = req.body;

    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID"
      });
    }

    const payment = await paymentService.simulatePayment(
      orderId,
      req.user.userId,
      method,
      outcome
    );

    res.status(201).json({
      success: true,
      message: "Payment attempt recorded",
      data: payment
    });
  } catch (error) {
    next(error);
  }
}

async function getMyPayments(req, res, next) {
  try {
    const payments = await paymentService.getMyPayments(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    next(error);
  }
}

async function getPaymentById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment ID"
      });
    }

    const payment = await paymentService.getPaymentById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    const isStaff = ["staff", "admin"].includes(req.user.role);
    const isOwner =
      payment.user._id.toString() === req.user.userId;

    if (!isStaff && !isOwner) {
      return res.status(404).json({
        success: false,
        message: "Payment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  simulatePayment,
  getMyPayments,
  getPaymentById
};