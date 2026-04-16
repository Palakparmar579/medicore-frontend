import React, { useState, useEffect } from "react";
import ConfirmationPopup from '../../component/CommonPages/ConfirmationPopup'
import {
  FaUserPlus,
  FaTrashAlt,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
  FaKey,
  FaPowerOff,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import MiniLoader from "../../component/CommonPages/MiniLoader";
function ManageRoles() {
const [roles, setRoles] = useState([]);
  const token = localStorage.getItem("token");
  // DElete States
    const [showDeleteConf,setshowDeleteConf]=useState(false)
    const [deleteId,setDeleteId]=useState("")

    //Pagination
     const [page,setPage]=useState(1);
     const [totalPages,settotalPages]=useState(1);
      const [activeRole, setActiveRole] = useState("all");
       const [search, setSearch] = useState("");
        const limit=8;
      
  // Resend 
  const [resetId,setResetId]=useState(null)
  const [showResetPopup,setShowResetPopup]=useState(false)
  const [LoaderId,setLoaderId]=useState(null)

// Status Popup
    const [showStatusPopup,setShowStatusPopup]=useState(false)
     const [statusId,setStatusId]=useState(null)
     const [currentStatus,setCurrentStatus]=useState(null)
    const nextStatus = currentStatus === "active" ? "inactive" : "active";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showForm, setshowForm] = useState(false);
  const [errorRoles, seterrorRoles] = useState("");
  const [erroraName, seterrorName] = useState("");
  const [errorAge, seterrorAge] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorDescription, seterrorDescription] = useState("");
  const [editId, seteditId] = useState(null);
  const [showLoader, setShowloader] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
 


 
  const [showPagination,setShowPagination]=useState(false)
 
  const [formData, setformData] = useState({
    role: "",
    name: "",
    age: "",
    email: "",
    description: "",
    password: "",
  });
 

  
 // for search+pagination
 useEffect(() => {
  const delay = setTimeout(() => {
    fetchRoles(page, activeRole, search);
  }, 300);

  return () => clearTimeout(delay);
}, [page, activeRole, search]);  


  const handleEdit = (item) => {
    setshowForm(true);
    setEditMode(true);
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
    setEditMode(false);
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

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) return seterrorRoles("Please enter role");
    if (!formData.name) return seterrorName("Please enter name");
    if (!formData.age) return seterrorAge("Please enter age");
    if (formData.age < 1 || formData.age > 105)
      return seterrorAge("Age must be between 1 and 105");
    if (!formData.email) return seterrorEmail("Please enter email");
    if (!emailPattern.test(formData.email))
      return seterrorEmail("Invalid email format");
    if (!formData.description)
      return seterrorDescription("Please enter description");
    
    const existUser = roles.some(
      (item) => item.email === formData.email && item._id !== editId
    );
    if (existUser) return seterrorEmail("Email already exists");

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      let response;

      if (editId) {
        setShowloader(true);
        response = await axios.put(
          `${backendUrl}/api/auth/edit-user/${editId}`,
          {
            role: formData.role,
            name: formData.name,
            age: Number(formData.age),
            email: formData.email,
            description: formData.description,
          },
          config
        );
        toast.success("User updated successfully");
      } else {
        setShowloader(true);
        response = await axios.post(
          `${backendUrl}/api/auth/register`,
          {
            role: formData.role,
            name: formData.name,
            age: Number(formData.age),
            email: formData.email,
            description: formData.description,
          },
          config
        );
        toast.success("User added successfully!");
      }

      fetchRoles(page, activeRole, search);
      setformData({ role: "", name: "", age: "", email: "", description: "" });
      seteditId(null);
      setshowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setShowloader(false);
    }
  };

  const handleCancel = () => {
    setshowForm(false);
    seteditId(null);
  };

