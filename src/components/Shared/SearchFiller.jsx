import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import useFetchBooks from "../API/Api";
import { Link } from "react-router-dom";

const SearchFiller = () => {
  const { books, loading, error } = useFetchBooks("https://gutendex.com/books");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(true); // Open dropdown on input change
  };

  // Filter books based on the search term
  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSelectBook = () => {
    setIsDropdownOpen(false); // Close dropdown when selecting a book
  };

  useEffect(() => {
    // Attach click event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="w-full">
        <input
          type="text"
          placeholder="Search books..."
          className="outline-none py-2 px-3 rounded-lg w-[600px]"
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
        />
        <span className="absolute top-2.5 right-2">
          <CiSearch size={20} />
        </span>
      </div>
      {isDropdownOpen && (
        <div className="mt-4 min-[300px]:w-[full] w-[600px] absolute top-10 z-10 bg-white flex flex-col rounded-md h-[500px] overflow-hidden overflow-y-scroll shadow-gray-100 shadow-sm">
          {filteredBooks && filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <Link
                to={`/book/${book?.id}`}
                key={index}
                className="hover:bg-slate-100 flex items-center gap-2 border-b px-10 py-3"
                onClick={handleSelectBook} // Close dropdown on book selection
              >
                <span className="py-2">
                  <img src={book.formats["image/jpeg"]} alt="book image" className="h-9 w-9 rounded-md" />
                </span>
                <span className="py-2">{book.title}</span>
              </Link>
            ))
          ) : (
            <div>No books found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFiller;
