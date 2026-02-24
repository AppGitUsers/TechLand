import Hero from './Hero'
import CounterSection from './CounterSection'
import BrandsMarquee from './BrandsMarquee'
import ServicesSection from './ServicesSection'
import WhySection from './WhySection'
import BlogSection from './BlogSection'
import TeamSection from './TeamSection'
import TestimonialsSection from './TestimonialsSection'
import FAQSection from './FAQSection'
import ScrollTopButton from './ScrollTopButton'
import UpComingTech from './UpComingTech'
import Banner from './Banner'
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
            {/* <TeamSection/> */}
            <TestimonialsSection />
            
            <Banner/>
            <ScrollTopButton />
        </>
    )
}
export default Homepage;