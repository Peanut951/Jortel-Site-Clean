import React from "react";

const Plans: React.FC = () => {
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
    <main className="page plans-page">
      <h1>Our Plans</h1>

      <section>
        <h2>Mobile Plans</h2>
        <div className="plan-grid">
          {plans.mobile.map((plan, i) => (
            <div key={i} className={`plan-card ${plan.recommended ? "highlight" : ""}`}>
              {plan.recommended && <span className="badge">Most Popular</span>}
              <h3>{plan.price}</h3>
              <p>{plan.data}</p>
              <ul>
                {plan.features.map((f, j) => (
                  <li key={j}>✓ {f}</li>
                ))}
              </ul>
              <button className="btn-primary">Apply Now</button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>NBN Plans</h2>
        <div className="plan-grid">
          {plans.nbn.map((plan, i) => (
            <div key={i} className={`plan-card ${plan.recommended ? "highlight" : ""}`}>
              {plan.recommended && <span className="badge">Most Popular</span>}
              <h3>{plan.price}</h3>
              <p>{plan.data}</p>
              <ul>
                {plan.features.map((f, j) => (
                  <li key={j}>✓ {f}</li>
                ))}
              </ul>
              <button className="btn-primary">Apply Now</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Plans;
