import React from "react";

function DashboardCard({ title, count, icon }) {
  return (
    <div className="min-w-[250px] flex justify-between items-center p-7 rounded-2xl text-white shadow-xl bg-gradient-to-r from-[#003164] to-teal-500">

      <div className="bg-white/25 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold">{count}</p>
      </div>
    </div>
  );
}
export default DashboardCard;