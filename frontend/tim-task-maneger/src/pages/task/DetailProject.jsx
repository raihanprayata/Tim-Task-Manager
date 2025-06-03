import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table, Card, Modal } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./DetailProject.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailProject = () => {
  const [detailProject, setDetailProject] = useState(null);
  const [dataMember, setDataMember] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // === State untuk Modal Ubah Status ===
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const getDetailProject = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDetailProject(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      alert("Gagal mengambil data");
      console.log(error);
    }
  };

  const getDataMember = async () => {
    try {
      console.log(id);

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/task/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataMember(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailProject();
    getDataMember();
  }, [id]);

  const tambahTask = () => {
    navigate(`/tambah-task/${id}`);
  };

  const editTask = (taskId) => {
    navigate(`/edit-task/${id}/${taskId}`);
  };

  const deleteTask = async (taskId) => {
    try {
      console.log(taskId);

      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/task/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Data berhasil dihapus");
      getDataMember();
    } catch (error) {
      alert("Gagal menghapus data");
      console.log(error);
    }
  };

  // === Menampilkan Modal Ubah Status ===
  const handleShowStatusModal = (task) => {
    setSelectedTask(task);
    setNewStatus(task.status);
    setShowStatusModal(true);
  };

  // === Update Status Task ke Backend ===
  const handleUpdateStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/v1/task/edit/${selectedTask.id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowStatusModal(false);
      getDataMember(); // refresh data task setelah diubah
    } catch (error) {
      console.log(error);
      alert("Gagal mengubah status task");
    }
  };

  // === Fungsi format label status ===
  const formatStatusLabel = (status) => {
    switch (status) {
      case "todo":
        return "Todo";
      case "in_progress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  return (
    <>
      <Container>
        <Card.Body>
          <h4 className="project-title">
            {detailProject ? detailProject.project_name : "Loading..."}
          </h4>
          <h5 className="project-owner">
            Owner: {detailProject?.owner?.username || "Loading..."}
          </h5>
          <p className="project-desc">
            {detailProject ? detailProject.description : "Loading..."}
          </p>
        </Card.Body>
      </Container>

      <Container className="container-table">
        <div className="header-table">
          <div>
            <h4>Member Project</h4>
          </div>
          <div className="button">
            <Button
              className="btn-success"
              style={{ width: "150px", marginLeft: "10px" }}
              onClick={tambahTask}
            >
              + Tambah Task
            </Button>
          </div>
        </div>

        <Table>
          <thead>
            <tr>
              <td className="th-no">No</td>
              <td className="th-name">Name</td>
              <td className="th-task">Task</td>
              <td className="th-status">Status</td>
              <td className="th-deadline">Deadline</td>
              <td className="th-action">Aksi</td>
            </tr>
          </thead>
          <tbody>
            {/* Contoh data static sementara */}
            {dataMember.map((member, index) => (
              <tr key={index}>
                <td className="tb-no">{index + 1}</td>
                <td className="tb-name">{member.assignee.username}</td>
                <td className="tb-task">{member.task_name}</td>
                <td className="tb-status">
                  {/* === Badge status bisa diklik untuk ubah status === */}
                  <span
                    onClick={() => handleShowStatusModal(member)}
                    style={{ cursor: "pointer" }}
                    className={`badge ${
                      member.status === "todo"
                        ? "bg-primary"
                        : member.status === "in_progress"
                        ? "bg-warning text-white"
                        : member.status === "done"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {formatStatusLabel(member.status)}
                  </span>
                </td>
                <td
                  className="tb-deadline"
                  style={{
                    color:
                      new Date(member.deadline) < new Date()
                        ? "red"
                        : "inherit",
                  }}
                >
                  {new Date(member.deadline).toLocaleDateString("id-ID")}
                </td>

                <td className="tb-action">
                  <Button
                    className="btn btn-warning d-flex align-items-center justify-content-center"
                    onClick={() => {
                      editTask(member.id);
                    }}
                  >
                    <FaEdit color="white" />
                  </Button>
                  <Button
                    className="btn btn-danger mx-2 d-flex align-items-center justify-content-center"
                    onClick={() => {
                      deleteTask(member.id);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* === Modal untuk Ubah Status Task === */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Status Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailProject;
