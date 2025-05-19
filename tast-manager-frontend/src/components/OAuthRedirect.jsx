import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userName = params.get("user");

    if (userName) {
      const user = {
        name: decodeURIComponent(userName),
        token: "",
      };
      localStorage.setItem("user", JSON.stringify(user));
    }

 
    navigate("/dashboard");
  }, []);

  return <p>Redirecting...</p>;
};

export default OAuthRedirect;
