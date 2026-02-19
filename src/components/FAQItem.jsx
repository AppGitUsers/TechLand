import { useState } from "react";
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-trigger" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <div className="faq-icon">{open ? "−" : "+"}</div>
      </button>
      <div className="faq-body" style={{ maxHeight: open ? 400 : 0 }}>
        <div className="faq-body-inner">{a}</div>
      </div>
    </div>
  );
}
export default FAQItem