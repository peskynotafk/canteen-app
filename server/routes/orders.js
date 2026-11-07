const express = require("express");

const orderController = require("../controllers/orderController");
const { createOrderSchema } = require("../validators/orderValidator");

const validate = require("../middleware/validate");
const { protect, staffOnly } = require("../middleware/auth");

const {
  updateOrderStatusSchema
} = require("../validators/orderStatusValidator");

const router = express.Router();

router.post(
  "/",
  protect,
  validate(createOrderSchema),
  orderController.createOrder
);

router.get(
  "/my",
  protect,
  orderController.getMyOrders
);

router.get(
  "/",
  protect,
  staffOnly,
  orderController.getAllOrders
);

router.get(
  "/:id",
  protect,
  orderController.getOrderById
);

router.patch(
  "/:id/status",
  protect,
  staffOnly,
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

router.post(
  "/:id/cancel",
  protect,
  orderController.cancelOrder
);
module.exports = router;