import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaTasks, FaSearch, FaPlus } from "react-icons/fa";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeModal = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setShowTaskForm(false);
      setAnimateOut(false);
    }, 300);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchInput.trim());
    }
  };

  const handleSearchIconClick = () => {
    setSearchQuery(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <div>
      <nav className="x bg-white text-[#3B2171] shadow-md select-none">
        <div className="py-4 px-6 md:px-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <FaTasks className="text-[#3B2171]" />
            ORITSO TASK
          </h2>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-gray-300 px-3 py-1 rounded-md flex-1 max-w-md mx-4 border-2 border-purple-300">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="bg-transparent outline-none w-full text-gray-700"
            />
            <FaSearch
              className="text-gray-500 cursor-pointer mr-2"
              onClick={handleSearchIconClick}
              title="Click to search"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-lg text-[#683fbb] ml-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-6 text-lg md:text-xl font-semibold">
            <button
              className="bg-[#3B2171] text-white px-4 py-2 rounded-md hover:bg-[#2d175a]"
              onClick={() => setShowTaskForm(true)}
            >
              <FaPlus className="inline mr-2" />
              Add Task
            </button>
            <span className="text-[#3B2171]">{userName}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-start px-6 pb-4 gap-4 text-lg font-semibold">
            <div className="flex items-center w-full bg-gray-300 px-3 py-2 rounded-md border-2 border-purple-300">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="bg-transparent outline-none w-full text-gray-700"
              />
              <FaSearch
                className="text-gray-500 cursor-pointer mr-2"
                onClick={handleSearchIconClick}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-lg text-[#683fbb] ml-2"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setShowTaskForm(true);
              }}
              className="bg-[#3B2171] text-white px-4 py-2 rounded-md w-full text-left"
            >
              <FaPlus className="inline mr-2" />
              Add Task
            </button>
            <span>{userName}</span>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Modal for Add Task */}
      {showTaskForm && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
            animateOut ? "animate-fade-out" : "animate-fade-in"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg p-6 w-full max-w-xl relative ${
              animateOut ? "animate-slide-down" : "animate-slide-up"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-black"
            >
              <FaTimes />
            </button>
            <TaskForm onClose={closeModal} />
          </div>
        </div>
      )}

      {/* Task Display */}
      <div className="p-6 md:p-10">
        <h2 className="text-2xl text-center font-bold mb-6 text-white">
          Your Tasks
        </h2>
        <TaskCard searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Dashboard;
