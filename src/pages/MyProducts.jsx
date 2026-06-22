import { useEffect, useState } from "react";
import "../css/myproducts.css";
import Banner from "../components/Banner";

const toSortedUrls = (glob) =>
  Object.entries(glob)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, mod]) => mod.default);

const gymproImgs      = toSortedUrls(import.meta.glob("../assets/Gympro/*", { eager: true }));
const detailingImgs   = toSortedUrls(import.meta.glob("../assets/DetailingCRM/*", { eager: true }));
const restaurantImgs  = toSortedUrls(import.meta.glob("../assets/Restarunt/*", { eager: true }));

const PRODUCTS = [
  {
    name: "GymPro",
    category: "Gym Management",
    icon: "🏋️",
    description:
      "All-in-one gym management platform for handling memberships, attendance, billing, and member communication — built for modern fitness centres.",
    popupDescription:
      "GymPro is a complete gym management solution designed for modern fitness centres. It handles everything from member onboarding and plan assignment to automated monthly billing and attendance tracking. Staff can manage renewals, send SMS/email reminders for dues, and monitor check-in/check-out activity in real time — all from a single dashboard.",
    features: [
      "Member registration & profile management",
      "Automated monthly billing & payment tracking",
      "Attendance tracking with check-in / check-out",
      "Membership plan management & renewals",
      // "SMS / email notifications for renewals & dues",
    ],
    screenshots: gymproImgs,
    cost: {
      setup: "₹4,000",
      development: "₹Free",
      renewal: "₹10,000 / yr",

    },
    gradient: "linear-gradient(135deg, #0c5af5 0%, #6a5af9 50%, #00c8ff 100%)",
    comingSoon: false,
  },
  {
    name: "Detailing CRM",
    category: "Car Detailing CRM",
    icon: "🚗",
    description:
      "Purpose-built CRM for auto detailing businesses to manage bookings, customer history, invoices, and follow-ups all in one place.",
    popupDescription:
      "Detailing CRM is built specifically for auto detailing shops and mobile detailers. It centralises customer vehicle records, service history, and appointment scheduling into one clean interface. Generate invoices instantly, automate follow-up reminders via SMS or email, and assign jobs to staff with live status tracking — reducing no-shows and improving customer retention.",
    features: [
      "Customer vehicle history & service records",
      "Appointment scheduling & calendar view",
      "Invoice generation & payment tracking",
      "Automated follow-up reminders via SMS/email",
      "Staff task assignment & job status tracking",
    ],
    screenshots: detailingImgs,
    cost: {
      setup: "₹4,000",
      development: "₹Free",
      renewal: "₹12,000 / yr",
    },
    gradient: "linear-gradient(135deg, #0a1628 0%, #0c5af5 60%, #2df494 100%)",
    comingSoon: false,
  },
  {
    name: "Restaurant Billing",
    category: "Restaurant POS",
    icon: "🍽️",
    description:
      "Fast and intuitive billing software for restaurants — manage tables, orders, KOT printing, and end-of-day reports with ease.",
    popupDescription:
      "Restaurant Billing is a lightweight yet powerful POS system for dine-in restaurants, cafes, and food courts. Manage table-wise orders, send KOTs directly to the kitchen, and print GST-compliant bills in seconds. The built-in menu builder lets you organise categories and pricing with ease, while daily and weekly reports give you a clear picture of your sales performance.",
    features: [
      "Table-wise order management & KOT printing",
      "Menu builder with categories & pricing",
      "GST-compliant bill generation & printing",
      "Daily / weekly sales reports & analytics",
      "Multi-user access with role-based permissions",
    ],
    screenshots: restaurantImgs,
    cost: {
      setup: "₹4,000",
      development: "Free",
      renewal: "₹12,000 / yr",
    },
    gradient: "linear-gradient(135deg, #1a0533 0%, #6a5af9 50%, #f24903 100%)",
    comingSoon: false,
  },
  {
    name: "Coming Soon",
    category: "New Product",
    icon: "🚀",
    description:
      "We are working on something exciting. Our next product is currently in development and will be launching soon.",
    popupDescription: "",
    features: [
      "Innovation in progress",
      "Launching soon",
      "Stay tuned for updates",
    ],
    screenshots: [],
    gradient: "linear-gradient(135deg, #131216 0%, #2b303b 60%, #1f2025 100%)",
    comingSoon: true,
  },
];

const GRAD_NUM = ["01", "02", "03", "04"];

const COST_ITEMS = [
  { key: "setup",       label: "Setup Cost",       icon: "⚙️" },
  { key: "development", label: "Development Cost",  icon: "💻" },
  { key: "renewal",     label: "Renewal Cost",      icon: "🔄" },
  // { key: "maintenance", label: "Maintenance Cost",  icon: "🛠️" },
];

