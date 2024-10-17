import React, { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../context/Auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';


const PrivateRoute = function ()   {
    const [ok, setOk] = useState(false);
    const { Auth } = useContext(AuthContext);
    
    useEffect(()=>{
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/auth/auth-user`);
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(Auth?.token) authCheck();
    },[Auth?.token])
    
    return ok? <Outlet /> :  <Spinner />
}
export default PrivateRoute;
