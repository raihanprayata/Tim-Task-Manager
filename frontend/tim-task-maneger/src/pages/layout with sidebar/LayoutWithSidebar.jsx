// LayoutWithSidebar.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";

const LayoutWithSidebar = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default LayoutWithSidebar;
