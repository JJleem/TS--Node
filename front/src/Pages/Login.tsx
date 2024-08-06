import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  return (
    <LoginSection>
      <LoginContainer id="site-main">
        <LoginInner className="home-container">
          <h3>로그인</h3>
          <p>로그인이 필요한 서비스입니다.</p>

          <form className="login" method="POST" action="/login">
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="사용자 아이디"
              name="username"
              id="username"
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              id="password"
            />
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
