import mongoose from "mongoose";

const connectDB = async () =>{

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`).then(()=>{
        console.log("MongoDB connected")
    }).catch((err)=>{
        console.log("Error: ",err)
    })
}

export default connectDB;