import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-[#3B2171] shadow-md select-none">
      <div className="py-4 px-6 md:px-10 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl select-none font-bold flex items-center gap-2">
          <FaTasks className="text-[#3B2171]" />
          TASK MANAGER
        </h2>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-lg md:text-xl font-semibold">
          <Link to="/">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start px-6 pb-4 gap-4 text-lg font-semibold">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/rule" onClick={() => setIsMenuOpen(false)}>
            Sign Up
          </Link>
          <Link to="/play" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
