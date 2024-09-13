import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import { userRouter, gameRouter } from "./index.js";
dotenv.config({
  path: "./.env",
});

const app = express();
const corsOptions = {
  origin: [
    process.env.CORS_ORIGIN_LOCAL || "http://localhost:5173",
    process.env.CORS_ORIGIN_PROD,
  ],
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  maxAge: 16070400,
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", userRouter, gameRouter);
export default app