import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Contact } from "../models/contactModel";

export const createContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        res.status(400).send("필수값이 입력되지 않았습니다.");
        return;
      }

      const contact = await Contact.create({ name, email, phone });
      res.status(201).json(contact); // 생성된 연락처 반환
    } catch (error) {
      console.error(error);
      res.status(500).send("서버 오류");
    }
  }
);

// app.post("/data", async (req, res) => {
//   const { name, value } = req.body;
//   const data = new DataModel({ name, value });
//   await data.save();
//   res.status(201).send(data);
// });
