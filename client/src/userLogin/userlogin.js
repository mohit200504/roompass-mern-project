import "./userlogin.css";
import Regiside from "../regiSide/regiside";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { setuserjwt } from "../store/store";


function Userlogin(){


    let usertoken=useSelector((s)=>{
        return s.userjwt;

    })

//email,password
let dispatch=useDispatch();
let nav=useNavigate();
let [email,setemail]=useState("");
let [password,setpassword]=useState("");




async function signin(){
  
if(!usertoken){
    let res = await axios.post("http://localhost:4000/userlogin",{email,password});
 
    await dispatch(setuserjwt(res.data.token))
     
   
}

}

if(usertoken){
    return nav("/userdashboard");
}

    return (
<div className="userregi">
<Regiside/>

     <div className="registermain">

        <h2>User signin</h2>
       
        
        <input type="text"  placeholder="email" value={email} onChange={(e)=>{
            setemail(e.target.value)
        }}></input>

        <input type="text"  placeholder="password" value={password} onChange={(e)=>{
            setpassword(e.target.value)
        }}></input>

     
        
        <div className="btns">
            <button id="binr" onClick={()=>{
                signin()
            }}>singin</button>
            <button id="binr" onClick={()=>{
                nav("/userregister")
            }}>singup</button>
        </div>


     </div>

   
     
</div>
    )
}

export default Userlogin;
