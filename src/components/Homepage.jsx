import Hero from './Hero'
import CounterSection from './CounterSection'
import BrandsMarquee from './BrandsMarquee'
import ServicesSection from './ServicesSection'
import WhySection from './WhySection'
import BlogSection from './BlogSection'
import TeamSection from './TeamSection'
import TestimonialsSection from './TestimonialsSection'
import FAQSection from './FAQSection'
import FooterSection from './FooterSection'
import ScrollTopButton from './ScrollTopButton'
import UpComingTech from './UpComingTech'
const Homepage =() =>{
    
    return(
        <>
            <Hero />
            <CounterSection />
            <BrandsMarquee />
            <ServicesSection />
            <WhySection />
            <BlogSection />
            <UpComingTech/>
            <TeamSection/> 
            <TestimonialsSection />
            <FAQSection />
            <FooterSection />
            <ScrollTopButton />
        </>
    )
}
export default Homepage;