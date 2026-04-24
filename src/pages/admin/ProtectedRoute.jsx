import React, { useEffect,useState } from 'react';
import { decryptData } from "../../utils/encrypt";
import { Outlet, Navigate } from 'react-router-dom';
import api from '../../Config/Axios';
const ProtectedRoute = () => {
  const [isValid,setIsValid]=useState(null)

  const token =localStorage.getItem("token");
  const role = decryptData(localStorage.getItem("role"));

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  
   if (!role) {
    return <Navigate to='/login' replace />;
   }
 
 useEffect(()=>{
  const tokenVerifyApi=async()=>{
    try{
       const response=await api.get("/api/auth/tokenVerify");
       setIsValid(response.data.valid)
    }
    catch(error){
   setIsValid(false)
    }
   }
   if(token){
  tokenVerifyApi();
   }else{
    setIsValid(false);
   }
 },[token])

   
 if (isValid === null) {
    return null; 
  }

  if (!isValid) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }



  return <Outlet />;
};

export default ProtectedRoute;