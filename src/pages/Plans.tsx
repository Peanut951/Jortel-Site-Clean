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
        { name: "Voice 65GB", price: "$50/mo", data: "65GB Mobile Data", note: "5G Access • Free Calls (15 countries)", popular: true },
        { name: "Voice 120GB", price: "$65/mo", data: "120GB Mobile Data", note: "Intl Roaming • Data Banking", popular: false },
      ],
      share: [
        { name: "Voice Share 20GB", price: "$40/mo", data: "20GB Shared", note: "Share across multiple numbers", popular: false },
        { name: "Voice Share 60GB", price: "$60/mo", data: "60GB Shared", note: "Add-on SIMs available", popular: true },
        { name: "Voice Share 120GB", price: "$90/mo", data: "120GB Shared", note: "Great for families/teams", popular: false },
      ],
    },

    data: {
      main: [
        { name: "Data 25GB", price: "$30/mo", data: "25GB Data", note: "Month-to-month • Data Banking", popular: false },
        { name: "Data 65GB", price: "$50/mo", data: "65GB Data", note: "5G Access • Data Banking", popular: true },
        { name: "Data 120GB", price: "$65/mo", data: "120GB Data", note: "5G Access • Data Banking", popular: false },
        { name: "Data 300GB", price: "$95/mo", data: "300GB Data", note: "Heavy use • Hotspot friendly", popular: false },
      ],
      share: [
        { name: "Data Share 100GB", price: "$80/mo", data: "100GB Shared", note: "Share with 4 devices", popular: true },
        { name: "Data Share 200GB", price: "$120/mo", data: "200GB Shared", note: "Share with 6 devices", popular: false },
        { name: "Data Share 400GB", price: "$180/mo", data: "400GB Shared", note: "For teams/edge devices", popular: false },
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
    <main className="page plans-page">
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
      <motion.section
        className="compare-section"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2>Compare Key Features</h2>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Voice</th>
              <th>Data</th>
              <th>NBN</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Month-to-Month</td><td>✅</td><td>✅</td><td>✅</td></tr>
            <tr><td>Data Banking / Sharing</td><td>✅</td><td>✅</td><td>—</td></tr>
            <tr><td>5G Access</td><td>✅</td><td>✅</td><td>—</td></tr>
            <tr><td>Static IP</td><td>—</td><td>—</td><td>✅</td></tr>
            <tr><td>International Calls</td><td>✅ (15 countries)</td><td>—</td><td>—</td></tr>
            <tr><td>Australian Support</td><td>✅</td><td>✅</td><td>✅</td></tr>
          </tbody>
        </table>
      </motion.section>
    </main>
  );
}
