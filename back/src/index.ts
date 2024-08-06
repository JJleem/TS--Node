import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import contactRouter from "./router/contactRoutes";
import { Contact } from "./models/contactModel";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
dotenv.config();
// MongoDB 연결
mongoose
  .connect(process.env.DB_CONNECT || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// 데이터 추가 라우트
app.use("/add", contactRouter);

app.post("/data", async (req, res) => {
  const { name, email, phone } = req.body;
  const data = new Contact({ name, email, phone });
  await data.save();
  res.status(201).send(data);
});
// 데이터 업데이트 라우트
// app.put("/data/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, value } = req.body;

//   try {
//     const updatedData = await DataModel.findByIdAndUpdate(
//       id,
//       { name, value },
//       { new: true, runValidators: true }
//     );
//     if (!updatedData) {
//       return res.status(404).send({ message: "Data not found" });
//     }
//     res.send(updatedData);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// React 앱의 정적 파일 제공
app.use(express.static(path.join(__dirname, "../../front/build")));

// 모든 경로에 대해 React 앱의 index.html을 반환
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../front/build", "index.html"));
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
