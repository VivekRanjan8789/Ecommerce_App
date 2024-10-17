import React, { useState, useContext } from "react";
import Layout from "../../components/layout/Layout";
import axios from 'axios';
import toast from 'react-hot-toast';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";

// for authContext for login user
import { AuthContext } from "../../context/Auth";

const Login = () => {
    

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")  

    // using useContext for getting user
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
           const response =await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
                password, email
           })
           console.log(response);
           
           
           if(response.data.success){
               toast.success(response.data.message)              
               
               setAuth({
                   ...auth,
                   user: response.data.user,
                   token: response.data.token
               })
                console.log(response.data);
                localStorage.setItem('auth',JSON.stringify(response.data));
                
                setTimeout(()=>{
                    navigate(location.state || "/Home")
                },2000)
            }

        } catch (error) {
            if ( error.response.data.message) {
                // Display the specific error message from the backend
                toast.error(error.response.data.message, {
                    duration: 4000
                });
            } else {
                // Display a generic error message if no specific message is available
                toast.error('An error occurred during login', {
                    duration: 4000
                });
            } 
                     
        }           
   }

  return (
    <div>
        <Layout>
            <div className="register">
            <h1 className='p-3'>Login Page</h1>
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Your Email"
                            value = {email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter Your password"
                            value = {password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
                            Forgot password
                        </button>
                    </div>
            </form>
            </div>
        </Layout>     
    </div>
  )
}

export default Login
