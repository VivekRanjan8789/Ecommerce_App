import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/Auth'
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminRoute = () => {
    
    const [isAdmin, setIsAdmin] = useState(false);
    const { Auth } = useContext(AuthContext);

    useEffect(()=>{
        const adminAuthCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/auth/auth-admin`);
            console.log(res);
            
            if(res.data.ok){
                setIsAdmin(true);
            }else{
                setIsAdmin(false);
            }
        } 
        if(Auth?.token) adminAuthCheck()
    },[Auth?.token])

  return isAdmin? <Outlet /> : <Spinner path=""/>
}

export default AdminRoute
