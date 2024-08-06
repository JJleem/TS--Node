import React from "react";
import { LoginContainer, LoginSection } from "./Login";
import styled from "styled-components";

const Register = () => {
  return (
    <LoginSection>
      <LoginContainer id="site-main">
        <h3>사용자 등록</h3>
        <RegisterForm className="register">
          <label htmlFor="username">
            <b>아이디</b>
          </label>
          <input
            type="text"
            placeholder="아이디"
            name="username"
            id="username"
          />
          <label htmlFor="password">
            <b>비밀번호</b>
          </label>
          <input
            type="password"
            placeholder="비밀번호"
            name="password1"
            id="password"
          />
          <label htmlFor="password2">
            <b>비밀번호 확인</b>
          </label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            name="password2"
            id="password2"
          />
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
