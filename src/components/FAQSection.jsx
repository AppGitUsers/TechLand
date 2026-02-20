import FAQItem from "./FAQItem";
const FAQS = [
  { q: "What technologies do you specialise in?", a: "We work across the full modern stack — React, Next.js, Node.js, Python, Go, AWS, GCP, Azure, Kubernetes, and more. We choose the right tool for each job, not the trendy one." },
  { q: "How long does a typical project take?", a: "MVPs typically take 6–12 weeks. Larger enterprise engagements range from 3–12 months. We always provide detailed timelines after scoping, and we stick to them." },
  { q: "Do you offer ongoing maintenance?", a: "Absolutely. All projects include a 30-day warranty, and we offer flexible retainer plans covering monitoring, updates, security patches, and feature development." },
  { q: "How do you handle project communication?", a: "Every project gets a dedicated Slack channel, weekly video syncs, and a live project dashboard. You'll always know where things stand — no chasing required." },
  { q: "Can you work with our existing team?", a: "Yes — we embed seamlessly as an extension of your team. We're comfortable with any workflow: Jira, Linear, Notion, GitHub Projects. We adapt to you." },
  { q: "What's your pricing model?", a: "We offer fixed-price for well-scoped projects, and time-and-materials for evolving requirements. We'll recommend the best model after our discovery call." },
];
function FAQSection() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="heading-section reveal" style={{ textAlign: "center" }}>
          <div className="tag-label" style={{ justifyContent: "center" }}><span className="hex-dot" style={{ background: "var(--orange)" }} />FAQ</div>
          <h2 >Frequently Asked Questions</h2>
          {/* style={{ marginTop: 16 }} */}
          <p className="sub" >Everything you need to know before working with us — and if you can't find your answer, just ask.</p>
        {/* style={{ margin: "12px auto 0" }} */}
        </div>
        <div className="faq-wrap reveal">
          {FAQS.map((f, i) => <FAQItem key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
}
export default FAQSection