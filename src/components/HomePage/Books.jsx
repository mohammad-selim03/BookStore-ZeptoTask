import React, { useState } from "react";
import BooksCard from "./BooksCard";
import Loader from "./Loader";
import useFetchBooks from "../API/Api";
import DropDownMenu from "../Shared/DropDownMenu";

const Books = () => {
  const { books, loading, error } = useFetchBooks(
    "https://gutendex.com/books/"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books?.length / booksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex items-center justify-between px-5">
        <div className=" py-10">
          {" "}
          <h3 className="text-lg md:text-lg font-semibold px-5 md:px-10">
            Explore your books
          </h3>
        </div>
        <div className="visible md:hidden ">
          <DropDownMenu />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-5 lg:gap-10 px-5 md:px-10 md:py-10">
        {currentBooks?.map((book) => (
          <BooksCard key={book?.id} book={book} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
