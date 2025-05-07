import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook({
          title: data.volumeInfo.title,
          authors: data.volumeInfo.authors || ["Unknown"],
          year: data.volumeInfo.publishedDate?.slice(0, 4) || "Unknown",
          image:
            data.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/128x193?text=No+Cover",
          price: Math.floor(Math.random() * 1000) + 500,
          description:
            data.volumeInfo.description || "No description available.",
          stock: Math.floor(Math.random() * 4),
        });
      });
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="flex flex-wrap items-start gap-[70px] p-10">
      <img
        src={book.image}
        alt={book.title}
        className="w-[300px] h-auto object-cover"
      />
      <div className="flex-1 max-w-[1000px]">
        <h2 className="text-2xl font-semibold text-[#2B3A57]">
          {book.title}
        </h2>
        <p className="mt-2 text-base">
          <strong>Author:</strong> {book.authors.join(", ")}
        </p>
        <p className="mt-2 text-base">
          <strong>Year:</strong> {book.year}
        </p>
        <p className="mt-2 text-base">
          <strong>Price:</strong> Rs. {book.price}.00
        </p>
        <p className="mt-2 text-base">
          <strong>Status:</strong>{" "}
          {book.stock === 0
            ? "Out of stock"
            : book.stock === 1
            ? "1 book available"
            : `${book.stock} books available`}
        </p>
        <p className="mt-2 text-base">
          <strong>Description:</strong>
        </p>
        <div
          className="text-black leading-relaxed text-justify mt-2"
          dangerouslySetInnerHTML={{ __html: book.description }}
        ></div>

        <button
          disabled={book.stock === 0}
          className="mt-5 bg-[#2B3A57] text-white px-4 py-2 rounded-lg transition-colors duration-300 disabled:opacity-80 disabled:cursor-default disabled:text-gray-400 hover:bg-[#3A4C73]"
          onClick={() => {
            addToCart({ ...book, id }, location.pathname);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookDetailsPage;