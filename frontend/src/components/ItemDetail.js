import { useParams } from "react-router-dom";
import { useEffect ,useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import MarqueeText from "./MarqueeText";
import '../styles/ItemDetail.css'

function ItemDetail(){
    const {id} = useParams();
    const [formData,setFormData] = useState({name:"",price:"",quantity:"",description:"",availability:'off',imageUrl:""});
    const [error,setError] = useState("");
    useEffect(()=>{
        if(id){
            fetch(`https://canteen-managent-backend.onrender.com/item//getitemdetail/${id}`)
            .then(res=>res.json())
            .then((res)=>{
                console.log(res)
                setFormData(res)}
            ).catch((err)=>{
                setError("Failed to load item data")
            })
        }
    },[id])



    return(<>
    <MarqueeText />
            <br /><br /><br /><br />
            <Container className="item-detail-container d-flex">
                <p>{error && <p>{error}</p>}</p>
                <Row>
                    <Col xs={12} md={6} className="text-center">
                        <Card style={{ width: '100%', borderRadius: '10px' }}>
                            <Card.Img variant="top" src={formData.imageUrl} style={{ borderRadius: '10px 10px 0 0', height: '500px' }} />
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1 className="item-title">Product: {formData.name}</h1>
                        <h5 className="item-price">Price: Rs. {formData.price}</h5>
                        <h5 className="item-quantity">Quantity: {formData.quantity}</h5>
                        <p className="item-description">Description: {formData.description}</p>
                        
                    </Col>
                </Row>
            </Container>
    </>)
}

export default ItemDetail;