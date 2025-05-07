import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import BookPage from './pages/BookPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEdit from './pages/ProfileEdit';
import BookDetailsPage from './pages/BookDetailsPage';
import ShippingPage from './pages/ShippingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<AboutPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
