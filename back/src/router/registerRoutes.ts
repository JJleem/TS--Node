import express from "express";

import { createRegister } from "../controllers/registerController";

const router = express.Router();

router.post("/", createRegister);

export default router;
