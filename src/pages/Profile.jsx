import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import "../styles/Profile.css";

function Profile() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        username: "",
        role: "",
        employeeName: "",
        employeeCode: "",
        department: "",
        designation: "",
        email: ""
    });

    const [totalAssets, setTotalAssets] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [assignedAssets, setAssignedAssets] = useState(0);

    useEffect(() => {
    loadProfile();
}, []);

    const loadProfile = async () => {

    try {

        const response = await api.get("/api/users/profile");

        setProfile(response.data);

        if (response.data.role === "ADMIN") {
            loadDashboardData();
        }

    } catch (error) {

        console.log(error);

    }

};

    const loadDashboardData = async () => {

        try {

            const assets = await api.get("/api/assets");
            setTotalAssets(assets.data.length);

            const employees = await api.get("/api/employees");
            setTotalEmployees(employees.data.length);

            const categories = await api.get("/api/categories");
            setTotalCategories(categories.data.length);

            const assignments = await api.get("/api/assignments");
            setAssignedAssets(assignments.data.length);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="profile-container">

                <div className="profile-card">

                    <div className="profile-avatar-large">
                        {profile.username
                            ? profile.username.charAt(0).toUpperCase()
                            : "A"}
                    </div>

                    <h2>{profile.username}</h2>

                    <p className="subtitle">
                        Asset Management System
                    </p>

                    <hr />

                    <h3>Profile Information</h3>

                    {profile.employeeName && (
                        <div className="profile-row">
                            <span>Name</span>
                            <strong>{profile.employeeName}</strong>
                        </div>
                    )}

                    {profile.employeeCode && (
                        <div className="profile-row">
                            <span>Employee Code</span>
                            <strong>{profile.employeeCode}</strong>
                        </div>
                    )}

                    <div className="profile-row">
                        <span>Username</span>
                        <strong>{profile.username}</strong>
                    </div>

                    <div className="profile-row">
                        <span>Role</span>
                        <strong>{profile.role}</strong>
                    </div>

                    {profile.department && (
                        <div className="profile-row">
                            <span>Department</span>
                            <strong>{profile.department}</strong>
                        </div>
                    )}

                    {profile.designation && (
                        <div className="profile-row">
                            <span>Designation</span>
                            <strong>{profile.designation}</strong>
                        </div>
                    )}

                    {profile.email && (
                        <div className="profile-row">
                            <span>Email</span>
                            <strong>{profile.email}</strong>
                        </div>
                    )}

                    {profile.role === "ADMIN" && (
    <>
        <hr />

        <h3>System Overview</h3>

        <div className="profile-row">
            <span>Total Assets</span>
            <strong>{totalAssets}</strong>
        </div>

        <div className="profile-row">
            <span>Total Employees</span>
            <strong>{totalEmployees}</strong>
        </div>

        <div className="profile-row">
            <span>Total Categories</span>
            <strong>{totalCategories}</strong>
        </div>

        <div className="profile-row">
            <span>Assigned Assets</span>
            <strong>{assignedAssets}</strong>
        </div>
    </>
)}

                    <button
    className="back-btn"
    onClick={() => {
        if (profile.role === "ADMIN") {
            navigate("/dashboard");
        } else {
            navigate("/user-dashboard");
        }
    }}
>
    Back to Dashboard
</button>

                </div>

            </div>

        </MainLayout>

    );
}

export default Profile;