import React, { useEffect, useState } from "react";
import { LoginContainer, LoginSection } from "./Login";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Account } from "../App";
import { getUsername } from "../token/Token";
interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
const All = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    alert("로그아웃 되었습니다.");
    navigate("/login");
    // 필요에 따라 리디렉션 처리
  };
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get("http://localhost:5000/data");
      setContacts(response.data);
    };

    fetchContacts();
  }, [id]);

  // 예시 사용
  const username = getUsername();
  console.log(username);
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    contactId: string
  ) => {
    e.preventDefault();

    // Optimistic UI 업데이트: 즉시 상태 업데이트
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact._id !== contactId)
    );

    try {
      await axios.delete(`http://localhost:5000/contacts/${contactId}`);
    } catch (error) {
      // 삭제 요청 실패 시, 삭제한 연락처를 다시 추가
      setContacts((prevContacts) => {
        const deletedContact = prevContacts.find(
          (contact) => contact._id === contactId
        );
        if (deletedContact) {
          return [...prevContacts, deletedContact]; // deletedContact가 undefined가 아닐 때만 추가
        }
        return prevContacts; // 만약 undefined라면 상태를 그대로 유지
      });

      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <LoginSection>
      {isLoggedIn ? (
        <>
          <Log>
            <button onClick={handleLogout}>로그아웃</button>
          </Log>
          <Account>
            {username ? (
              <span>
                {username}
                <p>님 안녕하세요! </p>
              </span>
            ) : null}
          </Account>
        </>
      ) : (
        <Log>
          <Link to="/login">로그인</Link>
        </Log>
      )}
      <LoginContainer id="site-main" style={{ margin: "6em auto 0" }}>
        <Box className="button-box">
          <Link to="/add" className="btn btn-light">
            <i className="fa-solid fa-user-plus"></i>연락처 추가
          </Link>
        </Box>
        {isLoggedIn ? (
          <Table className="table">
            <ul className="head">
              <li>이름</li>
              <li>메일</li>
              <li>전화번호</li>
              <li>&nbsp;</li>
            </ul>
            {contacts.map((contact) => (
              <ul className="ul" key={contact._id}>
                <li>{contact.name}</li>
                <li>{contact.email}</li>
                <li>{contact.phone}</li>
                <li className="fix">
                  <a
                    href={`/edit/${contact._id}`}
                    className="btn update"
                    title="수정"
                  >
                    <i className="fas fa-pencil-alt">수정 </i>
                  </a>
                  <form
                    onSubmit={(e) => handleSubmit(e, contact._id)}
                    style={{ display: "inline" }}
                  >
                    <input
                      type="submit"
                      className="btn delete"
                      title="삭제"
                      value="삭제"
                    />
                  </form>
                </li>
              </ul>
            ))}
          </Table>
        ) : (
          <div>로그인 해주세요</div>
        )}
      </LoginContainer>
    </LoginSection>
  );
};

export default All;

const Table = styled.table`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid gray;
    padding: 12px 0px;
    li {
      display: flex;

      width: 100%;
      justify-content: center;
    }
  }
  .ul {
    display: flex;
    padding: 12px 0px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid gray;
    li {
      display: flex;

      width: 100%;
      justify-content: center;
      gap: 12px;
    }
    .fix {
    }
  }
`;
const Box = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  a {
    color: blue;
    font-weight: 700;
  }
`;
export const Log = styled.div`
  position: absolute;
  color: black;
  border: 1px solid #000;
  padding: 12px;
  box-shadow: 0px 0px 1px #000;
  button {
    color: black;
    border: none;
    background: transparent;
    font-size: 20px;
    font-weight: 700;
  }
  top: 48px;
  right: 48px;
`;
