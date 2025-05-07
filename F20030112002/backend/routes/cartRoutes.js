import express from 'express';
import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart  
} from '../controllers/cartController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.get('/', userAuth, getCart);

router.post('/add', userAuth, addToCart);

router.put('/update-quantity', userAuth, updateCartQuantity);

router.delete('/remove/:bookId', userAuth, removeFromCart);

router.delete('/clear', userAuth, clearCart); 

export default router;
