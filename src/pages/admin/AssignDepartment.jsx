import React, { useEffect, useState } from "react";
import { FaUserPlus,FaArrowLeft,FaArrowRight } from "react-icons/fa";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from "react-hot-toast";
import axios from "axios";

function AssignDepartment() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setformData] = useState({
    department: "",
    deptNo: "",
    doctors: [],
    nurses: [],
  });
  const [errorDepartment, setDepartmentError] = useState("");
  const [editId, setEditId] = useState(null);
  const [cardStatus ,setCardsStatus]=useState([])
  const [errorDoctors, setDoctorError] = useState("");
  const [errorNurses, setNursesError] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [nurAndDoc, setnurAndDoc] = useState([]);
  const [showAllDoctors, setShowAllDoctors] = useState({});
  const [assignedData, setAssignedData] = useState([]);

  // Pagination
  
    const [page,setPage]=useState(1);
        const [totalPages,settotalPages]=useState(1);
           const limit=3;

        

useEffect(() => {
  const delay = setTimeout(() => {
    fetchDepartment();
    fetchUsers();
    fetchAssignment(page);
  }, 300);

  return () => clearTimeout(delay);
}, [page]);


 const fetchAssignment = async (pageNumber = 1) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/assignment/pagination?page=${pageNumber}&limit=${limit}`,
    );
    
     setAssignedData(response.data.data);
    setPage(response.data.page);
    settotalPages(response.data.totalPages);
  } catch (error) {
    console.log(error);
  }
};

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/department/getDep`);
      setDepartmentData(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  console.log(departmentData,"555555555555555");
  const department = departmentData.filter((item) => item.status === "active");
  


  // Get api for doctor and nusrse

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/getUser`);
      setnurAndDoc(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const doctor = nurAndDoc.filter((item) => item.role === "doctor");
  const nurse = nurAndDoc.filter((item) => item.role === "nurse");

  const handleselect = (e) => {
    const value = e.target.value;

    const selected = departmentData.find((item) => item._id === value);

    if (!selected) return;

    setformData((prev) => ({
      ...prev,
       department: selected._id,
  departmentName: selected.department,
      deptNo: selected.deptNum,
    }));

    setSelectedDepartment(selected);
  };

 

  const handleAssignButton = () => {
    setEditId(null);
    setShowForm(true);
    setformData({
      department: "",
      deptNo: "",
      doctors: [],
      nurses: [],
    });
    setSelectedDepartment({});
     setDepartmentError("");
  setDoctorError("");
  setNursesError("");
  };

  const handleEdit = (item) => {
    setEditId(item._id);
   const matchedDept = departmentData.find(
  (dept) => dept._id === item.department?._id,
);
    

    setformData({
      department: matchedDept?._id || "",
      deptNo: item.deptNum,
      doctors: item.doctors || [],
      nurses: item.nurses || [],
    });

    setSelectedDepartment(matchedDept || {});
    setShowForm(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.department) {
      return setDepartmentError("Department is required!");
    }

    if (formData.doctors.length < 3) {
      return setDoctorError("Please select at least 3 doctors!");
    }

    if (formData.nurses.length < 2) {
      return setNursesError("Please select at least 2 nurses!");
    }
    if (formData.doctors.length < 3) {
      return toast.error("Select atleast 3 doctors!");
    }
    if (formData.nurses.length < 2) {
      return toast.error("Select atleast 2 nurses!");
    }
    try {
      let response;
      if (editId) {
        response = await axios.put(
          `${backendUrl}/api/assignment/editAssignment/${editId}`,
          {
            department: formData.department,
            deptNum: formData.deptNo,
            doctors: formData.doctors.map((d) => d._id),
            nurses: formData.nurses.map((n) => n._id),
          },
        );
        toast.success("Department Assignment updated successfully");
      } else {
        response = await axios.post(
          `${backendUrl}/api/assignment/addAssignment`,
          {
            department: formData.department,
            deptNum: formData.deptNo,
            doctors: formData.doctors.map((d) => d._id),
            nurses: formData.nurses.map((n) => n._id),
          },
        );
       await fetchAssignment(page);
        toast.success("Department assigned successfully");

        
      }

      setDoctorError("");
      setNursesError("");
     setDepartmentError("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setShowForm(false);
    setformData({
      department: "",
      deptNo: "",
      doctors: [],
      nurses: [],
    });
    setEditId(null);
    setSelectedDepartment({});
  };

  console.log("DEPARTMENT DATA:", departmentData);
  const handleFormCross = () => {
    setShowForm(false);
  };

  // Filtering assigned doctor and nurses id

  const assignedDoctor=assignedData.filter((item) => item._id !== editId).flatMap((item)=>item.doctors?.map((d)=>d._id) || [])
  const assignedNurses=assignedData.filter((item) => item._id !== editId).flatMap((item)=>item.nurses?.map((n)=>n._id) || [])
  console.log(assignedDoctor)
  console.log(assignedNurses)
  const availabledoctors=nurAndDoc.filter((item)=>item.role=="doctor"&&!assignedDoctor.includes(item._id))
  const availablenurses=nurAndDoc.filter((item)=>item.role=="nurse"&&!assignedNurses.includes(item._id))

  return (
    <div className="max-w-[1140px] min-h-screen mx-auto sm:px-6 lg:px-8">
     
      <div className="flex mb-4 flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-6">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00304e] to-[#005f73] bg-clip-text text-transparent">
            Assign Department
          </h3>
          <p className="text-gray-500 text-sm">
            Assign the right department for better workflow.
          </p>
        </div>

        <button
          onClick={handleAssignButton}
          className="flex items-center justify-center gap-2 
bg-[#00536e] text-white 
px-4 py-2 text-sm 
sm:px-3 sm:py-2.5 sm:text-base 
rounded-lg 
hover:bg-[#00455c] hover:shadow-lg hover:scale-105 
transition-all duration-300 
w-30 sm:w-40"
        >
          <FaUserPlus />
          Assign
        </button>
      </div>
      

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-1990">
          <div className="bg-white w-[95%] sm:w-[85%] md:w-[65%] lg:w-[50%] xl:w-[40%] rounded-2xl shadow-2xl max-h-[95vh] flex flex-col  overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#00304e] to-[#005f73]">
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Assign Department
              </h3>

              <button
                onClick={handleFormCross}
                className="text-white text-2xl hover:text-gray-300"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-6 bg-gray-50">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="bg-white p-4 rounded-xl  shadow-sm">
                  <label className="text-sm font-semibold text-gray-700">
                    Department Name
                  </label>

                  <select
                    name="department"
                    onChange={handleselect}
                    value={formData.department}
                    className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#005f73]/40 outline-none"
                  >
                    <option value="">Select Department</option>
                    {department.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.department}
                      </option>
                    ))}
                  </select>
                  {errorDepartment && (
                    <p className="text-red-500">{errorDepartment}</p>
                  )}
                </div>

                {/* Department No */} 
                <div className="bg-white p-4 rounded-xl  shadow-sm">
                  <label className="text-sm font-semibold text-gray-700">
                    Department No
                  </label>

                  <input
                    readOnly
                    value={selectedDepartment.deptNum || ""}
                    className=" text-gray-400 cursor-not-allowed w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#005f73]/40 outline-none"
                  />
                </div>

                {/* DOctor */}
                <div className="bg-white p-4 rounded-xl  shadow-sm">
                  <label className="text-sm font-semibold text-gray-700">
                    Select Doctors <span className="text-red-500">(Min 3)</span>
                  </label>

                  <div className="mt-3">
                    <Multiselect
                      options={availabledoctors}
                      displayValue="name"
                      selectedValues={formData.doctors}
                      onSelect={(list) => {
                        setformData((prev) => ({ ...prev, doctors: list }));
                        setDoctorError("");
                      }}
                      onRemove={(list) => {
                        setformData((prev) => ({ ...prev, doctors: list }));
                        if (list.length >= 3) setDoctorError("");
                      }}
                      placeholder="Select Doctors"
                      style={{
                        chips: {
                          background: "#cfd0d3",
                          color: "black",
                          borderRadius: "0.375rem",
                          padding: "4px 8px",
                        },
                      }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {formData.doctors.length}
                  </p>
                  {errorDoctors && (
                    <p className="text-red-500">{errorDoctors}</p>
                  )}
                </div>

                {/* Nurse */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <label className="text-sm font-semibold text-gray-700">
                    Select Nurses <span className="text-red-500">(Min 2)</span>
                  </label>

                  <div className="mt-3">
                    <Multiselect
                      options={availablenurses}
                      displayValue="name"
                      selectedValues={formData.nurses}
                      onSelect={(list) => {
                        setformData((prev) => ({ ...prev, nurses: list }));
                        setNursesError("");
                      }}
                      onRemove={(list) => {
                        setformData((prev) => ({ ...prev, nurses: list }));
                        if (list.length >= 2) setNursesError("");
                      }}
                      placeholder="Select Nurses"
                      style={{
                        chips: {
                          background: "#cfd0d3",
                          color: "black",
                          borderRadius: "0.375rem",
                          padding: "4px 8px",
                        },
                      }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {formData.nurses.length}
                  </p>
                  {errorNurses && <p className="text-red-500">{errorNurses}</p>}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleFormCross}
                    className="bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#00304e] to-[#005f73] text-white px-4 py-2.5 rounded-lg hover:scale-[1.02] transition shadow-md font-medium"
                  >
                    Submit →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cards ------------------------------------------------------------------*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignedData.map((item, index) => (
          <div
            key={index}
            className="relative group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden w-full"
          >
          
            <div className="absolute inset-0 bg-gradient-to-br from-[#00304e]/5 via-transparent to-gray-100 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          
            <div className="absolute left-0 top-0 h-full w-[3px] bg-[#00304e] group-hover:w-[6px] transition-all duration-300"></div>

            <div className="p-7 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-[#00304e] group-hover:text-black transition">
                  {item.department?.department}
                </h2>
            
             <span
  className={`px-3 py-[3px] text-[11px] rounded-full font-semibold
    ${
      item.department?.status === "active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
>
  {item.department?.status}
</span>

              </div>

           
              <p className="text-xs text-gray-400 mb-3 tracking-wider uppercase">
                Dept No: {item.department?.deptNum}
              </p>

              <div className="w-full h-[1px] bg-gray-200 my-3"></div>

             
              <div className="my-3">
  <h4 className="text-sm font-semibold text-gray-600 mb-1">
    Doctors
  </h4>

  <div className="flex flex-wrap gap-1.5">
    {(showAllDoctors[item._id]
      ? item.doctors
      : item.doctors?.slice(0, 2)
    )?.map((doc) => (
      <span
        key={doc._id}
        className="bg-gray-100 text-gray-800 px-2 py-[3px] rounded-md text-xs"
      >
        {doc.name}
      </span>
    ))}
  </div>


  {item.doctors?.length > 2 && (
    <div className="mt-1">
      <span
        onClick={() =>
          setShowAllDoctors((prev) => ({
            ...prev,
            [item._id]: !prev[item._id],
          }))
        }
        className="text-[#005f73] font-semibold text-xs cursor-pointer"
      >
        {showAllDoctors[item._id]
          ? "Show less"
          : `+${item.doctors.length - 2} more`}
      </span>
    </div>
  )}
</div>

            
              <div className="flex justify-between items-end gap-3 mt-3">
              
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                   Nurses
                  </h4>

                  <div className="flex flex-wrap gap-1.5">
                    {item.nurses?.slice(0, 2).map((nur) => (
                      <span
                        key={nur._id}
                        className="bg-gray-100 text-gray-800 px-2 py-[3px] rounded-md text-xs"
                      >
                        {nur.name}
                      </span>
                    ))}
                  </div>
                </div>

              
               <button
  onClick={() => {
    if (item.department?.status === "inactive") return;
    handleEdit(item);
  }}
  disabled={item.department?.status === "inactive"}
  className={`text-xs px-3 py-1.5 rounded-md whitespace-nowrap transition-all
    ${
      item.department?.status === "inactive"
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-gradient-to-r from-[#00304e] to-[#005f73] text-white hover:scale-105 cursor-pointer"
    }
  `}
>
  Edit
</button>
              </div>
            </div>

            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#00304e]/20 transition pointer-events-none"></div>
          </div>
        ))}


         {totalPages > 1 && assignedData.length > 0 && (
<div className="flex justify-end items-center gap-1 mt-4 pb-4 text-xs">


  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-2 py-1 rounded-md border text-gray-600 
    hover:bg-[#00455c] hover:text-white transition 
    disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Pre
  </button>


  <div className="flex items-center gap-1">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
      <button
        key={pg}
        onClick={() => setPage(pg)}
        className={`w-6 h-6 flex items-center justify-center rounded text-[11px] border transition
        ${
          page === pg
            ? "bg-[#00455c] text-white border-[#00455c]"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
      >
        {pg}
      </button>
    ))}
  </div>

 
  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-2 py-1 rounded-md border text-gray-600 
    hover:bg-[#00455c] hover:text-white transition 
    disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Next
  </button>

</div>
                )}
      </div>

      
    </div>
  );
}

export default AssignDepartment;
