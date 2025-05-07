import Order from '../models/orderModel.js';

// Create new order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, shipping, totalItems, totalCost } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const formattedItems = items.map(i => ({
      bookId: i.id || i.bookId,
      title: i.title,
      quantity: i.quantity,
      price: i.price
    }));

    const order = await Order.create({
      user: userId,
      items: formattedItems,
      shipping,
      totalItems,
      totalCost
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error('Order creation error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message, errors: err.errors });
    }
    res.status(500).json({ success: false, message: 'Server error creating order' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).sort('-createdAt');
    res.json({ success: true, orders });
  } catch (err) {
    console.error('Fetch orders error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching orders' });
  }
};
