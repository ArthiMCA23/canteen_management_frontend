import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';



function InventoryMt(){
    const navigate = useNavigate();

    const [item,setItem] = useState([]);

    useEffect(()=>{
        fetch('https://canteen-managent-backend.onrender.com/item/getitem')
        .then(res => res.json())
        .then(res => setItem(res.items)) 
    },[])

    // console.log(item)
    function handleEdit(id){
        navigate(`/additem/${id}`);

    }

    function handleDelete(id){
      const confirmDelete = window.confirm("Are you sure want to delete this item?");

      if(confirmDelete){
        fetch(`https://canteen-managent-backend.onrender.com/item/deleteitem/${id}`,{
          method:"DELETE",
        }).then(res => res.json())
        .then(res =>{
          alert(res.message);
          setItem(prev => prev.filter(item => item._id !== id));
        })
      }
    }

    return(<>
         <Container>
        <Row className='d-flex gap-3'>
          {item.map((item,index)=>{
          return <Col> <Card key={index} style={{ width: '18rem',height:'45rem'}}>
        <Card.Img variant="top" src={item.imageUrl} style={{height:'300px'}} />
        <Card.Body>
          <Card.Title >{item.name}</Card.Title>
          <Card.Text >
            Price:{" "}Rs.{item.price}
          </Card.Text>
          <Card.Text>
            Quantity:{" "}{item.quantity}
          </Card.Text>
          <Card.Text style={{textAlign:'justify'}}>
            Description:{" "}{item.description}
          </Card.Text>
          <Button variant="warning" onClick={()=>handleEdit(item._id)}>Edit</Button>{" "}
          <Button variant="danger" onClick={()=>handleDelete(item._id)}>Delete</Button>
        </Card.Body>
      </Card>
      </Col>
       })
    }
        </Row>
      </Container>


    </>)
}

export default InventoryMt;