import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import "./Login.css";

import {
    FaLaptop,
    FaUsers,
    FaClipboardCheck,
    FaShieldAlt,
    FaBoxes
} from "react-icons/fa";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await api.post("/api/users/login", {
                username,
                password
            });

            console.log("Response:", response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            toast.success("Login successful");

            if (response.data.role === "ADMIN") {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/user-dashboard", { replace: true });
            }

        } catch (error) {

            console.log("Full Error:", error);

            if (error.response) {
                toast.error(error.response?.data || "Invalid username or password");
            } else if (error.request) {
                toast.error("Unable to connect to server");
            } else {
                toast.error(error.message);
            }

        }

    };

    return (

        <div className="login-page">

            <div className="login-container">

                {/* Left Section */}

                <div className="login-left">

                    <div className="logo-circle">
                        <FaBoxes />
                    </div>

                    <h1>AssetHub</h1>

                    <div className="feature-card">

                        <FaLaptop className="feature-icon" />

                        <div>
                            <h5>Asset Tracking</h5>
                            <p>Monitor and manage organizational assets.</p>
                        </div>

                    </div>

                    <div className="feature-card">

                        <FaUsers className="feature-icon" />

                        <div>
                            <h5>Employee Management</h5>
                            <p>Maintain employee and asset allocation.</p>
                        </div>

                    </div>

                    <div className="feature-card">

                        <FaClipboardCheck className="feature-icon" />

                        <div>
                            <h5>Assignment Management</h5>
                            <p>Track issued assets to employees efficiently.</p>
                        </div>

                    </div>

                    <div className="feature-card">

                        <FaShieldAlt className="feature-icon" />

                        <div>
                            <h5>Secure Administration</h5>
                            <p>Reliable and secure access for administrators.</p>
                        </div>

                    </div>

                </div>

                {/* Right Section */}

                <div className="login-right">

                    <h2 className="login-title">
                        Welcome Back 👋
                    </h2>

                    <h3 className="login-greeting">
                        Hello!
                    </h3>

                    <p className="login-subtitle">
                        We're glad to see you again.
                        <br />
                        Sign in to continue to <strong>AssetHub</strong>.
                    </p>

                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleLogin();
                                }
                            }}
                        />

                    </div>

                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <div className="footer-text">
                        © 2026 AssetHub | Asset Management System
                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;