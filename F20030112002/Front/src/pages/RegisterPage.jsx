import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password} = formData;
    if (!username || !email || !password) {
      return setError('All fields are required.');
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setLoading(false);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-[#f3f3f3] rounded-lg shadow-md m-20">
      <h2 className="text-2xl font-extrabold text-center mb-6 text-[#000]">Register</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-[#3A4C73] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A4C73]"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-[#3A4C73] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A4C73]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-[#3A4C73] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A4C73]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-[#2B3A57] text-white rounded-md hover:bg-[#3A4C73] focus:outline-none focus:ring-2 focus:ring-[#3A4C73]"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-[#000]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2B3A57]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;