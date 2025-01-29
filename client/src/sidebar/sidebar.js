import React from "react";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setgatepass } from "../store/store";
import axios from "axios";


function Sidebar(){

let dispatch=useDispatch();

let usertoken=useSelector((s)=>{
    return s.userjwt;
});

let gatepasss=useSelector((s)=>{
    return s.gatepass
})

    



    let user=useSelector((s)=>{
        return s.usersdata;

    })

    let imageurl=user.image;

    return (
        <div className="sidebar">

            <div className="logo">

                <img src={imageurl} id="imginsidebar"></img>

            </div>

            <div className="details">
              <h3>{user.name}</h3>
              <h5>{user.email}</h5>
              
            </div>
            
        </div>
    )
}

export default Sidebar;