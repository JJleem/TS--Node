import express from "express";

import { login } from "../controllers/registerController";

const router = express.Router();

router.post("/", login);

export default router;
