import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import FAQSection from "../components/FAQSection";
import "../css/queryform.css";


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
    custom: "",
  });

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

  // Pre-fill service from URL param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedService = params.get("service");
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            service: formData.service,
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

          {/* ── LEFT: FORM ── */}
          <div className="query-form-panel">
            <div className="query-form-card reveal">
              <div className="query-form-header">
                <div className="query-form-tag">
                  <span className="hex-dot" style={{ background: "var(--primary)" }} />
                  Get In Touch
                </div>
                <h2 className="query-form-title">
                  Submit Your<br />
                  <span>Service Request</span>
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
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={`form-input-styled${formData.service ? " filled" : ""}`}
                  >
                    <option value="">Choose a service...</option>
                    <option value="Custom Web Applications">Custom Web Applications</option>
                    <option value="Mobile & Cross-Platform Applications">Mobile &amp; Cross-Platform Applications</option>
                    <option value="Responsive Websites & Business Portals">Responsive Websites &amp; Business Portals</option>
                    <option value="Desktop Applications & Enterprise Software">Desktop Applications &amp; Enterprise Software</option>
                    <option value="CRM & Business Automation Systems">CRM &amp; Business Automation Systems</option>
                    <option value="Invoice Management & Maintenance">Invoice Management &amp; Ongoing Maintenance</option>
                  </select>
                </div>

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
                        ✦ Auto-filled from FAQ
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
                      Submitting…
                    </div>
                  ) : (
                    <div className="btn-inner">
                      Submit Request
                      <span className="btn-arrow">→</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── RIGHT: FAQ ── */}
          <div className="query-faq-panel reveal reveal-delay-1">
            <FAQSection onSelectQuestion={handleFAQSelect} />
          </div>
        </div>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="success-overlay-new">
          <div className="success-modal-new">
            <div className="success-icon">🚀</div>
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
