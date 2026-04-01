import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slidebar from '../component/admin/Slidebar'
import { Outlet } from 'react-router-dom';
import {toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationLog from '../pages/admin/ConfirmLog';
import DeleteConformation from '../pages/admin/DeleteConformation';
import MiniLoader from '../component/admin/MiniLoader';


function AdminLayout(){
     const navigate = useNavigate()
     const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [showLoader,setShowLoader]=useState(false)
     const [confirmLog, setconfirmLog] = useState(false)
     const [showDeleteConf,setshowDeleteConf]=useState(false)
     const [roles, setRoles] = useState([]);
     const [deleteId,setDeleteId]=useState("")
     const [page,setPage]=useState(1);
     const [totalPages,settotalPages]=useState(1);
     const limit=6;

          useEffect(() => {
          fetchRoles(page)
     }, [page])


     const handleLogout = () => {
          setconfirmLog(true)
     }
     const handleCancel = () => {
          setconfirmLog(false)
     }
     const handleCross = () => {
          setconfirmLog(false)
     }

     const handleConfirm = () => {
           setconfirmLog(false); 
           setShowLoader(true);

         setTimeout(() => {
        setShowLoader(false);   
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.success("Logged out successfully 👋");
        navigate('/Login');    
    }, 2000);
}
     


     
      const onClose=()=>{
      setshowDeleteConf(false)
  }
  const handleDelete=(id)=>{
     setDeleteId(id)
    console.log("delete clicked");
    setshowDeleteConf(true);
  }
  const onConfirm=async()=>{
     setshowDeleteConf(false);
    try{

        await axios.delete(`${backendUrl}/api/auth/deleteUser/${deleteId}`);
          const restUser=roles.filter((item)=>item._id!==deleteId);
          setRoles(restUser);
           toast.success("User deleted successfully");
    }
    catch(error)
    {
     toast.error("Failed to delete item");         
    }

  }

     const fetchRoles = async (pageNumber=1) => {
          try {              
               const response = await axios.get(
                    `${backendUrl}/api/auth/pagination?page=${pageNumber}&limit=${limit}`);
               setRoles(response.data.data);
               setPage(response.data.page);
               settotalPages(response.data.totalPages);
          }
          catch (error) {
               console.log(error)
          }
     }


     return (
          <div>
               <div className='flex'>
                    <Slidebar
                         handleLogout={handleLogout}
                    />
                    <div className='flex pl-6'>
                         <Outlet context={{ roles, setRoles, fetchRoles,handleDelete,page,setPage,totalPages }} />
                    </div>
                    {confirmLog &&
                         <ConfirmationLog
                              handleCancel={handleCancel}
                              handleConfirm={handleConfirm}
                              handleCross={handleCross}
                         />}
                         {showDeleteConf&&(
                         <DeleteConformation
                           onClose={onClose}
                           onConfirm={onConfirm}
                         />
                        
                        ) }
                     {showLoader && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-[1100]">
    <MiniLoader size="w-12 h-12" />
  </div>
)}
               </div>
          </div>
     )
}

export default AdminLayout
