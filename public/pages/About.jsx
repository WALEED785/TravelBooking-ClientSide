import AboutAccordion from '../components/AboutAccordion'
import AboutHero from '../components/AboutHero'
import ContactMap from '../components/ContactMap'
import Footer from '../components/Footer'
import  Navbar from '../components/Navbar'
import TravelIntro from '../components/TravelIntro'
const About = () => {
  return (
    <div className='bg-light' >

        <Navbar/>
        <AboutHero/>
        <AboutAccordion/>
        <ContactMap/>
        <TravelIntro/>
        <Footer/>


    </div>
  )
}

export default About