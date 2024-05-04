import express from "express";

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const bcryptjs = require("bcryptjs");
// const { errorHandler } = require("../utils/error");

import { userAuth } from "../middlewares/auth.js";
import {
  google,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.get("/logout", logout);

router.get("/me", userAuth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

export default router;
