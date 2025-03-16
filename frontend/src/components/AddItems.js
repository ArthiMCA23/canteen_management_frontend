import React, { useEffect, useState } from 'react';
import '../styles/addItem.css'; // Import the CSS file
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate,useParams } from 'react-router-dom';


function AddItem() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [formData,setFormData] = useState({name:"",price:"",quantity:"",description:"",availability:'off',imageUrl:""});
    const [error,setError] = useState("");

    

    useEffect(()=>{
        if(id){
            fetch(`http://localhost:8000/item/updateitem/${id}`)
            .then(res=>res.json())
            .then((res)=>{
                console.log(res)
                setFormData(res)}
            ).catch((err)=>{
                setError("Failed to load item data")
            })
        }
    },[id])



    function handleChange(e){
        const {name,value,type,checked} = e.target;
        setFormData((prev)=>{
            return {...prev,[name]:type === 'checkbox' ? (checked? "on" : "off"):value}
        });
        setError("");
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(formData);

        const {name,price,quantity,description,imageUrl,availability} = formData;

        if(!name || !price || !quantity || !description || !imageUrl){
            return setError("All fields are required!");
        }

        if(quantity<=0){
            return setError("Invalid quantity");
        }

        if (isNaN(price) || price <= 0) {
            return setError("Invalid price");
          }
        try {


            const method = id ? 'PUT' : 'POST';
            const url = id ? `https://canteen-managent-backend.onrender.com/item/updateitem/${id}` : `https://canteen-managent-backend.onrender.com/item/additem`;
            const response = await fetch(url,
                {
                    method,
                    body:JSON.stringify({
                        name,
                        price,
                        quantity,
                        description,
                        availability,
                        imageUrl
                    }),
                    headers:{
                        "Content-Type" : "application/json; charset=UTF-8"
                    }
                }
            )

            const result = await response.json();


            if(!response.ok){
                throw new Error(result.message);
            }

            // toast('Item Added Successfully!', {
            //     position: "top-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme:"dark",
            //     type:"success"
            //     });
                navigate('/admindashboard')
                

                setFormData({
                    name:"",
                    price:"",
                    quantity:"",
                    description:"",
                    availability:"off",
                    imageUrl:""
                });
                setError("")

        } catch (error) {
            setError(error.message)
        }

    }

  return (
    <div>
        <ToastContainer/>
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">{id ? 'Edit Item' : 'Adding New Item'}</h1>
        {error && <p>{error}</p>}
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" className="form-input" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter Price" className="form-input" />
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Enter Quantity" className="form-input" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Enter Description" className="form-input" />
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Enter Image URL" className="form-input" />
        <label className="form-label">
          <input type="checkbox" checked={formData.availability === "on"} name="availability" onChange={handleChange}/> Availability
        </label>
        <input type="submit" value={id?'Update Item':'Add Item'} className="form-submit" />
      </form>
    </div>
  );
}

export default AddItem;
