import axios from "axios";
import React, { useState } from "react";
import { LoginContainer, LoginInner, LoginSection } from "./Login";
import { BtBox, Btn } from "./Add";
import { Link } from "react-router-dom";

const Edit = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number | "">("");
  const [id, setId] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id && name && value) {
      const response = await axios.put(`http://localhost:5000/data/${id}`, {
        name,
        value,
      });
      alert("Data updated successfully: " + JSON.stringify(response.data));
      setId("");
      setName("");
      setValue("");
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
          <h1>Update Data</h1>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Data ID"
              required
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New Name"
              required
            />
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              placeholder="New Value"
              required
            />
            <Btn type="submit">Update</Btn>
          </form>
        </LoginInner>
      </LoginContainer>
    </LoginSection>
  );
};

export default Edit;
