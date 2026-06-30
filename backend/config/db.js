import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod = null;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // Check if we should fall back to Mongo Memory Server
    if (!mongoUri || mongoUri.includes("127.0.0.1") || mongoUri.includes("localhost")) {
      try {
        console.log("Initializing local in-memory MongoDB instance with 60s timeout...");
        mongod = await MongoMemoryServer.create({
          instance: {
            startupTimeout: 60000
          }
        });
        mongoUri = mongod.getUri();
        console.log(`Local in-memory MongoDB running at: ${mongoUri}`);
      } catch (memErr) {
        console.warn("In-memory MongoDB init failed, trying direct connection:", memErr.message);
      }
    }

    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;