import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import canteen from "../images/canteen.jpg";
import "../styles/About.css";

function About() {
  return (
    <>
      <Container className="abt-container">
        <Row>
          <h1 className="abt-head">About Us</h1>
          <Col>
            <img src={canteen} alt="" className="image-canteen" />
          </Col>
          <Col className="abt-col">
            <p className="abt-para">
              "At Campus Cravings, we believe that great food brings people
              together. Our mission is to serve fresh, delicious, and affordable
              meals that cater to all your cravings. From traditional favorites
              to modern delights, our menu is designed with love and crafted to
              perfection. Every dish is prepared using only the finest
              ingredients, ensuring that each bite is packed with flavor.
              Whether you're in the mood for a comforting bowl of soup, a
              sizzling snack, or a full-course meal, we’ve got something to
              satisfy every taste. Our team is passionate about creating food
              that not only tastes good but also feels good. With a focus on
              quality, variety, and exceptional service, we aim to provide an
              unforgettable dining experience every time you visit. At XYZ
              Canteen, it’s more than just food; it’s a celebration of flavor,
              freshness, and community. Join us, and let’s make every meal a
              memorable one!"
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
