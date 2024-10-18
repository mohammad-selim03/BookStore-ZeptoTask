import React, { useEffect, useRef, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { MdFavoriteBorder } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import SearchFiller from "./SearchFiller";
import DropDownMenu from "./DropDownMenu";  
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const menuRef = useRef(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "wishlist") {
        const updatedWishlist = JSON.parse(event.newValue) || [];
        setWishlist(updatedWishlist);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [wishlist]);

  const menus = [
    { title: "home", link: "/", icon: <HiOutlineHome size={20} /> },
    {
      title: "wishlist",
      link: "/wishlist",
      icon: <MdFavoriteBorder size={20} />,
    },
  ];

  const handleMenu = () => {
    setOpenMenu(!openMenu);
    setMenuClicked((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuClicked(false);
    }
  };

  useEffect(() => {
    if (menuClicked) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuClicked]);

  const handleLinkClick = () => {
    setOpenMenu(false);
    setMenuClicked(false);
  };
 

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-2 md:px-7">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-lg sm:text-lg md:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Book Store
            </span>
          </a>
          <div>
            <SearchFiller />
          </div>

          <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {menus.map((menu, index) => (
                <li key={index}>
                  <Link
                    to={menu.link}
                    className="block py-2 px-3 text-white rounded md:bg-transparent -700 md:p-0 md:dark:bg-transparent capitalize relative"
                    aria-current="page"
                    onClick={handleLinkClick}
                  >
                    {menu.title}{" "}
                    {menu.title === "wishlist" && (
                      <span className="bg-white text-black h-4 w-4 rounded-full flex items-center justify-center text-xs ml-2 absolute -top-1 -right-4">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <DropDownMenu />
              </li>
            </ul>
          </div>

          <div className="visible md:hidden">
            {!menuClicked ? (
              <span onClick={() => setMenuClicked(false)}>
                <IoMenu onClick={handleMenu} className="text-white cursor-pointer text-2xl" />
              </span>
            ) : (
              <span onClick={() => setMenuClicked(false)}>
                <RxCross2 className="text-white cursor-pointer text-lg" />
              </span>
            )}

            {/* Mobile devices navigation menu */}
            {openMenu && (
              <div
                ref={menuRef}
                className="absolute top-20 z-10 right-2 px-5 py-4 bg-white rounded-md border border-gray-200 shadow-gray-300 shadow-sm w-60"
              >
                {menus.map((menu, index) => (
                  <div key={index}>
                    <Link to={menu.link} onClick={handleLinkClick}>
                      <p className="capitalize hover:bg-slate-100 cursor-pointer py-2 px-5 rounded-md w-full flex items-center gap-1">
                        {menu.icon} {menu.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