// ── Cost Modal ───────────────────────────────────────────────────────────────
function CostModal({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div className="pm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cost-modal">
        <button className="pm-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="cost-modal-header" style={{ background: product.gradient }}>
          <span className="pm-header-icon">{product.icon}</span>
          <div>
            <span className="pm-category">{product.category}</span>
            <h2 className="pm-title">{product.name}</h2>
          </div>
          <span className="cost-header-tag">Cost Details</span>
        </div>

        <div className="cost-modal-body">
          <p className="cost-note">Transparent pricing — no hidden fees. Contact us to get a custom quote.</p>
          <div className="cost-grid">
            {COST_ITEMS.map(({ key, label, icon }) => (
              <div className="cost-card" key={key}>
                <div className="cost-card-icon">{icon}</div>
                <div className="cost-card-label">{label}</div>
                <div className="cost-card-value">{product.cost[key]}</div>
              </div>
            ))}
          </div>
          <button
            className="product-cta-btn"
            style={{ width: "100%", marginTop: 8 }}
            onClick={() => { window.location.href = "/query"; }}
          >
            Get a Custom Quote <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Product Popup Modal ──────────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") { if (lightbox !== null) setLightbox(null); else onClose(); } };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, lightbox]);

  return (
    <div className="pm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm-modal">
        <button className="pm-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header band */}
        <div className="pm-header-band" style={{ background: product.gradient }}>
          <span className="pm-header-icon">{product.icon}</span>
          <div>
            <span className="pm-category">{product.category}</span>
            <h2 className="pm-title">{product.name}</h2>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="pm-content">

          {/* Description */}
          <p className="pm-description">{product.popupDescription}</p>

          {/* Image gallery */}
          {product.screenshots.length > 0 && (
            <div className="pm-gallery-wrap">
              <div className="pm-gallery-label">Screenshots</div>
              <div className="pm-gallery">
                {product.screenshots.map((src, i) => (
                  <div key={i} className="pm-thumb-wrap" onClick={() => setLightbox(i)}>
                    <img src={src} alt={`${product.name} screen ${i + 1}`} className="pm-thumb" />
                    <div className="pm-thumb-overlay">🔍</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="pm-features">
            <div className="pm-gallery-label">Key Features</div>
            {product.features.map((f) => (
              <div className="pm-feature-item" key={f}>
                <span className="pm-feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <button
            className="product-cta-btn"
            style={{ marginTop: 24, width: "100%" }}
            onClick={() => { window.location.href = "/query"; }}
          >
            Get a Demo <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="pm-lightbox" onClick={() => setLightbox(null)}>
          <img src={product.screenshots[lightbox]} alt="full view" className="pm-lightbox-img" />
          <div className="pm-lightbox-nav">
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + product.screenshots.length) % product.screenshots.length); }}>‹</button>
            <span>{lightbox + 1} / {product.screenshots.length}</span>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % product.screenshots.length); }}>›</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index, onClick, onCostClick }) {
  return (
    <div
      className={`product-card reveal${product.comingSoon ? " coming-soon-card" : ""}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
      onClick={!product.comingSoon ? onClick : undefined}
      role={!product.comingSoon ? "button" : undefined}
      tabIndex={!product.comingSoon ? 0 : undefined}
      onKeyDown={!product.comingSoon ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {/* Visual banner */}
      <div className="product-visual">
        <div className="product-visual-bg" style={{ background: product.gradient }} />
        <span className="product-visual-icon">{product.icon}</span>
        <span className="product-badge">{product.category}</span>
        <span className="product-num">{GRAD_NUM[index]}</span>
        {!product.comingSoon && <div className="product-view-hint">↗</div>}
      </div>

      {/* Body */}
      <div className="product-card-body">
        <div className="product-name-row">
          <h3 className="product-name">{product.name}</h3>
          {!product.comingSoon && (
            <button
              className="cost-btn"
              onClick={(e) => { e.stopPropagation(); onCostClick(); }}
            >
              💰 View Cost Details
            </button>
          )}
        </div>
        <p className="product-desc">{product.description}</p>

        <div className="product-features">
          {product.features.map((f) => (
            <div className="product-feature-item" key={f}>
              <span className="feature-dot" />
              {f}
            </div>
          ))}
        </div>

        <div className="product-card-footer">
          {!product.comingSoon ? (
            <>
              <span className="product-link-hint">Click to view details →</span>
              <div className="product-status-live">
                <span className="status-dot-live" />
                Live Product
              </div>
            </>
          ) : (
            <div className="product-status-live" style={{ color: "var(--orange)" }}>
              <span className="status-dot-live" style={{ background: "var(--orange)" }} />
              In Development
            </div>
          )}
        </div>
      </div>

      {/* Coming soon overlay */}
      {product.comingSoon && (
        <div className="coming-soon-overlay">
          <div className="cs-badge">
            <span className="cs-pulse" />
            <span className="cs-text">Coming Soon</span>
          </div>
          <span className="cs-sub">Something exciting is on the way</span>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function MyProducts() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [selected, setSelected] = useState(null);
  const [costProduct, setCostProduct] = useState(null);

  return (
    <>
      <section className="myproducts-section" id="myproducts">
        <div className="container">

          {/* Header */}
          <div className="myproducts-header" style={{ justifyContent: "center", textAlign: "center" }}>
            <div>
              <h1 className="myproducts-title">
                Built for <span className="myproducts-title-accent">Businesses</span>
              </h1>
            </div>
          </div>

          {/* Grid */}
          <div className="products-grid">
            {PRODUCTS.map((product, i) => (
              <ProductCard
                key={product.name}
                product={product}
                index={i}
                onClick={() => setSelected(product)}
                onCostClick={() => setCostProduct(product)}
              />
            ))}
          </div>

        </div>
      </section>

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}

      {costProduct && (
        <CostModal product={costProduct} onClose={() => setCostProduct(null)} />
      )}

      <Banner />
    </>
  );
}