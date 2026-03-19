import React from "react";

function PatientDashboard() {
  return (
    <div className="min-h-screen bg-white py-4">
      <div className="max-w-[1140px] mx-auto">

        {/* Welcome Card */}
        <div
          className="
          bg-gradient-to-r from-[#00304e] via-[#003e47] to-[#00413c]
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
              Patient
            </span>{" "}
            <span className="bg-gradient-to-r from-gray-200 to-blue-300 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h2>

          {/* Short Paragraph */}
          <p className="text-gray-300 text-[13px] leading-relaxed max-w-[720px]">
            How are you feeling today? Welcome to your{" "}
            <span className="text-gray-200 font-semibold">patient dashboard</span>. 
            Here you can check your{" "}
            <span className="text-blue-200 font-medium">appointments</span>, view{" "}
            <span className="text-gray-200 font-medium">medical reports</span>, 
            and stay updated with your healthcare information.
          </p>

        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;