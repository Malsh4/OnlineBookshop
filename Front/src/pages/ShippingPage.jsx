import React, { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const ShippingPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const invoiceRef = useRef();
  const [showInvoice, setShowInvoice] = useState(false);
  const [error, setError] = useState('');
  const [shipping, setShipping] = useState({ fullName:'', address:'', city:'', postalCode:'', phone:'' });
  const [paymentMethod, setPaymentMethod] = useState('');


  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalCost = cartItems.reduce((sum, i) => sum + i.quantity * i.price, 0);

  const handleChange = e => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handleConfirm = async () => {
    const { fullName, address, city, phone } = shipping;
    if (!fullName || !address || !city || !phone || !paymentMethod) {
      setError('Please fill in all required fields'); return;
    }    
    try {
      const res = await fetch('http://localhost:4000/api/orders/createorder', {
        method:'POST', credentials:'include', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ items: cartItems, shipping, paymentMethod, totalItems, totalCost })
      });
      const data = await res.json();
      if (data.success) {
        setShowInvoice(true);
      } else setError(data.message);
    } catch(err) {
      setError('Error placing order');
    }
  };

  const handleDownload = async () => {
    const canvas = await html2canvas(invoiceRef.current);
    const link = document.createElement('a'); 
    link.download='invoice.png';
    link.href=canvas.toDataURL(); 
    link.click();
  };

  return (
    <div className="max-w-[600px] mx-auto my-10 p-5 bg-white rounded-lg shadow-[0_0_10px_#ddd]">
      <h2 className="text-2xl font-extrabold text-black mb-5 text-center">Shipping & Checkout</h2>

      {!showInvoice ? (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-[#2B3A57] mb-4">
              Order Summary
            </h3>

    {cartItems.map((item) => (
      <div
        key={item.id}
        className="flex justify-between mb-2"
      >
        <span className="text-base text-gray-800">
          {item.title}
        </span>
        <span className="text-base text-gray-800">
          Qty: {item.quantity}
        </span>
      </div>
    ))}

        <p className="mt-4 text-base text-gray-800">
          <strong>Total Items:</strong> {totalItems}
        </p>
        <p className="mt-2 text-base text-gray-800">
          <strong>Total Cost:</strong> Rs. {totalCost}.00
        </p>
      </div>
      <div className="shipping-form">
        <h3 className="text-2xl font-bold text-[#2B3A57] mb-4 mt-6">Shipping Information</h3>
        {error && (
        <p className="text-red-600 font-medium text-sm mb-3">{error}</p>
      )}

        <input
        required
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full my-2 p-2 border border-gray-300 rounded-md"
        />
        <input
        required
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full my-2 p-2 border border-gray-300 rounded-md"
        />
        <input
        required
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full my-2 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          onChange={handleChange}
          className="w-full my-2 p-2 border border-gray-300 rounded-md"
        />
        <input
        required
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full my-2 p-2 border border-gray-300 rounded-md"
        />
        <select
        name="paymentMethod"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full my-2 p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Payment Method</option>
        <option value="Card">Card</option>
        <option value="Cash">Cash</option>
        <option value="PayPal">PayPal</option>
      </select>
      
            <button
              className="confirm-btn mt-4 p-3 bg-[#2B3A57] text-white rounded-md w-full cursor-pointer hover:bg-[#3A4C73]"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </>
      ) : (
        <div className="invoice-section">
          <div className="bg-[#f7f7f7] p-5 mt-10 border border-dashed border-[#999] rounded-md" ref={invoiceRef}>
            <h2 className="text-xl font-extrabold text-black mb-5 text-left">Invoice</h2>
            <p><strong>Name:</strong> {shipping.fullName}</p>
            <p><strong>Address:</strong> {shipping.address}, {shipping.city} - {shipping.postalCode}</p>
            <p><strong>Phone:</strong> {shipping.phone}</p>
            <p className='mb-2'><strong>Payment Method:</strong> {paymentMethod}</p>
            <hr />
            <h3 className='mt-3 mb-1'><strong>Items:</strong></h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>{item.title} × {item.quantity}</li>
              ))}
            </ul>
            <p className='mt-2 mb-2'><strong>Total Cost:</strong> Rs. {totalCost}.00</p>
            <p className='text-center'>Thank you for shopping with us!</p>
          </div>

          <div className="mt-5 flex justify-center gap-5">
            <button
              onClick={handleDownload}
              className="bg-[#2B3A57] text-white py-2 px-4 rounded hover:bg-[#3A4C73]"
            >
              Download Invoice
            </button>
            <button
              onClick={() => navigate("/about")}
              className="bg-[#2B3A57] text-white py-2 px-4 rounded hover:bg-[#3A4C73] ml-2"
            >
              Go Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default ShippingPage;