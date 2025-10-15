import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-logo">
            <img
              src="/assets/Blue Logo.png"
              alt="logo"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/assets/Blue Logo.svg";
              }}
            />
            <h3>JORTEL</h3>
          </div>
          <p>
            One unified team to consult, deliver and manage your solution to
            achieve your ambitious business outcomes.
          </p>
          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGooglePlusG /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/plans">Plans</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4>Get in Touch</h4>
          <ul>
            <li><strong>Call:</strong> 1300 JORTEL (567 835)</li>
            <li><strong>Email:</strong> info@jortel.com.au</li>
            <li><strong>Address:</strong> Suite 7B, 256F New Line Road, Dural NSW 2158</li>
          </ul>
        </div>

        <div>
          <h4>Subscribe</h4>
          <p>Stay up to date with our latest news and products</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Type your email" />
            <button type="submit">➤</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Jortel Communications. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
