import React, { useState } from "react";
import { FaUserPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

function ManageRoles() {
  const { roles, setRoles, fetchRoles, handleDelete } = useOutletContext();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [showForm, setshowForm] = useState(false);

  const [errorRoles, seterrorRoles] = useState("");
  const [erroraName, seterrorName] = useState("");
  const [errorAge, seterrorAge] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  
  const [errorDescription, seterrorDescription] = useState("");

  // ✅ FIX: should be null, not false
  const [editId, seteditId] = useState(null);
const token =localStorage.getItem("token")
  const [formData, setformData] = useState({
    role: "",
    name: "",
    age: "",
    email: "",
    description: "",
    password: "",
  });

  const handleEdit = (item) => {
    setshowForm(true);
    seteditId(item._id);
    setformData({
      role: item.role,
      name: item.name,
      age: item.age,
      email: item.email,
      password: "",
      description: item.description,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });

    
    seterrorAge("");
    seterrorDescription("");
    seterrorName("");
    seterrorRoles("");
    seterrorEmail("");
  };

  const handleAddClick = () => {
    setshowForm(true);

    // ✅ FIX: reset form + editId
    seteditId(null);
    setformData({
      role: "",
      name: "",
      age: "",
      email: "",
      description: "",
      password: "",
    });
  };

  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  

  // SUBMIT------------------------------------------------------

 const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (!formData.role) return seterrorRoles("Please enter role");
  if (!formData.name) return seterrorName("Please enter name");
  if (!formData.age) return seterrorAge("Please enter age");

  if (formData.age < 1 || formData.age > 105) {
    return seterrorAge("Age must be between 1 and 105");
  }

  if (!formData.email) return seterrorEmail("Please enter email");

  if (!emailPattern.test(formData.email)) {
    return seterrorEmail(
      "Please enter a valid email address (example: user@example.com)"
    );
  }

  if (!formData.description)
    return seterrorDescription("Please enter description");

  // Duplicate check
  const existUser = roles.some(
    (item) => item.email === formData.email && item._id !== editId
  );

  if (existUser) {
    return seterrorEmail("Email already exists");
  }

  try {
    let response;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (editId) {
      // UPDATE
      response = await axios.put(
        `${backendUrl}/api/auth/edit-user/${editId}`,
        {
          role: formData.role,
          name: formData.name,
          age: Number(formData.age),
          email: formData.email,
          description: formData.description,
        },
        config // ✅ token here
      );

      toast.success("User updated successfully");
      fetchRoles();
    } else {
      // ADD
      response = await axios.post(
        `${backendUrl}/api/auth/register`,
        {
          role: formData.role,
          name: formData.name,
          age: Number(formData.age),
          email: formData.email,
          description: formData.description,
        },
        config // ✅ token here
      );

      if (response.status === 201) {
        toast.success("User added successfully!");
        fetchRoles();
      }
    }

    // Reset form
    setformData({
      role: "",
      name: "",
      age: "",
      email: "",
      description: "",
    });

    seteditId(null);
    setshowForm(false);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Failed to register role");
  }
};

  const handleCancel = () => {
    setshowForm(false);
    seteditId(null);
  };

  return (
    // ✅ YOUR UI EXACTLY SAME (no changes)
    <div className="bg-white min-h-screen">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Manage Roles
            </h3>
            <p className="text-gray-500">Control roles efficiently</p>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-[#00536e] text-white px-5 py-2 rounded-md hover:bg-[#00455c] hover:scale-90 hover:shadow-xl transition-all duration-300 ease-in-out active:scale-90 active:shadow-md"
          >
            <FaUserPlus />
            Add Role
          </button>
        </div>

        {/* KEEP REST SAME */}

        {/* POPUP */}

        {showForm && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
            <div className="bg-white w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[35%] p-6 sm:p-8 rounded-lg shadow-xl">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold text-gray-700">
                  Add Role Details
                </h3>

                <p
                  onClick={() => setshowForm(false)}
                  className="cursor-pointer font-semibold text-2xl mb-2 hover:text-[#00304e]"
                >
                  &times;
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4">
                  {/* ROLE */}

                  <label className="text-sm font-semibold">
                    Role <span className="text-red-700">*</span>
                  </label>

                  <div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1.5 text-sm"
                    >
                      <option value="">Select Role</option>
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                    </select>

                    {errorRoles && (
                      <p className="text-red-500 text-xs">{errorRoles}</p>
                    )}
                  </div>

                  {/* NAME */}

                  <label className="text-sm font-semibold">
                    Name <span className="text-red-700">*</span>
                  </label>

                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1.5 text-sm"
                    />

                    {erroraName && (
                      <p className="text-red-500 text-xs">{erroraName}</p>
                    )}
                  </div>

                  {/* AGE */}

                  <label className="text-sm font-semibold">
                    Age <span className="text-red-700">*</span>
                  </label>

                  <div>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1.5 text-sm"
                    />

                    {errorAge && (
                      <p className="text-red-500 text-xs">{errorAge}</p>
                    )}
                  </div>

                  {/* EMAIL */}

                  <label className="text-sm font-semibold">
                    Email <span className="text-red-700">*</span>
                  </label>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      title="Please enter a valid email address (example: user@example.com)"
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1.5 text-sm"
                    />

                    {errorEmail && (
                      <p className="text-red-500 text-xs">{errorEmail}</p>
                    )}
                  </div>

                 
                  

                  {/* DESCRIPTION */}

                  <label className="text-sm font-semibold">
                    Description <span className="text-red-700">*</span>
                  </label>

                  <div>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border rounded-md px-2 py-1.5 text-sm h-16"
                    />

                    {errorDescription && (
                      <p className="text-red-500 text-xs">{errorDescription}</p>
                    )}
                  </div>
                </div>

                {/* BUTTONS */}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleCancel}
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded-md 
             hover:bg-red-700 hover:scale-105 transform 
             transition duration-300 ease-in-out active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    className="bg-[#00536e] text-white px-5 py-2 rounded-md 
             hover:bg-[#00455c] hover:scale-105 transform 
             transition duration-300 ease-in-out active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Submit →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TABLE */}

        <div className="mt-8 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Added Roles</h3>

          <table className="min-w-[900px] w-full border-collapse text-sm">
            <thead className="bg-[#00536e] text-white">
              <tr>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {roles
                .filter((item) => item.role !== "admin")
                .map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.role}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.age}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3 break-words">{item.description}</td>

                    <td className="p-3">
                      <div className="flex gap-2 text-lg">
                        <FaEdit
                          onClick={()=>handleEdit(item)}
                          className="cursor-pointer text-green-600"
                        />
                        <FaTrashAlt
                          onClick={() => handleDelete(item._id)}
                          className="cursor-pointer text-red-600"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageRoles;
