import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css"; // Navbar-specific styles


const navLinks = [
  { to: "/", label: "Home" },
  { to: "/plans", label: "Plans" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-gradient" />
      <div className="container header-inner">
        <div className="brand">
          <Link to="/" onClick={() => setOpen(false)}>
            <img
              src="/assets/Blue Logo.png"
              alt="Jortel Logo"
              className="brand-logo"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).onerror = null;
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/Blue Logo.svg";
              }}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>

        <nav className={`main-nav ${open ? "open" : ""}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive ? "mobile-nav-link active" : "mobile-nav-link"
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
