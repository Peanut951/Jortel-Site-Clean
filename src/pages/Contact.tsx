import React from "react";

const Contact: React.FC = () => {
  return (
    <main className="page contact-page">
      <h1>Get in Touch</h1>
      <p>Call us, email, or send a message and our team will get back to you within 24 hours.</p>

      <div className="contact-grid">
        <div>
          <h3>Contact Details</h3>
          <ul>
            <li><strong>Phone:</strong> 1300 JORTEL (567 835)</li>
            <li><strong>Email:</strong> info@jortel.com.au</li>
            <li><strong>Address:</strong> Suite 7B, 256F New Line Road, Dural NSW 2158</li>
          </ul>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="How can we help?" />
          <button className="btn-primary">Send Message</button>
        </form>
      </div>

      <div className="map-placeholder">Map Placeholder (embed Google Maps here)</div>
    </main>
  );
};

export default Contact;
