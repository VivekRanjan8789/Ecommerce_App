import mongoose from "mongoose";
import User from "./userModel.js";

const tweetSchema =new mongoose.Schema({
     tweet: {
        type: String,
        require: true
     },
     name: [{
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    }]
},{timestamps: true})

const Tweet = mongoose.model('Tweet', tweetSchema);


// const newTweet = async () => {
//    try {
//       const user = await User.create({
//          name : "rahul Gandhi000"
//       });
      
//       const tweet = await Tweet.create({
//          tweet: "this is my first tweet",
//          name: user._id
//       });
//       console.log("new tweet created: ", tweet);
      
//       return tweet;
//    } catch (error) {
//       console.log("error while creating user: ", error);
      
//    }
// }

 const getTweet =async () => {
   try {
      const tweet = await Tweet.find();
      console.log("tweet fetched is: ", tweet);
      
      return tweet;
   } catch (error) {
      console.log("error while fetching tweet is: ", error);     
   }
} 


export default {Tweet, getTweet};