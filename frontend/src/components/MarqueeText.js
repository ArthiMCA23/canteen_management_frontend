import Marquee from "react-fast-marquee";
import '../styles/MarqueeText.css';

function MarqueeText(){

    return(<>
    <Marquee speed={50} className="text">
        "Savor the Taste, Love the Experience – Delicious Meals Delivered Fast
        and Fresh!"
    </Marquee>
    </>)
}

export default MarqueeText;