// Delete
   const onClose=()=>{
      setshowDeleteConf(false)
  }
  const handleDeleteCross=()=>{
      setshowDeleteConf(false)
  }
  const handleDelete=(id)=>{
     setDeleteId(id)
     console.log("delete clicked");
    setshowDeleteConf(true);
  }
  const onConfirm=async()=>{
     setshowDeleteConf(false)
     
    try{
     const config = {
  headers: { Authorization: `Bearer ${token}` },
};
        await axios.delete(`${backendUrl}/api/auth/deleteUser/${deleteId}`

        ,config)
        ;
          const restUser=roles.filter((item)=>item._id!==deleteId);
          setRoles(restUser);
          const isItemOnLastPage=roles.filter(items=>items.role!=="admin").length===1;
     const isOnPage1=page>1
     
     if(isItemOnLastPage&&isOnPage1){
          setPage(page-1)
     }
     else{
          fetchRoles(page)
     }
           toast.success("User deleted successfully");

    }
    
    catch(error)
    {
     toast.error("Failed to delete item");         
    }

  }

  // Pagination
  const fetchRoles = async (pageNumber = 1) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/auth/pagination?page=${pageNumber}&limit=${limit}&search=${search}&role=${activeRole}`,
    );

    setRoles(response.data.data);
    setPage(response.data.page);
    settotalPages(response.data.totalPages);
  } catch (error) {
    console.log(error);
  }
};

   //Resend Password
   const handleResend=async(id)=>{
     setShowResetPopup(true)
     setResetId(id)   
}

const handleResetCancel=()=>{
      setShowResetPopup(false)
}
const handleResetCross=()=>{
     setShowResetPopup(false)
}
const handleResetConfirm=async()=>{    
  try{
     setLoaderId(resetId)
    const config={
    headers:{Authorization:`Bearer ${token}`}};

  const response=await axios.post(`${backendUrl}/api/auth/resendPass/${resetId}`,{},config)
  toast.success(response.data.message)
  }
  catch(error){
    toast.error(error.response?.data?.message)
  }
  finally{
   setShowResetPopup(false)
    setResetId(null)
    setLoaderId(null) 
  }
}


// Status Popup
const handleStatus = (id,status) => {
    setShowStatusPopup(true)
    setStatusId(id)
    setCurrentStatus(status)
  };

  const handleStatusCross=()=>{
     setShowStatusPopup(false)
  }
   const handleStatusCancel=()=>{
     setShowStatusPopup(false)
  }
   const handleStatusConfirm=async()=>{
     try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put(
        `${backendUrl}/api/auth/toggleStatus/${statusId}`,
        {},
        config,
      );
      toast.success("Status Updated");
      fetchRoles(page);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
     setShowStatusPopup(false)
     setStatusId(null)
  }


const getRoleStyles = (role) => {
  switch (role) {
    case "doctor":
      return "bg-indigo-50 text-indigo-700 border-indigo-100";
    case "nurse":
      return "bg-pink-50 text-pink-700 border-pink-100";
    case "patient":
      return "bg-amber-50 text-amber-700 border-amber-100";
    default:
      return "bg-gray-50 text-gray-700 border-gray-100";
  }
};

  return (
    <div className=" min-h-screen">


{/*----------------------------Delete Popup----------------------------------*/}
       {showDeleteConf&&(
                         <ConfirmationPopup
                           handleCancel={onClose}
                           handleCross={handleDeleteCross}
                           handleConfirm={onConfirm}
                           message="Are you sure you want to delete this role? This action cannot be undone."
                         />   
                        ) }

{/*----------------------------Reset Popup--------------------------------------*/}   

 {
                         showResetPopup &&
                         <ConfirmationPopup 
                         handleCancel={handleResetCancel}
                         handleConfirm={handleResetConfirm}
                         handleCross={handleResetCross}
                         loading={LoaderId}
                         message="You are about to reset this user's password. Do you want to continue?"
                                                 />
                    }
{/*----------------------------Active & inavtive Popup--------------------------------------*/}   
 {
                         showStatusPopup &&
                         <ConfirmationPopup 
                         handleCancel={handleStatusCancel}
                         handleConfirm={handleStatusConfirm}
                         handleCross={handleStatusCross}
                         currentStatus={currentStatus}
                          message={` Are you sure to mark this status as ${nextStatus}`}
                         />
                      }
{/*---------------------------- Popup--------------------------------------*/}   

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-4">
          <div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#00304e] to-[#005f73] bg-clip-text text-transparent">
              Manage Roles
            </h3>
            <p className="text-gray-500">Control roles efficiently</p>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-[#1b2b41] text-white px-5 py-2 rounded-md hover:bg-[#00455c] hover:scale-90 hover:shadow-xl transition-all duration-300 ease-in-out active:scale-90 active:shadow-md cursor-pointer w-fit"
          >
            <FaUserPlus />
            Add Role
          </button>
        </div>

        {/* Form */}
      {showForm && (
  <div className="fixed inset-0 bg-black/40 rounded-2xl backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-1999 overflow-y-auto">

   
    <div
      className="bg-white 
      w-full sm:w-[85%] md:w-[65%] lg:w-[45%] xl:w-[35%]
      max-h-[90vh]
      overflow-auto
      flex flex-col rounded-2xl shadow-2xl"
    >

     
      <div className="flex  justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-[#00304e] to-[#005f73]">
        <h3 className="font-semibold text-white text-sm sm:text-base tracking-wide">
          {isEditMode ? "Edit Role Details" : "Add Role Details"}
        </h3>

        <p
          onClick={() => setshowForm(false)}
          className="cursor-pointer text-white text-2xl hover:text-gray-300"
        >
          &times;
        </p>
      </div>

     
      <div className="px-3 sm:px-5 py-4 sm:py-5 bg-gray-50">

        <form onSubmit={handleFormSubmit} id="role-form">
          <div className="flex flex-col gap-5">

           
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-sm font-semibold sm:w-28 w-full text-gray-700 sm:whitespace-nowrap">
                Role <span className="text-red-500">*</span>
              </label>

              <div className="flex-1">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#005f73]/40 focus:border-[#005f73]"
                >
                  <option value="">Select Role</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                </select>

                {errorRoles && (
                  <p className="text-red-500 text-xs mt-1">{errorRoles}</p>
                )}
              </div>
            </div>

           
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-sm font-semibold sm:w-28 w-full text-gray-700 sm:whitespace-nowrap">
                Name <span className="text-red-500">*</span>
              </label>

              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#005f73]/40 focus:border-[#005f73]"
                />

                {erroraName && (
                  <p className="text-red-500 text-xs mt-1">{erroraName}</p>
                )}
              </div>
            </div>

            {/* AGE */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-sm font-semibold sm:w-28 w-full text-gray-700 sm:whitespace-nowrap">
                Age <span className="text-red-500">*</span>
              </label>

              <div className="flex-1">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#005f73]/40 focus:border-[#005f73]"
                />

                {errorAge && (
                  <p className="text-red-500 text-xs mt-1">{errorAge}</p>
                )}
              </div>
            </div>

           
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-sm font-semibold sm:w-28 w-full text-gray-700 sm:whitespace-nowrap">
                Email <span className="text-red-500">*</span>
              </label>

              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  disabled={isEditMode}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#005f73]/40 focus:border-[#005f73] ${
                    isEditMode
                      ? "text-gray-400 cursor-not-allowed bg-gray-100"
                      : ""
                  }`}
                />

                {errorEmail && (
                  <p className="text-red-500 text-xs mt-1">{errorEmail}</p>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-sm font-semibold sm:w-28 w-full text-gray-700 sm:whitespace-nowrap">
                Description <span className="text-red-500">*</span>
              </label>

              <div className="flex-1">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#005f73]/40 focus:border-[#005f73] h-20 resize-none"
                />

                {errorDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorDescription}
                  </p>
                )}
              </div>
            </div>

          </div>
        </form>
      </div>

      {/* FOOTER */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between items-center px-4 sm:px-6 py-3 border-t bg-white">

        <button
          onClick={handleCancel}
          type="button"
          className="w-full sm:w-auto bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition duration-300 shadow-md text-sm"
        >
          Cancel
        </button>

        <button
          form="role-form"
          type="submit"
          disabled={showLoader}
          className={`w-full sm:w-auto bg-gradient-to-r from-[#00304e] to-[#005f73] text-white px-4 sm:px-6 py-2 rounded-lg hover:scale-105 transition duration-300 shadow-md text-sm ${
            showLoader ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {showLoader ? (
            <span className="flex items-center gap-2">
              <MiniLoader />
              {editId ? "Updating" : "Submitting"}
            </span>
          ) : (
            editId ? "Update" : "Submit →"
          )}
        </button>

      </div>

    </div>
  </div>
)}

      
        <div className="mt-8">
         

          
         
             <h3 className="text-lg font-semibold mb-4">Added Roles</h3>
              <div className="flex flex-wrap gap-3 mb-4 justify-between items-center">
      <div className="flex flex-wrap gap-5">

 
  <button
   onClick={() => {
  setActiveRole("all");
  setPage(1);
  fetchRoles(1, "all", search);

}}
    className={`text-sm px-6 py-2 border rounded-md transition
      ${activeRole === "all"
        ? "bg-[#00304e] text-white"
        : "bg-white hover:bg-[#e6f2f5]"
      }`}
  >
    All
  </button>

 
  <button
  onClick={() => {
  setActiveRole("doctor");
  setPage(1);
  fetchRoles(1, "doctor", search);
}}
    className={`text-sm px-6 py-2 border rounded-md transition
      ${activeRole === "doctor"
        ? "bg-[#00304e] text-white"
        : "bg-white hover:bg-[#e6f2f5]"
      }`}
  >
    Doctor
  </button>

  
  <button
onClick={() => {
  setActiveRole("nurse");
  setPage(1);
  fetchRoles(1, "nurse", search);
}}
    className={`text-sm px-6 py-2 border rounded-md transition
      ${activeRole === "nurse"
        ? "bg-[#00304e] text-white"
        : "bg-white hover:bg-[#e6f2f5]"
      }`}
  >
    Nurse
  </button>

 
  <button
  onClick={() => {
  setActiveRole("patient");
  setPage(1);
  fetchRoles(1, "patient", search);
}}
    className={`text-sm px-6 py-2 border rounded-md transition
      ${activeRole === "patient"
        ? "bg-[#00304e] text-white"
        : "bg-white hover:bg-[#e6f2f5]"
      }`}
  >
    Patient
  </button>

</div>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-60 pl-10 pr-4 py-2 rounded-full border border-[#00304e] focus:outline-none focus:ring-2 focus:ring-[#00304e]/40 text-sm"
              />
              <svg
                className="w-4 h-4 text-[#00304e] absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

         
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="min-w-[750px] bg-white w-full border-collapse text-sm">
              <thead className="bg-[#1b2b41] text-white">
                <tr>
                  <th className="px-3 py-3 text-left">Role</th>
                  <th className="px-3 py-3 text-left">Name</th>
                  <th className="px-3 py-3 text-left">Age</th>
                  <th className="px-3 py-3 text-left">Email</th>
                  <th className="px-3 py-3 text-left">Description</th>
                  <th className="px-3 py-3 text-left">Action</th>
                  <th className="px-3 py-3 text-left">Status</th>
                </tr>
              </thead>
<tbody>
  {roles.map((item, index) => (
    <tr
      key={index}
      className="border-t hover:bg-gray-50 transition"
    >
      
      {/* ROLE (NEW BADGE STYLE) */}
      <td className="px-3 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getRoleStyles(
            item.role
          )}`}
        >
          {item.role}
        </span>
      </td>

      <td className="px-3 py-3">{item.name}</td>
      <td className="px-3 py-3">{item.age}</td>
      <td className="px-3 py-3 break-all">{item.email}</td>

      <td className="px-3 py-3 break-words max-w-[180px]">
        {item.description}
      </td>

      {/* ACTIONS */}
      <td className="px-3 py-3">
        <div className="flex gap-3 text-lg">
          <FaEdit
            onClick={() => handleEdit(item)}
            className="cursor-pointer text-green-600 hover:scale-110 transition"
          />

          <FaTrashAlt
            onClick={() => handleDelete(item._id)}
            className="cursor-pointer text-red-600 hover:scale-110 transition"
          />

          {LoaderId === item._id ? (
            <MiniLoader />
          ) : (
            <FaKey
              onClick={() => handleResend(item._id)}
              className="cursor-pointer text-gray-400 hover:text-gray-600 hover:scale-110 transition"
              title="Resend Password"
            />
          )}
        </div>
      </td>

      {/* STATUS */}
      <td className="px-3 py-3">
        <div
          onClick={() => handleStatus(item._id, item.status)}
          className="flex items-center gap-1.5 cursor-pointer"
        >
          <FaPowerOff
            className={`text-base transition-all duration-300 ${
              item.status === "active"
                ? "text-green-600"
                : "text-red-600"
            }`}
          />

          <p
            className={`text-sm font-medium ${
              item.status === "active"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {item.status === "active" ? "Active" : "Inactive"}
          </p>
        </div>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>

          {/* PAGINATION */}
  {totalPages > 1 && roles.length > 0 && (
<div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 mt-4 pb-4 text-xs">


  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-2 py-1 rounded-md border text-gray-600 
    hover:bg-[#00455c] hover:text-white transition 
    disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Pre
  </button>

 
  <div className="flex items-center gap-1">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
      <button
        key={pg}
        onClick={() => setPage(pg)}
        className={`w-6 h-6 flex items-center justify-center rounded text-[11px] border transition
        ${
          page === pg
            ? "bg-[#00455c] text-white border-[#00455c]"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
      >
        {pg}
      </button>
    ))}
  </div>

  
  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-2 py-1 rounded-md border text-gray-600 
    hover:bg-[#00455c] hover:text-white transition 
    disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Next
  </button>

</div>
)}
        </div>
      </div>
    </div>
  );
}

export default ManageRoles;