import express from "express";
import { editContact } from "../controllers/contactController";

const router = express.Router();

router.put("/", editContact);

export default router;
