import React, { useEffect ,useContext, useState} from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import CarouselLanding from "../../components/carouselLanding/carouselLanding";
import "./login.css";
import { Context } from "../../contexts/AppContext";
import Authors from "../authorsPage/authors";
import NotificationBar from "../../components/notificationBar";
// const ApiKey = "AIzaSyCuuaqLB7lfZmhgt5h2QJU8jbwj9zHQ5ms";
const clientId ="884274820828-arnfrfcdt1g328nmijbaslr62bftliv3.apps.googleusercontent.com";

const Login = () => {
  const context = useContext(Context);
  const onSuccess = (res) => {
   localStorage.setItem("Token", res.accessToken);
   context.setToken(localStorage.getItem("Token", res.accessToken))
  };
  const onFailure = (res) => {
    console.log(`LOGIN FAILED! res:${res.error}`);
  };

  const { signIn } = useGoogleLogin({
    clientId: clientId,
    onSuccess,
    onFailure,
    cookiePolicy: "single_host_origin",
    isSignedIn: true,
  });

  useEffect(() => {    
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <>
    {context.Token === '' ?
    <div className="login-page">
    <NotificationBar notify={context.notify} setNotify={context.setNotify} />
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
   : <Authors/> }
    </>
  );
};

export default Login;
