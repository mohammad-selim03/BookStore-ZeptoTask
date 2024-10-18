import React from "react";
import BooksCard from "./BooksCard";
import Loader from "./Loader";
import useFetchBooks from "../API/Api";

const Books = () => {

  const { books, loading, error } = useFetchBooks(
    "https://gutendex.com/books/"
  );

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  //   title, author, cover image, author name, genre and id.

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-5 lg:gap-10 px-5 md:px-10 md:py-10">
        {books?.map((book) => (
          <BooksCard key={book?.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
