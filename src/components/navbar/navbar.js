import React, { useContext, useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useGoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { Context } from "../../contexts/AppContext";

const clientId ="884274820828-arnfrfcdt1g328nmijbaslr62bftliv3.apps.googleusercontent.com";

const Navbar = () => {
  const context = useContext(Context);
  const [logoutAppear, setLogoutAppear] = useState(false);
  const navigate = useNavigate();
  const onSuccess = () => {
    localStorage.removeItem("Token");
    context.setToken('');
    navigate("/");
  };

  const { signOut } = useGoogleLogout({ clientId, onLogoutSuccess: onSuccess });
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setLogoutAppear(true);
    } else {
      setLogoutAppear(false);
    }
  }, [localStorage.getItem("Token")]);

  return (
    <div className="navbar">
      <h1 className="name">E-BOOKS</h1>
      <div className="logout-container">
        {logoutAppear && (
          <button className="logout-btn" onClick={signOut}>
            Logout
          </button>
        )}
        <IconContext.Provider
          value={{ size: "5em", color: "rgb(251, 199, 88)" }}
        >
          <FiBookOpen style={{ margin: "10px" }} />
        </IconContext.Provider>
      </div>
    </div>
  );
};
export default Navbar;
