import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSimCard, FaWifi, FaSatelliteDish } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./Plans.css";

export default function Plans(): JSX.Element {
  const location = useLocation();
  const state = location.state as { nbnType?: string };

  const [category, setCategory] = useState<"voice" | "data" | "nbn">("voice");
  const [variant, setVariant] = useState<"main" | "share" | "fttb" | "fttp" | "fw">("main");

  const [showHelp, setShowHelp] = useState(true);

useEffect(() => {
  if (!showHelp) {
    // Reopen automatically after 60 seconds
    const timer = setTimeout(() => setShowHelp(true), 60000);
    return () => clearTimeout(timer);
  }
}, [showHelp]);


  // ✅ handle nbnType state passed from Home.tsx
  useEffect(() => {
    if (!state?.nbnType) return;
    const t = state.nbnType.toUpperCase();
    setCategory("nbn");

    if (t.includes("WIRELESS")) {
      setVariant("fw");
    } else if (t.includes("FTTP") || t.includes("HFC")) {
      setVariant("fttp");
    } else if (t.includes("FTTC") || t.includes("FTTN") || t.includes("FTTB")) {
      setVariant("fttb");
    } else {
      setVariant("fttb");
    }
  }, [state]);

  // ✅ Plan data for all categories
  const planData = {
    voice: {
      main: [
        { name: "Voice 15GB", price: "$25/mo", data: "15GB Mobile Data", note: "Month-to-month • Data Banking", popular: false },
        { name: "Voice 25GB", price: "$30/mo", data: "25GB Mobile Data", note: "Month-to-month • Data Banking", popular: false },
        { name: "Voice 65GB", price: "$50/mo", data: "65GB Mobile Data", note: "5G Access • Data Banking", popular: true },
        { name: "Voice 120GB", price: "$65/mo", data: "120GB Mobile Data", note: "5G Access • Data Banking", popular: false },
      ],
      share: [
        { name: "Voice Share 20GB", price: "$40/mo", data: "20GB Shared", note: "Share across multiple numbers • 5G Access • Data Banking", popular: false },
        { name: "Voice Share 60GB", price: "$60/mo", data: "60GB Shared", note: "Share across multiple numbers • 5G Access • Data Banking", popular: true },
        { name: "Voice Share 120GB", price: "$90/mo", data: "120GB Shared", note: "Share across multiple numbers •5G Access • Data Banking", popular: false },
      ],
    },

    data: {
      main: [
        { name: "Data 25GB", price: "$30/mo", data: "25GB Data", note: "Month-to-month • Data Banking", popular: false },
        { name: "Data 65GB", price: "$50/mo", data: "65GB Data", note: "5G Access • Data Banking", popular: true },
        { name: "Data 120GB", price: "$65/mo", data: "120GB Data", note: "5G Access • Data Banking", popular: false },
        { name: "Data 300GB", price: "$95/mo", data: "300GB Data", note: "5G Access • Data Banking", popular: false },
      ],
      share: [
        { name: "Data Share 100GB", price: "$80/mo", data: "100GB Shared", note: "Share across multiple numbers • 5G Access • Data Banking", popular: true },
        { name: "Data Share 200GB", price: "$120/mo", data: "200GB Shared", note: "Share across multiple numbers • 5G Access • Data Banking", popular: false },
        { name: "Data Share 400GB", price: "$180/mo", data: "400GB Shared", note: "Share across multiple numbers • 5G Access • Data Banking", popular: false },
      ],
    },

    nbn: {
      fttb: [
        { name: "NBN 25/10", price: "$79/mo", data: "25/10 Mbps", note: "For FTTB / FTTN / FTTC • Unlimited Data", popular: false },
        { name: "NBN 50/20", price: "$99/mo", data: "50/20 Mbps", note: "For FTTB / FTTN / FTTC • Unlimited Data", popular: true },
        { name: "NBN 100/20", price: "$119/mo", data: "100/20 Mbps", note: "For FTTB / FTTN / FTTC • Unlimited Data", popular: false },
      ],
      fttp: [
        { name: "NBN 100/40", price: "$129/mo", data: "100/40 Mbps", note: "For FTTP / HFC • Unlimited Data • Static IP", popular: false },
        { name: "NBN 250/25", price: "$149/mo", data: "250/25 Mbps", note: "For FTTP / HFC • Unlimited Data • Static IP", popular: false },
        { name: "NBN 500/50", price: "$169/mo", data: "500/50 Mbps", note: "FTTP Only • Static IP Included", popular: false },
        { name: "NBN 1000/50", price: "$189/mo", data: "1000/50 Mbps", note: "FTTP Only • Premium Unlimited Data", popular: true },
      ],
      fw: [
        { name: "Fixed Wireless 25/5", price: "$79/mo", data: "25/5 Mbps", note: "Rural coverage • Unlimited Data", popular: false },
        { name: "Fixed Wireless 50/10", price: "$99/mo", data: "50/10 Mbps", note: "Reliable remote access • Unlimited Data", popular: true },
      ],
    },
  };

  const categoryLabels = {
    voice: "Voice Plans",
    data: "Data Plans",
    nbn: "NBN Plans",
  };

  const activePlans = planData[category][variant] || [];

  return (
  <motion.main
    className="page plans-page"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
      <motion.div
  className="plans-hero-banner"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <h1>Choose the Plan That Fits You</h1>
  <p>Reliable connectivity — powered by Australian support.</p>
</motion.div>

      {/* HEADER */}
      <motion.div
        className="plans-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="plan-title">
          {category === "voice" && <FaSimCard className="plan-icon" />}
          {category === "data" && <FaWifi className="plan-icon" />}
          {category === "nbn" && <FaSatelliteDish className="plan-icon" />}
          {categoryLabels[category]}
        </h1>

        {/* CATEGORY BUTTONS */}
        <div className="plan-buttons">
          <div className="toggle-row">
            <button className={`toggle ${category === "voice" ? "active" : ""}`} onClick={() => setCategory("voice")}>Voice</button>
            <button className={`toggle ${category === "data" ? "active" : ""}`} onClick={() => setCategory("data")}>Data</button>
            <button className={`toggle ${category === "nbn" ? "active" : ""}`} onClick={() => setCategory("nbn")}>NBN</button>
          </div>

          {/* SUB-BUTTONS */}
          {category === "voice" && (
            <div className="toggle-row">
              <button className={`toggle ${variant === "main" ? "active" : ""}`} onClick={() => setVariant("main")}>Standard</button>
              <button className={`toggle ${variant === "share" ? "active" : ""}`} onClick={() => setVariant("share")}>Share</button>
            </div>
          )}
          {category === "data" && (
            <div className="toggle-row">
              <button className={`toggle ${variant === "main" ? "active" : ""}`} onClick={() => setVariant("main")}>Standard</button>
              <button className={`toggle ${variant === "share" ? "active" : ""}`} onClick={() => setVariant("share")}>Share</button>
            </div>
          )}
          {category === "nbn" && (
            <div className="toggle-row">
              <button className={`toggle ${variant === "fttb" ? "active" : ""}`} onClick={() => setVariant("fttb")}>FTTB / FTTN / FTTC</button>
              <button className={`toggle ${variant === "fttp" ? "active" : ""}`} onClick={() => setVariant("fttp")}>FTTP / HFC</button>
              <button className={`toggle ${variant === "fw" ? "active" : ""}`} onClick={() => setVariant("fw")}>Fixed Wireless</button>
            </div>
          )}

          {/* SUMMARY BAR */}
          <div className="compare-summary">
            <span>✅ Month-to-Month</span>
            <span>✅ Data Banking / Sharing</span>
            <span>✅ Australian Support</span>
            <button
              className="see-more"
              onClick={() =>
                document.querySelector(".compare-section")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See full comparison ↓
            </button>
          </div>
        </div>
      </motion.div>

      {/* PLAN CARDS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${category}-${variant}`}
          className={`plans-grid ${category}-${variant}`}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 15 }}
          transition={{ duration: 0.3 }}
        >
          {activePlans.map((p, i) => (
            <motion.div key={i} className={`plan-card ${p.popular ? "popular" : ""}`} whileHover={{ scale: 1.04 }}>
              {p.popular && <div className="badge">⭐ Most Popular</div>}
              <h3>{p.name}</h3>
              <div className="price">{p.price}</div>
              <div className="data">{p.data}</div>
              <div className="note">{p.note}</div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="fineprint center">* $99 activation fee applies. Optional modem and phone line available at extra cost.</p>

      {/* COMPARISON TABLE */}
      {/* Advantages Section */}
{/* Advantages Section (dynamic by category) */}
{/* Advantages Section (dynamic by category) */}
{/* Advantages Section (dynamic by category, with hover animation) */}
{/* Advantages Section (dynamic background by category) */}
<motion.section
  className="advantages-section"
  style={{
    background:
      category === "nbn"
        ? "linear-gradient(180deg, #f9fafc 0%, #e9eef5 100%)"
        : "linear-gradient(180deg, #f3f8ff 0%, #e8f0ff 100%)",
    transition: "background 0.4s ease",
  }}
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4 }}
>
  <h2>Why Choose Jortel</h2>

  <motion.div
    className="advantages-grid"
    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {(category === "nbn"
      ? [
          {
            icon: <FaWifi className="adv-icon" />,
            title: "Unlimited Data",
            text: "No caps, no throttling — stream, work and connect freely.",
          },
          {
            icon: <FaSimCard className="adv-icon" />,
            title: "Static IP Included",
            text: "Perfect for business and remote access — stay connected reliably.",
          },
          {
            icon: <FaSatelliteDish className="adv-icon" />,
            title: "No CG-NAT",
            text: "Full IPv4 visibility for hosting, security systems and smart homes.",
          },
          {
            icon: <FaSatelliteDish className="adv-icon" />,
            title: "Month-to-Month Flexibility",
            text: "No lock-in contracts — upgrade or cancel anytime.",
          },
        ]
      : [
          {
            icon: <FaSimCard className="adv-icon" />,
            title: "Data Banking",
            text: "Keep unused data each month — never lose what you’ve paid for.",
          },
          {
            icon: <FaWifi className="adv-icon" />,
            title: "Free International Calls",
            text: "Stay in touch with loved ones — calls to 15 countries included.",
          },
          {
            icon: <FaSatelliteDish className="adv-icon" />,
            title: "Month-to-Month Flexibility",
            text: "No lock-in contracts. Upgrade, downgrade, or cancel anytime.",
          },
        ]
    ).map((item, i) => (
      <motion.div
        key={i}
        className="adv-card"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.35, delay: i * 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {item.icon}
        </motion.div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </motion.div>
    ))}
  </motion.div>
</motion.section>
{/* ADVISOR PANEL */}
<section className="advisor-panel">
  <div className="advisor-content">
    <h2>Need Help Choosing the Right Plan?</h2>
    <p>
      Our Sydney-based team is ready to help you find the best plan for your home or business.
      Whether it’s NBN, mobile, or data sharing — we’ll make it simple.
    </p>
  <a
  href="/contact"
  className="btn primary"
  onClick={(e) => {
    e.preventDefault();

    // Step 1: Smoothly scroll to top before navigation
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Step 2: Handle navigation and scroll to contact form
    const contactPath = "/contact";
    setTimeout(() => {
      if (window.location.pathname === contactPath) {
        const form = document.querySelector("#contact-form");
        form?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.history.pushState({}, "", contactPath);
        window.dispatchEvent(new PopStateEvent("popstate"));
        setTimeout(() => {
          const form = document.querySelector("#contact-form");
          form?.scrollIntoView({ behavior: "smooth" });
        }, 600);
      }
    }, 500); // delay until after top scroll finishes
  }}
>
  Talk to an Expert
</a>


  </div>
</section>
{/* QUICK HELP SIDEBAR */}
{showHelp && (
  <motion.div
    className="quick-help"
    initial={{ opacity: 0, x: 80 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8, duration: 0.4 }}
  >
    <div className="help-bubble">
      <button
        className="close-btn"
        aria-label="Close help"
        onClick={() => setShowHelp(false)}
      >
        ×
      </button>
      <h4>💬 Need Help?</h4>
      <p>
        Our Sydney-based team can guide you in choosing the best plan for your needs.
      </p>
      <button
        className="btn small"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            window.history.pushState({}, "", "/contact");
            window.dispatchEvent(new PopStateEvent("popstate"));
            setTimeout(() => {
              const form = document.querySelector("#contact-form");
              form?.scrollIntoView({ behavior: "smooth" });
            }, 600);
          }, 500);
        }}
      >
        Talk to an Advisor
      </button>
    </div>
  </motion.div>
)}

    </motion.main>
  );
}


