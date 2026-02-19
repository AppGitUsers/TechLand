import { useState } from "react";
const NAV_LINKS = ["Home", "Services", "About", "Portfolio", "Blog", "Contact"];
function FooterSection() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => { e.preventDefault(); setEmail(""); };
  return (
    <footer className="site-footer" id="contact">
      {/* CTA Banner */}
      <div style={{ background: "var(--primary)", padding: "60px 0", marginBottom: 0 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "var(--white)", marginBottom: 16 }}>Ready to Build Something Great?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, fontSize: 16 }}>Tell us about your project and we'll get back to you within 24 hours.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:hello@techland.io" className="btn btn-white">Send Us a Message</a>
            <a href="tel:+15551234567" className="btn" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>+1 (555) 123-4567</a>
          </div>
        </div>
      </div>
      {/* Footer body */}
      <div className="container">
        <div className="footer-grid" style={{ marginTop: 60 }}>
          <div>
            <div className="site-logo" >Tech<span style={{ color: "var(--primary)" }}>land</span></div>
            <p className="footer-brand-desc">We build technology that drives real business growth. From startups to enterprise — we're your trusted digital partner.</p>
            <div className="footer-social" >
              {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((s) => (
                <a key={s} href="#" className="footer-social-link" aria-label={s} style ={{margin:10}}>
                  {s === "Twitter" ? "𝕏" : s === "LinkedIn" ? "in" : s === "GitHub" ? "⌥" : "◉"}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title" >Services</div>
            {["Web Development", "Mobile Apps", "Cloud Solutions", "AI & ML", "Cybersecurity", "Analytics"].map((l) => (
              <div key={l}  className="footer-link" >{l}</div>
            ))}
          </div>
          <div>
            <div className="footer-col-title" >Company</div>
                {NAV_LINKS.map((l) => (
                  <div key={l} className="footer-col-title">
                    <a href={`#${l.toLowerCase()}`} className="footer-link">
                      <span className="hex" />
                      {l}
                    </a>
                  </div>
                ))}
            </div>
          <div>
            <div className="footer-col-title">Stay Updated</div>
            <p style={{ color: "var(--gray)", fontSize: 14, marginBottom: 20}}>Get the latest insights on tech and innovation delivered to your inbox.</p>
            <form onSubmit={handleSubmit}>
              <div className="footer-newsletter-form">
                <input className="footer-input" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit" className="btn" style={{ height: 42, padding: "0 16px", fontSize: 13, flexShrink: 0 }}>→</button>
              </div>
            </form>
            <div style={{ marginTop: 28 }}>
              <div className="footer-col-title" style={{ marginBottom: 16 }}>Contact</div>
              {[
                { icon: "📧", text: "hello@techland.io" },
                { icon: "📞", text: "+1 (555) 123-4567" },
                { icon: "📍", text: "San Francisco, CA 94102" },
              ].map((c) => (
                <div key={c.text} className="contact-item">
                  <div className="contact-icon">{c.icon}</div>
                  <div className="contact-text">{c.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} Techland Solution. All rights reserved.</div>
          <div className="footer-bottom-links">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a key={l} href="#" className="footer-bottom-link">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default FooterSection
// paddingRight:20,marginRight:1
//style ={{margin:10}}