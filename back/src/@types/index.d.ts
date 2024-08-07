import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // 또는 user의 ID 타입에 맞게 수정
      };
    }
  }
}
