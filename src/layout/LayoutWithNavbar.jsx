import React from "react";
import Navbar from "../components/Navbar";

const LayoutWithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main> 
    </>
  );
};

export default LayoutWithNavbar;
