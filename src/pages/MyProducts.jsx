import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/myproducts.css";
import Banner from "../components/Banner";
import gymBg from "../assets/CardBg/gym-bg.jpg";
import carBg from "../assets/CardBg/car-bg.jpg";
import restaurantBg from "../assets/CardBg/restaurant-bg.jpg";

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
    description: [
      "All-in-one gym management platform",
      "Memberships, attendance & automated billing",
      "Built for modern fitness centres",
    ],
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
    cardBg: gymBg,
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
    description: [
      "Purpose-built CRM for auto detailers",
      "Bookings, invoices & vehicle history",
      "Reduce no-shows, improve retention",
    ],
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
    cardBg: carBg,
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
    description: [
      "Fast & intuitive restaurant POS",
      "Tables, orders, KOT & GST billing",
      "Built for cafes, restaurants & food courts",
    ],
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
    cardBg: restaurantBg,
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
    description: [
      "Something exciting is in development",
      "Our next product launches very soon",
      "Stay tuned for the big reveal",
    ],
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
  const navigate = useNavigate();
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
          <h2 className="pm-title">{product.name}</h2>
          <span className="cost-header-tag">Cost Details</span>
        </div>

        <div className="cost-modal-body">
          <p className="cost-note">Transparent pricing — no hidden fees. Contact us to get a custom quote.</p>
          <div className="cost-list">
            {COST_ITEMS.map(({ key, label, icon }) => (
              <div className="cost-row" key={key}>
                <div className="cost-row-left">
                  <span className="cost-row-icon">{icon}</span>
                  <span className="cost-row-label">{label}</span>
                </div>
                <span className="cost-row-value">{product.cost[key]}</span>
              </div>
            ))}
          </div>
          <button
            className="product-cta-btn"
            style={{ width: "100%", marginTop: 8 }}
            onClick={() => navigate(`/query?service=Ready+Products&product=${encodeURIComponent(product.name)}`)}
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
  const navigate = useNavigate();

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

        {/* Header */}
        <div className="pm-header-band">
          {product.cardBg && <img src={product.cardBg} className="pm-header-img" alt="" />}
          <div className="pm-header-content">
            <div className="pm-header-icon-wrap">
              <span className="pm-header-icon">{product.icon}</span>
            </div>
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
              <div className="pm-section-label"><span className="pm-label-dot" />Screenshots</div>
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
            <div className="pm-section-label"><span className="pm-label-dot" />Key Features</div>
            {product.features.map((f, i) => (
              <div className="pm-feature-item" key={f} style={{ animationDelay: `${0.3 + i * 0.07}s` }}>
                <span className="pm-feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <button
            className="product-cta-btn pm-cta"
            onClick={() => navigate(`/query?service=Ready+Products&product=${encodeURIComponent(product.name)}`)}
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
      className={`product-card${product.comingSoon ? " coming-soon-card" : ""}`}
      onClick={!product.comingSoon ? onClick : undefined}
      role={!product.comingSoon ? "button" : undefined}
      tabIndex={!product.comingSoon ? 0 : undefined}
      onKeyDown={!product.comingSoon ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {/* Visual banner */}
      <div className="product-visual">
        {product.cardBg ? (
          <img src={product.cardBg} alt="" className="product-visual-img" />
        ) : (
          <div className="product-visual-bg" style={{ background: product.gradient }} />
        )}
        <span className="product-badge">{product.icon} {product.category}</span>
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
        <div className="product-desc">
          <span className="desc-l1">{product.description[0]}</span>
          <span className="desc-l2">{product.description[1]}</span>
          <span className="desc-l3">{product.description[2]}</span>
        </div>

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