import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [
    {
      title: { type: String, required: true },
      authors: { type: [String], required: true },
      description: { type: String, required: true },
      thumbnail: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 }
    }
  ]
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
