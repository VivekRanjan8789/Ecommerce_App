import express from 'express'
import 'dotenv/config';
import cors from 'cors'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
const app = express()
const PORT = process.env.PORT

// connecting mong db
import connectDB from './config/db.js';
import { deleteCategoryController } from './controllers/categoryController.js';


// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
  }));

// routing auth-routes
app.use('/api/v1/auth', authRoutes);

// routing category-routes
app.use('/api/v1/category', categoryRoutes)

//routing product-routes
app.use('/api/v1/product', productRoutes);

app.delete('/api/v1/category', categoryRoutes);

app.listen(PORT, ()=>{
    console.log("serever started running at PORT: ", PORT);
    connectDB();
})






















































// import express from "express";
// const app = express();
// const PORT = process.env.PORT;
// import 'dotenv/config';
// import connectDB from "./config/db.js";
// import bcrypt from 'bcrypt';

// import User from './models/userModel.js'


// const router = express.Router();
// app.use(router);




// //middleware
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json());

// //server config


// // REST API
// // app.get('/', (req,res) => {
// //     res.send("<h1>hello bhai!</h1>");
// // }) 

// // router.get('/getTweet',async (req,res)=>{
// //     const  tweet =await Tweet.getTweet();
// //     console.log("tweet fetched is: ", tweet); 
// //     res.send(`<h1>${tweet}</h1>`);   
// // })


// // get details of customers
// // const getDetails = async () => {
// //     try {
// //         const customer = await customers.findOne({
// //             firstName: "Vivek"
// //          })
// //          console.log("customer is: ", customer);
         
// //          console.log("data fetched customer: ", customer.fullName);
        
// //     } catch (error) {
// //         console.log("error while fetching data of custome is: ", error);
        
// //     }  
// // }

// // getDetails();

// //PORT 

// router.post('/signup', async (req,res) => {
//     console.log("req is: ", req.body);
    
//     const userName = req.body.name;
//     const password = req.body.password;
//     try {
//         const user = await User.create({
//             name: userName,
//             password: password 
//          })
//          res.status(200).send(user)
        
//     } catch (error) {
//         console.log("while inserting data: ", error);
        
//     }
// })

// router.get('/login', async (req, res) => {
//     console.log("query is: ", req.query);
    
//     const userName = req.query.name;
//     const password = req.query.password;
//      try {
//         const user =await User.findOne({
//             name: userName,
//         })
//         console.log("user is: ", user);
        
//         if(!user){
//             res.status(401).json({
//                 data: "not found",
//             });
//         }
//         else{
//             const hashedPassword = user.password;
            
//             const result = await bcrypt.compare(password, hashedPassword)
//             if(result){
//                     res.status(200).json(user)
//                 }
//                 else{
//                     res.status(401).json("password incorrect");
//                 }
//         }
//      } catch (error) {
//         console.log("error while fetching is: ", error);
        
//      }
// })

// app.use('/api', router);

// app.get('/', async (req, res) => {
//      console.log("req in get method is: ", req.body);
//      res.send("hello from get method");

// })



// const Password = '123456'
// const saltRounds = 10
// var hahsedPassword = ''

// const hashPassword = async () => {
//     try {
//        const hashedPassword =  await bcrypt.hash(Password, saltRounds)
//        console.log(hashedPassword);
//        return hashedPassword;
             


//     } catch (error) {
//         console.log("error while hashing plane password is: ", hash);
//     } 
// }

// // hashPassword();
// // const hashedPassword = '$2b$10$ThaI.zrfKITNWXvvwy7/2u6jtAf3eph2QnlodZtSyK0l3a7URbxTG'

// // const isMatched = async () => {
// //     try {
// //         const status = bcrypt.compare(Password, hashedPassword, (err, result) => {
// //             if(err){
// //                 console.log("error while matching password");               
// //             }
// //             else{
// //                 if(result){
// //                     console.log("password matched!");                   
// //                 }
// //                 else console.log("password doesn't match!");
                
// //             }
// //         })
// //     } catch (error) {
// //         console.log("error while matching is: ", error);
        
// //     }
// // }

// // isMatched();


// app.listen(PORT, async ()=> {
//     console.log(`server running in ${process.env.DEV_MODE} mode at  PORT ${PORT}`);
//     await connectDB();

    
// })