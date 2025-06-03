import React, { useEffect, useState } from "react";
import "./Home.css";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import {
  FaFolderOpen,
  FaUserFriends,
  FaCheckCircle,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [dataProject, setDataProject] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataTask, setDataTask] = useState([]);

  const [completedProjectIds, setCompletedProjectIds] = useState([]);
  const [inProgressProjectIds, setInProgressProjectIds] = useState([]);

  // Ambil semua project
  const getAllProject = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/project", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataProject(response.data.data);
      console.log("Project data:", response.data.data); // Debug log
    } catch (error) {
      alert("Gagal mengambil data project");
      console.log(error);
    }
  };

  // Ambil semua user
  const getAllUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataUser(response.data.data);
    } catch (error) {
      alert("Gagal mengambil data user");
      console.log(error);
    }
  };

  // Ambil semua task lalu hitung project yang selesai & in progress
  const getAllTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/task", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tasks = response.data.data;
      setDataTask(tasks);
      console.log("Task data:", tasks); // Debug log

      // Hitung project yang selesai dan in progress
      const completed = getProjectCompleted(tasks);
      const inProgress = getProjectInProgress(tasks);

      setCompletedProjectIds(completed);
      setInProgressProjectIds(inProgress);
    } catch (error) {
      alert("Gagal mengambil data task");
      console.log(error);
    }
  };

  // Fungsi untuk menghitung project yang selesai
  const getProjectCompleted = (tasks) => {
    const tasksByProject = {};
    tasks.forEach((task) => {
      if (!tasksByProject[task.projectId]) {
        tasksByProject[task.projectId] = [];
      }
      tasksByProject[task.projectId].push(task.status);
    });

    const completedProjects = Object.entries(tasksByProject)
      .filter(([_, statuses]) => statuses.every((status) => status === "done"))
      .map(([projectId]) => parseInt(projectId));

    return completedProjects;
  };

  // Fungsi untuk menghitung project yang belum selesai
  const getProjectInProgress = (tasks) => {
    const tasksByProject = {};
    tasks.forEach((task) => {
      if (!tasksByProject[task.projectId]) {
        tasksByProject[task.projectId] = [];
      }
      tasksByProject[task.projectId].push(task.status);
    });

    const inProgressProjects = Object.entries(tasksByProject)
      .filter(([_, statuses]) => statuses.some((status) => status !== "done"))
      .map(([projectId]) => parseInt(projectId));

    return inProgressProjects;
  };

  const countTasksByProject = (projectId) => {
    return dataTask.filter((task) => task.projectId === projectId).length;
  };

  const deleteProjectCompleted = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus project ini?"
    );
    if (!confirmDelete) return; // Batalkan jika user tidak yakin

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/project/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Data berhasil dihapus");

      // Refresh data setelah delete
      getAllProject();
      getAllTask();
    } catch (error) {
      alert("Data gagal dihapus");
      console.log(error);
    }
  };

  // Jalankan saat pertama kali
  useEffect(() => {
    getAllProject();
    getAllUser();
    getAllTask();
  }, []);

  return (
    <>
      <Row className="card-border">
        <Col className="card-component">
          <Row className="pt-2">
            <Col md={5} className="col-icon">
              <FaFolderOpen size={45} color="#0d6efd" />
            </Col>
            <Col md={7} className="col-project">
              <h6 style={{ color: "#0d6efd", fontSize: "23px" }}>Project</h6>
              <h5 className="no">{dataProject.length}</h5>
            </Col>
          </Row>
        </Col>

        <Col className="card-component">
          <Row className="pt-2">
            <Col md={5} className="col-icon">
              <FaUserFriends size={45} color="#198754" />
            </Col>
            <Col md={7} className="col-project">
              <h6 style={{ color: "#198754", fontSize: "23px" }}>User</h6>
              <h5 className="no">{dataUser.length}</h5>
            </Col>
          </Row>
        </Col>

        <Col className="card-component">
          <Row>
            <Col md={5} className="col-icon">
              <FaCheckCircle size={45} color="#20c997" />
            </Col>
            <Col md={7} className="col-project">
              <h6 style={{ color: "#20c997" }}>Project Completed</h6>
              <h5 className="no">{completedProjectIds.length}</h5>
            </Col>
          </Row>
        </Col>

        <Col className="card-component">
          <Row>
            <Col md={5} className="col-icon">
              <FaSpinner size={45} color="#ffc107" className="spin-icon" />
            </Col>
            <Col md={7} className="col-project">
              <h6 style={{ color: "#ffc107" }}>Project Inprogress</h6>
              <h5 className="no">{inProgressProjectIds.length}</h5>
            </Col>
          </Row>
        </Col>
      </Row>

      <Container className="container-table">
        <div className="header-table mb-0">
          <h4 className="table-title">Project Completed</h4>
        </div>
        <div>
          <Table className="table" hover responsive>
            <thead>
              <tr>
                <td className="thead-no">No</td>
                <td className="thead-name">Name</td>
                <td className="thead-owner">Owner</td>
                <td className="thead-task">Jumlah Task</td>
                <td className="thead-action">Aksi</td>
              </tr>
            </thead>
            <tbody>
              {dataProject
                .filter((proj) => completedProjectIds.includes(proj.id))
                .map((proj, index) => (
                  <tr key={proj.id}>
                    <td className="tbody-no">{index + 1}</td>
                    <td className="tbody-name">
                      {proj.project_name || proj.name || "N/A"}
                    </td>
                    <td className="tbody-owner">
                      {proj.owner?.username || proj.owner?.name || "N/A"}
                    </td>
                    <td className="tbody-task">
                      {countTasksByProject(proj.id)}
                    </td>
                    <td
                      className="tbody-action"
                      style={{ textAlign: "center" }}
                    >
                      <Button
                        className="btn btn-danger"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => {
                          deleteProjectCompleted(proj.id);
                        }}
                      >
                        <FaTrash className="me-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              {dataProject.filter((proj) =>
                completedProjectIds.includes(proj.id)
              ).length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    Tidak ada project yang selesai
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default Home;
