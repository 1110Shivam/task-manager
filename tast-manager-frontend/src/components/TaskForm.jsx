import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

const TaskForm = ({ onClose, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    const parsed = JSON.parse(storedUser);
    const token = parsed.token;

    try {
      const response = await fetch("http://localhost:8080/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create task: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      // console.log("Task created:", data);
      toast.success("Task created successfully!");

      if (onTaskCreated) {
        onTaskCreated(); 
      }
      onClose();
    } catch (err) {
      toast.error("Failed to create task");
      // console.error("Error creating task:", err);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      status: "",
      remarks: "",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 md:mx-0 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-600"
        >
          ×
        </button>

        <h1 className="text-2xl text-[#432383] font-bold text-center">
          Create Task
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Enter task details below
        </p>

        <label className="text-gray-700 font-bold">Task Title</label>
        <input
          name="title"
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="border-2 text-lg p-1 text-[#8f68de] rounded focus:outline-none border-gray-700 w-full"
        />

        <label className="text-gray-700 font-bold mt-2">Task Description</label>
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="border-2 text-lg p-1 text-[#8f68de] rounded focus:outline-none border-gray-700 w-full"
          rows={4}
        />

        <label className="text-gray-700 font-bold mt-2">Task Due Date</label>
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className="border-2 text-lg p-1 text-[#8f68de] rounded focus:outline-none border-gray-700 w-full"
        />

        <label className="text-gray-700 font-bold mt-2">Task Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border-2 text-lg p-1 text-[#8f68de] rounded focus:outline-none border-gray-700 w-full"
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In_Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label className="text-gray-700 font-bold mt-2">Task Remarks</label>
        <input
          name="remarks"
          type="text"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="border-2 text-lg p-1 text-[#8f68de] rounded focus:outline-none border-gray-700 w-full"
        />

        <div className="flex flex-col sm:flex-row justify-around items-center gap-4 mt-6">
          <Button type="submit" text="Save Task" className="w-full sm:w-32" />
          <Button
            text="Reset"
            onClick={handleReset}
            className="w-full sm:w-32"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
