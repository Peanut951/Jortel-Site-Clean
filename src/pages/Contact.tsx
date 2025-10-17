import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

export default function Contact(): JSX.Element {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");
    try {
      // TODO: Replace with your backend / API endpoint
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!resp.ok) throw new Error("Submission failed");
      setSubmitStatus("success");
      setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form submit error:", err);
      setSubmitStatus("error");
    }
  };

  return (
    <motion.main
      className="page contact-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have questions or need help? Fill out the form or reach us directly below.</p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info">
          <h2>Reach Us</h2>
          <ul>
            <li>
              <strong>Email:</strong> support@yourdomain.com
            </li>
            <li>
              <strong>Phone:</strong> 1300 567 835
            </li>
            <li>
              <strong>Address:</strong> 123 Jortel Avenue, Sydney, NSW
            </li>
          </ul>

          <div className="support-links">
            <a href="/support">Go to Support →</a>
            <a href="/faq">Help Articles & FAQ</a>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleChange}
                placeholder="0400 123 456"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formState.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formState.message}
                onChange={handleChange}
                placeholder="How can we help?"
                required
              />
            </div>

            <button type="submit" className="btn primary" disabled={submitStatus === "sending"}>
              {submitStatus === "sending" ? "Sending…" : "Send Message"}
            </button>

            {submitStatus === "success" && <p className="form-feedback success">Thank you — we’ll be in touch soon.</p>}
            {submitStatus === "error" && <p className="form-feedback error">Oops, something went wrong. Try again.</p>}
          </motion.form>
        </div>
      </div>
    </motion.main>
  );
}
