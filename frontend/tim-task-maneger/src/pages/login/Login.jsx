import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // pastikan CSS ini ada

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login", // Pastikan sesuai dengan backend kamu
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      const id = response.data.data.id;
      localStorage.setItem("userId", id); // <-- PENTING: ini yang dibutuhkan di /profile
      localStorage.setItem("role", response.data.data.role); // <== tambahkan ini
      localStorage.setItem("token", token); // Simpan token di localStorage

      alert("Login berhasil");

      // Reset input
      setUsername("");
      setEmail("");
      setPassword("");

      // Redirect ke halaman lain (ubah sesuai kebutuhan)
      navigate("/dashboard");
    } catch (error) {
      alert("Login gagal. Pastikan data benar.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="body">
      <div className="container-form">
        <h4 className="title">Login</h4>
        <Form className="pt-4" onSubmit={handleSubmit}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Label className="pt-2">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Label className="pt-2">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

export default Login;
