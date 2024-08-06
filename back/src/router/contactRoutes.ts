import express from "express";
import { createContact, editContact } from "../controllers/contactController";

const router = express.Router();
router.route("/").post(createContact);

export default router;
