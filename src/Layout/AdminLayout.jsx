import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slidebar from '../component/admin/Slidebar'
import { Outlet } from 'react-router-dom';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationLog from '../pages/admin/ConfirmLog';
import DeleteConformation from '../pages/admin/DeleteConformation';


function AdminLayout(){
     const navigate = useNavigate()
     const backendUrl = import.meta.env.VITE_BACKEND_URL;

     const [confirmLog, setconfirmLog] = useState(false)
     const [showDeleteConf,setshowDeleteConf]=useState(false)
     const [roles, setRoles] = useState([]);
     const [deleteId,setDeleteId]=useState("")

          useEffect(() => {
          fetchRoles()
     }, [])


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
          localStorage.removeItem("token")
          localStorage.removeItem("role")
          toast.info("Logged out successfully 👋");
          setTimeout(() => {
               navigate('/Login')
          }, 3000)
          setconfirmLog(false)

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

     const fetchRoles = async () => {
          try {              
               const response = await axios.get(
                    `${backendUrl}/api/auth/getUser`);
               setRoles(response.data);
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
                         <Outlet context={{ roles, setRoles, fetchRoles,handleDelete }} />
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
               </div>
          </div>
     )
}

export default AdminLayout
