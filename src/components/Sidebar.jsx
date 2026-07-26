import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaLaptop,
  FaUsers,
  FaExchangeAlt,
  FaTags,
  FaSignOutAlt
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar() {

  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.replace("/");
  };

  return (
    <div className="sidebar">

     

      {/* Dashboard for everyone */}
   
<NavLink
    to={role === "ADMIN" ? "/dashboard" : "/user-dashboard"}
    className="menu-item"
>
    <FaTachometerAlt />
    <span>Dashboard</span>
</NavLink>

      {/* Admin only */}
      {role === "ADMIN" && (
        <>
          <NavLink to="/assets" className="menu-item">
            <FaLaptop />
            <span>Assets</span>
          </NavLink>

          <NavLink to="/employees" className="menu-item">
            <FaUsers />
            <span>Employees</span>
          </NavLink>

          <NavLink to="/assignments" className="menu-item">
            <FaExchangeAlt />
            <span>Assignments</span>
          </NavLink>

          <NavLink to="/categories" className="menu-item">
            <FaTags />
            <span>Categories</span>
          </NavLink>
        </>
      )}

      {/* User only */}

{role === "USER" && (
    <NavLink to="/my-assets" className="menu-item">
        <FaLaptop />
        <span>My Assets</span>
    </NavLink>
)}
      <div
        className="menu-item logout"
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </div>

    </div>
  );
}

export default Sidebar;