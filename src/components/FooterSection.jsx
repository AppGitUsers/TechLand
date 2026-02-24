import { useState } from "react";
const NAV_LINKS = ["Home", "Services", "About", "Portfolio", "Blog", "Contact"];
function FooterSection() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => { e.preventDefault(); setEmail(""); };
  return (
    <footer className="site-footer" id="contact">
      {/*  */}
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
                    {
                      l==="Portfolio"?(
                        <a href={`/${l.toLowerCase()}`} className="footer-link">
                        <span className="hex" />
                          {l}
                        </a>
                      ):(
                        <a href={`/#${l.toLowerCase()}`} className="footer-link">
                        <span className="hex" />
                          {l}
                        </a>
                      )
                    }
                  </div>
                ))}
            </div>
          <div>
            <div className="footer-col-title">Stay Updated</div>
            <p style={{ color: "var(--gray)"}}>Get the latest insights on tech and innovation delivered to your inbox.</p>
            <form onSubmit={handleSubmit}>
              <div className="footer-newsletter-form">
                <input className="footer-input" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit" className="btn" >→</button>
              </div>
            </form>
            <div style={{ marginTop: 28 }}>
              <div className="footer-col-title" >Contact</div>
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
//style={{ marginBottom: 16 }}
//style={{ height: 42, padding: "0 16px", fontSize: 13, flexShrink: 0 }}
//fontSize: 14, marginBottom: 20