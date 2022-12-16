import React, { useRef } from "react";
import { FcGoodDecision, FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import Navbar from "../../components/navbar/navbar";
import "./login.css";
import { useNavigate } from "react-router-dom";
import GoogleLogin, { GoogleLogout, useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import CarouselLanding from "../../components/carouselLanding/carouselLanding";
const ApiKey='AIzaSyCuuaqLB7lfZmhgt5h2QJU8jbwj9zHQ5ms';
const clientId ="884274820828-arnfrfcdt1g328nmijbaslr62bftliv3.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    localStorage.setItem('Token',res.accessToken)
    console.log({ res });
    console.log(res.accessToken);
    navigate("/authors");
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
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
        {/* <div className="btn-container"> */}
        <button onClick={() => signIn()} className="btn">
          Login with google
          <FcGoogle style={{ marginLeft: "5px" }} />
        </button>
        {/* </div> */}
      </div>
      <div className="carousel-mother-container">
        <h1>Latest Books</h1>
        <CarouselLanding signIn={signIn}/>
      </div>
    </div>
  );
};

export default Login;
