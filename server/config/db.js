import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //process.env.MONGO_URI means: the database link is stored in the .env file (so it is secret).
    const conn = await mongoose.connect(process.env.MONGO_URI);
    //conn stores details about the connection.
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    //This stops the entire Node server.
    process.exit(1);
  }
};

export default connectDB;
