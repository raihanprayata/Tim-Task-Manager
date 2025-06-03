import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "react-bootstrap";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="frame">
      <div className="sidebar">
        <div className="border-hedaer">
          <h2 className="header-sidebar">
            <FaProjectDiagram /> Dashboard
          </h2>
        </div>
        <div className="nav">
          <NavLink to="/dashboard" className="nav-link">
            <FaTachometerAlt
              style={{ marginRight: "10px", marginLeft: "10px" }}
            />
            Dashboard
          </NavLink>
          <NavLink to="/member" className="nav-link">
            <FaUsers style={{ marginRight: "10px", marginLeft: "10px" }} />
            User
          </NavLink>
          <NavLink to="/project" className="nav-link">
            <FaProjectDiagram
              style={{ marginRight: "10px", marginLeft: "10px" }}
            />
            Project
          </NavLink>
        </div>
      </div>
      <div className="content">
        <div className="header-content"></div>
        <div
          className="main-content"
          style={{
            paddingTop: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
