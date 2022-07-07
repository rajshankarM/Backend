import express from "express";
import { MongoClient } from "mongodb";
import { PersonRouter } from "./routes/person.js";
import dotenv from "dotenv";
import cors from "cors";

const router = express.Router();
dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Connection Successfully...");
  return client;
}

export const client = await createConnection();

app.get("/", (request, response) => {
  response.send("Hello everyone");
});

app.use("/users", PersonRouter);

app.listen(PORT, () => console.log("App is running in", PORT));
