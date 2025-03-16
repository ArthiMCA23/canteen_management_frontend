import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import card1 from '../images/card1.jpg';
import card2 from '../images/card2.webp';
import card3 from '../images/card3.jpg';
import card4 from '../images/card4.png';



function WhyChoose(){

    const cardDetails = [
        {
            image:card1,
            title:"Fresh Ingredients",
            text:"Only the best for your taste buds."
        },
        {
            image:card3,
            title:"Easy Ordering",
            text:"Place orders effortlessly online."
        },
        {
            image:card2,
            title:"Wide Variety",
            text:"From snacks to full-course meals."
        },
        {
            image:card4,
            title:"Quick Delivery",
            text:"Get your food hot and fresh in no time."
        }
    ]


    return(<>
    <Container>
      <Row style={{paddingLeft:'20px'}}>
        <h1 style={{textAlign:'center',paddingBottom:'20px'}}>Why Choose US?</h1>
        {cardDetails.map((item,index)=>{
            return(
                <Col>
        <Card style={{ width: '18rem',height:'25rem'}}>
      <Card.Img variant="top" src={item.image} style={{height:'18rem'}}/>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.text}
        </Card.Text>
      </Card.Body>
    </Card>
        </Col>
            )
        })
    }
        
      </Row>    
    </Container><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>)
}

export default WhyChoose;