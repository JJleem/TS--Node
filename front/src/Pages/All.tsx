import React, { useEffect, useState } from "react";
import { LoginContainer, LoginSection } from "./Login";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
const All = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get("http://localhost:5000/data");
      setContacts(response.data);
    };

    fetchContacts();
  }, []);
  console.log(contacts);
  return (
    <LoginSection>
      <LoginContainer id="site-main" style={{ margin: "6em auto 0" }}>
        <Box className="button-box">
          <Link to="/add" className="btn btn-light">
            <i className="fa-solid fa-user-plus"></i>연락처 추가
          </Link>
        </Box>
        <Table className="table">
          <ul className="head">
            <li>이름</li>
            <li>메일</li>
            <li>주소</li>
            <li>&nbsp;</li>
          </ul>
          {contacts.map((contact) => (
            <ul className="ul" key={contact._id}>
              <li>{contact.name}</li>
              <li>{contact.email}</li>
              <li>{contact.phone}</li>
              <li className="fix">
                <a
                  href={`/contacts/${contact._id}`}
                  className="btn update"
                  title="수정"
                >
                  <i className="fas fa-pencil-alt">수정 </i>
                </a>
                <form
                  method="post"
                  action="/contacts/<%= contact._id %>?_method=DELETE"
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
