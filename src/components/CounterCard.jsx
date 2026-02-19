import { useState,useEffect } from "react";
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function CounterCard({ number, suffix, label, started, delay }) {
  const count = useCounter(number, 1800, started);
  return (
    <div className="counter-item">
      <div className="counter-number">{count}<span className="plus">{suffix}</span></div>
      <div className="counter-label">{label}</div>
    </div>
  );
}
export default CounterCard