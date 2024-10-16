import React from "react";
import { Link } from "react-router-dom";

const BooksCard = ({ book }) => {
  return (
    <Link to={`/book/${book?.id}`}>
      <div
        key={book.id}
        className="book-item border border-gray-400 px-3 py-2 rounded-md h-96"
      >
        <div className="flex items-center justify-center">
          <img
            src={book.formats["image/jpeg"]}
            alt={book.title}
            className="   h-60 w-52"
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
      </div>
    </Link>
  );
};

export default BooksCard;
