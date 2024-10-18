import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // Updated import
import useFetchBooks from "../API/Api";
import Loader from "../HomePage/Loader";

const DropDownMenu = () => {
  const [select, setSelect] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Updated to useNavigate

  const handleDropDown = () => {
    setSelect((prev) => !prev);
  };

  const handleSelectItem = (genre) => {
    setSelect(false);
    navigate(`/books?genre=${encodeURIComponent(genre)}`); // Updated navigation
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSelect(false);
    }
  };

  const { books, loading, error } = useFetchBooks("https://gutendex.com/books");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message || "An error occurred"}</p>;
  }

  // Collect unique bookshelves, removing "Browsing:" prefix
  const uniqueBookshelves = new Set();

  books?.forEach((book) => {
    book.bookshelves?.forEach((shelf) => {
      const cleanedShelf = shelf.replace(/^Browsing:\s*/, "");
      uniqueBookshelves.add(cleanedShelf);
    });
  });

  const uniqueBookshelvesArray = Array.from(uniqueBookshelves);

  return (
    <div
      className="border border-gray-500 md:border-0 px-2 py-1 md:px-0 md:py-0  rounded-md text-white"
      ref={dropdownRef}
    >
      <div className="relative">
        <button
          onClick={handleDropDown}
          className="flex items-center gap-1 text-black md:text-white font-semibold  "
        >
          Select Genre
          <IoIosArrowDown
            size={18}
            className={`transition-transform duration-300 ${
              select ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        {select && (
          <div className="absolute top-10 -left-40 md:left-0 sm:-left-34 text-sm w-60 py-5 px-5 bg-gray-800 rounded shadow z-10 h-96 overflow-hidden overflow-y-scroll">
            {uniqueBookshelvesArray.length > 0 ? (
              uniqueBookshelvesArray.map((genre, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectItem(genre)} // Pass the genre to the function
                  className="cursor-pointer hover:bg-gray-700 py-3 px-3 rounded-md border-b border-gray-300"
                >
                  {genre}
                  {/* <span className="w-full h-1 "></span> */}
                </div>
              ))
            ) : (
              <div className="py-2 text-center">No genres available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
