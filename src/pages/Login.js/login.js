import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import Navbar from "../../components/navbar/navbar";
import "./login.css";
import { useNavigate } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
const Login = () => {
    const navigate= useNavigate();
    const clientId="965676225182-uu13hfje2rjfmmgmtb1kfhgh1ga7lfdd.apps.googleusercontent.com";
    useEffect (() => {
        function start() {
        gapi.client.init({
        clientId: clientId,
        scope:""
        })
        };
        gapi.load('client:auth2', start);
        });

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
        navigate("/authors")

        }
        const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
        }

    return (
        <div className="login-page">
            <Navbar />
            <h1 className="typewriter" >Welcome To Our Book Searching Application</h1>
            <div className="login-container">
                <h3>Aren't you logged in yet?</h3>
                <h3>hurry up and see our latest authors with<br></br> the privilige of viewing their books</h3>
                <div className="btn-container">
                    <div className="btn">
                            <GoogleLogin
                                className="google-btn"
                                style={{zIndex:"2"}}
                                clientId={clientId}
                                buttonText="Login with google"
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookie Policy={'single_host_origin'}
                                isSignedIn={true}/>
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default Login;


