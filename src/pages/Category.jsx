import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "../styles/categories.css";
import api from "../services/api";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [editId, setEditId] = useState(null);

    const [category, setCategory] = useState({
        name: ""
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        api.get("/api/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
    };

    const clearForm = () => {
        setCategory({ name: "" });
        setEditMode(false);
        setEditId(null);
    };

    const addCategory = () => {
        api.post("/api/categories", category)
            .then(() => {
                toast.success("Category added successfully");
                clearForm();
                setShowForm(false);
                loadCategories();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to add category");
            });
    };

    const editCategory = (item) => {
        setCategory({
            name: item.name
        });

        setEditId(item.id);
        setEditMode(true);
        setShowForm(true);
    };

    const updateCategory = () => {
        api.put(`/api/categories/${editId}`, category)
            .then(() => {
                toast.success("Category updated successfully");
                clearForm();
                setShowForm(false);
                loadCategories();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to update category");
            });
    };

    const deleteCategory = async (id) => {

    const result = await Swal.fire({
        title: "Delete Category?",
        text: "Are you sure you want to delete this category?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) {
        return;
    }

    api.delete(`/api/categories/${id}`)

        .then(() => {

            toast.success("Category deleted successfully");

            loadCategories();

        })

        .catch((error) => {

            console.log(error);

            toast.error(
                error.response?.data || "Failed to delete category"
            );

        });

};

    return (

        <MainLayout>

            <div className="categories-page">

                <div className="categories-header">

                    <div>
                        <h1>Category Management</h1>
                        
                    </div>

                    <button
    className="add-btn"
    onClick={() => {
        clearForm();
        setShowForm(true);
    }}
>
    <FaPlus />
    <span>Add Category</span>
</button>

                </div>

                {showForm && (

                    <div className="categories-card">

                        <h2>
                            {editMode ? "Edit Category" : "Add Category"}
                        </h2>

                        <input
                            name="name"
                            placeholder="Category Name"
                            value={category.name}
                            onChange={handleChange}
                        />

                        <button
    className="add-btn"
    onClick={editMode ? updateCategory : addCategory}
>
    <FaPlus />
    <span>
        {editMode ? "Update Category" : "Save Category"}
    </span>
</button>

                    </div>

                )}

                <div className="categories-card">

                    <table className="category-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {categories.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.id}</td>

                                    <td>{item.name}</td>

                                    <td>

    <div className="action-buttons">

        <button
            className="edit-btn"
            onClick={() => editCategory(item)}
            title="Edit Category"
        >
            <FaEdit />
        </button>

        <button
            className="delete-btn"
            onClick={() => deleteCategory(item.id)}
            title="Delete Category"
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

export default Categories;