const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const { authenticateUser } = require("../Middlewares/authentication");

router.post("/", orderControllers.createOrder);

router.get("/", orderControllers.getAllOrders);

router.get("/:parcelId", orderControllers.getAnOrder);

router.delete("/:parcelId", orderControllers.cancelOrder);

router.patch(
  "/:parcelId",
  authenticateUser,
  orderControllers.changeOrderDestination
);

module.exports = router;
