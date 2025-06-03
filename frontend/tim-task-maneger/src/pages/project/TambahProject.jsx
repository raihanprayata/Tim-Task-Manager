import React, { useState } from "react";
import "./TambahProject.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahProject = () => {
  const navigate = useNavigate();
  const [project_name, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const ownerId = localStorage.getItem("userId");
      const newProject = await axios.post(
        `http://localhost:3000/api/v1/project`,
        {
          project_name: project_name,
          description: description,
          ownerId: ownerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Data berhasil ditambahkan");
      setProjectName("");
      setDescription("");
      navigate("/project");
    } catch (error) {
      alert("Data gagal ditambahkan");
      console.log(error);
    }
  };
  return (
    <Container className="p-4">
      <div>
        <h4 className="title-form">Tambah Project</h4>
        <p>Form untuk menambahkan project baru.</p>
      </div>
      <div>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Label className="label-name">Nama Project</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={project_name}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
          <Form.Label className="label-description">
            Deskripsi Project
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="name"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <div className="border-button">
            <Button
              className="btn-success mt-4"
              style={{ fontWeight: "bold" }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default TambahProject;
