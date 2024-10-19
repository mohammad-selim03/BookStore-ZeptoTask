import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchBooks from "../API/Api";
import Loader from "../HomePage/Loader";
import WishlistButton from "../WishlistPage/WishlistButton";

const BooksPage = () => {
  const { id } = useParams();
  const { books, loading, error } = useFetchBooks("https://gutendex.com/books");

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const book = books.find((book) => book?.id === Number(id));

  return (
    <div className="bg-slate-100 py-2 md:py-5 px-3 md:px-10 rounded-md min-h-screen">
      {book ? (
        <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 gap-2 md:gap-8">
          <div className="flex items-center justify-center">
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="   h-60 w-52"
            />
          </div>
          <div className="bg-white w-full mx-auto py-8 px-8 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-md md:text-xl lg:text-2xl">
                {book.title}
              </h1>
              <WishlistButton book={book} />
            </div>
            {/* ratings author name */}
            <p>
              By <span className="text-gray-600">{book?.authors[0]?.name}</span>
            </p>
            <p className="text-gray-500">ID : {id}</p>

            <div className="flex justify-between">
              <div className="mt-2 flex flex-col gap-2">
                <h3 className="text-md font-semibold block">Subjects</h3>
                <p className="text-gray-500 text-sm line-clamp-2gap-2 flex flex-col ">
                  {" "}
                  {book.subjects?.map((item) => (
                    <p>{item}</p>
                  ))}
                  {/* //.join(", ") */}
                </p>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <h3 className="text-md font-semibold block">Bookshelves</h3>

                <p className="text-gray-500 text-sm line-clamp-2gap-2 flex flex-col ">
                  {" "}
                  {book.bookshelves?.map((item) => (
                    <p>{item}</p>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default BooksPage;
