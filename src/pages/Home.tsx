import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaMobileAlt, FaWifi, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const BRAND = {
  deep: "#142168",
  deepAlt: "#0f1740",
  accent: "#1B5FC1",
};

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

export default function Home(): JSX.Element {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [checkingNbn, setCheckingNbn] = useState(false);
  const [nbnResult, setNbnResult] = useState<any>(null);
  const [nbnError, setNbnError] = useState<string | null>(null);
  const navigate = useNavigate();
  const debounceRef = useRef<number | null>(null);
  
  // ✅ Navigate to Plans page with detected NBN type
  const handleViewPlans = (techType: string) => {
    if (!techType) return;
    navigate("/plans", { state: { nbnType: techType } });
  };



  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  const fetchSuggestions = async (text: string) => {
    const key = process.env.REACT_APP_GEOAPIFY_KEY;
    if (!key) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }
    try {
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        text
      )}&limit=6&apiKey=${encodeURIComponent(key)}`;
      const res = await fetch(url);
      const data = await res.json();
      const list = Array.isArray(data?.features)
        ? data.features
            .map((f: any) => f?.properties?.formatted)
            .filter(Boolean)
            .slice(0, 6)
        : [];
      setSuggestions(list);
      setShowSuggestions(list.length > 0);
    } catch {
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setNbnResult(null);
    setNbnError(null);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoadingSuggestions(true);
    debounceRef.current = window.setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSelect = (address: string) => {
    setQuery(address);
    setSuggestions([]);
    setShowSuggestions(false);
    checkNbnAvailability(address);
  };

 const checkNbnAvailability = async (address: string) => {
  const rapidKey = process.env.REACT_APP_RAPIDAPI_KEY;
  setNbnResult(null);
  setNbnError(null);
  if (!address || address.trim().length < 3) {
    setNbnError("Please enter a valid address.");
    return;
  }
  if (!rapidKey) {
    setNbnError("Missing RapidAPI key. Set REACT_APP_RAPIDAPI_KEY in your .env file.");
    return;
  }

const handleSelect = (address: string) => {
  setQuery(address);
  setSuggestions([]);
  setShowSuggestions(false);
  checkNbnAvailability(address);
};

const handleViewPlans = () => {
  const type =
    nbnResult?.addressDetail?.techType ||
    nbnResult?.servingArea?.techType ||
    "";
  console.log("Redirecting to plans:", type);
  if (type) navigate("/plans", { state: { nbnType: type } });
};



  setCheckingNbn(true);
  try {
    const url = `https://nbnco-address-check.p.rapidapi.com/nbn_address?address=${encodeURIComponent(address)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": "nbnco-address-check.p.rapidapi.com",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Status ${res.status}: ${text}`);
    }

    const data = await res.json();
    setNbnResult(data);
    setNbnError(null);
  } catch (err: any) {
    setNbnResult(null);
    setNbnError(err?.message || "Unable to fetch NBN availability. Please try again later.");
  } finally {
    setCheckingNbn(false);
  }
};


  const handleSearchClick = () => {
    setShowSuggestions(false);
    checkNbnAvailability(query);
  };

  const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <main className="page">
      {/* HERO */}
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/assets/iStock-1314570441.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <motion.h1 initial="hidden" animate="visible" variants={fade} className="hero-title">
            Seamless Communication,<br />Endless Possibilities
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ delay: 0.12 }}
            className="hero-sub"
          >
            Your gateway to a connected future across Australia. Reliable mobile, fixed internet,
            and business telecom solutions — all in one place.
          </motion.p>
          <div className="hero-cta">
            <Link className="btn primary" to="/plans">View Plans</Link>
            <Link className="btn ghost" to="/contact">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* NBN SECTION */}
      <section className="nbn-section">
        <div className="container">
          <h2 className="section-title">Check NBN Availability</h2>
          <p className="muted">Type your address and select a suggestion (autocomplete). Then hit Search.</p>

          <div className="nbn-search-wrap">
            <div className="nbn-search-bar" role="search" aria-label="NBN availability search">
              <input
                aria-label="Address"
                type="text"
                value={query}
                onChange={handleChange}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                placeholder="Start typing address (eg. 256 New Line Rd, Sydney)"
                autoComplete="off"
              />
              <button onClick={handleSearchClick} disabled={checkingNbn || !query.trim()}>
                {checkingNbn ? "Checking…" : "Search"}
              </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((s, i) => (
                  <li key={i} onClick={() => handleSelect(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ marginTop: 18, maxWidth: 920, marginInline: "auto" }}>
            {checkingNbn && <div className="muted">Checking NBN availability…</div>}

            {nbnError && (
              <div style={{ marginTop: 12, color: "#c53030", background: "#fff1f1", padding: 12, borderRadius: 8 }}>
                {nbnError}
              </div>
            )}

            {nbnResult && (
  <div
    style={{
      marginTop: 32,
      background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
      padding: "32px 40px",
      borderRadius: 20,
      boxShadow: "0 10px 30px rgba(20, 33, 104, 0.08)",
      maxWidth: 800,
      marginLeft: "auto",
      marginRight: "auto",
      transition: "all 0.3s ease",
    }}
  >
    <h3
      style={{
        color: BRAND.deep,
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 20,
        textAlign: "center",
      }}
    >
      NBN Availability Results
    </h3>

    {/* Address Info */}
    {nbnResult.addressDetail && (
      <div
        style={{
          background: "#f9fafb",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 16,
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ fontWeight: 600, color: BRAND.deepAlt, marginBottom: 4 }}>
          Address
        </div>
        <div style={{ color: "#111827", marginBottom: 8 }}>
          {nbnResult.addressDetail.formattedAddress}
        </div>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ color: "#4b5563" }}>
            <strong>Technology:</strong>{" "}
            {nbnResult.addressDetail.techType || "N/A"}
          </div>
          <div style={{ color: "#4b5563" }}>
            <strong>Status:</strong>{" "}
            {nbnResult.addressDetail.serviceStatus || "N/A"}
          </div>
        </div>
      </div>
    )}

    {/* Serving Area Info */}
    {nbnResult.servingArea && (
      <div
        style={{
          background: "#f9fafb",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 16,
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ fontWeight: 600, color: BRAND.deepAlt, marginBottom: 4 }}>
          Serving Area
        </div>
        <div style={{ color: "#111827", marginBottom: 8 }}>
          {nbnResult.servingArea.description}
        </div>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ color: "#4b5563" }}>
            <strong>Technology:</strong>{" "}
            {nbnResult.servingArea.techType || "N/A"}
          </div>
          <div style={{ color: "#4b5563" }}>
            <strong>Status:</strong>{" "}
            {nbnResult.servingArea.serviceStatus || "N/A"}
          </div>
          <div style={{ color: "#4b5563" }}>
            <strong>Ready for Service:</strong>{" "}
            {nbnResult.servingArea.rfsMessage || "N/A"}
          </div>
        </div>
      </div>
    )}

    {/* Timestamp */}
    {nbnResult.timestamp && (
      <div
        style={{
          fontSize: 13,
          color: "#6b7280",
          textAlign: "center",
          marginTop: 8,
        }}
      >
        Data retrieved:{" "}
        {new Date(nbnResult.timestamp).toLocaleString("en-AU", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
    )}

{(nbnResult.addressDetail?.techType || nbnResult.servingArea?.techType) && (
  <div style={{ textAlign: "center", marginTop: 24 }}>
    <button
      onClick={() =>
        handleViewPlans(
          nbnResult?.addressDetail?.techType ||
          nbnResult?.servingArea?.techType ||
          ""
        )
      }
      style={{
        background: "linear-gradient(90deg, #1B5FC1, #142168)",
        color: "white",
        padding: "10px 26px",
        borderRadius: 999,
        border: "none",
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.25s ease",
      }}
      onMouseEnter={(e) =>
        ((e.target as HTMLButtonElement).style.background =
          "linear-gradient(90deg, #142168, #1B5FC1)")
      }
      onMouseLeave={(e) =>
        ((e.target as HTMLButtonElement).style.background =
          "linear-gradient(90deg, #1B5FC1, #142168)")
      }
    >
      View{" "}
      {nbnResult?.addressDetail?.techType ||
        nbnResult?.servingArea?.techType ||
        "NBN"}{" "}
      Plans →
    </button>
  </div>
)}



    {/* Clear button */}
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button
        className="btn ghost"
        onClick={() => {
          setNbnResult(null);
          setNbnError(null);
        }}
        style={{
          padding: "8px 24px",
          fontSize: 15,
          borderRadius: 30,
          background: "linear-gradient(90deg, #1B5FC1 0%, #142168 100%)",
          color: "white",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLButtonElement).style.opacity = "0.85")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.opacity = "1")
        }
      >
        Clear Results
      </button>
    </div>
  </div>
)}

          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="solutions">
        <div className="container">
          <h2 className="section-title">Our Solutions</h2>
          <div className="solutions-grid">
            <div className="tile"><h3>Mobile Solutions</h3><p>Flexible mobile plans with data banking, 5G access and business sharing options.</p></div>
            <div className="tile"><h3>Data Sharing</h3><p>Share data across multiple devices and plans — ideal for families and small teams.</p></div>
            <div className="tile"><h3>Business Internet</h3><p>Robust NBN and fixed wireless options with static IP and flexible contracts.</p></div>
            <div className="tile"><h3>Fixed Wireless</h3><p>Fast fixed wireless solutions where NBN isn't available — reliable and scalable.</p></div>
            <div className="tile"><h3>NBN Plans</h3><p>A range of NBN tiers to suit homes and businesses — month-to-month options and add-ons included.</p></div>
            <div className="tile"><h3>Managed Solutions</h3><p>End-to-end managed services, monitoring and support to keep your comms running.</p></div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="plans-teaser">
        <div className="container teaser-inner">
          <h2>Our Most Popular Plans</h2>
          <p className="muted">Flexible month-to-month plans with all the extras included. No hidden fees.</p>
          <div className="plan-cards">
            <div className="plan-card">
              <div className="plan-price">$50/mo</div>
              <div className="plan-name">65GB Mobile Data</div>
              <div className="plan-features"><FaMobileAlt /> 5G Access • Free calls to 15 countries</div>
              <div className="plan-note">Data Banking</div>
              <Link to="/plans" className="btn primary small">View All Plans</Link>
            </div>
            <div className="plan-card">
              <div className="plan-price">$99/mo</div>
              <div className="plan-name">50/20 Mbps NBN</div>
              <div className="plan-features"><FaWifi /> Unlimited Data • Static IP Included</div>
              <div className="plan-note">Month-to-Month</div>
              <Link to="/plans" className="btn primary small">View All Plans</Link>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews">
        <div className="container">
          <h2 className="section-title">Customer Reviews</h2>
          <p className="muted">Trusted by our clients across Australia</p>
          <div className="reviews-viewport">
            <div className="reviews-track">
              {[...reviews, ...reviews].map((r, i) => (
                <div className="review-card" key={`${r.name}-${i}`}>
                  <div className="review-head">
                    <div className="avatar" style={{ background: `linear-gradient(90deg, ${BRAND.deep}, ${BRAND.deepAlt})` }}>
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <div className="review-role muted">{r.role}</div>
                    </div>
                  </div>
                  <div className="review-text">“{r.text}”</div>
                  <div className="review-stars">
                    {Array.from({ length: r.rating }).map((_, k) => <FaStar key={k} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <h3>Ready to Connect?</h3>
          <p>Call us at <strong>1300 567 835</strong> or get in touch today.</p>
          <Link to="/contact" className="btn ghost">Contact Now</Link>
        </div>
      </section>
    </main>
  );
}
