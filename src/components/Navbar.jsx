import { FaSignOutAlt, FaBell } from "react-icons/fa";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
       
        <h1 className="navbar-title">AssetHub</h1>
      </div>

      

        <div className="navbar-divider" />

        <div
          className="user-profile"
          onClick={() => navigate("/profile")}
          role="button"
          tabIndex={0}
        >
          <div className="profile-avatar">P</div>
          <span className="profile-name">Profile</span>
        </div>

      
      
    </nav>
  );
}

export default Navbar;