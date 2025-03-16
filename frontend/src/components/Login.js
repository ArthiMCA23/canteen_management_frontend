import { useState } from "react";
import {useNavigate,Link} from 'react-router-dom';


function Login(){
    const navigate = useNavigate();

    const [log,setLog] = useState({
        email:"",
        password:""
    })

    const [err,setErr] = useState("");

    
    function handleChange(e){
        const {name,value} = e.target;
        setLog((prev)=>{
            return {...prev,[name]:value}
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        const {email,password} = log;

        if(!email || !password){
            setErr("All fields required!")
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            setErr("Enter valid email address")
            return;
        }

        if(password.length < 6){
            setErr("Password must be atleast 6 characters")
            return;
        }

        try {
            const response = await fetch('https://canteen-managent-backend.onrender.com/api/auth/loginUser',
                {
                    method:"POST",
                    body:JSON.stringify({
                        email,
                        password
                    }),
                    headers:{
                        "Content-Type":"application/json; charset=UTF-8"
                    }
                }

                
            )

            const result = await response.json();

            if(!response.ok){
               throw new Error(result.message || "Login Failed");
               
            }

            const { userId, role,token } = result;

      // Store userId in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role); // Optional: store role if needed
            // alert('Login Successful!');
            // toast('Registered Successfully!', {
            //     position: "top-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme:"dark"
            //     });

           
            if(role === 'user'){
               
            navigate('/userdashboard');
            }
            if(role === 'admin'){
                navigate('/admindashboard')
            }
            

            setLog({
                email:"",
                password:""
            });

            setErr("");

        } catch (error) {
            setErr(error.message);
        }
    }


    return(<>
    <div className="background">
    <div className="form-container">
    <h1 className="form-head">Login</h1>
    <form onSubmit={handleSubmit}>
        {err && <p style={{color:'red'}}>{err}</p>}
        <input className="form-input" type="email" name="email" value={log.email} placeholder="Enter Email Address" onChange={handleChange}/><br/>
        <input className="form-input" type="password" name="password" value={log.password} placeholder="Enter Password" onChange={handleChange}/><br/>  
        <input className="form-btn" type="submit" value="Login"/>
        <p className="form-link">New User?<Link to='/register'>Register</Link></p>
    </form> </div>
    </div>
    </>)
}

export default Login;