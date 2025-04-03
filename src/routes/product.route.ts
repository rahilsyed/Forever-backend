import { Router } from 'express';
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from '../controllers/product.controller';
import upload from '../middleware/multer';
import adminAuth from '../middleware/adminAuth';
const productRouter = Router();

productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);
productRouter.get('/list', listProduct);
productRouter.post('/remove', removeProduct);
productRouter.get('/single', singleProduct);

export default productRouter;
