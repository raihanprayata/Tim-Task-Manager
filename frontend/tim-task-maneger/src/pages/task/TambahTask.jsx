import React, { useEffect, useState } from "react";
import "./TambahTask.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TambahTask = () => {
  const { id } = useParams();

  const [dataUser, setDataUser] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const navigate = useNavigate();

  const getDataUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users`);
      console.log(response.data.data);
      setDataUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:3000/api/v1/task/create`,
        {
          task_name: taskName,
          description,
          status,
          deadline,
          projectId: id,
          assignedTo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/detail-project/${id}`);
    } catch (error) {
      alert("Gagal menambahkan data");
      console.log(error);
    }
  };
  return (
    <>
      <Container className="p-4">
        <div>
          <h3 className="form-title">Tambah Task</h3>
          <p className="form-description">
            Halaman untuk menambahkan task baru.
          </p>
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label>Nama Task</Form.Label>
                <Form.Control
                  type="text"
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Label>Nama User</Form.Label>
                <Form.Select
                  value={assignedTo}
                  onChange={(e) => {
                    setAssignedTo(e.target.value);
                  }}
                >
                  <option value="">Pilih Nama User</option>
                  {dataUser.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="todo"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  value={deadline}
                  onChange={(e) => {
                    setDeadline(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <Row className="p-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Row>
            <div>
              <Button
                className="btn-success"
                onClick={handleSubmit}
                onSubmit={handleSubmit}
              >
                + Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default TambahTask;
