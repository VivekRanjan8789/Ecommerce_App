import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
     name: {
          type: String,
          require: true,
          trim:true,
     },
     password: {
          type: String,
          require: true
     },
     email: {
          type: String,
          require: true,
          unique: true
     },
     phone: {
          type: String,
          require: true
     },
     address: {
          type: {},
          require: true
     },
     answer: {
          type : String,
          require: true
     },
     role: {
          type: Number,
          default: 0
     }

}, {timestamps: true})

const User =  mongoose.model('User', userSchema);

export default User;