import React, { useState, useEffect } from "react";

const ForgetPass = ({ handleCancel, handleConfirm, handleCross }) => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [emailError, setemailError] = useState("");

  useEffect(() => {
    // trigger animation on mount
    setShow(true);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return setemailError("Email is required");
    handleConfirm(email);
    setEmail("");
    setemailError("");
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[1000]
      bg-black/40 backdrop-blur-sm
      transition-opacity duration-300
      ${show ? "opacity-100" : "opacity-0"}`}
    >
      {/* Modal */}
      <div
        className={`w-sm max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-white/100  to-[#003353] backdrop-blur-xl shadow-xl rounded-2xl p-2 sm:p-8 md:p-10
  ${show ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-6 opacity-0"}`}
      >
        {/* Close Button */}
        <span
          onClick={handleCross}
          className="absolute right-3 top-2 text-[22px] text-white cursor-pointer 
          hover:text-black transition-all duration-200"
        >
          &times;
        </span>

        {/* Heading */}
        <h3 className="text-[20px] font-semibold text-gray-800">
          Forgot Password?
        </h3>

        <p className="text-[13px] text-[#00304e] font-medium mt-1">
          Request a password reset from admin
        </p>

        {/* Divider Line */}
        <div className="flex justify-center mt-3 mb-4">
          <span className="block w-92 h-[0.5px] bg-[#00304e] rounded-full"></span>
        </div>

        {/* Divider Line */}
        <div className="flex justify-center mt-3 mb-2">
          <span className="block w-92 h-[px] bg-[#00304e] rounded-full"></span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-gray-100 leading-relaxed  mb-5 px-1">
          Provide your email address and the administrator will be notified to
          initiate your password reset.
        </p>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setemailError("");
            }}
            className="w-full mb-5 px-4 py-2.5 text-black rounded-lg border 
            border-[#00304e] outline-none focus:border-white text-sm sm:text-base
            focus:outline-none transition-all duration-300"
          />
          {emailError && <p className="text-red-600">{emailError}</p>}
          {/* Buttons */}
          <div className="flex border-t border-[#00304e]">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 text-gray-200 font-medium hover:bg-[#00304e] 
              transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!email}
              className={`flex-1 py-3 font-medium border-l border-[#00304e] transition-all duration-300
              ${
                email
                  ? "text-[#00304e] hover:bg-[#00304e] hover:text-white active:scale-95 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
