import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import WishlistPage from "../WishlistPage/WishlistPage";
import Layout from "../Layout/Layout";
import BooksPage from "../BooksPage/BooksPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // to makes it the default route
        element: <HomePage />, 
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/book/:id",
        element: <BooksPage />,
      },
    ],
  },
]);
