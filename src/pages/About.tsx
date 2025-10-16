import React from "react";
import "./utils.css"; // if you use shared utilities like .two-col or .muted


export default function About(): JSX.Element {
  return (
    <main className="page">
      <div className="container">
        <h1>About Jortel Communications</h1>
        <p className="muted">
          Australian-owned telco delivering mobile, NBN and business telecoms with local support and transparent pricing.
        </p>

        <div className="two-col">
          <div>
            <h3>Our Story</h3>
            <p>
              Jortel was founded to provide reliable, honest telecom solutions to Australian businesses and households.
              We combine national network reach with personalised local support so customers get the best of both worlds.
            </p>
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
