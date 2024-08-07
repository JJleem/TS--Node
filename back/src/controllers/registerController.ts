import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Register } from "../models/registerModel";
import jwt from "jsonwebtoken";

export const createRegister = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password1, password2 } = req.body;

      // 필수값 확인
      if (!username || !password1 || !password2) {
        res.status(400).send("필수값이 입력되지 않았습니다.");
        return; // 여기에 return 추가
      }

      // 비밀번호 일치 확인
      if (password1 !== password2) {
        res.status(400).send("비밀번호가 일치하지 않습니다.");
        return; // 여기에 return 추가
      }

      // 비밀번호 강도 검증 (예시: 최소 8자 이상)
      if (password1.length < 8) {
        res.status(400).send("비밀번호는 최소 8자 이상이어야 합니다.");
        return; // 여기에 return 추가
      }

      // 사용자 중복 확인
      const existingUser = await Register.findOne({ username });
      if (existingUser) {
        res.status(400).send("이미 사용 중인 사용자 이름입니다.");
        return; // 여기에 return 추가
      }

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password1, 10);

      // 사용자 등록
      const register = await Register.create({
        username,
        password: hashedPassword,
      });

      res.status(201).json(register); // 생성된 사용자 정보 반환
      return; // 여기에 return 추가
    } catch (error) {
      console.error(error);
      res.status(500).send("서버 오류");
      return; // 여기에 return 추가
    }
  }
);

// export const login = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const { username, password } = req.body;

//     // 필수값 확인
//     if (!username || !password) {
//       res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
//       return; // 여기에 return 추가
//     }

//     // 사용자 찾기
//     const user = await Register.findOne({ username });
//     if (!user) {
//       res
//         .status(401)
//         .json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
//       return; // 여기에 return 추가
//     }

//     // 비밀번호 확인
//     try {
//       const isMatch = await bcrypt.compare(password, user.password); // 해시된 비밀번호와 비교
//       if (!isMatch) {
//         res
//           .status(401)
//           .json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
//         return; // 여기에 return 추가
//       }
//       const token = jwt.sign(
//         { id: user._id, name: user.username }, // 사용자 ID와 username 포함
//         "1111", // 비밀 키
//         { expiresIn: "1h" } // 만료 시간
//       );

//       res.json({ token, name: user.username }); // 토큰과 username을 클라이언트에 반환
//       // res.redirect("/"); // 홈 페이지로 리디렉션
//       return; // 여기에 return 추가
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "서버 오류가 발생했습니다." });
//       return; // 여기에 return 추가
//     }
//   }
// );
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    // 필수값 확인
    if (!username || !password) {
      res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
      return; // 추가
    }

    // 사용자 찾기
    const user = await Register.findOne({ username });
    if (!user) {
      res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
      return; // 추가
    }

    // 비밀번호 확인
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res
          .status(401)
          .json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
        return; // 추가
      }

      const token = jwt.sign(
        { id: user._id, name: user.username },
        "1111", // 비밀 키
        { expiresIn: "1h" } // 만료 시간
      );

      res.json({ token, name: user.username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  }
);
