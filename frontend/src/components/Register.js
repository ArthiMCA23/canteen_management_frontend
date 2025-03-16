import {useState } from "react";
import {Link} from 'react-router-dom';
import '../styles/Register.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function Register(){

    const [details,setDetails] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        phone:""
    });
    const [error,setError] = useState('');


    function handleChange(e){
        const {name,value} = e.target;
        setDetails((prev)=>{
            return {...prev,[name]:value}
        });
        setError("");
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(details);

        const {name,email,password,confirmPassword,phone} = details;

        if(!name || !email || !password || !confirmPassword || !phone){
            setError("All fields are required!")
            return;
        }
        if(password !== confirmPassword){
            setError("Passwords do not match!")
            return;
        }
        if(password.length < 6){
            setError("Password must be atleast 6 characters")
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            setError("Enter Valid Email Address")
            return;
        }

        try {
           
                const response = await fetch("https://canteen-managent-backend.onrender.com/api/auth/registerUser",
                    {
                        method:"POST",
                        body:JSON.stringify({
                            name,
                            email,
                            password,
                            phone
                        }),
                        headers:{
                            "Content-Type":"application/json; charset=UTF-8"
                        }
                    }
                );
                const result = await response.json();

                if(!response.ok){
                    throw new Error( result.message||"Registeration failed");
                    
                }

                // alert("Registered successfully!");
                toast('Registered Successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"dark"
                    });
                
                

                setDetails({
                    name:"",
                    email:"",
                    password:"",
                    confirmPassword:"",
                    phone:""
                });
                setError("");
                
            

        } catch (error) {
            setError(error.message)
        }
        
    }

    

    return(<>
    <div className="background">
    <div className="form-container">
    <ToastContainer/> 
    <form onSubmit={handleSubmit}>
    <h1 className="form-head">Register</h1>
        {error && <p style={{color:"red"}}>{error}</p>}
        <input className="form-input" type="text" name="name" value={details.name} placeholder="Enter name" onChange={handleChange}/><br/>
        <input className="form-input" type="email" name="email" value={details.email} placeholder="Enter Email" onChange={handleChange}/><br/>
        <input className="form-input" type="password" name="password" value={details.password} placeholder="Enter Password" onChange={handleChange}/><br/>
        <input className="form-input" type="password" name="confirmPassword" value={details.confirmPassword} placeholder="Enter Confirm Password" onChange={handleChange}/><br/>
        <input className="form-input" type="text" name="phone" value={details.phone} placeholder="Enter Phone Number" onChange={handleChange}/><br/>
        <input className="form-btn" type="submit" value="Register"/>
        <p className="form-link">Already Register?<Link to='/login'>Login</Link></p>
    </form>
    </div>
    </div>
    </>)
}

export default Register;