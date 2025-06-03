import React, { useEffect, useState } from "react";
import "./EditProject.css";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProject = () => {
  const { projectId, ownerId } = useParams();
  const [project_name, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const getdata = async () => {
    try {
      const role = localStorage.getItem("role");
      const token = localStorage.getItem("token");

      if (role !== "owner" && role !== "admin") {
        return alert(
          "Selain owner dan admin tidak diizinkan mengubah data project"
        );
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setProjectName(data.project_name);
      setDescription(data.description);
    } catch (error) {
      console.log(error);
      alert("Gagal mengambil data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`
      projectId : ${projectId}
      ownerId: ${ownerId}`);

    const data = {
      ownerId,
      project_name,
      description,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/v1/project/edit/${projectId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Data berhasil diubah");
      navigate("/project");
    } catch (error) {
      console.error("Error", error);
      alert("Gagal mengubah data");
    }
  };
  return (
    <Container className="p-4">
      <div>
        <h4 className="title-form">Edit Project</h4>
        <p>Form untuk mengubah data object.</p>
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

export default EditProject;
