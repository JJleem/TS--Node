import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Home = () => {
  return (
    <HomeContainer>
      <Link to="/login">로그인 해주세요</Link>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    color: inherit;
    font-size: 50px;
    font-weight: 900;
    transition: all 0.5s;
    &:hover {
      color: skyblue;
    }
  }
`;
