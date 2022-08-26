import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { productsRouter } from "./src/routes";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("PING");
});

app.use("/api/v1/products", productsRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
