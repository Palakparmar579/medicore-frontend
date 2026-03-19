import React from "react";
import { Bell, Menu } from "lucide-react";
import whiteLogo from '../../src/assets/whiteLogo.png'

function Navbar() {
  return (
    <div className="bg-[#0B1A33] text-white px-6 py-3 flex items-center justify-between">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-8 h-8">
         <img className="w-[100%]"src={whiteLogo}></img>
        </div>

        {/* Title */}
        <h1 className="text-lg font-semibold">MediCore</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Bell Icon */}
        <Bell className="w-5 h-5 cursor-pointer" />

        {/* Menu Icon */}
        <Menu className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
}

export default Navbar;