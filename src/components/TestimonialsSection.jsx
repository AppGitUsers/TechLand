const TESTIMONIALS = [
  { name: "Jordan Lee", company: "FinTech Corp", text: "Techland transformed our legacy banking system into a modern platform. Delivery was ahead of schedule, quality was flawless.", stars: 5, img: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Maria Santos", company: "HealthPlus", text: "Their AI solution cut our data processing time by 70%. The team is incredibly responsive and truly understands our domain.", stars: 5, img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "Tom Nguyen", company: "RetailX", text: "From concept to launch in 8 weeks. Techland's agile approach meant we shipped features that actually moved the needle.", stars: 5, img: "https://randomuser.me/api/portraits/men/33.jpg" },
  { name: "Lisa Chen", company: "StartupLab", text: "We've worked with many dev shops — none come close to Techland's technical depth and proactive communication.", stars: 5, img: "https://randomuser.me/api/portraits/women/55.jpg" },
  { name: "David Okafor", company: "EdTech Inc", text: "Our new learning platform scaled from 1K to 50K users without a single outage. Their infrastructure work is world-class.", stars: 5, img: "https://randomuser.me/api/portraits/men/66.jpg" },
  { name: "Sophie Martin", company: "LogiFlow", text: "The mobile app they built for us has a 4.8-star rating on the App Store. Users love it, and so do we.", stars: 5, img: "https://randomuser.me/api/portraits/women/77.jpg" },
];
function TestimonialsSection() {
  return (
    <section className="section" id="testimonials">
      {/* testimonials-section */}
      <div className="container">
        <div className="heading-section reveal" style={{ textAlign: "center" }}>
          <div className="tag-label" style={{ justifyContent: "center" }}><span className="hex-dot" style={{ background: "var(--primary)" }} />Social Proof</div>
          <h2 style={{ marginTop: 16 }}>What Our Clients Say</h2>
          <p className="sub" style={{ margin: "12px auto 0" }}>Real results from real partnerships. Here's what teams like yours have to say about working with Techland.</p>
        </div>
        <div className="testimonial-slider">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`testimonial-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="testimonial-stars">{"★".repeat(t.stars)}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar"><img src={t.img} alt={t.name} loading="lazy" /></div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-company">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TestimonialsSection