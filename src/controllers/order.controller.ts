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

    // Ensure to include paymentMode and orderId
    const orderData = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentMode: 'COD', // Add paymentMode
      orderId: Date.now().toString(), // Generate a unique orderId (or use your own logic)
      payment: false,
      date: Date.now(),
    });

    const newOrder = new Order(orderData);
    await newOrder.save(); // Ensure you await the save operation
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(200).json({ success: true, data: orderData });
  } catch (error) {
    console.error('Error placing order:', error); // Log the error for debugging
    res.status(404).json({ success: false, message: error || 'Error placing order' });
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

} catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
}

};

const userOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, data: null });
  }
};

//uddate order stratus

const updateStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    await Order.findOneAndUpdate(orderId, { status });
    res.status(200).json({ success: true, messege: 'Status Updated' });
  } catch (err) {
    res.status(404).json({ messege: err });
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
