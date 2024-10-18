import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
    const { Auth, setAuth }  = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(()=>{
        const { name, phone, email, address } = Auth?.user;
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)

  },[Auth?.user])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
   // making http request to server side for update profile
    try {
       const { data } =await axios.put(`${process.env.REACT_APP_API}/auth/profile`, {
           name, password, email, phone, address
       })
       if(data?.error){
         toast.error(data?.error)
       }else{
        setAuth({...Auth, user: data?.updatedUser})
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls)
        ls.user = data?.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success("profile updated successfully")
       }
    } catch (error) {
       console.log(error); 
       toast.error("something went wrong while updating")       
    }           
}

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="register">
              <h1 className="p-3 text-center">User Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword"
                    placeholder="Enter Your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter Your Phone No."
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAdfdress"
                    placeholder="Enter Your Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
