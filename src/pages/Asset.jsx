import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import MainLayout from "../layouts/MainLayout";
import "../styles/Assets.css";

import api from "../services/api";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";


function Assets() {


    const [assets, setAssets] = useState([]);

    const [categories, setCategories] = useState([]);


    const [showForm, setShowForm] = useState(false);


    const [editMode, setEditMode] = useState(false);

    const [editId, setEditId] = useState(null);




    const [asset, setAsset] = useState({

        assetName: "",
        assetCode: "",
        brand: "",
        model: "",
        categoryId: ""

    });






    useEffect(() => {

        loadAssets();

        loadCategories();

    }, []);






    const loadAssets = () => {


        api.get("/api/assets")

        .then((response)=>{

            setAssets(response.data);

        })

        .catch((error)=>{

            console.log(error);

        });


    };








    const loadCategories = () => {


        api.get("/api/categories")

        .then((response)=>{


            setCategories(response.data);


        })

        .catch((error)=>{

            console.log(error);

        });


    };









    const handleChange = (e)=>{


        setAsset({

            ...asset,

            [e.target.name]: e.target.value

        });


    };









    const clearForm = ()=>{


        setAsset({

            assetName:"",
            assetCode:"",
            brand:"",
            model:"",
            categoryId:""

        });


        setEditMode(false);

        setEditId(null);


    };









    const addAsset = ()=>{


        const assetData = {


            assetName: asset.assetName,

            assetCode: asset.assetCode,

            brand: asset.brand,

            model: asset.model,

            categoryId: Number(asset.categoryId)

        };




        api.post("/api/assets", assetData)



        .then(()=>{


            toast.success("Asset added successfully");


            clearForm();


            setShowForm(false);


            loadAssets();



        })



        .catch((error)=>{

    console.log(error);

    toast.error(error.response?.data || "Failed to delete asset");

});


    



    };









    const editAsset = (item)=>{


        setAsset({

            assetName:item.assetName,

            assetCode:item.assetCode,

            brand:item.brand,

            model:item.model,

            categoryId:item.categoryId

        });


        setEditId(item.id);


        setEditMode(true);


        setShowForm(true);



    };









    const updateAsset = ()=>{


        const assetData = {


            assetName: asset.assetName,

            assetCode: asset.assetCode,

            brand: asset.brand,

            model: asset.model,

            categoryId: Number(asset.categoryId)

        };




        api.put(`/api/assets/${editId}`, assetData)



        .then(()=>{


            toast.success("Asset updated successfully");


            clearForm();


            setShowForm(false);


            loadAssets();



        })



        .catch((error)=>{


            console.log(error);


            toast.error("Failed to update asset");


        });



    };









    const deleteAsset = async(id)=>{


        const result = await Swal.fire({
    title: "Delete Asset?",
    text: "Are you sure you want to delete this asset?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
});

if (!result.isConfirmed) {
    return;
}



        api.delete(`/api/assets/${id}`)



        .then(()=>{


            toast.success("Asset deleted successfully");


            loadAssets();



        })



        .catch((error) => {

    console.log(error);

    toast.error(error.response?.data || "Failed to delete asset");

});



    };









    return (


        <MainLayout>


            <div className="assets-page">





                <div className="assets-header">


                    <div>

                        <div>
    <h1>Assets</h1>
    <p>Manage all organization assets from one place.</p>
</div>


                      
                    </div>




                    <button

                        className="add-btn"

                        onClick={()=>{

                            clearForm();

                            setShowForm(true);

                        }}

                    >

                        <>
    <FaPlus />
    Add Asset
</>

                    </button>



                </div>









                {
                    showForm && (


                    <div className="assets-card">


                        <h2>

                            {
                                editMode
                                ? "Edit Asset"
                                : "Add New Asset"
                            }

                        </h2>





                        <input

                            name="assetName"

                            placeholder="Asset Name"

                            value={asset.assetName}

                            onChange={handleChange}

                        />





                        <input

                            name="assetCode"

                            placeholder="Asset Code"

                            value={asset.assetCode}

                            onChange={handleChange}

                        />





                        <input

                            name="brand"

                            placeholder="Brand"

                            value={asset.brand}

                            onChange={handleChange}

                        />





                        <input

                            name="model"

                            placeholder="Model"

                            value={asset.model}

                            onChange={handleChange}

                        />






                        <select

                            name="categoryId"

                            value={asset.categoryId}

                            onChange={handleChange}

                        >


                            <option value="">

                                Select Category

                            </option>



                            {

                                categories.map((category)=>(


                                    <option

                                        key={category.id}

                                        value={category.id}

                                    >

                                        {category.name}

                                    </option>


                                ))

                            }


                        </select>







                        <button
    className="add-btn"
    onClick={editMode ? updateAsset : addAsset}
>
    {editMode ? "Update Asset" : "Save Asset"}
</button>



                    </div>


                    )

                }









                <div className="assets-card">


                   <table>
    <thead>
        <tr>
            <th>Asset Name</th>
            <th>Asset Code</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>

    <tbody>
        {assets.map((item) => (
            <tr key={item.id}>
                <td>{item.assetName}</td>
                <td>{item.assetCode}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.categoryName}</td>
                <td>
    <span
        className={`status-badge ${(item.status || "AVAILABLE").toLowerCase()}`}
    >
        {item.status || "AVAILABLE"}
    </span>
</td>

                <td className="action-buttons">
    <button
        className="edit-btn"
        onClick={() => editAsset(item)}
        title="Edit Asset"
    >
        <FaEdit />
    </button>

    <button
        className="delete-btn"
        onClick={() => deleteAsset(item.id)}
        title="Delete Asset"
    >
        <FaTrash />
    </button>
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



export default Assets;