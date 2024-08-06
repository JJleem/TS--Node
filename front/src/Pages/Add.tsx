import axios from "axios";
import React, { useState } from "react";
import { LoginContainer, LoginInner, LoginSection } from "./Login";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로 고침 방지
    if (name && email && phone) {
      try {
        await axios.post("http://localhost:5000/add", { name, email, phone });
        setName("");
        setEmail("");
        setPhone("");
        alert("회원가입에 성공하셨습니다!");
        navigate("/all");
      } catch (error) {
        console.error("Error adding data:", error);
        alert("회원가입에 실패하였습니다.");
      }
    } else {
      alert("모든 필드를 입력하세요."); // 모든 필드가 입력되지 않았을 때 경고
    }
  };

  return (
    <LoginSection>
      <LoginContainer>
        <BtBox className="button-box">
          <Link to="/all" className="btn btn-light">
            <i className="fa-solid fa-list"></i>연락처 목록
          </Link>
        </BtBox>
        <LoginInner>
          <h1>Add Data</h1>
          <form onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="name" className="col-form-label">
                이름(Full Name)
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="email" className="col-form-label">
                메일 주소(E-mail)
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hong@abc.def"
                />
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="phone" className="col-form-label">
                전화번호(Mobile)
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  placeholder="123-4567-8901"
                />
              </div>
            </div>
            <Btn type="submit">저장하기</Btn>
            {/* <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              placeholder="Value"
              required
            />
            <button type="submit">Submit</button> */}
          </form>
        </LoginInner>
      </LoginContainer>
    </LoginSection>
  );
};

export default Add;

export const Btn = styled.button`
  border: 1px solid #000;
  background: transparent;
  color: black;
  padding: 12px 24px;
  font-size: 20px;
`;
export const BtBox = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
`;
