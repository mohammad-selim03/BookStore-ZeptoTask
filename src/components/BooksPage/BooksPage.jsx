import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchBooks from "../API/Api";
import Loader from "../HomePage/Loader";
import WishlistButton from "../WishlistPage/WishlistButton";

const BooksPage = () => {
  const { id } = useParams();
  console.log("id", id);

  // useEffect(() => {
  //     const fetchBook = async() => {
  //         const res = await fetch `https://gutendex.com/books` // there was a problem with dynamic id pass.
  //         const data = await res.json()
  //         console.log(data)

  //     }
  //     fetchBook()
  // } , [])

  const { books, loading, error } = useFetchBooks("https://gutendex.com/books");

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const book = books.find((book) => book?.id === Number(id));
  console.log("filter book", book);

  return (
    <div className="bg-slate-100 py-2 md:py-5 px-3 md:px-10 rounded-md">
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
            {/* price */}
            {/* descriptions */}
            {/* quantity button */}
            {/* add to cart */}
            {/* add to wishlist and share  */}
            <div className="mt-2">
              <p className="text-gray-500 text-sm line-clamp-2">
                {" "}
                {book.subjects.join(", ")}
              </p>
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
