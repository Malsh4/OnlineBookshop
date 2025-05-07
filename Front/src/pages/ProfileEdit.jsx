// src/pages/ProfileEdit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    profileImage: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/user/data', { credentials: 'include' })
      .then(res => {
        if (res.status === 401) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setForm(f => ({ ...f, username: data.user.username, email: data.user.email }));
          setPreview(data.user.profileImage || null);
        } else {
          navigate('/login', { state: { redirectTo: '/profile/edit' } });
        }
      })
      .catch(() => navigate('/login', { state: { redirectTo: '/profile/edit' } }))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      const file = files[0];
      setForm(f => ({ ...f, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { username, email, profileImage } = form;
    if (!username || !email) {
      setError('Username and email are required');
      return;
    }

    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    if (profileImage) data.append('avatar', profileImage);

    try {
      const res = await fetch('http://localhost:4000/api/user/update', {
        method: 'PUT',
        credentials: 'include',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setTimeout(() => navigate('/profile'), 2000);
      } else {
        setError(result.message || 'Update failed');
      }
    } catch {
      setError('Server error, please try again');
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow m-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#2B3A57] text-white rounded hover:bg-[#3A4C73]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;