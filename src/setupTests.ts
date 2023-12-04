import "dotenv/config";
import "./server/index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "./database/index.js";
import mongoose from "mongoose";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});
