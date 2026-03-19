import React from "react";
import { FaUserMd, FaUser, FaFemale } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import DashboardCard from "../../component/admin/DashboardCard";

function Dashboard() {

  const { roles } = useOutletContext();

  const doctorCount = roles.filter((item) => item.role === "doctor").length;
  console.log(roles)
  const patientCount = roles.filter((item) => item.role === "patient").length;
  const nurseCount = roles.filter((item) => item.role === "nurse").length;

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