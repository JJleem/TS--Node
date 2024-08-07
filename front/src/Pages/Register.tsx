import { LoginContainer, LoginSection } from "./Login";
import styled from "styled-components";
import React, { useState } from "react";
import axios, { AxiosError } from "axios"; // Axios를 사용하기 위해 import
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 이벤트 방지

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password1,
        password2,
      });
      alert("회원가입에 성공하셨습니다.");
      navigate("/login");
      // 등록 성공 후의 처리 (예: 리다이렉션, 성공 메시지 등)
    } catch (error) {
      const axiosError = error as AxiosError; // error를 AxiosError로 캐스팅
      if (axiosError.response) {
        const errorMessage =
          typeof axiosError.response.data === "string"
            ? axiosError.response.data
            : "알 수 없는 오류가 발생했습니다.";
        setError(errorMessage); // 서버에서 보낸 에러 메시지 설정
      } else {
        setError("서버 오류가 발생했습니다."); // 일반적인 오류 처리
      }
    }
  };
  return (
    <LoginSection>
      <LoginContainer id="site-main">
        <h3>사용자 등록</h3>
        <RegisterForm className="register" onSubmit={handleSubmit}>
          <label htmlFor="username">
            <b>아이디</b>
          </label>
          <input
            type="text"
            placeholder="아이디"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 입력 값 업데이트
          />
          <label htmlFor="password">
            <b>비밀번호</b>
          </label>
          <input
            type="password"
            placeholder="비밀번호"
            name="password1"
            id="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)} // 입력 값 업데이트
          />
          <label htmlFor="password2">
            <b>비밀번호 확인</b>
          </label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            name="password2"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)} // 입력 값 업데이트
          />
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* 오류 메시지 표시 */}
          <input type="submit" value="등록" className="register-btn" />
        </RegisterForm>
      </LoginContainer>
    </LoginSection>
  );
};

export default Register;

const RegisterForm = styled.form`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  input {
    width: 300px;
    padding: 12px;
  }
  .register-btn {
    background-color: transparent;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #fff;
      background: #000;
    }
  }
`;
