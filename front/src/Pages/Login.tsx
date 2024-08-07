import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useHistory 훅 사용

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 이벤트 방지

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      const { token, name } = response.data; // 토큰과 username 받아오기
      localStorage.setItem("token", token); // 토큰 저장
      console.log("로그인 성공:", name); // 로그인한 사용자 이름 출력
      console.log("로그인 성공:", name); // 로그인한 사용자 이름 출력

      navigate("/all"); // 홈으로 리디렉션
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.message || "로그인 실패. 다시 시도해주세요."
        ); // 서버에서 보낸 에러 메시지 설정
      } else {
        setError("서버 오류가 발생했습니다."); // 일반적인 오류 처리
      }
    }
  };

  return (
    <LoginSection>
      <LoginContainer id="site-main">
        <LoginInner className="home-container">
          <h3>로그인</h3>
          <p>로그인이 필요한 서비스입니다.</p>

          <form className="login" onSubmit={handleSubmit}>
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="사용자 아이디"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // 입력 값 업데이트
              required // 필수 입력 필드
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 입력 값 업데이트
              required // 필수 입력 필드
            />
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* 오류 메시지 표시 */}
            <Button>
              <button type="submit">로그인</button>
              <Link to="/register">회원가입</Link>
            </Button>
          </form>
        </LoginInner>
      </LoginContainer>
    </LoginSection>
  );
};

export default Login;

export const LoginSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

  align-items: center;
`;
export const LoginContainer = styled.main`
  position: relative;
  width: 50%;
  box-shadow: 0px 0px 5px #000;
  padding: 48px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .button-box {
    display: flex;
    justify-content: flex-end;
  }
  .button-box > a {
    font-size: 1em;
    padding: 0.5em 1em;
  }

  .button-box i {
    margin-right: 0.5em;
  }
`;
export const LoginInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 24px;
    label {
      font-size: 24px;
    }
    input {
      width: 300px;
      padding: 12px 12px;
      font-size: 24px;
    }
  }
`;
const Button = styled.div`
  display: flex;
  font-size: 18px;
  gap: 36px;
  button {
    border: none;
    background-color: transparent;
    color: black;
    font-size: 18px;
    border: 1px solid #000;
    padding: 6px 12px;
    transition: all 0.3s;
    &:hover {
      color: #fff;
      background: #000;
    }
  }
  a {
    font-size: 18px;
    border: 1px solid #000;
    padding: 6px 12px;
    transition: all 0.3s;

    &:hover {
      color: #fff;
      background: #000;
    }
  }
`;
