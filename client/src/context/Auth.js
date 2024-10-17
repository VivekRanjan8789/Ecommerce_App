import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [Auth, setAuth] = useState({
            user: null,
            token: ""
    });

    // default axios for setting header with token

    axios.defaults.headers.common['Authorization'] = Auth?.token;
    
    useEffect(()=> {
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...Auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        // eslint-disable-next-line-
    },[])

  return (
       <AuthContext.Provider value = {{Auth, setAuth}}>
             {children}
       </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
