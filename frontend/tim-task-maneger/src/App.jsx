import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Project from "./pages/project/Project";
import Member from "./pages/member/Member";
import TambahProject from "./pages/project/TambahProject";
import LayoutWithSidebar from "./pages/layout with sidebar/LayoutWithSidebar";
import Register from "./pages/register/Register";
import Profil from "./pages/member/Profil";
import EditProject from "./pages/project/EditProject";
import TambahTask from "./pages/task/TambahTask";
import DetailProject from "./pages/task/DetailProject";
import { EditTask } from "./pages/task/EditTask";
import DetailMember from "./pages/member/DetailMember";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman tanpa Sidebar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Halaman dengan Sidebar */}
        <Route element={<LayoutWithSidebar />}>
          <Route path="/dashboard" element={<Home />} />
          {/* Project */}
          <Route path="/project" element={<Project />} />
          <Route path="/tambah-project" element={<TambahProject />} />
          <Route
            path="/edit-project/:projectId/:ownerId"
            element={<EditProject />}
          />
          {/* Task */}
          <Route path="/detail-project/:id" element={<DetailProject />} />
          <Route path="/tambah-task/:id" element={<TambahTask />} />
          <Route path="/edit-task/:projectId/:taskId" element={<EditTask />} />
          {/* Member */}
          <Route path="/member" element={<Member />} />
          <Route path="/detail-member/:id" element={<DetailMember />} />
          <Route path="/profile" element={<Profil />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
