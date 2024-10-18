import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import WishlistButton from "../WishlistPage/WishlistButton";

const BooksCard = ({ book, wishlistPage, onUpdateWishlist }) => {
  return (
    <div key={book?.id}>
      <div
        key={book.id}
        className="book-item  border border-gray-200 hover:border-gray-500 transition-all duration-200 px-3 py-2 rounded-md h-96 relative"
      >
        <Link to={`/book/${book?.id}`}>
          <div className="flex items-center justify-center">
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="h-52 w-32"
            />
          </div>
          {/* <p>ID: {book.id}</p> */}
          <div className="mt-2">
            <p className="text-gray-500 text-sm">
              {book.authors.map((author) => author.name).join(", ")}
            </p>
            <p className="font-semibold truncate mb-2"> {book.title}</p>
            <p className="text-gray-500 text-sm line-clamp-2">
              {" "}
              {book.subjects.join(", ")}
            </p>
          </div>
        </Link>

        <div className="bg-white shadow-gray-300 shadow-md  rounded-full absolute top-1 right-3 ">
          <WishlistButton book={book} onUpdateWishlist={onUpdateWishlist}/>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
