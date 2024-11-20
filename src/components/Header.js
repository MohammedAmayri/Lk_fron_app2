import React from "react";
import "./Header.css"; // Import the header styling
import logo from "./logo.png"; // Adjust path if needed for your project structure


const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="LunchKompis Logo" className="logo-icon" />
        <span>LunchKompis Scrabing Test App</span>
      </div>
    </header>
  );
};

export default Header;