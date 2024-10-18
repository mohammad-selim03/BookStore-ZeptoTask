import React, { useEffect, useRef, useState } from "react";
import { HiOutlineHome, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { MdFavoriteBorder, MdOutlineHome } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import SearchFiller from "./SearchFiller";
import DropDownMenu from "./DropDownMenu";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const menuRef = useRef(null);

  const menus = [
    { title: "home", link: "/", icon: <HiOutlineHome size={20} /> },
    {
      title: "wishlist",
      link: "/wishlist",
      icon: <MdFavoriteBorder size={20} />,
    },
     
  ];

  const handleMenu = () => {
    // setOpenMenu(!openMenu);
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
  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-2 md:px-7">
          <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Book Store
            </span>
          </a>
          <div className="relative ">
            <SearchFiller />
          </div>

          <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {menus?.map((menu, index) => (
                <li>
                  <Link
                    key={index}
                    to={menu?.link}
                    class="block py-2 px-3 text-white  rounded md:bg-transparent -700 md:p-0 md:dark:bg-transparent capitalize"
                    aria-current="page"
                  >
                    {menu?.title}
                  </Link>
                </li>
              ))}
              <li><DropDownMenu /></li>
            </ul>
          </div>

          <div>
            {!menuClicked ? (
              <button
                onClick={handleMenu}
                data-collapse-toggle="navbar-dropdown"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 relative"
                aria-controls="navbar-dropdown"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            ) : (
              <span onClick={() => setMenuClicked(false)}>
                <RxCross2 className="text-white cursor-pointer" size={30} />
              </span>
            )}

            {/* mobile devices navigation menu */}
            {/* {openMenu && (
              <div className="absolute top-20  right-2 px-5 py-4 bg-white rounded-md border border-gray-200 shadow-gray-300 shadow-sm w-60">
                {menus?.map((menu, index) => (
                  <Link to={menu?.link}>
                    {" "}
                    <p
                      key={index}
                      className="capitalize hover:bg-slate-100 cursor-pointer py-2 px-5 rounded-md w-full flex items-center gap-1"
                    >
                      {menu?.icon} {menu?.title}
                    </p>
                  </Link>
                ))}
              </div>
            )} */}
            {menuClicked && (
              <div
                ref={menuRef}
                className="absolute top-20 right-2 px-5 py-4 bg-white rounded-md border border-gray-200 shadow-gray-300 shadow-sm w-60"
              >
                {menus?.map((menu, index) => (
                  <Link to={menu?.link} key={index}>
                    <p className="capitalize hover:bg-slate-100 cursor-pointer py-2 px-5 rounded-md w-full flex items-center gap-1">
                      {menu?.icon} {menu?.title}
                    </p>
                  </Link>
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
