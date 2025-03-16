import Carousel from '../components/Carousel';
import About from './About';
import Footer from './footer';
import Hungry from './Hungry';
import LandingPage from './LandingPage';
import MarqueeText from "./MarqueeText";
import WhyChoose from './WhyChoose';

function HomePage(){

    return(<>
    <MarqueeText/>
    <Carousel/>
    <LandingPage/>
    <About/>
    <Hungry/>
    <WhyChoose/>
    <Footer/>
    </>)
}

export default HomePage;