function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-grid-lines" />
      <div className="container">
        <div className="two-col" style={{ minHeight: "70vh", paddingTop: 40 }}>
          <div className="hero-content">
            <div className="hero-tag">
              <span className="hex-dot" style={{ background: "var(--green)" }} />
              Trusted by 250+ global companies
            </div>
            <h1 className="hero-title">
              We Build <span className="accent">Technology</span> That Drives Growth
            </h1>
            <p className="hero-desc">
              From web apps to AI solutions, Techland delivers end-to-end digital products that scale with your ambitions. Faster. Smarter. Better.
            </p>
            <div className="hero-btns">
              <a href="#services" className="btn">Explore Services →</a>
              <a href="#contact" className="btn btn-white">Start a Project</a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div className="hero-img-wrap" style={{ aspectRatio: "4/3" }}>
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" alt="Development team at work" loading="eager" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,90,245,0.15) 0%, transparent 50%)" }} />
            </div>
            <div className="hero-float-card card-1">
              <div className="float-icon">✅</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Project Delivered</div>
                <div style={{ fontSize: 11, color: "var(--gray)", marginTop: 2 }}>E-commerce platform • 6 weeks</div>
              </div>
            </div>
            <div className="hero-float-card card-2">
              <div className="float-icon">📈</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>+340% Performance</div>
                <div style={{ fontSize: 11, color: "var(--gray)", marginTop: 2 }}>After infrastructure upgrade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero