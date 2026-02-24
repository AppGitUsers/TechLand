import { useState, useEffect, useMemo } from "react";

function ServiceCard({ service }) {

  // 1️⃣ Create fixed launch date (3 months from first render)
  const launchDate = useMemo(() => {
    const saved = localStorage.getItem(service.title);

    if (saved) return new Date(saved);

    const date = new Date();
    date.setMonth(date.getMonth() + 3);

    localStorage.setItem(service.title, date);
    return date;
  }, [service.title]);

  // 2️⃣ Calculate time left
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = launchDate - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // 3️⃣ Countdown lifecycle
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 4️⃣ Progress calculation (Premium SaaS feel)
  const totalDuration = 1000 * 60 * 60 * 24 * 90; // 90 days
  const progress = timeLeft
    ? ((totalDuration - timeLeft.total) / totalDuration) * 100
    : 100;

  if (!timeLeft) {
    return <div className="launched">Launched 🚀</div>;
  }

  return (
    <div className="service-card reveal">

      <div className="service-top">
        <div className="service-icon-wrapper">
          <img className="service-icon" src={service.icon} alt={service.title} />
        </div>
        <span className="coming-badge">Coming Soon</span>
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.desc}</p>

      <div className="countdown">
        <div className="time-box">
          <span>{timeLeft.days}</span>
          <small>Days</small>
        </div>

        <div className="time-box">
          <span>{timeLeft.hours}</span>
          <small>Hours</small>
        </div>

        <div className="time-box">
          <span key={timeLeft.seconds}>{timeLeft.seconds}</span>
          <small>Sec</small>
        </div>
      </div>

      <div className="progress-wrapper">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
}

export default ServiceCard;