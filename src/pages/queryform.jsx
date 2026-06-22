import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import FAQSection from "../components/FAQSection";
import "../css/queryform.css";

function CustomSelect({ name, value, onChange, options, placeholder, required }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setOpen(false);
  };

  return (
    <div className="custom-select-wrap" ref={ref}>
      <div
        className={`custom-select-box form-input-styled${value ? " filled" : ""}${open ? " open" : ""}`}
        onClick={() => setOpen((p) => !p)}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen((p) => !p); if (e.key === "Escape") setOpen(false); }}
        role="combobox"
        aria-expanded={open}
      >
        <span className={selected ? "cs-value" : "cs-placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`cs-arrow${open ? " flipped" : ""}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke="#7e8695" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </span>
      </div>

      {open && (
        <div className="cs-dropdown">
          {options.map((o) => (
            <div
              key={o.value}
              className={`cs-option${o.value === value ? " selected" : ""}`}
              onClick={() => handleSelect(o.value)}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}

      <input type="hidden" name={name} value={value} required={required} />
    </div>
  );
}


export default function QueryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autofilled, setAutofilled] = useState(false);
  const customRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    service: "",
    product: "",
    custom: "",
  });

  const READY_PRODUCTS = ["GymPro", "Detailing CRM", "Restaurant Billing"];

  // Inject styles
  // useEffect(() => {
  //   if (!document.getElementById("query-page-styles")) {
  //     const style = document.createElement("style");
  //     style.id = "query-page-styles";
  //     style.textContent = pageStyles;
  //     document.head.appendChild(style);
  //   }
  //   return () => {
  //     const el = document.getElementById("query-page-styles");
  //     if (el) el.remove();
  //   };
  // }, []);

  // Pre-fill service and product from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedService = params.get("service");
    const selectedProduct = params.get("product");
    if (selectedService || selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        ...(selectedService && { service: selectedService }),
        ...(selectedProduct && { product: selectedProduct }),
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "service" && value !== "Ready Products") {
      setFormData((prev) => ({ ...prev, service: value, product: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Called when user clicks a FAQ question
  const handleFAQSelect = (question) => {
    setFormData((prev) => ({ ...prev, custom: question }));
    setAutofilled(true);

    // Scroll to and focus custom field
    if (customRef.current) {
      customRef.current.focus();
      customRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Remove glow after animation
    setTimeout(() => setAutofilled(false), 1200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from("techlandqueries")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            service: formData.service === "Ready Products" && formData.product
              ? `Ready Products - ${formData.product}`
              : formData.service,
            custom_text: formData.custom,
          },
        ]);

      if (insertError) throw insertError;
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="query-page-section" id="contact">
      <div className="container">
        <div className="query-split">

          {/* â”€â”€ LEFT: FORM â”€â”€ */}
          <div className="query-form-panel">
            <div className="query-form-card reveal">
              <div className="query-form-header">
                <div className="query-form-tag">
                  <span className="hex-dot" style={{ background: "var(--primary)" }} />
                  Get In Touch
                </div>
                <h2 className="query-form-title">
                  Submit Your <span>Service Request</span>
                </h2>
                <p className="query-form-subtitle">
                  Tell us about your project and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="query-form-fields">
                <div className="form-field-wrapper">
                  <label className="form-field-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`form-input-styled${formData.name ? " filled" : ""}`}
                  />
                </div>

                <div className="form-field-wrapper">
                  <label className="form-field-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`form-input-styled${formData.email ? " filled" : ""}`}
                  />
                </div>

                <div className="form-field-wrapper">
                  <label className="form-field-label">Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    placeholder="+1 (555) 000-0000"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className={`form-input-styled${formData.contact ? " filled" : ""}`}
                  />
                </div>

                <div className="form-field-wrapper">
                  <label className="form-field-label">Select a Service</label>
                  <CustomSelect
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    placeholder="Choose a service..."
                    options={[
                      { value: "Ready Products", label: "Ready Products" },
                      { value: "Custom Web Applications", label: "Custom Web Applications" },
                      { value: "Mobile & Cross-Platform Applications", label: "Mobile & Cross-Platform Applications" },
                      { value: "Responsive Websites & Business Portals", label: "Responsive Websites & Business Portals" },
                      { value: "Desktop Applications & Enterprise Software", label: "Desktop Applications & Enterprise Software" },
                      { value: "CRM & Business Automation Systems", label: "CRM & Business Automation Systems" },
                      { value: "Invoice Management & Maintenance", label: "Invoice Management & Ongoing Maintenance" },
                    ]}
                  />
                </div>

                {formData.service === "Ready Products" && (
                  <div className="form-field-wrapper" style={{ marginTop: -8 }}>
                    <label className="form-field-label">Select a Product</label>
                    <CustomSelect
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      placeholder="Choose a product..."
                      options={READY_PRODUCTS.map((p) => ({ value: p, label: p }))}
                    />
                  </div>
                )}

                <div className="form-field-wrapper">
                  <label className="form-field-label">
                    Your Question / Message
                    {autofilled && (
                      <span style={{
                        marginLeft: 10,
                        fontSize: 10,
                        color: "var(--primary)",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        padding: "2px 8px",
                        background: "rgba(12,90,245,0.12)",
                        borderRadius: 6,
                        animation: "autofillPop 0.4s ease"
                      }}>
                        âœ¦ Auto-filled from FAQ
                      </span>
                    )}
                  </label>
                  <textarea
                    name="custom"
                    placeholder="Describe your project or ask us a question..."
                    value={formData.custom}
                    onChange={handleChange}
                    ref={customRef}
                    rows={4}
                    className={`form-input-styled${autofilled ? " autofilled" : formData.custom ? " filled" : ""}`}
                  />
                </div>

                <button
                  type="submit"
                  className="query-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="btn-inner">
                      <div className="btn-spinner" />
                      Submittingâ€¦
                    </div>
                  ) : (
                    <div className="btn-inner">
                      Submit Request
                      {/* <span className="btn-arrow">â†’</span> */}
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* â”€â”€ RIGHT: FAQ â”€â”€ */}
          <div className="query-faq-panel reveal reveal-delay-1">
            <FAQSection onSelectQuestion={handleFAQSelect} />
          </div>
        </div>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="success-overlay-new">
          <div className="success-modal-new">
            <div className="success-icon">ðŸš€</div>
            <h3>Request Received!</h3>
            <p>
              Thanks for reaching out. Our team will review your project details
              and get back to you within 24 hours.
            </p>
            <button
              className="btn"
              onClick={() => {
                setShowSuccess(false);
                navigate("/");
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
