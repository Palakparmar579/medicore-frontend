import React, { useEffect, useState } from "react";
import { FaUserMd,FaUsers } from "react-icons/fa";
import axios from "axios";
import DashboardCard from "../../component/CommonPages/DashboardCard";
import {
  BarChart,
  Pie,
  PieChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from "recharts";

import { HiUsers } from "react-icons/hi";
import { GiNurseFemale } from "react-icons/gi";

function Dashboard() {
  const [stats, setStats] = useState({
    doctor: 0,
    nurse: 0,
    patient: 0,
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/auth/dashBoardStats`
      );
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };
 

    const totalCount = stats.total;
  const doctorCount = stats.doctor;
  const nurseCount = stats.nurse;
  const patientCount = stats.patient;

  
  const data = [
   
    { role: "Doctor", users: doctorCount },
    { role: "Nurse", users: nurseCount },
    { role: "Patient", users: patientCount },
  ];

  
  const getColor = (role) => {
    if (role === "Doctor") return "#1b2b41";   
    if (role === "Nurse") return "#a3f3f1";    
    return "#e0e0e0";                         
  };
const cards = [
   {
    title: "Total Users",
    count: totalCount,
    icon: <FaUsers className="text-xl text-green-400" />,
  },
  {
    title: "Total Doctors",
    count: doctorCount,
    icon: <FaUserMd className="text-xl text-sky-300" />,
  },
  {
    title: "Total Patients",
    count: patientCount,
    icon: <HiUsers className="text-xl text-rose-300" />,
  },
  {
    title: "Total Nurses",
    count: nurseCount,
    icon: <GiNurseFemale className="text-xl text-violet-300" />,
  },
];
  return (
    <div className="min-h-screen">
      <div className="max-w-[1140px] mx-auto px-3 sm:px-6 lg:px-8">

      
        <div className="mb-6 mt-4">
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#00304e] to-[#005f73] bg-clip-text text-transparent">
            Dashboard
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Welcome back Admin
          </p>
        </div>

       
      <div className="mt-4">
  <div className="
    grid gap-4
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
  ">
    {cards.map((card, index) => (
      <div key={index} className="w-full">
        <DashboardCard
          title={card.title}
          count={card.count}
          icon={card.icon}
        />
      </div>
    ))}
  </div>
</div>
      </div>

      <div className="flex flex-col w-full lg:flex-row gap-15 mt-8 px-4 lg:px-16">

       
        <div className="w-full  lg:w-1/2 h-[420px] bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
            Users by Role
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Overview of how users are distributed across different roles.
          </p>

          <ResponsiveContainer width="90%" height="88%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

              <XAxis dataKey="role" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />

              <Tooltip />

              <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.role)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="w-full lg:w-1/2 h-[420px] bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
            User Distribution
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Percentage breakdown of users based on roles.
          </p>

          <ResponsiveContainer  width="100%" height="88%">
            <PieChart>
              <Pie
                data={data}
                dataKey="users"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={70}
                paddingAngle={4}
                stroke="none"
                label={({ percent }) =>
                  `${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.role)} />
                ))}
              </Pie>

              <Tooltip />

             
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xl sm:text-2xl font-bold fill-gray-800"
              >
                {doctorCount + nurseCount + patientCount}
              </text>

              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs sm:text-sm fill-gray-500"
              >
                Total Users
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;