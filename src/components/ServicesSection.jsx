import "../css/icon.css";
const SERVICES = [
  { icon: "/icon/icon-box-1.svg", title: "Web Development", desc: "Custom, high-performance websites and web apps built with modern frameworks and best practices for optimal UX." },
  { icon: "/icon/icon-box-2.svg", title: "Mobile Applications", desc: "Native and cross-platform mobile apps for iOS and Android, designed to engage users and drive growth." },
  { icon: "/icon/icon-box-3.svg", title: "Cloud Solutions", desc: "Scalable cloud infrastructure and migration services that cut costs and boost reliability for your business." },
  { icon: "/icon/icon-box-4.svg", title: "Cybersecurity", desc: "End-to-end security audits, penetration testing, and managed security services to protect your digital assets." },
  { icon: "/icon/icon-box-5.svg", title: "AI & Machine Learning", desc: "Intelligent automation, data pipelines, and ML models that turn raw data into competitive advantage." },
  { icon: "/icon/icon-box-6.svg", title: "Data Analytics", desc: "Real-time dashboards, BI integration, and deep analytics to give you the insights that drive decisions." },
];
function ServicesSection() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="heading-section reveal">
          <div className="tag-label"><span className="hex-dot" style={{ background: "var(--primary)" }} />What We Do</div>
          <h2 style={{ marginTop: 16 }}>Technology Solutions Built to Scale</h2>
          <p className="sub">From startups to enterprises, our services cover every layer of the modern technology stack — designed for performance, reliability and growth.</p>
        </div>
        <div className="grid-3">
          {SERVICES.map((s, i) => (
            <div key={i} className={`service-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="icon-link">
                <img className="service-icon" src={s.icon} alt = {s.title}></img>
              </div>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
              <a href="#contact" className="service-link">Learn more  <span className="service-link-arrow">↗</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ServicesSection