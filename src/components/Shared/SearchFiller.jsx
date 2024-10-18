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
    setIsDropdownOpen(true);  
  };

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSelectBook = () => {
    setIsDropdownOpen(false);  
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative" ref={dropdownRef}>
      <div>
        <input
          type="text"
          placeholder="Search books..."
          className="outline-none py-1 sm:py-2 px-2 sm:px-3 rounded-2xl w-52 sm:w-52 md:w-96 lg:w-[550px] placeholder:text-xs sm:placeholder:text-sm placeholder:-mt-4"
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsDropdownOpen(true)}  
        />
        <span className="absolute top-1.5 sm:top-2.5 right-2">
          <CiSearch size={20} />
        </span>
      </div>
      {isDropdownOpen && (
        <div className="mt-4   w-60 md:w-[400px] lg:w-[600px] absolute top-10 -left-2 md:left-0 z-10 bg-white flex flex-col rounded-md h-[500px] overflow-hidden overflow-y-scroll shadow-gray-100 shadow-xl">
          {filteredBooks && filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <Link
                to={`/book/${book?.id}`}
                key={index}
                className="hover:bg-slate-100 flex items-center gap-2 border-b px-10 py-3"
                onClick={handleSelectBook} 
              >
                <span className="py-2">
                  <img
                    src={book.formats["image/jpeg"]}
                    alt="book image"
                    className="h-9 w-9"
                  />
                </span>
                <span className="py-2 text-xs md:text-sm">{book.title}</span>
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
