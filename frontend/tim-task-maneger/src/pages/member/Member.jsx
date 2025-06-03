import "./Member.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Container, Table, Form, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Member = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const getAllUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/users");
      setUsers(response.data.data);
    } catch (error) {
      console.log("Tidak berhasil diambil.");
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowModal(true);
  };

  const handleUpdateRole = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:3000/api/v1/user/edit-role/${selectedUser.id}`,
        {
          role: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Role berhasil diubah");
      setShowModal(false);
      getAllUser();
    } catch (error) {
      alert("Gagal mengubah role");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const konfirm = window.confirm("Apakah kamu yakin mau menghapus data ini?");
    if (!konfirm) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Data berhasil dihapus");
      getAllUser();
    } catch (error) {
      alert("Data gagal dihapus");
      console.log(error);
    }
  };

  const deatilMember = (id) => {
    navigate(`/detail-member/${id}`);
  };

  return (
    <>
      <Container className="container">
        <div className="nav">
          <div className="nav-left">
            <h2 className="header">Member</h2>
          </div>
        </div>
        <div className="div-table">
          <Table className="table" hover responsive>
            <thead className="thead">
              <tr className="tr-head">
                <td className="head-no">No</td>
                <td className="head-name">Nama</td>
                <td className="head-email">Email</td>
                <td className="head-role">Role</td>
                <td className="head-action">Action</td>
              </tr>
            </thead>
            <tbody className="tbody">
              {users.map((user, index) => (
                <tr className="tr-body" key={user.id}>
                  <td className="body-no">{index + 1}</td>
                  <td className="body-name">{user.username}</td>
                  <td className="body-email">{user.email}</td>
                  <td className="body-role">
                    <span
                      onClick={() => handleShowModal(user)}
                      style={{ cursor: "pointer" }}
                      className={`badge ${
                        user.role === "admin"
                          ? "bg-primary"
                          : user.role === "owner"
                          ? "bg-warning text-white"
                          : user.role === "member"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="body-action">
                    <div className="action-wrapper">
                      <Button
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                        onClick={() => deatilMember(user.id)}
                      >
                        <FaEye />
                      </Button>
                      {/* Tombol edit dihapus karena digantikan klik span */}
                      <Button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-danger d-flex align-items-center justify-content-center"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      <Container className="mt-4">
        <div className="notes">
          <h2 className="header-notes">Notes :</h2>
          <p className="content-notes">
            Halaman Member digunakan untuk mengelola data anggota tim yang
            terlibat dalam proyek. Fitur ini memungkinkan admin atau pengguna
            tertentu untuk melihat, menambahkan, mengedit, atau menghapus
            anggota tim.
          </p>
        </div>
      </Container>

      {/* Modal Edit Role */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ubah Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="member">Member</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleUpdateRole}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Member;
