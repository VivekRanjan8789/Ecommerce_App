import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config'

import { hashPassword, verifyPassword } from "../helper/authHelper.js";
import Order from "../models/orderModel.js";

export const registerController = async (req, res) =>{
      try {        
        const { name, email, password, phone, address, answer, role} = req.body;

        // if any data is missing while registration
        if(!name){
           return res.send({message: "name is missing"})
        }
        if(!email){
          return res.send({message: "email is missing"})
        }
        if(!password){
          return res.send({message: "password is missing"})
        }
        if(!phone){
          return res.send({message: "phone is missing"})
        }
        if(!address){
          return res.send({message: "address is missing"});
        }
        if(!answer){
          return res.status(400).send({message: "FriendName is missing"})
        }

        // checking if any existing User
        const existingUser =await User.findOne({email})
        if(existingUser){
          return res.status(200).send({
            success: false,
            message: "already found this userid! please login"})
        }

        // password hashing
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            address: address,
            answer: answer,
            role: role
        });
        console.log("created user is: ", user);
        return res.status(200).json({
            success: true,
            message: "created a new user successfull",
            data: user,
            err: {},            
        })        
      } catch (error) {
        return res.status(500).json({
            message: 'something went wrong while creating newUser',
            data: {},
            success: false,
            err: error
        })        
      }
}

export const loginController = async (req, res) => {

      const { email, password } = req.body;      
        try {
            // if user hasn't entered email or password
            // if(!email || !password){
            //   return res.status(404).send({
            //     success: false,
            //     message: "email or password is incorrect"
            //   })
            // }
          // checking user in db or not
          const user = await User.findOne({email});
          
          if(!user){
            console.log("email is not resgistered");           
              return res.status(404).json({
                success: false,
                message: "email is not registered"
              })
          } 
          // user found then password checking        
          const hashedPassword = user.password;
          const isCorrectPassword =await verifyPassword(password, hashedPassword);
          
          if(!isCorrectPassword){
            return res.status(401).send(
              {
                success: false,
                message: "incorrect password"
              }
            );
          }
          // generating token if user password correct
          else{
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
              expiresIn: "7d"
            })
            return res.status(200).json({
              success: true,
              message: "password correct! , logged in",
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
              },
              token: token
            })
          }     
        } catch (error) {
         return res.status(500).send({
            success: false,
            message: "something went wrong while logging",
            err: error
         })
      }
}


export const forgetPasswordController = async (req, res) =>{

  const  { email, answer, newPassword} = req.body;
  try {
        if(!email){
          return res.status(400).send({message: "email is missing"})
        }
        if(!answer){
          return res.status(400).send({message: "answer is missing"})
        }
        if(!newPassword){
          return res.status(400).send({message: "newPassword is missing"})
        } 
        const user = await User.findOne({email: email, answer: answer});
        console.log(user);
        
        if(!user){
            return res.status(404).send({
              success: false,
              message: "email or answer is incorrect",
            })
        }

        const hashedPassword = await hashPassword(newPassword);
        const response =await User.findByIdAndUpdate(user._id, {
          password: hashedPassword
        })
        console.log(response);
        
        if(response){
          return res.status(200).send({
            success: true,
            message: "password updated"
         })
        }
        else{
          return res.status(500).send({
             success: true,
             message: "something went wrong"
          })
        }        
     } catch (error) {
          return res.status(500).send({
            success: false,
            message: "something went wrong while updating password",
            error: error
          })
     }
}


// testing route
export const admin = (req, res) => {
    res.status(200).send("protected route");
}

// update profile
export const updateProfileController = async(req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    console.log(address);
    
    const user = await User.findById(req.user?.id);
    
    if(password && password.length < 6) {
      return res.json({error: "password must be atleast 6 char long"});
    }
    const hashedPassword = password? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(req.user?.id, {
       name: name || user.name,
       email: email || user.email,
       password: hashedPassword || user.password,
       phone: phone || user.phone,
       address: address || user.address
    }, {new: true});

    return res.status(200).send({
      success: true,
      message: "profile updated successfull",
      updatedUser
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating profile",
      error
    })
  }
}

// get orders for userthat they ordered by user_id
export const getOrderController = async (req, res) => {
    try {
      const orders = await Order.find({buyer: req.user.id}).populate('products','-photo').populate("buyer","name");
      return res.status(200).send({
        success: true,
        message: "order fetched successfully",
        orders
      })
        
      
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "error while updating profile",
        error
      })
      
    }
}


// all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products','-photo').populate("buyer","name").sort({createdAt: -1});
    return res.status(200).send({
      success: true,
      message: "order fetched successfully",
      orders
    })
      
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error while fetching all orders",
      error
    })
    
  }
}

// order status
export const orderStatusController = async (req, res) =>{
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log("status  is: ", id, status);
      
      const response = await Order.findByIdAndUpdate(id, {
         status
      }, {new: true})
      return res.status(200).send({
        success: true,
        message: "status of order updated successfully",
        response
      })
    } catch (error) {
       return res.status(500).send({
         success: false,
         message: "error while updating status of order",
      error
       })
    }
}