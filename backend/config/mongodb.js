import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Mongo Error:", error);
    }
};

export default connectDB;
