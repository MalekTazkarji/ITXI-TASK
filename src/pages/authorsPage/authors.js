import React from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
const Authors = () => {
    const navigate = useNavigate();
    const clientId="965676225182-uu13hfje2rjfmmgmtb1kfhgh1ga7lfdd.apps.googleusercontent.com";

const onSuccess = () => {
    console.log("log out succesfull");
    navigate("/");
}

    return (
        <div>
            Welcome Authors
            <GoogleLogout
                                clientId={clientId}
                                buttonText="Logout"
                                onLogoutSuccess={onSuccess}
                               
/>
        </div>
    )
}

export default Authors;