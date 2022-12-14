import React from "react";
import{ FiBookOpen } from "react-icons/fi";
import { IconContext } from "react-icons";

import "./navbar.css";
const Navbar = () => {
    return (
        <div className="navbar">
            <h1 className="name">E-BOOKS</h1>
            <IconContext.Provider value={{ size: "5em",color:"#533e0d"}}>
            <FiBookOpen/>
            </IconContext.Provider>
        </div>
    )
}
export default Navbar;