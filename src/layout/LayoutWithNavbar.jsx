// src/components/LayoutWithNavbar.jsx
import React from "react";
import Navbar from "../components/Navbar";

const LayoutWithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main> {/* pushes below fixed navbar */}
    </>
  );
};

export default LayoutWithNavbar;
