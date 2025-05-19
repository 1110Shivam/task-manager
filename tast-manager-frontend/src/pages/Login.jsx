import React, { useState } from "react";
import Button from "../components/Button";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();

        const userData = {
          name: data.name || formData.email,
          token: data.token,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "/dashboard";
      } else {
        const errorText = await res.text();
        alert("Invalid email or password: " + errorText);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid email or password: " + err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      <div className="flex flex-col items-center justify-center mb-4 bg-white w-full max-w-[500px] p-5 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl text-[#432383] font-bold w-full text-center">
            Login
          </h1>
          <p className="text-center text-gray-600">
            Login to manage your tasks
          </p>

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
              text="Login"
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
            onClick={handleGoogleLogin}
            className="w-[250px] border-3 border-[#0a0808] text-black font-bold hover:bg-black"
            text={
              <span className="flex items-center justify-center gap-2">
                <FcGoogle size={22} />
                Login with Google
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
