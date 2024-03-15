import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const navigate = useNavigate();
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("https://taskhub-uvor.onrender.com/api/auth.js/createuser",{
            method:"POST",
            headers:new Headers({
                "Content-type": "application/json"
            }),
            body:JSON.stringify({name,email,password})
        });
        const json = await response.json();
        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert("Account Created Successfully","success")
            navigate('/')
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
    }
    
    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Unlock productivity and streamline your tasks with TaskHub</h2>
                <p className="signup-subtitle">Sign up now to start conquering your to-do list!</p>
                <form onSubmit={HandleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Signup</button>
                </form>
            </div>
        </div>
    );


}

export default Signup