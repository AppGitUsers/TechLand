const SERVICES = [
  { icon: "/icon/icon-box-1.svg", title: "N8N Automation", desc: "We design and implement powerful automation workflows using n8n to connect your tools, automate repetitive tasks, and streamline operations. Improve efficiency, reduce manual work, and scale your business with reliable workflow automation."},
  { icon: "/icon/icon-box-2.svg", title: "Gen AI", desc: "We build advanced Generative AI solutions including chatbots, AI assistants, and intelligent automation systems that can generate content, analyze data, and improve business efficiency." },
];
function UpComingTech(){
return(
    <section className="section upcoming-section" id="upcomingtech">
        <div className="container">
            <div className="heading-section reveal">
                <div className="tag-label"><span className="hex-dot" style={{ background: "var(--primary)" }} />What We Do</div>
                <h2 style={{ marginTop: 16 }}>Emerging Technologies Shaping the Future</h2>
                <p className="sub">From emerging startups to forward-thinking enterprises, our future-ready solutions leverage cutting-edge technologies to drive innovation, efficiency, and long-term business growth.</p>
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
)
}
export default UpComingTech