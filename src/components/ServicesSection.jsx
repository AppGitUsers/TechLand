import "../css/icon.css";
import { Link } from "react-router-dom";
const SERVICES = [
  { icon: "/icon/icon-box-1.svg", title: "Custom Web Applications", desc: "We build powerful web applications for startups and enterprises — including admin dashboards, role-based systems, automation workflows, and database-driven platforms. Our solutions are optimized for performance, security, and real-world scalability." },
  { icon: "/icon/icon-box-2.svg", title: "Mobile & Cross-Platform Applications", desc: "We develop modern mobile applications for Android and iOS, including cross-platform apps for faster deployment. From business apps to internal management systems, we deliver smooth, user-friendly mobile experiences that scale with your growth." },
  { icon: "/icon/icon-box-3.svg", title: "Responsive Websites & Business Portals", desc: "We design and develop fully responsive websites that work seamlessly across desktop, tablet, and mobile devices. From company profiles to dynamic business portals with form handling and database integration, we build fast, secure, and scalable web solutions tailored to your brand and goals." },
  { icon: "/icon/icon-box-4.svg", title: "Desktop Applications & Enterprise Software", desc: "We create secure and efficient desktop applications tailored for business operations. Whether it's internal tools, data management systems, or offline-enabled software, our solutions are built for reliability and long-term usage." },
  { icon: "/icon/icon-box-5.svg", title: "CRM & Business Automation Systems", desc: "We develop customized CRM tools to manage leads, customers, staff, and workflows efficiently. From invoice management to automated email notifications and reporting dashboards, our CRM solutions streamline operations and increase productivity." },
  { icon: "/icon/icon-box-6.svg", title: "Invoice Management & Ongoing Maintenance Services", desc: "We build systems that collect invoice data, securely store it in databases, and generate structured reports for business tracking. In addition, we provide continuous maintenance, performance optimization, security updates, and long-term technical support for all delivered solutions." },
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
              <a href={`/query?service=${encodeURIComponent(s.title)}` }className="service-link">Select Service  <span className="service-link-arrow">↗</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ServicesSection