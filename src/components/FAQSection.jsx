import { useState } from "react";
import "../css/FAQSection.css"

const FAQS = [
  { q: "What technologies do you specialise in?", a: "We specialise in React, Node.js, Python, Java Spring Boot, PostgreSQL, and cloud platforms like AWS and Supabase. We pick the right stack based on your project needs." },
  { q: "How long does a typical project take?", a: "Timelines vary by scope — a simple website takes 1–2 weeks, a custom web app 1–3 months, and enterprise systems 3–6 months. We provide a detailed estimate after the initial consultation." },
  { q: "Do you offer ongoing maintenance?", a: "Yes. We offer monthly maintenance plans covering bug fixes, updates, performance monitoring, and feature additions. Our Ready Products include annual renewal plans." },
  { q: "How do you handle project communication?", a: "We provide weekly progress updates via email or WhatsApp, with a dedicated point of contact. Larger projects also get access to a shared task board for real-time visibility." },
  { q: "Can you work with our existing team?", a: "Absolutely. We regularly collaborate with in-house teams, handling specific modules or the full stack as needed. We're flexible and can integrate into your existing workflow." },
  { q: "What's your pricing model?", a: "We offer both fixed-price and milestone-based pricing. Ready Products start at ₹4,000 setup with annual renewals. Custom projects are quoted after a free discovery call." },
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
        <h2>Frequently Asked Questions</h2>
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
