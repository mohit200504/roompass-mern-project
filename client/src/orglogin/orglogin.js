import React from "react";
import Regiside from "../regiSide/regiside";
import "./orglogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setorgjwt } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


function Orglogin(){
    let nav=useNavigate();
    let dispatch=useDispatch();

    let orgtoken=useSelector((s)=>{
        return s.orgjwt;
    })

    console.log(orgtoken)


    let [email,setemail]=useState();
    let [password,setpassword]=useState()






   async function orgsignin(){
    
       let res=await axios.post("http://localhost:4000/organisationlogin",{email,password});

       await dispatch(setorgjwt(res.data.token));

       setemail("");
       setpassword("")

    }

    if(orgtoken){
        return nav("/orgdash");
    }


    return (
        <div className="userregi">
<Regiside/>

     <div className="registermain">

        <h2>Organisation signin</h2>
       
        
        <input type="text"  placeholder="email" value={email} onChange={(e)=>{
            setemail(e.target.value)
        }}></input>

        <input type="text"  placeholder="password" value={password} onChange={(e)=>{
            setpassword(e.target.value)
        }}></input>

     
        
        <div className="btns">
            <button id="binr" onClick={()=>{
                orgsignin()
            }}>singin</button>

           <button id="binr" onClick={()=>{
                nav("/organisation_register")
            }}>singup</button>
           
        </div>


     </div>

   
     
</div>
    )
}

export default Orglogin;