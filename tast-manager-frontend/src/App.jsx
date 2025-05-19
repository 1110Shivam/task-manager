import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OAuthRedirect from "./components/OAuthRedirect";


const App = () => {
  const location = useLocation();

  const showHeader = location.pathname !== "/dashboard";

  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/oauth/redirect" element={<OAuthRedirect />} />
      </Routes>
    </div>
  );
};

export default App;
