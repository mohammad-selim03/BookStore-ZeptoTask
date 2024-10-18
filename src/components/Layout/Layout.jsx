import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <ScrollRestoration />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
