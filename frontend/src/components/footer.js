import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/footer.css';


function Footer(){

    return(<>
    <div className='footer'>
    <Container>
      <Row>
        <Col>
        <h3 className='text-footer'>Campus Cravings</h3>
            <p className='text-footer'>
              Your one-stop destination for fresh, delicious, and affordable
              meals. Serving the community with love and flavor.
            </p>
        </Col>
        <Col>
        <h4 className='text-footer'>Contact Us</h4>
            <p className='text-footer'>
              Email: <a className='text-footer' href="mailto:info@canteen.com">info@canteen.com</a>
            </p>
            <p className='text-footer'>Phone: +1 (234) 567-890</p>
            <p className='text-footer'>Address: 123 Canteen Street, Food City</p>
        </Col>
        <Col>
        <h4 className='text-footer'>Follow Us</h4>
        <p>
        <a
                href="https://facebook.com/xyzcanteen"
                target="_blank"
                rel="noopener noreferrer"
                className='text-footer'
              >
                Facebook
              </a>
              </p>
              <p>
              <a
                href="https://instagram.com/xyzcanteen"
                target="_blank"
                rel="noopener noreferrer"
                className='text-footer'
              >
                Instagram
              </a>
              </p>
              <p>
              <a
                href="https://twitter.com/xyzcanteen"
                target="_blank"
                rel="noopener noreferrer"
                className='text-footer'
              >
                Twitter
              </a>
              </p>
              <p>
              <a
                href="https://linkedin.com/company/xyzcanteen"
                target="_blank"
                rel="noopener noreferrer"
                className='text-footer'
              >
                LinkedIn
              </a>
              </p>
        </Col>
      </Row>
    </Container>
    </div>
    </>)
}

export default Footer;