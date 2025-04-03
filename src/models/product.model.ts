import { Schema, model } from 'mongoose';
import { IProduct } from '../Interfaces/db.interface';
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: [],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sizes: {
      type: [Array],
      required: true,
    },
    bestSeller: {
      type: Boolean,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Product = model<IProduct>('product', productSchema);
export default Product;
