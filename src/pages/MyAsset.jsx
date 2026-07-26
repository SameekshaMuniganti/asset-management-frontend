import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function MyAssets() {

    const [assets, setAssets] = useState([]);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = () => {
        api.get("/api/user/assets")
            .then((response) => {
                setAssets(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (

        <MainLayout>

            <div className="dashboard-page">

                <div className="welcome-section">
                    <h1>My Assets</h1>
                    <p>View all assets assigned to you.</p>
                </div>

                <div className="dashboard-card">

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

                            {assets.length === 0 ? (

                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No assets assigned.
                                    </td>
                                </tr>

                            ) : (

                                assets.map((asset, index) => (

                                    <tr key={index}>
                                        <td>{asset.assetCode}</td>
                                        <td>{asset.assetName}</td>
                                        <td>{asset.categoryName}</td>
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

export default MyAssets;