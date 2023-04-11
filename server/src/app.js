import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const { MONGO_USERNAME, MONGO_PASSWORD, PORT } = process.env;

mongoose.connect(
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@todo-cluster.d0ocp6y.mongodb.net/?retryWrites=true&w=majority`
);

app.listen(PORT || 8000, () => console.log(`Server started, port ${PORT}.`));
