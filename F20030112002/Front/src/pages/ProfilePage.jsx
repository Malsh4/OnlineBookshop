import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('http://localhost:4000/api/user/data', { credentials: 'include' });
        if (userRes.status === 401) throw new Error('Unauthorized');
        const userData = await userRes.json();
        if (userData.success) {
          setUser(userData.user);
        } else {
          navigate('/login', { state: { redirectTo: '/profile' } });
        }

        const orderRes = await fetch('http://localhost:4000/api/orders/getorders', { credentials: 'include' });
        const orderData = await orderRes.json();
        if (orderData.success) {
          setOrders(orderData.orders);
        }
      } catch (err) {
        navigate('/login', { state: { redirectTo: '/profile' } });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    fetch('http://localhost:4000/api/auth/logout', { method: 'POST', credentials: 'include' })
      .then(() => navigate('/login'));
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 rounded-xl shadow-lg m-10">
      {user && (
        <div className="mb-8 border-b pb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Your Profile</h2>
          <p className="text-lg text-gray-700"><strong>Username:</strong> {user.username}</p>
          <p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</p>
          <button
            onClick={() => navigate('/profile/edit')}
            className="mt-4 px-4 py-2 bg-[#2B3A57] text-white rounded hover:bg-[#3A4C73]"
          >
            Edit Profile
          </button>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        orders.map(o => (
          <div key={o._id} className="border p-4 mb-4 rounded-lg bg-white shadow-sm">
            <p className="text-gray-700"><strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}</p>
            <p className=" text-gray-700 mb-1">
              <span className="font-semibold">Items:</span> {o.totalItems}
              <br />
              <span className=" font-semibold">Cost:</span> Rs. {o.totalCost}.00
            </p>
            <p className="text-gray-700">
              <strong>Ship to:</strong> {o.shipping.fullName}, {o.shipping.address}, {o.shipping.city}
            </p>
            <ul className="mt-2 list-disc list-inside text-gray-600">
              {o.items.map(i => (
                <li key={i.bookId}>{i.title} x{i.quantity}</li>
              ))}
            </ul>
          </div>
        ))
      )}
      <button
            onClick={handleLogout}
            className="mt-6 w-full p-3 bg-[#2B3A57] text-white rounded-md hover:bg-[#3A4C73]"
          >
            Logout
          </button>
    </div>
  );
};

export default ProfilePage;
