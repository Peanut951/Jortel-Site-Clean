import React from "react";
import "./utils.css"; // shared utilities (form, two-col, muted)


export default function Contact(): JSX.Element {
  return (
    <main className="page">
      <div className="container">
        <h1>Get in touch</h1>
        <p className="muted">
          Call us, email, or send a message and our team will get back to you within 24 hours.
        </p>

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
