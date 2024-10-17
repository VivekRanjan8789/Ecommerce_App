import express from 'express'
const app = express();
const adminRouter = express.Router();
const clientRouter = express.Router();
import 'dotenv/config';
import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT;

// global middleware app.use()

// app.use((req,res,next)=>{
//     console.log("hii bro from global middleware");
//     console.log("from global middleware");
//     next();
// });

// // global routing app.METHODS()
// app.get('/user', (req,res)=>{
//     res.send("welcome!");
// })

// // middleware with space routing
// // later on we will have to connect it with routes for correctly work
// adminRouter.use('/admin',(req, res, next) => {
//     console.log("this is admin middleware");   
//     next();
// });


// // routing methods
// adminRouter.get('/admin', function (req, res) {
//     console.log("this is adminget get request");
//     res.send("Admin GET request response");
// });

// app.use('/admin', adminRouter);

app.use(express.static(path.join(__dirname , 'public')));

app.get('/', (req,res)=>{
    res.send("hello world");
})

app.listen(PORT, ()=>{
    console.log("server started at ", PORT);
    
});