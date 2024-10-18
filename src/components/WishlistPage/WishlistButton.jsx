import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

const WishlistButton = ({ book, onUpdateWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

 
  useEffect(() => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isBookInWishlist = existingWishlist.some((item) => item.id === book.id);
    setIsInWishlist(isBookInWishlist);
  }, [book.id]);

  const handleWishlistToggle = () => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!isInWishlist) {
     
      existingWishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      setIsInWishlist(true);
      onUpdateWishlist(existingWishlist);  
      toast.success("Book added to wishlist!");
    } else {
      // Remove book from the wishlist
      const updatedWishlist = existingWishlist.filter((item) => item.id !== book.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      onUpdateWishlist(updatedWishlist); 
      toast.success("Book removed from wishlist!");
    }
  };

  return (
    <button onClick={handleWishlistToggle} className="p-1">
      {isInWishlist ? (
        <MdOutlineFavorite size={24} className="text-red-500" />
      ) : (
        <MdFavoriteBorder size={24} className="text-gray-500" />
      )}
    </button>
  );
};

export default WishlistButton;
