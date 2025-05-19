import React, { useState } from "react";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc"; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem(
          "user",
          JSON.stringify({ name: result.name, token: result.token })
        );
        if (!result.name) {
          localStorage.setItem("user", JSON.stringify({ name: formData.name }));
        }
        console.log("Signup successful:", result.message);

        window.location.href = "/login";
      } else {
        const error = await response.text();
        console.error("Signup failed:", error);
      }
    } catch (err) {
      console.error("Network error:", err);
      console.log(JSON.stringify(formData));
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      <div className="flex flex-col items-center justify-center mb-4  bg-white w-full max-w-[500px] p-5 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4  w-full">
          <h1 className="text-2xl text-[#432383]  font-bold w-full text-center">
            Sign Up
          </h1>
          <p className="text-center text-gray-600">
            Create an account to manage your tasks
          </p>

          <label className="text-gray-700 text-left font-bold">Username</label>
          <input
            name="name"
            type="text"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="border-2 text-lg p-1 text-[#8f68de] rounded focus:outline-none border-gray-700"
          />

          <label className="text-gray-700 text-left font-bold font-sans">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 text-lg p-1 text-[#8f68de] rounded focus:outline-none border-gray-700"
          />

          <label className="text-gray-700 text-left font-bold">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 text-lg p-1 text-[#8f68de] rounded focus:outline-none border-gray-700"
          />

          <div className="flex flex-col sm:flex-row justify-around items-center gap-4 mt-4">
            <Button
              type="submit"
              text="Sign Up"
              className="w-full sm:w-32 "
            />
            <Button
              text="Reset"
              onClick={handleReset}
              className="w-full sm:w-32 "
            />
          </div>
        </form>

        <div className="flex justify-center items-center mt-4">
          <Button
            type="button"
            onClick={() => {
              window.location.href =
                "http://localhost:8080/oauth2/authorization/google";
            }}
            className="w-[250px] border-3 border-[#0a0808] text-black font-bold hover:bg-black"
            text={
              <span className="flex items-center justify-center  gap-2">
                <FcGoogle size={22} />
                Sign Up with Google
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
