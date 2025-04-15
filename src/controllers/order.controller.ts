import Order from '../models/order.model';
import User from '../models/user.model';
import Stripe from 'stripe';
import { Request, Response } from 'express';
const currency = 'inr';
const deliveryCharges = 40;

// for COD
const placeOrder = async (req: Request, res: Response) => {
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
    }
    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: 'Order Placed Successfully' });

} catch (error:any) {
    console.log(error);
    res.json({ success: false, message: error.message });
}
};

//for stripe
const placeOrderStripe = async (req: Request, res: Response) => {};

//for razorpay
const placeOrderRazorpay = async (req: Request, res: Response) => {};

const allOrders = async (req: Request, res: Response) => {
  try {

    const orders = await Order.find({});
    res.json({ success: true, orders });

} catch (error:any) {
    console.log(error);
    res.json({ success: false, message: error.message });
}

};

const userOrders = async (req: Request, res: Response) => {
  try {

    const { userId } = req.body;

    const orders = await Order.find({ userId })
    res.json({ success: true, orders });

} catch (error:any) {
    console.log(error);
    res.json({ success: false, message: error.message });
}
};

//uddate order stratus

const updateStatus = async (req: Request, res: Response) => {
  try {

    const { orderId, status } = req.body
    await Order.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status Updated' })
} catch (error:any){
    console.log(error);
    res.json({ success: false, message: error.message });
}
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
