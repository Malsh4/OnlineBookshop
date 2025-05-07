import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/profile';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        navigate(redirectTo);
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setLoading(false);
      setError('Server error. Please try again later.');
    }
  };


  return (
    <div className="max-w-md mx-auto p-8 bg-[#f3f3f3] rounded-lg shadow-md m-20">
      <h2 className="text-2xl font-extrabold text-black mb-5 text-center">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A4C73]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A4C73]"
        />
        <label className="mb-5 flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          Remember me
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-[#2B3A57] text-white rounded-md hover:bg-[#3A4C73] focus:outline-none focus:ring-2 focus:ring-[#3A4C73]"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-4 text-center text-[#000]">
          Don't have an account? <Link to="/register" className="text-[#2B3A57]">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;