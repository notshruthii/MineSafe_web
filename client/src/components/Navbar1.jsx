import Taskbar_names from './Taskbar_names.jsx';
import React from 'react';
import coal_logo from "./coal5.png"; 

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light  px-4"
      style={{
        backgroundColor: "rgb(1, 8, 27)",
        
      }}
    >
      <a className="navbar-brand d-flex align-items-center" href="#">
        <img
          src={coal_logo}
          alt="Coal Ministry Logo"
          className="logo-img me-2 px-5"
          style={{ height: "95px", marginLeft: "-28px" }}
        />
      </a>
      <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <Taskbar_names label="Home" to="/" />
         <Taskbar_names label="Profile" to="/profile" />
          
        
          
          <Taskbar_names label="Report" to="/report" />
          <Taskbar_names label="Career" to="/Career" />
           <Taskbar_names label="About Us" to="/AboutUs" />
             <Taskbar_names label="Contact Us" to="/Contactus" />
          <Taskbar_names label="Logout" to="/logout" className="text-danger" />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
