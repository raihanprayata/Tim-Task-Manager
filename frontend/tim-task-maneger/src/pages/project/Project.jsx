import "./Project.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Container, Table, Form, Button, CardFooter } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Project = () => {
  const navigate = useNavigate();
  const [listProject, setListProject] = useState([]);

  const getData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/api/v1/project", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setListProject(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      alert("Gagal mengambil data");
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tambahProject = async () => {
    const role = localStorage.getItem("role");

    if (role !== "owner" && role !== "admin") {
      return alert("Selain owner dan admin tidak dizinkan membuat project!");
    }

    navigate("/tambah-project");
  };

  const detailProject = async (id) => {
    try {
      navigate(`/detail-project/${id}`);
    } catch (error) {
      alert("gagal mengambil data");
      console.log(error);
    }
  };

  const editProject = async (id, ownerId) => {
    try {
      navigate(`/edit-project/${id}/${ownerId}`);
    } catch (error) {
      alert("gagal pindah halaman");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/v1/project/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Data berhasil dihapus");
      getData();
    } catch (error) {
      alert("gagal menghapus data");
      console.log(error);
    }
  };
  return (
    <>
      <Container className="container">
        <div className="nav">
          <div className="nav-left">
            <h2 className="header">Project</h2>
          </div>
          <div className="nav-right">
            <Button
              className="btn-plus btn-success"
              onClick={() => {
                tambahProject();
              }}
            >
              <FaPlus /> Tambah
            </Button>
          </div>
        </div>
        <div className="div-table">
          <Table className="table" hover responsive>
            <thead className="thead">
              <tr className="tr-head">
                <td className="head-no">No</td>
                <td className="head-name">Nama</td>
                <td className="head-owner">Owner</td>
                <td className="head-action">Action</td>
              </tr>
            </thead>
            <tbody className="tbody">
              {listProject.map((project, index) => (
                <tr className="tr-body" key={project.id}>
                  <td className="body-no">{index + 1}</td>
                  <td className="body-name">{project.project_name}</td>
                  <td className="body-owner">{project.owner.username}</td>
                  <td className="body-action">
                    <div className="action-wrapper">
                      <Button
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                        onClick={() => {
                          detailProject(project.id);
                        }}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        className="btn btn-warning d-flex align-items-center justify-content-center"
                        onClick={() => {
                          editProject(project.id, project.owner.id);
                        }}
                      >
                        <FaEdit color="white" />
                      </Button>
                      <Button
                        className="btn btn-danger d-flex align-items-center justify-content-center"
                        onClick={() => {
                          handleDelete(project.id);
                        }}
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
            Halaman Project digunakan untuk mengelola daftar proyek atau tugas
            besar yang sedang dikerjakan oleh tim. Setiap proyek berisi
            informasi seperti nama proyek, pemilik (owner), serta tindakan yang
            dapat dilakukan terhadap proyek tersebut.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Project;
