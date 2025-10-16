import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from "react-icons/fa";
import "./Footer.css"; // Footer-specific styles


export default function Footer(): JSX.Element {
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
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/Blue Logo.svg";
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
