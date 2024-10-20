import React from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import WishlistPage from "../WishlistPage/WishlistPage";
import Layout from "../Layout/Layout";
import BooksPage from "../BooksPage/BooksPage";
import BooksByGenre from "../Books/Books";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />,
        <ScrollRestoration />
      </>
    ),
    children: [
      {
        index: true,  
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
      {
        path: "/books",
        element: <BooksByGenre />,
      },
    ],
  },
]);
