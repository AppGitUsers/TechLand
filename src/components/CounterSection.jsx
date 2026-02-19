import { useEffect,useState,useRef } from "react";
import CounterCard from "./CounterCard";
const COUNTERS = [
  { number: 250, suffix: "+", label: "Projects Completed" },
  { number: 15, suffix: "+", label: "Years Experience" },
  { number: 98, suffix: "%", label: "Client Satisfaction" },
  { number: 80, suffix: "+", label: "Team Experts" },
];
function CounterSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section className="counter-section" ref={ref}>
      <div className="container">
        <div className="counter-grid">
          {COUNTERS.map((c, i) => <CounterCard key={i} {...c} started={started} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}
export default CounterSection