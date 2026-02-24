import ServiceCard from "./ServiceCard";



const SERVICES = [
  {
    icon: "/icon/icon-box-1.svg",
    title: "N8N Automation",
    desc: "Automation workflows...",
    launchDate: "2026-05-24T00:00:00",
    startDate: "2026-02-24T00:00:00"
  },
  {
    icon: "/icon/icon-box-2.svg",
    title: "Gen AI",
    desc: "Advanced AI solutions...",
    launchDate: "2026-08-24T00:00:00",
    startDate: "2026-02-24T00:00:00"
  }
];
function UpComingTech() {
  return (
    <section className="section upcoming-section" id="upcomingtech">
      <div className="container">
        
        <div className="heading-section reveal">
          <div className="tag-label">
            <span
              className="hex-dot"
              style={{ background: "var(--primary)" }}
            />
            What We Do
          </div>

          <h2 style={{ marginTop: 16 }}>
            Emerging Technologies Shaping the Future
          </h2>

          <p className="sub">
            From emerging startups to forward-thinking enterprises, our
            future-ready solutions leverage cutting-edge technologies to
            drive innovation, efficiency, and long-term business growth.
          </p>
        </div>

        <div className="grid-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default UpComingTech;