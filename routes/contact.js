// const { validateContact } = require("../models/Contact");

import { verifyToken } from "../utils/verifyUser.js";
import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

// router.post("/contact", async (req, res) => {
//   const { error } = validateContact(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/create", verifyToken, createContact);
router.delete("/delete/:id", verifyToken, deleteContact);
router.post("/update/:id", verifyToken, updateContact);
router.get("/get/:id", getContact);
router.get("/get", getAllContacts);

export default router;
