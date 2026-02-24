import { useState } from "react";

const Projects = [
    {
    title: "CloudSync Pro",
    category: "Cloud",
    description:
        "Enterprise-grade cloud synchronization platform that enables real-time data sync across multiple cloud providers."
    },
    {
    title: "DataFlow Analytics",
    category: "Analytics",
    description:
        "Advanced analytics platform for real-time data processing and visualization with ML-powered predictions."
    },
    {
    title: "TeamConnect",
    category: "Collaboration",
    description:
        "Next-generation collaboration platform with integrated video, chat, and project management tools."
    }
];

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

  // 🔎 Filtering logic
    const filteredProjects = Projects.filter((project) => {
    const matchesFilter =
        activeFilter === "All" || project.category === activeFilter;

    const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
    });

    return (
    <section className="section portfolio-section" id="portfolio">
        <div className="container">

        <div className="heading-section">
            <div className="tag-label">
            <span className="hex-dot" style={{ background: "var(--primary)" }} />
            Portfolio
            </div>
            <h2>Our Work</h2>
            <p className="sub">
            Explore the solutions we've built and deployed.
            </p>
        </div>

        <div className="portfolio-controls">

            <div className="portfolio-search-wrapper">
            <input
                type="text"
                placeholder="Search projects..."
                className="portfolio-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn portfolio-search-btn">
                Search
            </button>
            </div>

            <div className="portfolio-filters">
            {["All", "Cloud", "Analytics", "Collaboration"].map((filter) => (
                <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
                >
                {filter}
                </button>
            ))}
            </div>

        </div>

        <div className="portfolio-grid">
            {filteredProjects.length === 0 ? (
                <div className="portfolio-empty">
                    <h4>No projects found</h4>
                    <p>Try adjusting your search or filter.</p>
                </div>
            ) : (
                filteredProjects.map((project, i) => (
                <div className="project-card" key={i}>
                <div className="project-card-top">
                    <h3>{project.title}</h3>
                </div>

                <div className="project-card-body">
                    <h4>Seamless Solution</h4>
                    <p>{project.description}</p>
                    <span className="project-link">
                    View Details →
                    </span>
                </div>
                </div>
            ))
            )}
        </div>

        </div>
    </section>
    );
}