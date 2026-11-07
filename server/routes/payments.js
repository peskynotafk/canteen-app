const express = require("express");

const paymentController = require("../controllers/paymentController");
const { simulatePaymentSchema } = require("../validators/paymentValidator");

const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/:orderId/simulate",
  protect,
  validate(simulatePaymentSchema),
  paymentController.simulatePayment
);

router.get(
  "/my",
  protect,
  paymentController.getMyPayments
);

router.get(
  "/:id",
  protect,
  paymentController.getPaymentById
);

module.exports = router;