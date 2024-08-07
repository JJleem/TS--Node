import express from "express";
import {
  createContact,
  deleteContact,
  editContact,
} from "../controllers/contactController";

const router = express.Router();
router.route("/").post(createContact);

export default router;
