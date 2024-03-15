import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

function Login(props) {
    const [credentials,setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("https://taskhub-uvor.onrender.com/api/auth.js/login",{
            method:"POST",
            headers:new Headers({
                "Content-type": "application/json"
            }),
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        if(json.success){
            //save the authToken and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert("Loged in successfully","success");
            navigate('/');
        }
        else{
           props.showAlert("Invalid credentials","danger")
        }
    }
    
    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }


return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login To Begin Your Journey With TaskHub</h2>
                <form onSubmit={HandleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} id="password" onChange={onChange} name="password" />
                    </div>
                    <div className='d-flex justify-content-between'>  
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                    <Link to="/demo"><button className="btn align-left btn-primary btn-block">Demo</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Login