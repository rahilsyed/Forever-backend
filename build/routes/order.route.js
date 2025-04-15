"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const auth_1 = __importDefault(require("../middleware/auth"));
const orderRouter = (0, express_1.Router)();
orderRouter.post('/list', order_controller_1.allOrders);
orderRouter.post('/status', adminAuth_1.default, order_controller_1.updateStatus);
//payment method
orderRouter.post('/place', auth_1.default, order_controller_1.placeOrder);
orderRouter.post('/stripe', auth_1.default, order_controller_1.placeOrderStripe);
orderRouter.post('/razorpay', auth_1.default, order_controller_1.placeOrderRazorpay);
//user order
orderRouter.post('/userorders', auth_1.default, order_controller_1.userOrders);
exports.default = orderRouter;
