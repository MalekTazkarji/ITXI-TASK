import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import CarouselLanding from "../../components/carouselLanding/carouselLanding";
import "./login.css";

// const ApiKey = "AIzaSyCuuaqLB7lfZmhgt5h2QJU8jbwj9zHQ5ms";
const clientId =
  "884274820828-arnfrfcdt1g328nmijbaslr62bftliv3.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate();
  const onSuccess = (res) => {
        localStorage.setItem("Token", res.accessToken);
    if (localStorage.getItem("Token", res.accessToken)) {
        navigate("/authors");
        window.location.reload();
    }
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res:");
  };

  const { signIn } = useGoogleLogin({
    clientId: clientId,
    onSuccess,
    onFailure,
    cookiePolicy: "single_host_origin",
    isSignedIn: true,
  });

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div className="login-page">
      <h1 className="typewriter">Welcome To Our Book Searching App</h1>
      <div className="login-container">
        <button onClick={() => signIn()} className="btn">
          Login with google
          <FcGoogle style={{ marginLeft: "5px" }} />
        </button>
      </div>
      <div className="carousel-mother-container">
        <h1>Latest Books</h1>
        <CarouselLanding signIn={signIn} />
      </div>
    </div>
  );
};

export default Login;
