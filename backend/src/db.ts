import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not provided in environment");
  }
  await mongoose.connect(MONGODB_URI);
  console.log("✅ MongoDB connected");
}

export async function disconnectDB() {
  await mongoose.disconnect();
  console.log("✅ MongoDB disconnected");
}
