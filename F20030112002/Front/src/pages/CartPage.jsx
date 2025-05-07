import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, lastPage } = useCart();
  const navigate = useNavigate();

  const totalBooks = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleContinueShopping = () => {
    if (lastPage === '/about') {
      navigate('/about');
    } else {
      navigate('/books');
    }
  };

  const handleBuyNow = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/user/data', {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        navigate('/shipping');
      } else {
        navigate('/login', { state: { redirectTo: '/shipping' } });
      }
    } catch (err) {
      navigate('/login', { state: { redirectTo: '/shipping' } });
    }
  };

  return (
    <div className="cart-wrapper px-8 py-8 flex items-center justify-center flex-col">
      <h2 className="text-2xl font-extrabold text-black mb-5 text-center">
        Your Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list flex flex-col gap-5">
            {cartItems.map((item) => (
              <div
                className="cart-item relative bg-white p-4 border border-[#3A4C73] rounded-lg flex gap-5"
                key={item.id}
              >
                <button
                  className="delete-btn absolute top-2 right-2 bg-none border-none cursor-pointer"
                  onClick={() => removeFromCart(item.id)}
                >
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/delete.png"
                    alt="Delete"
                    className="w-5 h-5 filter-brightness-0 transition-transform duration-200 hover:scale-110 hover:filter-brightness-40"
                  />
                </button>
                <img src={item.image} alt={item.title} className="w-24 h-auto" />
                <div className="info flex flex-col">
                  <h4 className="text-lg font-bold mt-2">{item.title}</h4>
                  <p>Price: Rs. {item.price}.00</p>
                  <div className="flex items-center">
                    Qty:{' '}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, e.target.value)
                      }
                      className="w-16 py-1 text-base border border-[#3A4C73] rounded-md text-center appearance-none"
                    />
                    <span className="ml-3">
                      Total: Rs. {item.quantity * item.price}.00
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary mt-8 pt-5 border-t-2 border-[#3A4C73]">
            <h4>Total Books: {totalBooks}</h4>
            <h4>Total Cost: Rs. {totalCost}.00</h4>

            <div className="cart-buttons mt-5 flex gap-5">
              <button
                onClick={handleContinueShopping}
                className="px-5 py-2 bg-[#2B3A57] text-white rounded-lg hover:bg-[#3A4C73]"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleBuyNow}
                className="px-5 py-2 bg-[#2B3A57] text-white rounded-lg hover:bg-[#3A4C73]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
