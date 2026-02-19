const WHY_ITEMS = [
  { title: "Proven Track Record", desc: "Over 250 successful projects delivered across industries with measurable business impact." },
  { title: "Agile Methodology", desc: "Rapid iteration, transparent communication, and on-time delivery are our non-negotiables." },
  { title: "Full-Stack Expertise", desc: "From UI design to cloud infra — we cover the entire technology stack under one roof." },
  { title: "24/7 Support", desc: "Round-the-clock monitoring and dedicated support teams to keep your systems running." },
  { title: "Transparent Pricing", desc: "No hidden fees. Fixed-price projects or flexible hourly engagements that suit your budget." },
];
function WhySection() {
  return (
    <section className="section why-section" id="about">
      <div className="container">
        <div className="tag-label reveal"><span className="hex-dot" style={{ background: "var(--orange)" }} />Why Choose Us</div>
            <h2 style={{ margin: "16px 0 12px" }} className="reveal reveal-delay-1">The Partner Your Business Can Count On</h2>
            <p style={{ color: "var(--gray)", fontSize: 15, lineHeight: 1.75, marginBottom: 36 }} className="reveal reveal-delay-2">
              We don't just write code — we solve business problems. Every decision we make is driven by measurable outcomes for your company.
            </p>
        </div>
        <div className="two-col">
          <div style= {{display:"flex", marginLeft:200}}>
            <div className="why-list">
              {WHY_ITEMS.map((w, i) => (
                <div key={i} className={`why-item reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                  <div className="why-check">✓</div>
                  <div>
                    <div className="why-item-title">{w.title}</div>
                    <div className="why-item-desc">{w.desc}</div>
                  </div>
                </div>
              ))}    
          </div>
          <div className="why-image reveal reveal-delay-2" style={{ minHeight: 420, height:650 ,width :980 ,display: "inline",marginLeft:50}}>
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80" alt="Team collaborating" />
            <div className="why-badge">
              <div className="why-badge-num">15+</div>
              <div className="why-badge-text">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default WhySection