import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/user/data', {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        navigate('/profile');
      } else {
        navigate('/login', { state: { redirectTo: '/profile' } });
      }
    } catch (err) {
      navigate('/login', { state: { redirectTo: '/profile' } });
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-[#5D9D9C] border-b border-gray-300">
      <div className="flex items-center">
        <img
          src="/images/icons8-books-100.png"
          alt="Books"
          className="w-15 h-auto mr-2"
        />
        <span className="font-bold text-xl text-white">The Reading Corner</span>
      </div>
      <ul className="flex items-center gap-10 list-none">
        <li>
          <Link
            to="/about"
            className="text-white font-semibold hover:text-[#2B3A57] transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/books"
            className="text-white font-semibold hover:text-[#2B3A57] transition-colors"
          >
            Books
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className="text-white font-semibold hover:text-[#2B3A57] transition-colors"
          >
            Cart
          </Link>
        </li>
        <li>
          <button
            onClick={handleProfileClick}
            className="text-white font-semibold bg-transparent border-none p-0 hover:text-[#2B3A57] transition-colors"
          >
            Profile
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
