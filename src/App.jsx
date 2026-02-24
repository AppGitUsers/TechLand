import { useState,useEffect } from 'react'
import './App.css'
import GlobalStyles from './components/GlobalStyles'
import Preloader from './components/Preloader'
import Header from './components/Header'
import FooterSection from './components/FooterSection'
import Portfolio from './components/Portfolio'
import {Routes,Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import QueryForm from './pages/queryform'
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
    const t = setTimeout(() => setLoaded(true), 150);
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
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path = "/query" element={<QueryForm/>}/>
          <Route path="/portfolio" element={<Portfolio/>}></Route>
        </Routes>
      </main>
      <FooterSection />
        
      
    </>
  )
}

export default App
