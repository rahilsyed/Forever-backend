"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.userOrders = exports.allOrders = exports.placeOrderRazorpay = exports.placeOrderStripe = exports.placeOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const currency = 'inr';
const deliveryCharges = 40;
// for COD
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMode: 'COD',
            payment: false,
            date: Date.now()
        };
        const newOrder = new order_model_1.default(orderData);
        yield newOrder.save();
        yield user_model_1.default.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: 'Order Placed Successfully' });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
});
exports.placeOrder = placeOrder;
//for stripe
const placeOrderStripe = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.placeOrderStripe = placeOrderStripe;
//for razorpay
const placeOrderRazorpay = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.placeOrderRazorpay = placeOrderRazorpay;
const allOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find({});
        res.json({ success: true, orders });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
});
exports.allOrders = allOrders;
const userOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const orders = yield order_model_1.default.find({ userId });
        res.json({ success: true, orders });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
});
exports.userOrders = userOrders;
//uddate order stratus
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, status } = req.body;
        yield order_model_1.default.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
});
exports.updateStatus = updateStatus;
