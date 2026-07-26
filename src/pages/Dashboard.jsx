import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import "../styles/Dashboard.css";
import api from "../services/api";
import {
  FaLaptop,
  FaCheckCircle,
  FaExchangeAlt,
  FaUsers,
  FaTags,
  FaPlus,
  FaUserPlus
} from "react-icons/fa";


function Dashboard() {

    const [stats, setStats] = useState({
        totalAssets: 0,
        availableAssets: 0,
        assignedAssets: 0,
        totalEmployees: 0,
        totalCategories: 0
    });

    const [assets, setAssets] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const role = localStorage.getItem("role");

    useEffect(() => {

    if (role === "ADMIN") {
        loadDashboard();
        loadAssets();
        loadAssignments();
    } else if (role === "USER") {
        // Load only user-specific data
        // Example:
        // loadMyAssets();
    }

}, []);

    const loadDashboard = () => {
        api.get("/api/dashboard")
            .then((response) => {
                setStats(response.data);
            })
            .catch(console.log);
    };

    const loadAssets = () => {
        api.get("/api/assets")
            .then((response) => {
                setAssets(response.data);
            })
            .catch(console.log);
    };

    const loadAssignments = () => {
        api.get("/api/assignments")
            .then((response) => {
                setAssignments(response.data);
            })
            .catch(console.log);
    };

    const categoryCount = {};

    assets.forEach((asset) => {
        const category = asset.categoryName || "Others";
        categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const maxCategoryCount =
        Math.max(...Object.values(categoryCount), 1);

    return (

        <MainLayout>

            <div className="dashboard-page">

                <div className="welcome-section">
                    <h1>Welcome Back, Sam 👋</h1>
                    
                </div>

                <div className="stats-grid">

    <div className="stat-card blue">
        <div className="stat-header">
            <h4>Total Assets</h4>
            <FaLaptop className="stat-icon" />
        </div>

        <h2>{stats.totalAssets}</h2>

        <p>Overall Inventory</p>
    </div>

    <div className="stat-card green">
        <div className="stat-header">
            <h4>Available</h4>
            <FaCheckCircle className="stat-icon" />
        </div>

        <h2>{stats.availableAssets}</h2>

        <p>Ready to Assign</p>
    </div>

    <div className="stat-card orange">
        <div className="stat-header">
            <h4>Assigned</h4>
            <FaExchangeAlt className="stat-icon" />
        </div>

        <h2>{stats.assignedAssets}</h2>

        <p>Currently In Use</p>
    </div>

    <div className="stat-card purple">
        <div className="stat-header">
            <h4>Employees</h4>
            <FaUsers className="stat-icon" />
        </div>

        <h2>{stats.totalEmployees}</h2>

        <p>Registered Employees</p>
    </div>

    <div className="stat-card red">
        <div className="stat-header">
            <h4>Categories</h4>
            <FaTags className="stat-icon" />
        </div>

        <h2>{stats.totalCategories}</h2>

        <p>Asset Categories</p>
    </div>

</div>

                <div className="dashboard-card">

                    <h3>Assets by Category</h3>

                    {
                        Object.keys(categoryCount).length === 0 ? (

                            <p>No assets available.</p>

                        ) : (

                            Object.entries(categoryCount).map(([category, count]) => (

                                <div
                                    className="category-item"
                                    key={category}
                                >

                                    <div className="category-header">

                                        <span>{category}</span>

                                        <span>{count}</span>

                                    </div>

                                    <div className="progress">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${(count / maxCategoryCount) * 100}%`
                                            }}
                                        ></div>

                                    </div>

                                </div>

                            ))

                        )
                    }

                </div>

                <div className="dashboard-card">

                    <h3>Recent Assignments</h3>

                    <table className="dashboard-table">

                        <thead>

                            <tr>
                                <th>Employee</th>
                                <th>Asset</th>
                                <th>Assigned Date</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                assignments.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            style={{ textAlign: "center" }}
                                        >
                                            No assignments found.
                                        </td>
                                    </tr>

                                ) : (

                                    assignments
                                        .slice(0, 5)
                                        .map((assignment) => (

                                            <tr key={assignment.id}>

                                                <td>
                                                    {assignment.employeeCode} - {assignment.employeeName}
                                                </td>

                                                <td>
                                                    {assignment.assetCode} - {assignment.assetName}
                                                </td>

                                                <td>
                                                    {assignment.assignedDate}
                                                </td>

                                                <td>
                                                    <span className="status-badge">
                                                        {assignment.status}
                                                    </span>
                                                </td>

                                            </tr>

                                        ))

                                )
                            }

                        </tbody>

                    </table>

                </div>

                {
    role === "ADMIN" && (

        <div className="dashboard-card">

            <h3>Quick Actions</h3>

            <div className="quick-actions">

                <Link to="/assets">
                    <button className="action-btn">
                        + Add Asset
                    </button>
                </Link>

                <Link to="/employees">
                    <button className="action-btn">
                        + Add Employee
                    </button>
                </Link>

                <Link to="/assignments">
                    <button className="action-btn">
                        Assign Asset
                    </button>
                </Link>

            </div>

        </div>

    )
    
}
</div>

        </MainLayout>

    );
}

export default Dashboard;