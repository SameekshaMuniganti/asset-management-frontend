import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function UserDashboard() {

    const [dashboard, setDashboard] = useState({
        employeeName: "",
        employeeCode: "",
        department: "",
        designation: "",
        email: "",
        totalAssets: 0,
        assetCategories: 0,
        pendingRequests: 0,
        assets: []
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = () => {
        api.get("/api/user/dashboard")
            .then((response) => {
                setDashboard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <MainLayout>

            <div className="dashboard-page">

                <div className="welcome-section">
                    <h1>Welcome Back 👋</h1>
                    <p>Manage your assigned assets</p>
                </div>

                <div className="dashboard-card">

                    <h3>Employee Information</h3>

                    <table className="dashboard-table">
                        <tbody>
                            <tr>
                                <td><b>Name</b></td>
                                <td>{dashboard.employeeName}</td>
                            </tr>

                            <tr>
                                <td><b>Employee Code</b></td>
                                <td>{dashboard.employeeCode}</td>
                            </tr>

                            <tr>
                                <td><b>Department</b></td>
                                <td>{dashboard.department}</td>
                            </tr>

                            <tr>
                                <td><b>Designation</b></td>
                                <td>{dashboard.designation}</td>
                            </tr>

                            <tr>
                                <td><b>Email</b></td>
                                <td>{dashboard.email}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}
                >

                    <div className="dashboard-card" style={{ flex: 1 }}>
                        <h4>Total Assets</h4>
                        <h2>{dashboard.totalAssets}</h2>
                    </div>

                    <div className="dashboard-card" style={{ flex: 1 }}>
                        <h4>Asset Categories</h4>
                        <h2>{dashboard.assetCategories}</h2>
                    </div>

                </div>

                <div className="dashboard-card">

                    <h3>Assigned Assets</h3>

                    <table className="dashboard-table">

                        <thead>
                            <tr>
                                <th>Asset Code</th>
                                <th>Asset Name</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {dashboard.assets.length === 0 ? (

                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No assets assigned.
                                    </td>
                                </tr>

                            ) : (

                                dashboard.assets.map((asset, index) => (

                                    <tr key={index}>
                                        <td>{asset.assetCode}</td>
                                        <td>{asset.assetName}</td>
                                        <td>{asset.category}</td>
                                        <td>{asset.brand}</td>
                                        <td>{asset.model}</td>
                                        <td>{asset.status}</td>
                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>
    );
}

export default UserDashboard;