import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../styles/LandingPage.css';

function LandingPage() {

    

  return (
    <>
      <Container>
        <Row>
          <Col>
            <p className="para-land">
              <b>"</b>Welcome to Campus Cravings! Discover a world of mouth-watering
              dishes, prepared fresh every day. Whether you're in the mood for a
              quick bite or a full meal, we have something special for everyone.
              Explore our menu and order with ease—deliciousness is just a click
              away!<b>"</b>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
