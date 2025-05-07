import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const goToDetails = () => {
    navigate(`/book/${book.id}`);
  };

  const goToCart = (e) => {
    e.stopPropagation();
    addToCart(book, "/about");
    navigate("/cart");
  };

  return (
    <div
      className="border border-gray-200 rounded-lg p-2 bg-[#B0C4D9] shadow-sm max-h-[600px] pb-3 text-center hover:scale-105 hover:shadow-md transition-transform duration-200"
      onClick={goToDetails}
    >
      <img
        src={book.image}
        alt={book.title}
        className="h-[200px] object-cover mx-auto my-3"
      />
      <h3 className="text-lg font-bold text-black mb-2">{book.title}</h3>

      <div className="space-y-1">
        <p className="font-medium text-black">👤 {book.authors.join(", ")}</p>
        <p className="text-black">📅 {book.year}</p>
        <p className="text-black">💵 Rs. {book.price}.00</p>
      </div>

      <button
        onClick={goToCart}
        className="mt-3 bg-[#2B3A57] text-white px-4 py-2 rounded-md hover:bg-[#3A4C73] transition-colors duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
