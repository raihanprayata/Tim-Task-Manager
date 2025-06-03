import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Register.css"; // pastikan file CSS di-import
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/register",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      alert("Registrasi berhasil");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      alert("Register gagal");
      console.log(error);
    }
  };

  return (
    <div className="body">
      <div className="container-form">
        <h4 className="title">Register</h4>
        <Form className="pt-4" onSubmit={handleSubmit}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Form.Label className="pt-2">Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Label className="pt-2">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <Button className="mt-3" style={{ width: "85%" }} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
