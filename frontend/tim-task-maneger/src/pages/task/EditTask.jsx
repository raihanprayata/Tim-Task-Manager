import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const EditTask = () => {
  const { projectId, taskId } = useParams();

  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const getDataUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users`);
      setDataUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUser();
    getTaskById();
  }, []);

  const getTaskById = async () => {
    try {
      console.log(`
        projectId: ${projectId}
        taskId : ${taskId}`);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/task/id/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setAssignedTo(data.assignedTo);
      setStatus(data.status);
      setTaskName(data.task_name);
      setDeadline(data.deadline.substring(0, 10));
      setDescription(data.description);
      console.log(data.assignedTo, data.status, data.task_name, data.deadline);
    } catch (error) {
      alert("gagal mengambil data");
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ← TAMBAHKAN INI
    const token = localStorage.getItem("token");

    const formData = {
      task_name: taskName,
      assignedTo,
      status,
      description,
      deadline,
      projectId: projectId,
    };
    try {
      await axios.put(
        `http://localhost:3000/api/v1/task/edit/${taskId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("data berhasil diubah");
      navigate(`/detail-project/${projectId}`);
    } catch (error) {
      alert("Gagal mengubah data");
      console.log(error);
    }
  };

  return (
    <>
      <Container className="p-4">
        <div>
          <h3 className="form-title">Edit Task</h3>
          <p className="form-description">
            Halaman untuk mengubah data task, sesuai yang diinginkan.
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
              <Button className="btn-success" onClick={handleSubmit}>
                + Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};
