import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from 'axios';
import toast from 'react-hot-toast';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
   
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
         e.preventDefault();
        //  making http request to server side
         try {
            const response =await axios.post(`${process.env.REACT_APP_API}/auth/register`, {
                name, password, email, phone, address, answer
            })
            console.log(response); 
            // creating notification
            if(response.data.success){
                toast.success(response.data.message, {
                    duration: 4000
                }) 
                setTimeout(() => {
                    navigate("/login");
                }, 2000);                
            }
            else{
                toast.error(response.data.message, {
                    duration: 4000
                })
                console.log("hahah");
                
            }
         } catch (error) {
            console.log(error); 
            toast.error("something went wrong")           
         }           
    }

  return (
    <div>
      <Layout>
        <div className="register">
          <h1 className='p-3'>Register page</h1>
          <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputName"
                        placeholder="Enter Your Name"
                        value = {name}
                        onChange={(e)=>{setName(e.target.value)}}
                        required
                    />
                </div>
                
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
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPhone"
                        placeholder="Enter Your Phone No."
                        value = {phone}
                        onChange={(e)=>{setPhone(e.target.value)}}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputAdfdress"
                        placeholder="Enter Your Address"
                        value = {address}
                        onChange={(e)=>{setAddress(e.target.value)}}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputAnswer"
                        placeholder="Enter Your BestFriend Name"
                        value = {answer}
                        onChange={(e)=>{setAnswer(e.target.value)}}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
