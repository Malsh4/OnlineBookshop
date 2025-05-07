import express from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();
router.post('/createorder', userAuth, createOrder);
router.get('/getorders', userAuth, getUserOrders);
export default router;