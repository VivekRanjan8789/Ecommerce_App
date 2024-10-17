import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({path = 'login'}) => {    // initially the path will be login if we dont pass any props
  
  const [count, setCount] = useState(5)
  const navigate = useNavigate();

  // for history of url
  const location = useLocation();

  useEffect(()=>{
       const interval = setInterval(()=>{
          setCount((prevValue)=> --prevValue)
       },1000);
       
       count===0 && navigate(`/${path}`, {
          state: location.pathname
       });
       return () => clearInterval(interval)
  }, [count, navigate, location, path])

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center"
       style={{height: '100vh'}}>

        <h2>Redirecting you on login page in {count} second</h2>

        <div className="spinner-border" role="status">
         
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
