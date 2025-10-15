import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/plans", label: "Plans" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-left">
          <img
            src="/assets/Blue Logo.png"
            alt="Jortel Logo"
            className="nav-logo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/assets/Blue Logo.svg";
            }}
          />
        </div>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Navbar;
