"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: String,
    },
    items: {
        type: [],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Order placed'
    },
    paymentMode: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Number,
        required: true,
    }
});
const Order = (0, mongoose_1.model)("order", orderSchema);
exports.default = Order;
