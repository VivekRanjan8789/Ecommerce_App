import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import CategoryForm from "../../components/Form/CategoryForm";
import {  Modal } from 'antd';
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null)  // selected is id
   

  // open modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =await axios.post(
        `${process.env.REACT_APP_API}/category/create-category`,
        {
          name,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        getAllCategories();
      }
    } catch (error) {
      console.log("error in create category", error);
      toast.error("something went wrong while creating category");
    }
  }

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("error in fetching categories", error);
      toast.error("something went wrong in fetching categories");
    }
  };

  useEffect(() => {    
    getAllCategories();
  }, []);

   // handle update category
  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/category/update-category/${selected}`, {name: updatedName})
      if(data.success){
        toast.success(data.message);
        setSelected(null)
        getAllCategories();
        setUpdatedName("");
        setIsModalOpen(false);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);        
      toast.error("something went wrong while updating category")
    }   
  }

  // handle delete category
  const handleDelete = async (id) => {    
    
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/category/delete-category/${id}`)
      console.log(data);     
      if(data.success){
        toast.success(data.message)
        setSelected(null);
        getAllCategories();
      }
      else{
        toast.error(data.message)
      }      
    } catch (error) {
       console.log(error);
       toast.error("something went wrong while deleting cateogry")
    }
      
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            showModal();
                            setUpdatedName(c.name);
                            setSelected(c._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                            // setSelected(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal open={isModalOpen} footer={null} onCancel={handleCancel}>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
