import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TaskCard = ({ searchQuery, refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editTask, setEditTask] = useState(null);

  const storedUser = localStorage.getItem("user");
  const parsed = JSON.parse(storedUser);
  const token = parsed.token;

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const url =
        searchQuery && searchQuery.trim() !== ""
          ? `http://localhost:8080/api/tasks/search?keyword=${encodeURIComponent(
              searchQuery
            )}`
          : "http://localhost:8080/api/tasks/get";

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        toast.success("Task deleted successfully");
      } else {
        toast.error("Failed to delete task");
      }
    } catch (err) {
      toast.error("Something went wrong while deleting");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/${editTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editTask),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === updated.id ? updated : task))
      );
      toast.success("Task updated successfully");
      setEditTask(null);
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery, refreshTrigger]);

  if (loading) return <p className="text-gray-600">Loading tasks...</p>;
  if (tasks.length === 0) return <p className="text-white">No tasks found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg shadow-md p-4 border border-purple-200 relative text-black"
        >
          <h3 className="text-xl font-bold text-[#3B2171] mb-2">
            {task.title}
          </h3>

          <p className="mb-1">
            <span className="font-semibold">Description:</span>{" "}
            {task.description}
          </p>

          <p className="mb-1">
            <span className="font-semibold">Due Date:</span> {task.dueDate}
          </p>

          <p className="mb-1">
            <span className="font-semibold">Status:</span> {task.status}
          </p>

          <p className="mb-1">
            <span className="font-semibold">Remarks:</span>{" "}
            {task.remarks || "—"}
          </p>

          <p className="text-sm mt-2">
            <strong>Created:</strong>{" "}
            {new Date(task.createdOn).toLocaleString()}
          </p>

          <p className="text-sm">
            <strong>Updated:</strong>{" "}
            {new Date(task.updatedOn).toLocaleString()}
          </p>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setEditTask(task)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editTask && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setEditTask(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-xl text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <div className="space-y-3">
              <input
                name="title"
                value={editTask.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="w-full border p-2 rounded text-black"
              />
              <textarea
                name="description"
                value={editTask.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="w-full border p-2 rounded text-black"
              />
              <input
                name="dueDate"
                type="date"
                value={editTask.dueDate}
                onChange={handleEditChange}
                className="w-full border p-2 rounded text-black"
              />

              <select
                name="status"
                value={editTask.status}
                onChange={handleEditChange}
                className="w-full border p-2 rounded text-black"
              >
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="In_Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <input
                name="remarks"
                value={editTask.remarks}
                onChange={handleEditChange}
                placeholder="Remarks"
                className="w-full border p-2 rounded text-black"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditTask(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
