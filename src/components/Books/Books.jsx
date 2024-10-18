import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetchBooks from "../API/Api";
import Loader from "../HomePage/Loader";
import BooksCard from "../HomePage/BooksCard";

const BooksByGenre = () => {
  const [booksByGenre, setBooksByGenre] = useState([]);
  const { search } = useLocation();
  const genre = new URLSearchParams(search).get("genre");
  const { books, loading, error } = useFetchBooks("https://gutendex.com/books");

  useEffect(() => {
    if (books) {
      // Filter books by the selected genre
      const filteredBooks = books.filter((book) =>
        book.bookshelves?.includes(genre)
      );
      setBooksByGenre(filteredBooks);
    }
  }, [books, genre]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message || "An error occurred"}</p>;
  }

  return (
    <div className="px-3 md:px-10 py-2 md:py-5">
      <h1 className="text-center text-md sm:text-lg md:text-2xl font-semibold">Books in "{genre}"</h1>
      {booksByGenre.length > 0 ? (
        <ul  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-10">
          {booksByGenre.map((book) => (
            // <li key={book.id}>{book.title}</li>
            <div>
              {" "}
              <BooksCard book={book} />
            </div>
          ))}
        </ul>
      ) : (
        <p>No books found for this genre.</p>
      )}
    </div>
  );
};

export default BooksByGenre;
