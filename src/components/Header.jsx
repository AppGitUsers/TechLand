import { useState } from "react";
const NAV_LINKS = ["Home", "Services","UpComingTech", "About", "Portfolio", "Blog", "Contact"];
function Header({ scrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="header-inner">
            <a href="#" className="site-logo">Tech<span>land</span></a>
            <nav>
              <ul className="nav-list">
                {NAV_LINKS.map((l) => (
                  <li key={l}>
                  {
                    l==="Portfolio"?(
                    <a href={`/${l.toLowerCase()}`} className="nav-link">
                      <span className="hex" />
                      {l}
                    </a>):(
                    <a href={`/#${l.toLowerCase()}`} className="nav-link">
                      <span className="hex" />
                      {l}
                    </a>
                    )
                  }
                  </li>
                  
                ))}
              </ul>
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a href="#contact" className="btn" style={{ height: 38, padding: "0 18px", fontSize: 13, borderRadius: 8 }}>Get Started</a>
              <button className="mobile-toggle" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
            </div>
          </div>
        </div>
      </header>
      <div className={`mobile-menu-overlay${open ? " open" : ""}`} onClick={() => setOpen(false)} />
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <button className="mobile-menu-close" onClick={() => setOpen(false)}>✕</button>
        <a href="#" className="site-logo" style={{ marginBottom: 32, display: "block" }}>Tech<span style={{ color: "var(--primary)" }}>land</span></a>
        {NAV_LINKS.map((l) => (
          <div key={l}>
          {
            l==="Portfolio"?(<a key={l} href={`/${l.toLowerCase()}`} className="mobile-nav-link" onClick={() => setOpen(false)}>{l}</a>):
            (<a key={l} href={`/#${l.toLowerCase()}`} className="mobile-nav-link" onClick={() => setOpen(false)}>{l}</a>)
          }
          </div>
        ))}
        <a href="#contact" className="btn" style={{ marginTop: 24, justifyContent: "center" }}>Get Started →</a>
      </div>
    </>
  );
}
export default Header