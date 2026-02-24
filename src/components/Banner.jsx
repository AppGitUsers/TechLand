const Banner = () =>{
    return (
        <div style={{ background: "var(--primary)", padding: "60px 0", marginBottom: 0 }}>
            <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ color: "var(--white)", marginBottom: 16 }}>Ready to Build Something Great?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, fontSize: 16 }}>Tell us about your project and we'll get back to you within 24 hours.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/query" className="btn btn-white">Send Us a Message</a>
                <a href="tel:+15551234567" className="btn" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>+1 (555) 123-4567</a>
            </div>
            </div>
        </div>
    )
}
export default Banner;