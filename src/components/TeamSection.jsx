const TEAM = [
  { name: "Alex Carter", role: "CEO & Founder", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Sarah Kim", role: "CTO", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Marcus Hill", role: "Lead Developer", img: "https://randomuser.me/api/portraits/men/52.jpg" },
  { name: "Priya Nair", role: "Head of Design", img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

function TeamSection() {
  return (
    <section className="section" id="team">
      <div className="container">
        <div className="heading-section reveal" style={{ textAlign: "center" }}>
          <div className="tag-label" style={{ justifyContent: "center" }}><span className="hex-dot" style={{ background: "var(--green)" }} />Our People</div>
          <h2 style={{ marginTop: 16 }}>Meet the Leadership</h2>
          <p className="sub" style={{ margin: "12px auto 0" }}>A team of builders, strategists, and makers united by one mission: shipping technology that actually works.</p>
        </div>
        <div className="grid-4">
          {TEAM.map((t, i) => (
            <div key={i} className={`team-card reveal reveal-delay-${i + 1}`}>
              <div className="team-avatar"><img src={t.img} alt={t.name} /></div>
              <div className="team-name">{t.name}</div>
              <div className="team-role">{t.role}</div>
              <div className="team-social">
                {["in", "tw", "gh"].map((s) => (
                  <a key={s} href="#" className="team-social-link">{s === "in" ? "💼" : s === "tw" ? "🐦" : "🔗"}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TeamSection