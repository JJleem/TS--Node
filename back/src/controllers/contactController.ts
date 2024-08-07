import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Contact } from "../models/contactModel";

import jwt from "jsonwebtoken";
import express from "express";

export const getContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return; // 명시적으로 void 반환
    }
    res.status(200).json(contact);
  }
);

export const createContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, phone } = req.body;
      if (!name || !email || !phone) {
        res.status(400).send("필수값이 입력되지 않았습니다.");
        return; // 추가
      }

      const contact = await Contact.create({
        name,
        email,
        phone,
      });

      res.status(201).json(contact); // 생성된 연락처 반환
    } catch (error) {
      console.error(error);
      res.status(500).send("서버 오류");
    }
  }
);

export const editContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // MongoDB에서 연락처 업데이트
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true } // 수정된 데이터를 반환
    );

    // 업데이트된 연락처가 없을 경우 404 응답
    if (!updatedContact) {
      res.status(404).json({ message: "Contact not found" });
      return; // 여기서 반환하여 함수 종료
    }

    // 성공적으로 업데이트된 연락처 반환
    res.status(200).json(updatedContact);
  }
);
// app.post("/data", async (req, res) => {
//   const { name, value } = req.body;
//   const data = new DataModel({ name, value });
//   await data.save();
//   res.status(201).send(data);
// });
export const deleteContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).send("Contact not found");
    }
    await Contact.deleteOne({ _id: req.params.id });

    res.redirect("/contacts");
    return; // 명시적으로 void를 반환
  }
);
