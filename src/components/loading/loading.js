import React from "react";
import "./loading.css";
import * as loaders from "react-spinners";

const  Loading = ({name}) => {
    return (
        <div className="loading-container">
        <p className="loading-title">
          Loading {name}...
        </p>
        <loaders.MoonLoader size={80}color="black"/>
      </div>
    )
}

export default Loading;