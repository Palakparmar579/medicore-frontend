import React from "react";

function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-white py-4">
      <div className="max-w-[1140px] mx-auto">

        {/* Welcome Card */}
        <div
          className="
          bg-gradient-to-r from-[#00304e] via-[#003e47] to-[#000000]
          rounded-2xl
          shadow-xl
          p-6
          text-white
          relative
          overflow-hidden
          "
        >

          {/* Gradient glow decorations */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-gradient-to-br from-blue-400 to-gray-300 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-gradient-to-tr from-blue-500 to-gray-400 opacity-20 rounded-full blur-3xl"></div>

          {/* Heading */}
          <h2 className="text-xl font-bold italic mb-3">
            Hello{" "}
            <span className="bg-gradient-to-r from-blue-300 to-gray-200 bg-clip-text text-transparent">
              Dr.
            </span>{" "}
            <span className="bg-gradient-to-r from-gray-200 to-blue-300 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h2>

          {/* Paragraph */}
          <p className="text-gray-300 text-[13px] leading-relaxed max-w-[720px]">
            Welcome to your{" "}
            <span className="text-lightgrey font-semibold">
              doctor dashboard
            </span>
            . From here you can manage your{" "}
            <span className="text-blue-200 font-medium">appointments</span>, review{" "}
            <span className="text-gray-200 font-medium">
              patient medical records
            </span>
            , and monitor your consultation schedule efficiently. This panel
            helps you deliver{" "}
            <span className="text-lightgrey font-semibold">
              the best healthcare
            </span>{" "}
            possible.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;