import React from "react";
import "./dashnav.css";
import { useNavigate } from "react-router-dom";

function Usernav(){

   let nav=useNavigate();

    return (
      <div className="nav">
         <h1>ROOMPASS</h1>
         <div className="navs">

            <h4 onClick={()=>{
               nav("/userdashboard")
            }}>Home</h4>
            <h4 onClick={()=>{
               nav("/roompass")
            }}>roompass</h4>
            <h4 onClick={()=>{
               nav("/messcard")
            }}>Messpass</h4>
            <h4 onClick={()=>{
               nav("/gatepass")
            }}>Gatepass</h4>

         </div>
      </div>
      
    )
}

export default Usernav;