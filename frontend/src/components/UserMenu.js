import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';


function UserMenu(){
    const navigate = useNavigate();

    const [item,setItem] = useState([]);

    useEffect(()=>{
        fetch('https://canteen-managent-backend.onrender.com/item/getitem')
        .then(res => res.json())
        .then(res => setItem(res.items)) 
    },[])

    function viewDetail(id){
        navigate(`/getitemdetail/${id}`);
    }

    const handleQuantityUpdate = (itemId, incrementBy) => {
      fetch(`https://canteen-managent-backend.onrender.com/item/updatequantity/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ incrementBy }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            // Update state immutably
            setItem((prevItems) =>
              prevItems.map((item) =>
                item._id === itemId
                  ? { ...item, quantity: Math.max(item.quantity + incrementBy, 1) }
                  : item
              )
            );
          } else {
            alert('Failed to update quantity');
          }
        })
        .catch((err) => console.error('Error:', err));
    };
    

    const handleAddToCart = (item) => {
      const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
      const { _id, name, price, quantity } = item;
  
      fetch('https://canteen-managent-backend.onrender.com/cart/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          itemId: _id,
          name,
          price,
          quantity, // Use the updated quantity
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
          } else {
            alert('Failed to add to cart');
          }
        })
        .catch((err) => console.error('Error:', err));
    };
  
    

    return(<>
    <Container>
        <Row >
          {item.map((item,index)=>{
          return <Col> <Card key={index} style={{ width: '18rem',height:'34rem'}}>
        <Card.Img variant="top" src={item.imageUrl} style={{height:'300px'}} />
        <Card.Body>
          <Card.Title >{item.name}</Card.Title>
          <Card.Text >
            Price:{" "}Rs.{item.price}
          </Card.Text>
          <Card.Text>
            Quantity:{" "}{item.quantity}
          </Card.Text>
          <Button
  variant="primary"
  onClick={() => handleQuantityUpdate(item._id, 1)} // Increment by 1
>
  +
</Button>
{' '}
<Button
  variant="danger"
  onClick={() => handleQuantityUpdate(item._id, -1)} // Decrement by 1
  disabled={item.quantity <= 1} // Prevent negative quantity
>
  -
</Button><br/><br/>

          <Button variant="secondary" onClick={()=>viewDetail(item._id)}>View Details</Button>{" "}
          <Button variant="success" onClick={() => handleAddToCart(item)}>Add To Cart</Button>
        </Card.Body>
      </Card>
      </Col>
       })
    }
        </Row>
      </Container>
    </>)
}

export default UserMenu;