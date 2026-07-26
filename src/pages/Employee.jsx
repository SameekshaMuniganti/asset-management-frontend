import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import MainLayout from "../layouts/MainLayout";
import "../styles/Employee.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../services/api";

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    const [employee, setEmployee] = useState({
        employeeName: "",
        employeeCode: "",
        email: "",
        department: "",
        designation: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {

        api.get("/api/employees")
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log("Load Employee Error:", error);
                toast.error("Failed to load employees");
            });

    };

    const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });

    };

    const clearForm = () => {

        setEmployee({
            employeeName: "",
            employeeCode: "",
            email: "",
            department: "",
            designation: "",
            username: "",
            password: ""
        });

        setEditMode(false);
        setEditId(null);

    };

    const addEmployee = () => {

        api.post("/api/employees", employee)

            .then(() => {

                toast.success("Employee added successfully");

                clearForm();

                setShowForm(false);

                loadEmployees();

            })

            .catch((error) => {

                console.log("Add Employee Error:", error.response);

                toast.error(
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Failed to add employee"
                );

            });

    };

    const editEmployee = (emp) => {

        setEmployee({

            employeeName: emp.employeeName,
            employeeCode: emp.employeeCode,
            email: emp.email,
            department: emp.department,
            designation: emp.designation,
            username: emp.username || "",
            password: ""

        });

        setEditId(emp.id);
        setEditMode(true);
        setShowForm(true);

    };

    const updateEmployee = () => {

        api.put(
            `/api/employees/${editId}`,
            employee
        )

        .then(() => {

            toast.success("Employee updated successfully");

            clearForm();

            setShowForm(false);

            loadEmployees();

        })

        .catch((error) => {

            console.log("Update Error:", error.response);

            toast.error(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update employee"
            );

        });

    };

    const deleteEmployee = async (id) => {

        const result = await Swal.fire({

            title: "Delete Employee?",

            text: "Are you sure you want to delete this employee?",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#2563eb",

            confirmButtonText: "Yes, Delete"

        });

        if (!result.isConfirmed) return;

        api.delete(`/api/employees/${id}`)

            .then(() => {

                toast.success("Employee deleted successfully");

                loadEmployees();

            })

            .catch((error) => {

                toast.error(
                    error.response?.data ||
                    "Failed to delete employee"
                );

            });

    };

    return (

    <MainLayout>

        <div className="employees-page">

            <div className="employees-header">

                <div>
                    <h1>Employees Management</h1>
                </div>

                <button
                    className="add-btn"
                    onClick={() => {
                        clearForm();
                        setShowForm(true);
                    }}
                >
                    + Add Employee
                </button>

            </div>

            {showForm && (

                <div className="employees-card">

                    <h2>
                        {editMode ? "Edit Employee" : "Add Employee"}
                    </h2>

                    <input
                        name="employeeName"
                        placeholder="Employee Name"
                        value={employee.employeeName}
                        onChange={handleChange}
                    />

                    <input
                        name="employeeCode"
                        placeholder="Employee Code"
                        value={employee.employeeCode}
                        onChange={handleChange}
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={employee.email}
                        onChange={handleChange}
                    />

                    <input
                        name="department"
                        placeholder="Department"
                        value={employee.department}
                        onChange={handleChange}
                    />

                    <input
                        name="designation"
                        placeholder="Designation"
                        value={employee.designation}
                        onChange={handleChange}
                    />

                    <input
                        name="username"
                        placeholder="Username"
                        value={employee.username}
                        onChange={handleChange}
                    />

                    {!editMode && (

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={employee.password}
                            onChange={handleChange}
                        />

                    )}

                    <button
                        className="add-btn"
                        onClick={
                            editMode
                                ? updateEmployee
                                : addEmployee
                        }
                    >
                        {editMode ? "Update Employee" : "Save Employee"}
                    </button>

                </div>

            )}

            <div className="employees-card">

                <table className="employee-table">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Code</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {employees.map((emp) => (

                            <tr key={emp.id}>

                                <td>{emp.employeeName}</td>

                                <td>{emp.employeeCode}</td>

                                <td>{emp.email}</td>

                                <td>{emp.department}</td>

                                <td>{emp.designation}</td>

                                <td>

    <div className="action-buttons">

        <button
            className="edit-btn"
            onClick={() => editEmployee(emp)}
            title="Edit Employee"
        >
            <FaEdit />
        </button>

        <button
            className="delete-btn"
            onClick={() => deleteEmployee(emp.id)}
            title="Delete Employee"
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

export default Employee;