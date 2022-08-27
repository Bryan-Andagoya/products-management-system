import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { productsRouter } from "./src/routes";
import mongoose from "mongoose";
import morgan from "morgan";
import { errorHandlerMiddleware, notFoundMiddleware } from "./src/middlewares";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("PING");
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
