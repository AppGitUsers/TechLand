import { useState } from "react";

// ─── Pricing Data ────────────────────────────────────────────────────────────
const PLANS = [
  { key: "3m",  label: "3 Months",  months: 3  },
  { key: "6m",  label: "6 Months",  months: 6  },
  { key: "1y",  label: "1 Year",    months: 12 },
  { key: "3y",  label: "3 Years",   months: 36 },
];

// One-time costs (paid once ever, at signup)
const ONE_TIME = {
  hosting: 1000,
  domain:  800,
};

// Renewal costs per month  (multiplied by plan months)
const RENEWAL_PER_MONTH = {
  ssl:   0,     // free
  email: 0,     // 2 free
};

// Combos: each has a setup cost (software) + renewal cost per month
const COMBOS = [
  {
    id: 1,
    name: "Starter",
    icon: "🌱",
    gradient: "linear-gradient(135deg,#0c5af5 0%,#0ea5e9 100%)",
    setupCost: 4999,
    renewalPerMonth: 199,
    fingerprint: false,
    features: [
      "Basic Website / Landing Page",
      "1,000 Hosting (one-time)",
      "₹800 Domain (one-time)",
      "Free SSL Certificate",
      "2 Free Business Emails",
      "Standard Support",
    ],
    highlight: false,
  },
  {
    id: 2,
    name: "Business",
    icon: "🚀",
    gradient: "linear-gradient(135deg,#6a5af9 0%,#0c5af5 100%)",
    setupCost: 9999,
    renewalPerMonth: 399,
    fingerprint: false,
    features: [
      "Business Website / Web App",
      "₹1,000 Hosting (one-time)",
      "₹800 Domain (one-time)",
      "Free SSL Certificate",
      "2 Free Business Emails",
      "Priority Support",
    ],
    highlight: true,
  },
  {
    id: 3,
    name: "Business+",
    icon: "🏆",
    gradient: "linear-gradient(135deg,#0c5af5 0%,#2df494 100%)",
    setupCost: 9999,
    renewalPerMonth: 399,
    fingerprint: true,
    features: [
      "Business Website / Web App",
      "₹1,000 Hosting (one-time)",
      "₹800 Domain (one-time)",
      "Free SSL Certificate",
      "2 Free Business Emails",
      "Fingerprint Scanner Device",
    ],
    highlight: false,
  },
  {
    id: 4,
    name: "Enterprise",
    icon: "🏢",
    gradient: "linear-gradient(135deg,#f24903 0%,#6a5af9 100%)",
    setupCost: 24999,
    renewalPerMonth: 799,
    fingerprint: true,
    features: [
      "Full Custom Web Platform",
      "₹1,000 Hosting (one-time)",
      "₹800 Domain (one-time)",
      "Free SSL Certificate",
      "2 Free Business Emails",
      "Fingerprint Scanner Device",
    ],
    highlight: false,
  },
];

const FINGERPRINT_COST = 6500;

// ─── Helper ───────────────────────────────────────────────────────────────────
function calcPricing(combo, plan) {
  const oneTime =
    combo.setupCost +
    ONE_TIME.hosting +
    ONE_TIME.domain +
    (combo.fingerprint ? FINGERPRINT_COST : 0);

  const renewal = combo.renewalPerMonth * plan.months;

  // First payment = one-time + first-plan renewal
  const firstPayment = oneTime + renewal;

  return { oneTime, renewal, firstPayment };
}

