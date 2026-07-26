import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MainLayout from "../layouts/MainLayout";
import "../styles/Assignment.css";
import { FaPlus, FaTrash } from "react-icons/fa";

import api from "../services/api";
import SearchableDropdown from "../components/SearchableDropdown";

function Assignment() {

    const [employees, setEmployees] = useState([]);
    const [assets, setAssets] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [assignment, setAssignment] = useState({
        employeeId: "",
        assetId: ""
    });

    useEffect(() => {
        loadEmployees();
        loadAssets();
        loadAssignments();
    }, []);

    const loadEmployees = () => {

        api.get("/api/employees")
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log("Employee loading error:", error);
            });

    };

    const loadAssets = () => {

        api.get("/api/assets")
            .then((response) => {
                setAssets(response.data);
            })
            .catch((error) => {
                console.log("Asset loading error:", error);
            });

    };

    const loadAssignments = () => {

        api.get("/api/assignments")
            .then((response) => {
                setAssignments(response.data);
            })
            .catch((error) => {
                console.log("Assignment loading error:", error);
            });

    };

    const handleChange = (e) => {

        setAssignment({
            ...assignment,
            [e.target.name]: e.target.value
        });

    };

    const assignAsset = () => {

        const data = {

            employeeId: Number(assignment.employeeId),

            assetId: Number(assignment.assetId),

            assignedDate: new Date()
                .toISOString()
                .split("T")[0],

            status: "ASSIGNED"

        };

        api.post("/api/assignments", data)

            .then(() => {

                toast.success("Asset assigned successfully");

                setAssignment({
                    employeeId: "",
                    assetId: ""
                });

                loadAssignments();
                loadAssets(); // Refresh available assets

            })

            .catch((error) => {

                console.log("Assignment error:", error);

                toast.error("Failed to assign asset");

            });

    };
        const deleteAssignment = async (id) => {

    const result = await Swal.fire({
        title: "Delete Assignment?",
        text: "Are you sure you want to delete this assignment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) {
        return;
    }

    api.delete(`/api/assignments/${id}`)

        .then(() => {

            toast.success("Assignment deleted successfully");

            loadAssignments();
            loadAssets(); // Refresh available assets

        })

        .catch((error) => {

            console.log(error);

            toast.error(
                error.response?.data || "Failed to delete assignment"
            );

        });

};

    return (

        <MainLayout>

            <div className="assignment-page">

                <div className="assignment-header">

                    <h1>Assignment Management</h1>

                </div>

                <div className="assignment-card">

                    <h2>Assign Asset</h2>

                    <SearchableDropdown
    items={employees}
    selectedValue={assignment.employeeId}
    placeholder="Search Employee..."
    getLabel={(employee) =>
        `${employee.employeeCode} - ${employee.employeeName}`
    }
    onSelect={(id) =>
        setAssignment({
            ...assignment,
            employeeId: id
        })
    }
/>

                    <SearchableDropdown
    items={assets.filter(
        (asset) => asset.status === "AVAILABLE"
    )}
    selectedValue={assignment.assetId}
    placeholder="Search Asset..."
    getLabel={(asset) =>
        `${asset.assetCode} - ${asset.assetName}`
    }
    onSelect={(id) =>
        setAssignment({
            ...assignment,
            assetId: id
        })
    }
/>
                    <button
    className="assign-btn"
    onClick={assignAsset}
>
    <FaPlus />
    <span>Assign Asset</span>
</button>

                </div>

                <div className="assignment-card">

                    <table>

                        <thead>

                            <tr>

                                <th>Employee</th>
                                <th>Asset</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {assignments.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.employeeCode} - {item.employeeName}</td>
<td>{item.assetCode} - {item.assetName}</td>

                                    <td>{item.assignedDate}</td>

                                    <td>{item.status}</td>

                                    <td>

    <div className="action-buttons">

        <button
            className="delete-btn"
            onClick={() => deleteAssignment(item.id)}
            title="Delete Assignment"
        >
            <FaTrash />
        </button>

    </div>

</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>

    );

}

export default Assignment;