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

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/All" element={<All />} />
      <Route path="/contacts" element={<Contact />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<Add />} />
    </Routes>
  );
};

export default App;
