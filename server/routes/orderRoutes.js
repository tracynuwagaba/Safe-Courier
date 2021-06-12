const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");

router.post("/", orderControllers.createOrder);

router.get("/", orderControllers.getAllOrders);

router.get("/:parcelId", orderControllers.getAnOrder);

router.delete("/:parcelId", orderControllers.cancelOrder);

module.exports = router;
