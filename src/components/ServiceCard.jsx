import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

function ServiceCard({ service, index }) {

  const calculateTimeLeft = () => {
    const now = new Date();
    const launchDate = new Date(service.launchDate);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <div>Launched 🚀</div>;
  }

  return (
    <div className={`service-card reveal reveal-delay-${(index % 3) + 1}`}>

      <div className="icon-link">
        <img className="service-icon" src={service.icon} alt={service.title} />
      </div>
    <div className="badge">Coming Soon</div>
      <div className="service-title">{service.title}</div>
      <p className="service-desc">{service.desc}</p>

      <div className="countdown">
        <div>{timeLeft.days}d</div>
        <div>{timeLeft.hours}h</div>
        <div>{timeLeft.minutes}m</div>
        <div>
            <span key={timeLeft.seconds}>
             {timeLeft.seconds}
            </span>s
        </div>
      </div>

      <ProgressBar timeLeft={timeLeft.total} />

    </div>
  );
}

export default ServiceCard;