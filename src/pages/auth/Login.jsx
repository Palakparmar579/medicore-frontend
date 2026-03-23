import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, seterrorEmail] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [showDisabled, setshowDisabled] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleForget = () => {
    navigate("/forgetPass");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    seterrorEmail("");
    seterrorPassword("");
    setError("");
    setshowDisabled(false);
  };

  const isFormFilled = form.email && form.password;

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Backend URL:", backendUrl);
    console.log("Form Data:", form);

    if (!form.email) {
      return seterrorEmail("Please enter your email");
    }

    if (!emailPattern.test(form.email)) {
      return seterrorEmail(
        "Please enter a valid email address (example: user@example.com)"
      );
    }

    if (!form.password) {
      return seterrorPassword("Please enter your password");
    }

    if (!passwordPattern.test(form.password)) {
      return seterrorPassword(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
    }

    setError("");

    try {
      if (showDisabled) return;
      setshowDisabled(true);

      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        form
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
        toast.success("Login Successfully!");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);

        const role = response.data.user.role;

        // ✅ FIXED: Removed setTimeout + added else-if
        if (role === "admin") {
          navigate("/admin", { replace: true });
        } else if (role === "doctor") {
          navigate("/doctor", { replace: true });
        } else if (role === "patient") {
          navigate("/patient", { replace: true });
        } else if (role === "nurse") {
          navigate("/nurse", { replace: true });
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login Failed, something went wrong"
      );
      setshowDisabled(false);
    }

    setForm({
      email: "",
      password: "",
    });

    // ✅ FIXED: was true (wrong)
    setshowDisabled(false);
  };

  return (
    <div className="min-h-screen bg-[#00304e] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-sm max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-white/90 to-transparent backdrop-blur-xl shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">
        {error && (
          <p className="text-red-500 text-center mb-2 text-sm sm:text-base">
            {error}
          </p>
        )}

        <h2 className="text-xl sm:text-2xl md:text-3xl text-white text-center font-semibold">
          Sign in
        </h2>

        <p className="text-[#e8f7ff] text-center mt-2 sm:mt-3 mb-5 sm:mb-6 text-sm sm:text-base">
          Enter your credentials to log in
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4 sm:mb-5">
            <input
              type="email"   // ✅ FIXED (removed pattern issue)
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-[#00304e] outline-none focus:border-white text-sm sm:text-base"
              required
            />
          </div>

          {errorEmail && (
            <p className="text-red-600 mb-2 sm:mb-3 text-xs sm:text-base">
              {errorEmail}
            </p>
          )}

          {/* Password */}
          <div className="mb-4 sm:mb-5 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-[#00304e] outline-none focus:border-white text-sm sm:text-base"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 sm:top-3 cursor-pointer text-white text-sm sm:text-base"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {errorPassword && (
            <p className="text-red-600 mb-2 sm:mb-3 text-xs sm:text-base">
              {errorPassword}
            </p>
          )}

          {/* Remember + Forgot */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm mb-4 sm:mb-6 gap-2 sm:gap-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-1 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-white cursor-pointer text-xs sm:text-sm"
              >
                Remember me
              </label>
            </div>

            <span
              onClick={handleForget}
              className="text-blue-900 cursor-pointer text-xs sm:text-sm"
            >
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={showDisabled}
            className={`${
              !isFormFilled || showDisabled
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:scale-105 active:scale-95"
            } w-full py-2 sm:py-3 rounded-md text-white transition-all duration-300 ease-in-out bg-[#00416A] hover:bg-[#035a90] shadow-md hover:shadow-lg text-sm sm:text-base`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;