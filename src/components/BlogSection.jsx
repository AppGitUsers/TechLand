const BLOGS = [
  { cat: "Cloud", title: "How Multi-Cloud Strategy Reduces Business Risk in 2025", date: "Jan 12, 2025", read: "5 min read", excerpt: "Diversifying across cloud providers is no longer optional — it's essential for enterprise resilience and cost control." ,link:"https://cloud.google.com/learn/what-is-multicloud"},
  { cat: "AI", title: "Building Production-Ready LLM Applications: Lessons Learned", date: "Jan 5, 2025", read: "8 min read", excerpt: "After deploying dozens of AI features, here's what we learned about safety, latency, and user trust." ,link:"https://ai.google/responsibilities/responsible-ai-practices/"},
  { cat: "Security", title: "Zero Trust Architecture: A Practical Implementation Guide", date: "Dec 28, 2024", read: "6 min read", excerpt: "Move beyond perimeter-based security with a step-by-step zero trust rollout that doesn't disrupt your team.",link:"https://www.paloaltonetworks.com/zero-trust" },
];
function BlogSection() {
  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <div className="heading-section">
          <div className="reveal">
            <div className="tag-label"><span className="hex-dot"  style={{ background: "var(--primary)" }}/>Latest Insights</div>
            <h2 >From Our Blog</h2>
          </div>
          {/* <a href="#" className="btn btn-border reveal" style={{background:"var(--primary)", color:"white"}}>View All Posts →</a> */}
        </div>
        <div className="grid-3">
          {BLOGS.map((b, i) => (
            <a
              key={i}
              href={b.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`blog-card reveal reveal-delay-${i + 1}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >

              <div className="blog-thumb">
                <img src={`https://images.unsplash.com/photo-${["1555066931-4365d14bab8c","1677442135703-1787eea5ce01","1563986768494-4dee2763ff3f"][i]}?w=600&q=70`} alt={b.title} loading="lazy" />
                <span className="blog-cat">{b.cat}</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span>📅 {b.date}</span>
                  <span>⏱ {b.read}</span>
                </div>
                <h3 className="blog-title" >{b.title}</h3>
                <p className="blog-excerpt">{b.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
export default BlogSection
//style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}
//style={{ marginTop: 16 }}
//