import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AllTask = () => {

  const { currentUser } = useContext(AuthContext);

  // ✅ Safe tasks
  const tasks = currentUser?.tasks || [];

  // ✅ Calculate counts
  const newTask = tasks.filter(t => t.status === "new").length;
  const active = tasks.filter(t => t.status === "active").length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const failed = tasks.filter(t => t.status === "failed").length;

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>

      {/* Header */}
      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>Name</h2>
        <h3 className='text-lg font-medium w-1/5'>New</h3>
        <h5 className='text-lg font-medium w-1/5'>Active</h5>
        <h5 className='text-lg font-medium w-1/5'>Completed</h5>
        <h5 className='text-lg font-medium w-1/5'>Failed</h5>
      </div>

      {/* Data */}
      <div className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>
          {currentUser?.name || "User"}
        </h2>

        <h3 className='text-lg font-medium w-1/5 text-blue-400'>
          {newTask}
        </h3>

        <h5 className='text-lg font-medium w-1/5 text-yellow-400'>
          {active}
        </h5>

        <h5 className='text-lg font-medium w-1/5 text-white'>
          {completed}
        </h5>

        <h5 className='text-lg font-medium w-1/5 text-red-600'>
          {failed}
        </h5>
      </div>

    </div>
  );
};

export default AllTask;