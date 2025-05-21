import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userName = params.get("user");
    const token = params.get("token");

    if (userName && token) {
      const user = {
        name: decodeURIComponent(userName),
        token: token
      };
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.error("Token or user not found in URL");
    }

    navigate("/dashboard");
  }, []);

  return <p>Redirecting...</p>;
};

export default OAuthRedirect;