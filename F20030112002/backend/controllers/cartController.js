import Cart from '../models/cartModel.js';

export const getCart = async (req, res) => {
  console.log('▶ getCart for user', req.user._id);
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.json({ success: true, books: cart ? cart.books : [] });
  } catch (err) {
    console.error('getCart error', err);
    res.status(500).json({ success: false, message: 'Server error fetching cart' });
  }
};

export const addToCart = async (req, res) => {
  console.log('▶ addToCart', req.user._id, req.body);
  try {
    const userId = req.user._id;
    const { book } = req.body;
    if (!book) return res.status(400).json({ success: false, message: 'No book provided' });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, books: [] });

    const idx = cart.books.findIndex(b => b.title === book.title);
    if (idx === -1) cart.books.push(book);
    else cart.books[idx].quantity += book.quantity;

    await cart.save();
    console.log('✔ Cart now has', cart.books.length, 'items');
    res.json({ success: true, books: cart.books });
  } catch (err) {
    console.error('addToCart error', err);
    res.status(500).json({ success: false, message: 'Server error adding to cart' });
  }
};

export const updateCartQuantity = async (req, res) => {
  console.log('▶ updateCartQuantity', req.user._id, req.body);
  try {
    const { bookId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.books = cart.books.map(b => {
      if (b._id.toString() === bookId) b.quantity = quantity;
      return b;
    });

    await cart.save();
    console.log('✔ Updated quantities');
    res.json({ success: true, books: cart.books });
  } catch (err) {
    console.error('updateCartQuantity error', err);
    res.status(500).json({ success: false, message: 'Server error updating quantity' });
  }
};

export const removeFromCart = async (req, res) => {
  console.log('▶ removeFromCart', req.user._id, req.params.bookId);
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.books = cart.books.filter(b => b._id.toString() !== req.params.bookId);
    await cart.save();
    console.log('✔ Removed item, now', cart.books.length, 'left');
    res.json({ success: true, books: cart.books });
  } catch (err) {
    console.error('removeFromCart error', err);
    res.status(500).json({ success: false, message: 'Server error removing item' });
  }
};

export const clearCart = async (req, res) => {
    console.log('▶ clearCart for user', req.user._id);
    try {
      const cart = await Cart.findOne({ userId: req.user._id });
      if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
  
      cart.books = [];
      await cart.save();
      console.log('✔ Cart cleared');
      res.json({ success: true, message: 'Cart cleared', books: cart.books });
    } catch (err) {
      console.error('clearCart error', err);
      res.status(500).json({ success: false, message: 'Server error clearing cart' });
    }
  };