const Banner = () =>{
    return (
        <section id="contact">
        <div style={{ background: "var(--primary)", padding: "60px 0", marginBottom: 0 }} >
            <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ color: "var(--white)", marginBottom: 16 }}>Ready to Build Something Great?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 32, fontSize: 16 }}>Tell us about your project and we'll get back to you within 24 hours.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/query" className="btn btn-white">Send Us a Message</a>
            </div>
            </div>
        </div>
        </section>
    )
}
export default Banner;