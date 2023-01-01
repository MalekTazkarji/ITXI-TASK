import React, { useEffect ,useContext, useState} from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin , useGoogleLogout} from "react-google-login";
import { gapi } from "gapi-script";
import CarouselLanding from "../../components/carouselLanding/carouselLanding";
import "./login.css";
import { Context } from "../../contexts/AppContext";
import Authors from "../authorsPage/authors";
import NotificationBar from "../../components/notificationBar";
import jwtDecode from "jwt-decode";
// const ApiKey = "AIzaSyCuuaqLB7lfZmhgt5h2QJU8jbwj9zHQ5ms";
const clientId ="884274820828-arnfrfcdt1g328nmijbaslr62bftliv3.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(Context);

  const onSuccess = (res) => {
  if(!localStorage.getItem("Token")){
   localStorage.setItem("Token", res.accessToken);
   context.setToken(localStorage.getItem("Token", res.accessToken));
   localStorage.setItem("dt",new Date(res.tokenObj.expires_at));
   localStorage.setItem("name",res.profileObj.givenName);
  }
}

useEffect(()=>{
  const dateNow = new Date(Date.now());
  const expiredDateToken = new Date(localStorage.getItem('dt'));
  const x = expiredDateToken - dateNow;
  if(localStorage.getItem("Token")){
  setTimeout(() => {
    context.setNotify({
      isOpen: true,
      message: `Dear ${localStorage.getItem("name")} you will be logged out automatically after 30 seconds since your token was expired`,
      type:"error"
    })
   setTimeout(() => {
    document.getElementById("triggerLogout").click();
   }, 30000);      
    }, x);   
  }

  },[localStorage.getItem("Token")])


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
  const start = () => {
    gapi.client.init({
      clientId: clientId,
      scope: '',
    });
  }
  gapi.load("client:auth2", start);

  return (
    <>
    {!context.Token ?
    <div className="login-page">
    <NotificationBar notify={context.notify} setNotify={context.setNotify} />
      <h1 className="typewriter">Welcome To Our Book Searching App</h1>
      <div className="login-container">
        <button onClick={() =>{signIn()}} className="btn">
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
