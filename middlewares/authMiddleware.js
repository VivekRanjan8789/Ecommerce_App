import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const requireSignIn =async (req, res, next) => {    
    try {
         
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGFmYjBmMzI0ODZiNDI5MzZiOTdhZCIsImlhdCI6MTcyNTY3NzA0OSwiZXhwIjoxNzI2MjgxODQ5fQ.2UaCMJIYfVHdO1IJKZ283g0BajA-x4Hz2giMAkxWQ6w"
        // console.log(req.headers.authorization);
        
        const token = req.headers.authorization
        const decode =await jwt.verify(token, process.env.JWT_SECRET_KEY); 
        console.log(decode);
        
        req.user = decode
        next();       
    } catch (error) { 
        // console.log("in catch", req.headers.authorization);       
        return res.status(401).send({
            success: false,
            message: "Invalid Token",
            error: error
        })
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.id})
        console.log(req.user.id);
        console.log(user);
        
        
        const role = user.role
        if(role !== 1){
          return  res.status(401).send({
                user: user.name,
                role: user.role,
                success: false,
                messagesg: "unauthorized access"
            })
        }
        else{
            next();
        }       
    } catch (error) {
        console.log("error while checking isAdmin: ", error);
        return res.status(404).send({
            success: false,
            message: "error in admin middleware",
            error: error
        })        
    }
}