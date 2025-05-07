import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("default");

  useEffect(() => {
    const query = searchTerm.trim() !== ""
      ? encodeURIComponent(searchTerm)
      : "subject:fiction";

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30&orderBy=relevance`
    )
      .then((res) => res.json())
      .then((data) => {
        const processed = (data.items || []).map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unknown"],
          image:
            item.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/128x193?text=No+Cover",
          year: item.volumeInfo.publishedDate?.slice(0, 4) || "Unknown",
          price: Math.floor(Math.random() * 1000) + 500,
        }));
        setBooks(processed);
      })
      .catch(() => setBooks([]));
  }, [searchTerm]);

  // Only sorting now—no client‐side filtering by searchTerm
  const sortedBooks = [...books].sort((a, b) => {
    if (filter === "title") return a.title.localeCompare(b.title);
    if (filter === "price-low") return a.price - b.price;
    if (filter === "price-high") return b.price - a.price;
    if (filter === "year") return b.year.localeCompare(a.year);
    return 0;
  });

  return (
    <div className="px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-14">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="font-medium">
            Sort By:
          </label>
          <select
            id="sort"
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-base"
          >
            <option value="default">Default</option>
            <option value="title">Title (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="year">Published Year</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-base w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookPage;
