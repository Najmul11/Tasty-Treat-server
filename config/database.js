import mongoose from "mongoose";
export const connectDb= async()=>{
   try {
    await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    console.log('db connected with localhost');
   } catch (error) {
    console.log(error.message);
   }
}