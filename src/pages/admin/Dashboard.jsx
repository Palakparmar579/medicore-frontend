import React, { useEffect, useState } from "react";
import { FaUserMd, FaUser, FaFemale } from "react-icons/fa";
import axios from "axios";
import DashboardCard from "../../component/admin/DashboardCard";

function Dashboard() {
const [stats,setStats]=useState({
  doctor:"",
  nurse:"",
  patient:""
})

useEffect(()=>{
  fetchStats();
},[])
 const backendUrl=import.meta.env.VITE_BACKEND_URL;

 const fetchStats=async()=>{
  try{
    const response=await axios.get(
      `${backendUrl}/api/auth/dashBoardStats`);
      setStats(response.data)
      console.log(response.data)
  }
  catch(error){
         console.log(error)
  }
 }
 const doctorCount=stats.doctor;
 const nurseCount=stats.nurse;
 const patientCount=stats.patient
  const cards = [
    {
      title: "Doctor",
      count: doctorCount,
      icon: <FaUserMd className="text-4xl" />,
    },
    {
      title: "Patient",
      count: patientCount,
      icon: <FaUser className="text-4xl" />,
    },
    {
      title: "Nurse",
      count: nurseCount,
      icon: <FaFemale className="text-4xl" />,
    },
  ];

  return (
    <div className="bg-white">

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-6 mt-4">
          <h3 className="text-3xl font-extrabold">Dashboard</h3>
          <p className="text-gray-500">Welcome back Admin</p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-14">
          {cards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              count={card.count}
              icon={card.icon}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;