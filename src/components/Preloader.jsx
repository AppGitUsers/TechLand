function Preloader({ done }) {
  return (
    <div className={`preloader${done ? " hidden" : ""}`}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="80" height="80" viewBox="0 0 80 80" className="preloader-ring">
          <circle cx="40" cy="40" r="35" fill="none" stroke="var(--primary)" strokeWidth="4" strokeDasharray="180 40" />
        </svg>
        <div className="preloader-logo">T</div>
      </div>
    </div>
  );
}
export default Preloader 