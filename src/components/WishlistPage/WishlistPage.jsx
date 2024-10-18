import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BooksCard from "../HomePage/BooksCard";
import WishlistButton from "../WishlistPage/WishlistButton"; // Ensure this import is correct

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Retrieve the wishlist from localStorage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="p-4">
      {wishlist.length > 0 && (
        <h1 className="text-2xl font-semibold mb-4">Your favorite books</h1>
      )}
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map((book) => (
            <div key={book.id} className="  p-4">
              <BooksCard book={book} onUpdateWishlist={setWishlist} />
              {/* <WishlistButton book={book} onUpdateWishlist={setWishlist} /> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
