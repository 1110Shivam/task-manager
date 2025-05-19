import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="w-full px-6 py-10 flex flex-col lg:flex-row items-center justify-around gap-10 select-none">
      <div className="w-full lg:w-1/2 flex flex-col items-center  text-center mt-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 w-max">
          Welcome To Oritso Task
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center w-max">
          Sign Up or Login to Manage Your Task
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup">
            <Button text="Sign Up" />
          </Link>
          <Link to="/login">
            <Button text="Login" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
