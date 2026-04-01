import React from "react";
import transparentLogo from "../../assets/transparentLogo.png";
import user from "../../assets/user.svg";
import {
  FaColumns,
  FaSignOutAlt,
  FaUser,
  FaCalendarCheck,
} from "react-icons/fa";
import {NavLink } from "react-router-dom";

const DoctorSlidebar = ({ handleLogout, handleProfile }) => {
  return (
    <div
      className="
      fixed left-0 top-0 h-screen
      bg-gradient-to-b from-[#00304e] via-[#01253c] to-[#021c2d]
      border-r border-[#0b4666]
      shadow-2xl
      flex flex-col
      w-56
      px-5
      py-6
      relative
      "
    >
      {/* Glow line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00c6ff] to-transparent opacity-40"></div>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <img src={transparentLogo} className="w-10 drop-shadow-md" />
        <h3 className="text-xl font-semibold text-white tracking-wide">
          MediCore
        </h3>
      </div>

      {/* Heading */}
      <h3 className="text-gray-400 text-xs tracking-widest mb-4 ml-1">
        MAIN MENU
      </h3>

      {/* Menu */}
      <ul className="space-y-3">
        {/* Dashboard */}
        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) =>
            `group flex items-center gap-3 text-[14px] px-3 py-2 rounded-lg transition-all duration-300
    ${isActive ? "bg-[#0b4666] text-white" : "text-[#c7d3da] hover:bg-[#0b4666] hover:text-white"}`
          }
        >
          <div className="bg-[#0b4666] group-hover:bg-[#0d5d86] p-2 rounded-md transition">
            <FaColumns className="text-white text-sm" />
          </div>
          Dashboard
        </NavLink>

        {/* My Patient */}
        <NavLink
          to="/doctor/patient"
          className={({ isActive }) =>
            `group flex items-center gap-3 text-[14px] px-3 py-2 rounded-lg transition-all duration-300
    ${isActive ? "bg-[#0b4666] text-white" : "text-[#c7d3da] hover:bg-[#0b4666] hover:text-white"}`
          }
        >
          <div className="bg-[#0b4666] group-hover:bg-[#0d5d86] p-2 rounded-md transition">
            <FaColumns className="text-white text-sm" />
          </div>
          My Patient
        </NavLink>

        {/* Appointment */}
        <NavLink
          to="/doctor/appointments"
          className={({ isActive }) =>
            `group flex items-center gap-3 text-[14px] px-3 py-2 rounded-lg transition-all duration-300
    ${isActive ? "bg-[#0b4666] text-white" : "text-[#c7d3da] hover:bg-[#0b4666] hover:text-white"}`
          }
        >
          <div className="bg-[#0b4666] group-hover:bg-[#0d5d86] p-2 rounded-md transition">
            <FaColumns className="text-white text-sm" />
          </div>
          Appointments
        </NavLink>
      </ul>

      {/* Divider */}
      <div className="border-t border-[#0b4666] my-10 opacity-60"></div>

      {/* Profile Section */}
      <div className="mt-auto text-center">
        <div
          className="
          bg-white/10
          backdrop-blur-md
          p-5
          rounded-xl
          border border-white/10
          shadow-lg
          "
        >
          <div className="w-14 bg-white rounded-full p-1 mx-auto shadow-md">
            <img src={user} className="w-full h-8 rounded-full" />
          </div>

          <h3
            onClick={handleProfile}
            className="
            text-[15px]
            font-semibold
            text-white
            mt-3
            cursor-pointer
            hover:text-[#9ed6ff]
            transition
            "
          >
            Doctor
          </h3>

          <button
            onClick={handleLogout}
            className="
            flex justify-center items-center gap-2
            text-sm
            text-white
            bg-gradient-to-r from-[#0b4666] to-[#095377]
            px-4 py-2
            rounded-md
            mt-4
            w-full
            shadow-md
            hover:scale-[1.03]
            hover:from-[#095377] hover:to-[#0b4666]
            transition-all
            active:scale-95
            "
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSlidebar;
