import React, { useState } from "react";
import Home from "./pages/Home.tsx";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
  FaStar,
  FaWifi,
  FaMobileAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./App.css";

const BRAND = {
  deep: "#142168",
  deepAlt: "#0f1740",
  accent: "#1B5FC1",
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/plans", label: "Plans" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

const reviews = [
  {
    name: "Ashley D’ Souza",
    role: "Business Manager",
    text: "Outstanding customer service … Superb follow up … never letting a customer down.",
    rating: 5,
  },
  {
    name: "Matthew Brooks",
    role: "Senior Project Manager",
    text: "Alex spent countless hours … escalated faults … minimal downtime during relocation.",
    rating: 5,
  },
  {
    name: "Samantha Lee",
    role: "IT Coordinator",
    text: "Jortel ensured smooth integration with our systems. Highly recommend their support.",
    rating: 4,
  },
  {
    name: "David Chen",
    role: "Operations Director",
    text: "Reliable and responsive. The static IP option was a game changer for our remote work.",
    rating: 5,
  },
];

function Navbar(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-gradient" />
      <div className="container header-inner">
        <div className="brand">
          <img
            src="/assets/Blue Logo.png"
            alt="Jortel Logo"
            className="brand-logo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).onerror = null;
              (e.currentTarget as HTMLImageElement).src = "/assets/Blue Logo.svg";
            }}
          />
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

function Footer(): JSX.Element {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <img
              src="/assets/Blue Logo.png"
              alt="Jortel logo"
              className="footer-logo"
              style={{ height: "40px", width: "auto" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).onerror = null;
                (e.currentTarget as HTMLImageElement).src = "/assets/Blue Logo.svg";
              }}
            />
          </div>
          <p className="muted">
            One unified team to consult, deliver and manage your solution to achieve your ambitious business outcomes.
          </p>
          <div className="socials">
            <a aria-label="facebook" href="#"><FaFacebookF /></a>
            <a aria-label="twitter" href="#"><FaTwitter /></a>
            <a aria-label="google" href="#"><FaGooglePlusG /></a>
            <a aria-label="instagram" href="#"><FaInstagram /></a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/plans">Plans</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4>Get in Touch</h4>
          <ul className="muted">
            <li><strong>Call Us</strong><br />1300 JORTEL (567 835)</li>
            <li><strong>Email</strong><br />info@jortel.com.au</li>
            <li><strong>Address</strong><br />Suite 7B, 256F New Line Road, Dural NSW 2158</li>
          </ul>
        </div>

        <div>
          <h4>Subscribe Now</h4>
          <p className="muted">Stay up to date with our latest news and products</p>
          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input aria-label="email" type="email" placeholder="Type your Email" />
            <button type="submit" title="Subscribe">➤</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Jortel Communications. All rights reserved.
      </div>
    </footer>
  );
}


function Plans(): JSX.Element {
  const plans = {
    mobile: [
      { price: "$30/mo", data: "25GB Mobile Data", features: ["5G Access", "Unlimited Calls & Text", "Data Banking"] },
      { price: "$50/mo", data: "65GB Mobile Data", features: ["5G Access", "Free Calls to 15 Countries", "Data Banking"], recommended: true },
      { price: "$65/mo", data: "120GB Mobile Data", features: ["5G Access", "International Roaming", "Data Banking"] },
    ],
    nbn: [
      { price: "$79/mo", data: "25/10 Mbps NBN", features: ["Unlimited Data", "Static IP Included", "Month-to-Month"] },
      { price: "$99/mo", data: "50/20 Mbps NBN", features: ["Unlimited Data", "Static IP Included", "Month-to-Month"], recommended: true },
      { price: "$129/mo", data: "100/40 Mbps NBN", features: ["Unlimited Data", "Static IP Included", "Month-to-Month"] },
    ],
  };

  return (
    <main className="page">
      <div className="container">
        <h1 className="page-title">Our Plans</h1>

        <section>
          <h2>Mobile Plans</h2>
          <div className="cards-grid">
            {plans.mobile.map((p, i) => (
              <div className={`plan ${p.recommended ? "recommended" : ""}`} key={i}>
                {p.recommended && <div className="badge">Most Popular</div>}
                <div className="price">{p.price}</div>
                <div className="name">{p.data}</div>
                <ul className="features">{p.features.map((f, k) => <li key={k}>{f}</li>)}</ul>
                <button className="btn primary full">Apply Now</button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>NBN Plans</h2>
          <div className="cards-grid">
            {plans.nbn.map((p, i) => (
              <div className={`plan ${p.recommended ? "recommended" : ""}`} key={i}>
                {p.recommended && <div className="badge">Most Popular</div>}
                <div className="price">{p.price}</div>
                <div className="name">{p.data}</div>
                <ul className="features">{p.features.map((f, k) => <li key={k}>{f}</li>)}</ul>
                <button className="btn primary full">Apply Now</button>
              </div>
            ))}
          </div>
        </section>

        <p className="muted center">* $99 activation fee applies. Optional modem and phone line available at extra cost.</p>
      </div>
    </main>
  );
}

function About(): JSX.Element {
  return (
    <main className="page">
      <div className="container">
        <h1>About Jortel Communications</h1>
        <p className="muted">Australian-owned telco delivering mobile, NBN and business telecoms with local support and transparent pricing.</p>

        <div className="two-col">
          <div>
            <h3>Our Story</h3>
            <p>Jortel was founded to provide reliable, honest telecom solutions to Australian businesses and households. We combine national network reach with personalised local support so customers get the best of both worlds.</p>
            <button className="btn primary">Learn More</button>
          </div>
          <div className="card pale">
            <h4>Why choose us?</h4>
            <ul>
              <li>Coverage across 98%+ population using Telstra’s network</li>
              <li>No lock-in contracts or hidden fees</li>
              <li>Generous data and rollover on many plans</li>
              <li>Friendly Australian-based support</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

function Contact(): JSX.Element {
  return (
    <main className="page">
      <div className="container">
        <h1>Get in touch</h1>
        <p className="muted">Call us, email, or send a message and our team will get back to you within 24 hours.</p>

        <div className="two-col">
          <div>
            <h3>Contact Details</h3>
            <ul className="muted">
              <li><strong>Phone:</strong> 1300 JORTEL (567 835)</li>
              <li><strong>Email:</strong> info@jortel.com.au</li>
              <li><strong>Address:</strong> Suite 7B, 256F New Line Road, Dural NSW 2158</li>
            </ul>
            <h4>Office Hours</h4>
            <p className="muted">Mon–Fri 9:00am – 5:30pm AEST</p>
          </div>

          <div>
            <h3>Send us a message</h3>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Your name" />
              <input placeholder="Your email" />
              <textarea placeholder="How can we help?" />
              <button className="btn primary full">Send Message</button>
            </form>
          </div>
        </div>

        <div className="map-placeholder">Map placeholder (embed Google Maps here)</div>
      </div>
    </main>
  );
}

export default function App(): JSX.Element {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
