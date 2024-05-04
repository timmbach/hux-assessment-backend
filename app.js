import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// const express = require("express");
// const mongoose = require("mongoose");
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// const auth = require("./middlewares/auth");

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// routes
// app.get("/auth", auth, (req, res) => {
//   return res.status(200).json({ ...req.user._doc });
// });
import authRoute from "./routes/auth.js";
import contactRoute from "./routes/contact.js";
app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);

// server configurations
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
