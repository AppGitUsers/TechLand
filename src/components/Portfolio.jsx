import { useState, useEffect, useCallback } from "react";
import "../css/portfolio.css";
import Banner from "./Banner";



// ─── Project Data (extend with your real projects) ───────────────────────────
const Projects = [
  {
    title: "TesDB Tracker",
    category: "Education CRM",
    description:
      "Comprehensive academic CRM platform designed to monitor and track student and staff topic coverage, attendance, and end-to-end academic progress.",
    fullDescription:
      "TesDB Tracker is a centralized education management system built for institutions to monitor syllabus coverage, staff performance, and individual student progress in real time. It enables administrators to track end-to-end academic journeys—from topic allocation and classroom delivery to assessments and completion status. The platform includes WiFi-based attendance verification during login to ensure authentic presence tracking, along with automated email notifications for key academic and administrative actions such as attendance updates, topic completion, performance alerts, and announcements.",
    tech: ["python", "django", "Postgres", "Redis", "SMTP", "WiFi IP Verification"],
    highlights: [
      "Real-time tracking of syllabus and topic coverage for students and staff",
      "End-to-end academic lifecycle monitoring per student",
      "WiFi-based login attendance verification system",
      "Automated email notifications for attendance, performance, and updates",
      "Role-based dashboards for Admins, Staff, and Students",
    ],
    stats: { institutions: "50+", users: "25K+", attendanceAccuracy: "98%", emailsSent: "100K+/month" },
    year: "2024",
    duration: "3 Months",
    link:"https://tesdb-register.onrender.com",
  },
  {
    title: "Voople",
    category: "Career Acceleration Platform",
    description:
      "AI-powered job search optimization platform that enhances candidate profiles, automates query generation from resumes, and tracks applications with intelligent notifications.",
    fullDescription:
      "Voople is a career acceleration web platform designed to help candidates boost their job search success through intelligent profile optimization and automated job query generation. Once users submit their details and resumes, the system analyzes the data to generate structured search queries tailored for job portals and recruiters. It maintains a centralized database to track every profile submission, query generation, and activity record. For each new record creation—such as profile updates, new applications, or query logs—the platform automatically triggers email notifications to keep users informed in real time.",
    tech: ["React", "vite", "PostgreSQL", "Gemini API", "SMTP", "supabase","sendgrid"],
    highlights: [
      "Automated resume parsing and structured profile enhancement",
      "AI-based job search query generation from submitted details",
      "Centralized database for tracking candidate activity and records",
      "Automatic email notifications on every new record creation",
      "Secure document storage and profile management system",
    ],
    stats: { users: "18K+", resumesProcessed: "30K+", queriesGenerated: "120K+", emailsSent: "85K+/month" },
    year: "2025",
    duration: "2 Weeks",
    link:"https://www.voople.in",
  },
  {
    title: "SportsDen",
    category: "Sports Facility Booking System",
    description:
      "End-to-end turf booking platform that allows users to reserve, cancel, and pay for sports turf slots seamlessly.",
    fullDescription:
      "QuickTurf is a full-stack turf booking management system built to simplify sports facility reservations. The platform enables users to browse available turfs, check real-time slot availability, book preferred time slots, cancel reservations based on policy rules, and complete secure online payments. Turf owners can manage schedules, pricing, and availability through a dedicated dashboard. The system ensures transactional integrity for bookings and payments while maintaining accurate slot allocation to prevent double-booking.",
    tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "Hibernate (JPA)", "REST APIs"],
    highlights: [
      "Real-time turf slot availability and booking system",
      "Secure user authentication and role-based access (Admin/User)",
      "Integrated online payment processing workflow",
      "Automated booking confirmation and cancellation handling",
      "MySQL-backed transactional system preventing double bookings",
    ],
    stats: { users: "8K+", turfsListed: "120+", bookingsPerMonth: "15K+", uptime: "99.8%" },
    year: "2025",
    duration: "6 Months",
    link:"",
  },
  {
  title: "DBAPage",
  category: "Online Learning & Student Portal",
  description:
    "Dynamic online learning academy platform with secure authentication, admin-approved registrations, and paid video access management.",
  fullDescription:
    "DBAPage is a full-featured online learning academy designed to deliver structured educational content through a secure and scalable web platform. The system includes user registration with admin approval workflows to ensure controlled access to premium learning materials. Once approved, students can log in to access paid video courses, track their learning progress, and manage their profiles. The platform functions as an end-to-end student portal, offering course enrollment management, content streaming, progress tracking, and administrative oversight through a dedicated admin dashboard.",
  tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "Thymeleaf", "REST APIs"],
  highlights: [
    "Secure login authentication with role-based access control",
    "Admin approval system for newly registered accounts",
    "Paid video course access with protected streaming",
    "End-to-end student portal with progress tracking",
    "Comprehensive admin dashboard for user and course management",
  ],
  stats: { students: "5K+", courses: "75+", videosHosted: "500+", completionRate: "82%" },
  year: "2025",
  duration: "1 Month",
  link:"https://www.dbapage.com",
 },
];

