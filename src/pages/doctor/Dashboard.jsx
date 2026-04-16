import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function DoctorDashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [myDepartment, setmyDepartment] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchDeptData();
  }, []);

  const fetchDeptData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/assignment/getAssignment`
      );

      const data = response.data;

      const department = data.find((item) =>
        item.doctors?.some(
          (doc) => doc._id?.toString() === userId
        )
      );

      setmyDepartment(department);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong in fetch get api"
      );
    }
  };

  const loggedUser = myDepartment?.doctors?.find(
    (doc) => doc._id?.toString() === userId
  );

  const otherDoctors = myDepartment?.doctors?.filter(
    (doc) => doc._id?.toString() !== userId
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1140px] mx-auto px-4">

        <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-cyan-200 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-gray-200 opacity-20 rounded-full blur-3xl"></div>

          {myDepartment ? (
            <>
              
              <h2 className="text-2xl font-bold mb-3 text-gray-800">
                Welcome {loggedUser?.name || ""}
              </h2>

             
              <p className="text-sm leading-relaxed max-w-[720px] text-gray-700">
                You are part of the{" "}
                <span className="font-semibold text-gray-900">
                 {myDepartment.department?.department}
                </span>{" "}
                department, working alongside{" "}
                <span className="font-medium text-gray-800">
                  {otherDoctors?.map((doc) => `${doc.name}`).join(", ")}
                </span>{" "}
                and{" "}
                <span className="font-medium text-gray-800">
                  {myDepartment.nurses
                    ?.map((nur) => `Nurse ${nur.name}`)
                    .join(", ")}
                </span>
                .
              </p>
            </>
          ) : (
            <p className="text-gray-600">
              No department assigned yet.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;