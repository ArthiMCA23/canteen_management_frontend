import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Hungry.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPizzaSlice} from '@fortawesome/free-solid-svg-icons';


function Hungry(){

    return(<>
    <Container className='Hungry-container'>
      <Row>
        <Col>
        <h1 className='hungry-head'>Hungry...?</h1>
        </Col>
        <Col>
        <FontAwesomeIcon icon={faPizzaSlice} className='pizza' />
        </Col>
      </Row>
      <Row>
        <Col>
        <h3 className='hungry-para'>No problem! Browse our menu, add your favorites to the cart, and
              place your order with just a few clicks. Enjoy a seamless
              experience, from ordering to enjoying your meal.</h3>
        </Col>
      </Row>
    </Container>
    </>)
}

export default Hungry;