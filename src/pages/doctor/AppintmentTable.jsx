import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast"
const AppointmentTable = () => {
   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const [getPatientApp,setgetPatientApp]=useState([])
  useEffect(()=>{
     fetchAppointment()
  },[])
  const doctorId = localStorage.getItem("userId");
  console.log("Doctor ID:", doctorId);
   const fetchAppointment=async()=>{
     try {
      const response = await axios.get(
        `${backendUrl}/api/doctorAppointment/getAppointmentByDoctor/${doctorId}`
      );
    setgetPatientApp(response.data)
   }
   catch(error){
   toast.error(error.response?.data?.message||"Something went wrong")
   }
   }
   console.log(getPatientApp)
  return (
    <div className=" min-h-screen ">
      
      
      <div className="mb-10 text-left">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#00304e] to-[#005f73] bg-clip-text text-transparent">
          Patient Appointments
        </h2>
        <p className="text-gray-600 mt-1 text-md">
          View and manage scheduled patient appointments, including date, time, and department details.
        </p>
      </div>

     
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-[750px] w-full border-collapse text-sm">
          
          <thead className="bg-[#00304e] text-white">
            <tr>
              <th className="px-3 py-3 text-left">Department</th>
              <th className="px-3 py-3 text-left border-r-gray-200">Patient Name</th>
              <th className="px-3 py-3 text-left">DOB</th>
               <th className="px-3 py-3 text-left">Gender</th>
              <th className="px-3 py-3 text-left">Time</th>
              <th className="px-3 py-3 text-left">Date</th>
              <th className="px-3 py-3 text-left">Health Issue</th>
             
            </tr>
          </thead>

          <tbody>
             {getPatientApp.map((item,index)=>(
              <tr key={index} className="border-t hover:bg-gray-50">
                

                <td className="px-3 py-3">{item.department?.department}</td>
                <td className="px-3 py-3">{item.firstName}</td>
                <td className="px-3 py-3">{item.dob.substring(0,10)}</td>
                <td className="px-3 py-3">{item.gender}</td>
                <td className="px-3 py-3">{item.time}</td>
                <td className="px-3 py-3">{item.appDate.substring(0,10)}</td>
                <td className="px-3 py-3">{item.healthIssue}</td>
              </tr>
              ))
}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AppointmentTable;