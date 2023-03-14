import React from 'react';
import RemoveCookie from '../../hooks/removeCookie';
import Canvas from './Canvas';
import Prizes from './Prizes';
import Rooms from './Rooms';
import Waitlist from './Waitlist';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './Dashboard.css'

const DashBoard = () => {

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const logout=()=>{
   localStorage.removeItem("UserData");
   RemoveCookie("Token");
   window.location.href = '/' ;
  }
  return (
    <div className='row text-white p-3 w-100'>    

     <div className='col-1'>
      <Canvas />
     </div>
     <h1 className='col-11'>Admin Portal</h1> 

     <div className="d-lg-flex d-none col-xl-2 col-3 p-3" style={{ height: "750px" }}>
      <div className=" bg-secondary rounded p-4 justify-content-center">     
        <div className="canvas-links row justify-content-center p-5">
          <a className={splitLocation[1] === "" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/"}>
            Waitlist 
          </a>
          <a className={splitLocation[1] === "rooms" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/rooms"}>
          Rooms 
          </a>
          <a className={splitLocation[1] === "prizes" ?'nav-active p-4 my-3 rounded fs-5' : 'p-4 my-3 rounded fs-5'} href={"/prizes"}>
          Prizes 
          </a>   
          <a className='logout-btn p-2 my-5 rounded fs-5' href={"/"} onClick={logout}>
          LOG OUT  
          </a> 
        </div>
      </div>
    </div>
    <div className="col-lg-9 col-12 text-center p-2">
      <Routes>
        <Route exact path="/" element={<Waitlist/>} />
        <Route path="/rooms" element={<Rooms/>} />
        <Route path="/prizes" element={<Prizes/>} />
      </Routes>
    </div>
    </div>
  )
}

export default DashBoard
