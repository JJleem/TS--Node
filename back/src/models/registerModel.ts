import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // 데이터 추가 수정 될때 시간 함께 기록됨
  }
);

export const Contact = mongoose.model("Register", registerSchema);
