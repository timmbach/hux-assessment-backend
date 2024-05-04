// pages/api/index.js
import express from "express";
import swagger from "./swagger";

const router = express.Router();
router.use("/swagger", swagger);

export default router;
