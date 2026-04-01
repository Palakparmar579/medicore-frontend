import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import ProtectedRoute from './pages/admin/ProtectedRoute';
import Login from './pages/auth/Login';
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ManageRoles from './pages/admin/ManageRoles';
import AdminLayout from './Layout/AdminLayout';
import DoctorLayout from './Layout/DoctorLayout'
import NurseLayout from './Layout/NurseLayout'
import PatientLayout from './Layout/PatientLayout'
import Dashboard from './pages/admin/Dashboard';
import PatientDashboard from './pages/patients/DashBoard';
import NurseDashboard from './pages/nurse/Dashboard';
import DoctorDashboard from './pages/doctor/Dashboard';

import { Toaster } from "react-hot-toast";
function App(){ 
return(
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
           
         <Route element={<ProtectedRoute />}>

        {/* Admin Layout with nested pages */}
        <Route path="/admin" element={<AdminLayout />}>
         {/* Default page */}
         <Route index element={<Navigate to ='Dashboard' replace/>} />
         <Route path="dashboard" element={<Dashboard />} />
        <Route path="manageRoles" element={<ManageRoles />} />
        </Route> {/* <-- Properly close the parent Route */}

        <Route path='/doctor' element={<DoctorLayout/>}>
        <Route index element={<Navigate to ='Dashboard' replace/>} />
        <Route path='dashboard' element={<DoctorDashboard/>}/>
        </Route>
        {/* Doctor */}

         <Route path='/patient' element={<PatientLayout/>}>
       <Route index element={<Navigate to ='Dashboard' replace/>} />
        <Route path='dashboard' element={<PatientDashboard/>}/>
        </Route>

         <Route path='/nurse' element={<NurseLayout/>}>
        <Route index element={<Navigate to ='Dashboard' replace/>} />
        <Route path='dashboard' element={<NurseDashboard/>}/>
        </Route>
        </Route>
      </Routes>
        <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
     <Toaster
  position="top-center"         // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
  reverseOrder={false}          // new toasts on top or bottom
  gutter={8}                    // space between toasts
  containerClassName=""          // optional extra class for container
  containerStyle={{}}            // inline style for container
  toastOptions={{
    // Default options for all toasts
    duration: 3000,              // how long toast shows (ms)
    style: {
      background: "#00304e",
      color: "#fff",
      padding: "16px",
      borderRadius: "10px",
      fontWeight: "500",
    },
    success: {
      duration: 2000,
      icon: '✅',
    },
    error: {
      duration: 4000,
      icon: '❌',
      style: {
        background: "#ff4d4f",
        color: "#fff",
      },
    },
    warning: {
      duration: 3000,
      icon: '⚠️',
      style: {
        background: "#ffcc00",
        color: "#000",
      },
    },
    // You can add more types or override defaults
  }}
/>
    </BrowserRouter>

    //<Navbar/>
  );
}

export default App;