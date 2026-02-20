import { useState,useEffect } from 'react'
import './App.css'
import GlobalStyles from './components/GlobalStyles'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Hero from './components/Hero'
import CounterSection from './components/CounterSection'
import BrandsMarquee from './components/BrandsMarquee'
import ServicesSection from './components/ServicesSection'
import WhySection from './components/WhySection'
import BlogSection from './components/BlogSection'
import TeamSection from './components/TeamSection'
import TestimonialsSection from './components/TestimonialsSection'
import FAQSection from './components/FAQSection'
import FooterSection from './components/FooterSection'
import ScrollTopButton from './components/ScrollTopButton'
import UpComingTech from './components/UpComingTech'
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useReveal();

  return (
    <>
      <GlobalStyles />
      <Preloader done={loaded} />
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <CounterSection />
        <BrandsMarquee />
        <ServicesSection />
        <WhySection />
        <BlogSection />
        <UpComingTech/>
        <TeamSection />
        <TestimonialsSection />
        <FAQSection />
        <FooterSection />
      </main>
      <ScrollTopButton />
    </>
  )
}

export default App
