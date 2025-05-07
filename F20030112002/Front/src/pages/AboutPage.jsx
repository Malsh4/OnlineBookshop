import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard.jsx";

const quotes = [
  {
    text: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero"
  },
  {
    text: "So many books, so little time.",
    author: "Frank Zappa"
  },
  {
    text: "The only thing that you absolutely have to know, is the location of the library.",
    author: "Albert Einstein"
  },
  {
    text: "A reader lives a thousand lives before he dies.",
    author: "George R.R. Martin"
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King"
  }
];

const AboutPage = () => {
  const [index, setIndex] = useState(0);
  const [books, setBooks] = useState([]); 
  const navigate = useNavigate(); 

  // Auto-change every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer); 
  }, [index]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=30`)
      .then((res) => res.json())
      .then((data) => {
        const processed = data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unknown"],
          image:
            item.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/128x193?text=No+Cover",
          year: item.volumeInfo.publishedDate?.slice(0, 4) || "Unknown",
          price: Math.floor(Math.random() * 1000) + 500,
        }));
        setBooks(processed); // This sets the data
      });
  }, []);

  return (
    <div className="p-[40px] text-center bg-white">
      <h1 className="text-[2.5rem] font-extrabold mb-[20px] tracking-[1px]">Welcome to the Online Bookshop</h1>

      <div className="p-0 text-center bg-[#8e3131]">
        <div className="relative flex gap-[20px] mt-[20px] flex-row rounded-[10px] justify-center items-center p-[20px] overflow-hidden z-[1] bg-transparent">
          <div className="absolute inset-0 bg-[url('/images/bg3.jpg')] bg-cover bg-center filter blur-[5px] opacity-80 z-0"></div>

          <button onClick={handlePrev} className="p-[15px] h-[50px] text-white border-none rounded-[6px] cursor-pointer transition-colors duration-300 z-[2]">←</button>

          <div className="w-[600px] h-[100px] my-[30px] mx-auto py-[70px] px-[20px] relative flex flex-col items-center justify-center bg-white opacity-40 rounded-[8px]">
            <p className="text-[1.5rem] font-extrabold text-black">“{quotes[index].text}”</p>
            <p className="text-[1.1rem] font-bold text-black">— {quotes[index].author}</p>
          </div>

          <button onClick={handleNext} className="p-[15px] h-[50px] text-white border-none rounded-[6px] cursor-pointer transition-colors duration-300 z-[2]">→</button>
        </div>
      </div>

      <div className="book-preview-wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[60px] mt-20">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {books.length > 6 && (
          <div className="see-more mt-8">
            <button
              onClick={() => navigate("/books")}
              className="px-4 py-2 text-white bg-[#2B3A57] rounded-md mt-5"
            >
              See More →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
