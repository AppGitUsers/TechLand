import { useState } from "react";
import "../css/FAQSection.css"

const FAQS = [
  { q: "What technologies do you specialise in?"},
  { q: "How long does a typical project take?"},
  { q: "Do you offer ongoing maintenance?"},
  { q: "How do you handle project communication?"},
  { q: "Can you work with our existing team?"},
  { q: "What's your pricing model?"},
];

function FAQSection({ onSelectQuestion }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Inject styles once
  // if (typeof document !== "undefined" && !document.getElementById("faq-standalone-styles")) {
  //   const style = document.createElement("style");
  //   style.id = "faq-standalone-styles";
  //   style.textContent = faqStyles;
  //   document.head.appendChild(style);
  // }

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const handleSelect = (faq, i) => {
    setSelectedIndex(i);
    if (onSelectQuestion) {
      onSelectQuestion(faq.q);
    }
    toggle(i);
    // Clear highlight after animation
    setTimeout(() => setSelectedIndex(null), 800);
  };

  return (
    <div className="faq-standalone">
      <div className="faq-standalone-header">
        <div className="tag-label">
          <span className="hex-dot" style={{ background: "var(--orange)" }} />
          FAQ
        </div>
        <h2>Frequently Asked<br />Questions</h2>
        <p>Click any question to auto-fill it into the form — or ask us something new.</p>
      </div>

      <div className="faq-list">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={`faq-item-new${openIndex === i ? " open" : ""}${selectedIndex === i ? " selected-faq" : ""}`}
          >
            <button
              className="faq-trigger-new"
              onClick={() => handleSelect(faq, i)}
              type="button"
            >
              <div className="faq-trigger-left">
                <span className="faq-q-number">0{i + 1}</span>
                <span className="faq-q-text">{faq.q}</span>
              </div>
              <span className="faq-fill-hint">↙ Fill</span>
              <span className="faq-icon-new">+</span>
            </button>
            <div
              className="faq-body-new"
              style={{ maxHeight: openIndex === i ? "200px" : "0" }}
            >
              <div className="faq-body-inner-new">{faq.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