function fmt(n) {
  return "₹" + n.toLocaleString("en-IN");
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CombosSection() {
  const [activePlan, setActivePlan] = useState("1y");
  const plan = PLANS.find((p) => p.key === activePlan);

  return (
    <>
      <style>{CSS}</style>

      <section className="combos-section section" id="combos">
        <div className="container">

          {/* Heading */}
          <div className="heading-section combos-heading reveal">
            <span className="tag-label">
              <span className="hex-dot" style={{ background: "var(--primary)" }} />
              Pricing &amp; Combos
            </span>
            <h2 style={{ marginTop: 14 }}>
              Transparent Plans,{" "}
              <span style={{ color: "var(--primary)" }}>Zero Surprises</span>
            </h2>
            <p className="sub">
              Pick a plan duration, see exactly what you pay — first-time and on
              renewal. Hosting &amp; domain are one-time; everything else renews
              with your chosen cycle.
            </p>
          </div>

          {/* Plan Toggle */}
          <div className="combos-plan-toggle reveal reveal-delay-1">
            {PLANS.map((p) => (
              <button
                key={p.key}
                className={`plan-tab${activePlan === p.key ? " active" : ""}`}
                onClick={() => setActivePlan(p.key)}
              >
                {p.label}
                {p.key === "1y" && (
                  <span className="popular-pill">Popular</span>
                )}
                {p.key === "3y" && (
                  <span className="save-pill">Best Value</span>
                )}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="combos-grid">
            {COMBOS.map((combo, i) => {
              const { oneTime, renewal, firstPayment } = calcPricing(combo, plan);
              return (
                <div
                  key={combo.id}
                  className={`combo-card reveal reveal-delay-${i + 1}${combo.highlight ? " combo-highlighted" : ""}`}
                >
                  {combo.highlight && (
                    <div className="combo-badge">Most Popular</div>
                  )}

                  {/* Card top strip */}
                  <div
                    className="combo-top"
                    style={{ background: combo.gradient }}
                  >
                    <span className="combo-icon">{combo.icon}</span>
                    <h3 className="combo-name">{combo.name}</h3>
                    {combo.fingerprint && (
                      <span className="fingerprint-tag">
                        🔏 Fingerprint Scanner
                      </span>
                    )}
                  </div>

                  {/* Pricing breakdown */}
                  <div className="combo-pricing">
                    <div className="combo-first-pay">
                      <span className="combo-first-label">First Payment</span>
                      <span className="combo-first-amount">
                        {fmt(firstPayment)}
                      </span>
                    </div>

                    <div className="combo-breakdown">
                      <div className="breakdown-row">
                        <span>Setup Cost</span>
                        <span className="bval">{fmt(combo.setupCost)}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>Hosting</span>
                        <span className="bval">
                          {fmt(ONE_TIME.hosting)}{" "}
                          <em>(one-time)</em>
                        </span>
                      </div>
                      <div className="breakdown-row">
                        <span>Domain</span>
                        <span className="bval">
                          {fmt(ONE_TIME.domain)}{" "}
                          <em>(one-time)</em>
                        </span>
                      </div>
                      {combo.fingerprint && (
                        <div className="breakdown-row">
                          <span>Fingerprint Device</span>
                          <span className="bval">
                            {fmt(FINGERPRINT_COST)}{" "}
                            <em>(one-time)</em>
                          </span>
                        </div>
                      )}
                      <div className="breakdown-row highlight-row">
                        <span>
                          Renewal ({plan.label})
                        </span>
                        <span className="bval">{fmt(renewal)}</span>
                      </div>
                    </div>

                    <div className="combo-renewal-note">
                      After first payment, renew at{" "}
                      <strong>{fmt(renewal)}</strong> every {plan.label.toLowerCase()}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="combo-divider" />

                  {/* Features */}
                  <ul className="combo-features">
                    {combo.features.map((f, fi) => (
                      <li key={fi}>
                        <span className="combo-check">✓</span>
                        {f}
                      </li>
                    ))}
                    <li>
                      <span className="combo-check">✓</span>
                      Free SSL Certificate
                    </li>
                    <li>
                      <span className="combo-check combo-check-free">FREE</span>
                      2 Business Emails
                    </li>
                  </ul>

                  {/* CTA */}
                  <a href="/query" className="btn combo-cta">
                    Get Started →
                  </a>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="combos-footnote reveal">
            * SSL &amp; 2 business emails are always free. Fingerprint scanner is a
            hardware device included one-time in Business+ &amp; Enterprise plans.
            All prices are in INR and exclusive of GST.
          </p>
        </div>
      </section>
    </>
  );
}

// ─── Scoped CSS ───────────────────────────────────────────────────────────────
const CSS = `
/* ===== COMBOS SECTION ===== */

.combos-section {
  background: var(--body-bg);
  overflow: hidden;
  position: relative;
}

.combos-section::before {
  content: '';
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(12,90,245,0.10) 0%, transparent 70%);
  pointer-events: none;
}

.combos-heading {
  text-align: center;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 48px;
}

.combos-heading .tag-label {
  justify-content: center;
}

.combos-heading .sub {
  margin-left: auto;
  margin-right: auto;
}

/* ── Plan Toggle ── */
.combos-plan-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--secondary);
  border: 1px solid var(--dark2);
  border-radius: 100px;
  padding: 6px;
  width: fit-content;
  margin: 0 auto 56px;
  flex-wrap: wrap;
}

.plan-tab {
  position: relative;
  height: 40px;
  padding: 0 22px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  color: var(--gray);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
}

.plan-tab:hover {
  color: var(--white);
}

.plan-tab.active {
  background: var(--primary);
  color: var(--white);
  box-shadow: 0 4px 20px rgba(12,90,245,0.4);
}

.popular-pill {
  background: rgba(255,255,255,0.2);
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.save-pill {
  background: rgba(45,244,148,0.25);
  color: #2df494;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

/* ── Cards Grid ── */
.combos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: start;
}

@media (max-width: 1200px) {
  .combos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .combos-grid {
    grid-template-columns: 1fr;
  }
  .combos-plan-toggle {
    gap: 4px;
    padding: 4px;
  }
  .plan-tab {
    padding: 0 14px;
    font-size: 12px;
  }
}

/* ── Card ── */
.combo-card {
  background: var(--secondary);
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
  position: relative;
}

.combo-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 40px 80px rgba(0,0,0,0.5);
  border-color: rgba(12,90,245,0.35);
}

.combo-highlighted {
  border-color: rgba(12,90,245,0.5);
  box-shadow: 0 0 0 1px rgba(12,90,245,0.3), 0 20px 60px rgba(12,90,245,0.18);
}

.combo-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--white);
  color: var(--primary);
  font-size: 10px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 100px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

/* ── Card Top ── */
.combo-top {
  padding: 32px 28px 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: relative;
}

.combo-icon {
  font-size: 32px;
  line-height: 1;
}

.combo-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--white);
  margin: 0;
}

.fingerprint-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
}

/* ── Pricing Block ── */
.combo-pricing {
  padding: 24px 24px 0;
}

.combo-first-pay {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.combo-first-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--gray);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.combo-first-amount {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 700;
  color: var(--white);
  line-height: 1;
}

/* Breakdown table */
.combo-breakdown {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 14px;
}

.breakdown-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12.5px;
  color: var(--gray4);
  gap: 8px;
}

.breakdown-row em {
  font-style: normal;
  color: var(--gray);
  font-size: 10.5px;
}

.breakdown-row .bval {
  font-weight: 600;
  color: var(--white);
  text-align: right;
  flex-shrink: 0;
}

.highlight-row {
  padding-top: 9px;
  border-top: 1px solid rgba(255,255,255,0.07);
  color: var(--white);
}

.highlight-row .bval {
  color: #2df494;
}

.combo-renewal-note {
  font-size: 12px;
  color: var(--gray);
  line-height: 1.5;
  margin-bottom: 20px;
}

.combo-renewal-note strong {
  color: var(--primary);
}

/* ── Divider ── */
.combo-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin: 0 24px;
}

/* ── Features ── */
.combo-features {
  list-style: none;
  padding: 20px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 11px;
  flex: 1;
}

.combo-features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13.5px;
  color: var(--gray4);
  line-height: 1.45;
}

/* De-dupe: hide SSL/email from feature list since we added them manually */
.combo-features li:nth-last-child(-n+2) {
  display: none;
}

.combo-check {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: rgba(12,90,245,0.18);
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.combo-check-free {
  background: rgba(45,244,148,0.15);
  color: #2df494;
  font-size: 8px;
  letter-spacing: 0.04em;
  width: 30px;
  border-radius: 6px;
}

/* ── CTA Button ── */
.combo-cta {
  margin: 20px 24px 24px;
  width: calc(100% - 48px);
  height: 48px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  background: var(--primary);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  letter-spacing: 0.02em;
}

.combo-highlighted .combo-cta {
  background: linear-gradient(90deg, #0c5af5, #6a5af9);
  box-shadow: 0 8px 24px rgba(12,90,245,0.4);
}

.combo-cta:hover {
  background: var(--white);
  color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(12,90,245,0.25);
}

/* ── Footnote ── */
.combos-footnote {
  text-align: center;
  color: var(--gray);
  font-size: 12.5px;
  margin-top: 48px;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}
`;