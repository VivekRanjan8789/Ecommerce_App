import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const SALT_ROUND = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        return hashedPassword;
    } catch (error) {
        console.log("error while hashing password is: ", error);       
    }
    
}

export const verifyPassword = async (password, hashedPassword) => {
      try {
         const response =await bcrypt.compare(password, hashedPassword);
         if(!response){
            console.log("password incorrect!");           
         }
         else{
            console.log("welcome");
            
         }
         return response;
      } catch (error) {
        console.log("error while password matching: ", error);
        
      }
}


