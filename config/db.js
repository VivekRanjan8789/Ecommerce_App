import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
      try {                       
        const conn = await mongoose.connect(process.env.MONGO_URL);
         console.log(`mongodb connected ${conn}`);       
      } catch (error) {
         console.log(`error while connecting db is ${error}`);         
      }
}


const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
})


export default connectDB;