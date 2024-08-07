import React, { useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Edit from "./Pages/Edit";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Add from "./Pages/Add";
import All from "./Pages/All";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/All" element={<All />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </>
  );
};

export default App;

export const Account = styled.div`
  position: absolute;
  top: 48px;
  left: 48px;
  span {
    display: flex;
    gap: 6px;
    font-weight: 700;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    p {
      font-weight: 500;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
