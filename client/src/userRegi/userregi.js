import "./userregi.css";
import Regiside from "../regiSide/regiside";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Userregi(){

//name,email,password,confirmpassword,address,mobile
  let nav=useNavigate();
let [name,setname]=useState("");
let [image,setimgage]=useState("");
let [email,setemail]=useState("");
let [password,setpassword]=useState("");
let [confirmpassword,setconfirmpassword]=useState("");
let [address,setaddress]=useState("");
let [mobile,setmobile]=useState("");

async function signup(){
    //console.log(name,email,password,confirmpassword,address,mobile)

    axios.post("http://localhost:4000/userregister",{name,email,password,confirmpassword,address,mobile,image})
    .then(async(res)=>{
        
        await alert(res.data);
        setaddress("");
        setconfirmpassword("");
        setmobile("");
        setname("");
        setpassword("");
        setemail("");

    })
    
}

    return (
<div className="userregi">
<Regiside/>

     <div className="registermain">

        <h2>User signup</h2>
        <input type="text"  placeholder="name" value={name} onChange={(e)=>{
            setname(e.target.value)
        }}></input>
        
        <input type="text"  placeholder="email" value={email} onChange={(e)=>{
            setemail(e.target.value)
        }}></input>

        <input type="text"  placeholder="password" value={password} onChange={(e)=>{
            setpassword(e.target.value)
        }}></input>

       <input type="text"  placeholder="confirmpassword" value={confirmpassword} onChange={(e)=>{
            setconfirmpassword(e.target.value)
        }}></input>

        <input type="text"  placeholder="address" value={address} onChange={(e)=>{
            setaddress(e.target.value)
        }}></input>

        <input type="text"  placeholder="mobile" value={mobile} onChange={(e)=>{
            setmobile(e.target.value)
        }}></input>

       <input type="text"  placeholder="image url" value={image} onChange={(e)=>{
            setimgage(e.target.value)
        }}></input>

        <div className="btns">
            <button id="binr" onClick={()=>{
                signup()
            }}>singup</button>
            <button id="binr" onClick={()=>{
                nav("/userlogin")
            }}>singin</button>
        </div>


     </div>

   
     
</div>
    )
}

export default Userregi;