// Gradient map per card index for the detail modal visual
const GRAD_MAP = [
  "linear-gradient(135deg, #0c5af5 0%, #6a5af9 50%, #0c5af5 100%)",
  "linear-gradient(135deg, #0a1628 0%, #0c5af5 60%, #00c8ff 100%)",
  "linear-gradient(135deg, #1a0533 0%, #6a5af9 50%, #f24903 100%)",
  "linear-gradient(135deg, #0c1428 0%, #0c5af5 40%, #2df494 100%)",
  "linear-gradient(135deg, #160c28 0%, #f24903 40%, #6a5af9 100%)",
  "linear-gradient(135deg, #001428 0%, #0c5af5 50%, #00c8ff 100%)",
];

// ─── Utility: get unique categories ──────────────────────────────────────────
const getCategories = (projects) => [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

// ─── Detail Drawer Component ──────────────────────────────────────────────────
function DetailDrawer({ project, index, onClose,setShowModal }) {
  const grad = GRAD_MAP[index % GRAD_MAP.length];

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const statEntries = Object.entries(project.stats);
  
  return (
    <div className="detail-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="detail-drawer">
        {/* Handle */}
        <div className="drawer-handle" />

        {/* Visual hero */}
        <div className="detail-visual">
          <div className="detail-visual-bg" style={{ background: grad }} />
          <span className="detail-cat-badge">{project.category}</span>
          <button className="detail-close" onClick={onClose} aria-label="Close">✕</button>
          <div className="detail-visual-title">{project.title}</div>
        </div>

        {/* Scrollable body */}
        <div className="detail-body">
          {/* Title row */}
          <div className="detail-title-row">
            <h2 className="detail-project-name">{project.title}</h2>
            <div className="detail-actions">
                {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <button className="detail-btn detail-btn-ghost">
                    ↗ Live Demo
                    </button>
                </a>
                ) : (
                <button
                    className="detail-btn detail-btn-ghost"
                    onClick={() => setShowModal(true)}
                >
                    ↗ Live Demo
                </button>
                )}

            </div>
          </div>

          {/* Stats */}
          <div className="detail-stats">
            {statEntries.map(([label, value]) => (
              <div className="detail-stat" key={label}>
                <span className="detail-stat-value">{value}</span>
                <span className="detail-stat-label">{label.replace(/_/g, " ")}</span>
              </div>
            ))}
          </div>

          {/* Content grid */}
          <div className="detail-content-grid">
            {/* About */}
            <div className="detail-content-block">
              <div className="detail-block-label">About</div>
              <p className="detail-desc">{project.fullDescription}</p>
              <div style={{ marginTop: 20, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 10, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Year</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--white)", fontFamily: "var(--font-display)" }}>{project.year}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Duration</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--primary)", fontFamily: "var(--font-display)" }}>{project.duration}</div>
                </div>
              </div>
            </div>

            {/* Right col */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Tech stack */}
              <div className="detail-content-block">
                <div className="detail-block-label">Tech Stack</div>
                <div className="detail-tech-list">
                  {project.tech.map((t) => (
                    <span className="detail-tech-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="detail-content-block">
                <div className="detail-block-label">Highlights</div>
                <div className="detail-highlights">
                  {project.highlights.map((h, i) => (
                    <div className="detail-highlight-item" key={i}>
                      <span className="highlight-check">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

// ─── Portfolio Component ──────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const categories = getCategories(Projects);

  const filteredProjects = Projects.filter((project) => {
    const matchesFilter = activeFilter === "All" || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openProject = useCallback((project, index) => {
    setSelectedProject(project);
    setSelectedIndex(index);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    setSelectedIndex(null);
  }, []);

  return (
    <>
    <section className="section portfolio-section" id="portfolio">
      <div className="container">

        {/* ── Header ── */}
        <div className="portfolio-header">
          <div className="portfolio-header-left">
            <div className="tag-label" style={{ marginBottom: 14 }}>
              <span className="hex-dot" style={{ background: "var(--primary)" }} />
              Portfolio
            </div>
            <h1 className="portfolio-title">
              Our <span className="portfolio-title-accent">Work</span>
            </h1>
          </div>
          <div className="portfolio-header-right">
            <div className="portfolio-count-badge">
              <span className="count-dot" />
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </div>
            <p style={{ color: "var(--gray)", fontSize: 14, maxWidth: 260, textAlign: "right", lineHeight: 1.6 }}>
              Explore the solutions we've built and shipped to production.
            </p>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="portfolio-controls">
          <div className="portfolio-search-wrapper">
            <div className="search-wrap">
              <span className="search-icon">⌕</span>
              <input
                type="text"
                placeholder="Search projects..."
                className="portfolio-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="portfolio-search-btn">Search</button>
          </div>

          <div className="portfolio-filters">
            {categories.map((filter) => (
              <button
                key={filter}
                className={`filter-btn${activeFilter === filter ? " active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="portfolio-bento">
          {filteredProjects.length === 0 ? (
            <div className="portfolio-empty">
              <div className="portfolio-empty-icon">🔍</div>
              <h4>No projects found</h4>
              <p>Try adjusting your search or filter.</p>
            </div>
          ) : (
            filteredProjects.map((project, i) => {
              // Find original index for gradient consistency
              const originalIndex = Projects.findIndex((p) => p.title === project.title);
              
              return (
                <div
                  className="project-card reveal"
                  key={project.title}
                  style={{ animationDelay: `${i * 0.07}s` }}
                  onClick={() => openProject(project, originalIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openProject(project, originalIndex)}
                >
                  {/* Visual area */}
                  <div className="project-card-visual">
                    <span className="project-cat-pill">{project.category}</span>
                    <div className="project-view-hint">↗</div>
                    <div className="project-visual-title">{project.title}</div>
                  </div>

                  {/* Card body */}
                  <div className="project-card-body">
                    <div className="project-card-meta">
                      <span className="project-card-name">{project.title}</span>
                      <span className="project-card-num">0{originalIndex + 1}</span>
                    </div>
                    <p className="project-card-desc">{project.description}</p>
                    <div className="project-card-footer">
                      <button className="project-link" onClick={(e) => { e.stopPropagation(); openProject(project, originalIndex); }}>
                        View Details
                        <span className="project-link-arrow">→</span>
                      </button>
                      <div className="project-tech-dots">
                        <div className="tech-dot" />
                        <div className="tech-dot" />
                        <div className="tech-dot" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Detail Drawer ── */}
      {selectedProject && (
        <DetailDrawer
          project={selectedProject}
          index={selectedIndex}
          onClose={closeProject}
          setShowModal={setShowModal}
        />
      )}

      {showModal && (
        <div className="success-overlay-new">
            <div className="success-modal-new">
            <div className="success-icon">⚠️</div>
            <h3>Link Not Available!</h3>
            <p>For security reasons, we can't redirect to the link.</p>
            <button
                className="btn"
                onClick={() => setShowModal(false)}
            >
                Close
            </button>
            </div>
        </div>
        )}
    </section>
    <Banner/>
    </>
  );
}
