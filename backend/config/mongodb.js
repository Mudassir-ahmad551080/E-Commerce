import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Optional: stop app if connection fails
  }

  // Optional event listeners for better debugging
  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔄 MongoDB reconnected");
  });
};

export default connectDB;
