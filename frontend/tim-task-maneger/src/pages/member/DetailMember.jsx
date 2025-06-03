import React, { useEffect, useState } from "react";
import "./DetailMember.css";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailMember = () => {
  const { id } = useParams();
  const [dataMember, setDataMember] = useState([]);
  const [dataProjectTask, setProjectTask] = useState([]);

  const getDataMember = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDataMember(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      alert("Gagal mengambil data");
      console.log(error);
    }
  };

  const getProjectTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/v1/task/member/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjectTask(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      alert("Gagal mengambil data");
      console.log(error);
    }
  };

  useEffect(() => {
    getDataMember();
    getProjectTask();
  }, []);

  return (
    <>
      <Container>
        <div className="data-member">
          <h4 className="title-1">Data User</h4>
        </div>
        <Table className="table-1">
          <thead>
            <tr>
              <td className="th-name-1">Name</td>
              <td className="th-email-1">Email</td>
              <td className="th-role-1">Role</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tb-name-1">{dataMember.username}</td>
              <td className="tb-email-1">{dataMember.email}</td>
              <td className="tb-role-1">
                <span
                  className={`badge ${
                    dataMember.role === "admin"
                      ? "bg-primary"
                      : dataMember.role === "owner"
                      ? "bg-warning text-white"
                      : dataMember.role === "member"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {dataMember.role}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <Container>
        <div className="data-task">
          <h4 className="title-2">Data Project & Task</h4>
        </div>
        <Table>
          <thead>
            <tr>
              <td className="th-project-name-2">Project Name</td>
              <td className="th-task-name-2">Task Name</td>
              <td className="th-deadline-2">Deadline</td>
              <td className="th-status-2">Status</td>
            </tr>
          </thead>
          <tbody>
            {dataProjectTask.map((data) => (
              <tr key={data.id}>
                <td className="tb-project-name-2">
                  {data.project.project_name}
                </td>
                <td className="tb-task-name-2">{data.project.project_name}</td>
                <td
                  className="tb-deadline-2"
                  style={{
                    color:
                      new Date(data.deadline) < new Date() ? "red" : "inherit",
                  }}
                >
                  {new Date(data.deadline).toLocaleDateString("id-ID")}
                </td>
                <td className="tb-status-2">
                  <span
                    className={`badge ${
                      data.status === "todo"
                        ? "bg-primary"
                        : data.status === "in_progress"
                        ? "bg-warning text-white"
                        : data.status === "done"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {data.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default DetailMember;
