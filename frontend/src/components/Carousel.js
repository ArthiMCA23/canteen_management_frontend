import Carousel from 'react-bootstrap/Carousel';
import '../styles/Carousel.css';
import background1 from '../images/background.jpg';
import background2 from '../images/background2.jpg';
import background3 from '../images/background3.jpg';
import {useNavigate} from 'react-router-dom';

function CarouselFadeExample() {

  const navigate = useNavigate();
  
    const slideImage = [
        {
            image:background1,
            head:"Fresh Flavors, Anytime!",
            para:"Discover a menu full of delicious, freshly prepared meals that satisfy your cravings!"
        },
        {
            image:background2,
            head:"Good Food, Great Mood!",
            para:"Lift your spirits with our tasty dishes made with love and delivered straight to your table."
        },
        {
            image:background3,
            head:"Your Cravings, Our Priority!",
            para:"From quick snacks to hearty meals, we bring you the flavors you love with the convenience you need."
        }
    ]

    function login(){
      navigate('/login');
    }

    function register(){
      navigate('/register');
    }

  return (
    <div className='carousel-div'>
      <div className='overlay'>
        <h1 className='overlayText'>Campus Cravings</h1>
        <button onClick={login} className='overlayButton'>Login</button>
        <button onClick={register} className='overlayRegister'>Register Here</button>
      </div>

    <Carousel fade>
        {slideImage.map((item,index)=>{ return(
            <Carousel.Item key={index}>
            <img
              src={item.image}
              alt={item.head}
              className='img'
            />
            <Carousel.Caption>
              <div className='container-div'>
              <h3 className='head'>{item.head}</h3>
              <p className='para'>{item.para}</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        )
        })
    }
    </Carousel>
    </div>
  );
}

export default CarouselFadeExample;