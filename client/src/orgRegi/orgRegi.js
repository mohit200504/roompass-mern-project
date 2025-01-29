import React from "react";
import "./orgRegi.css";
import Regiside from "../regiSide/regiside";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function OrgRegi(){


    let nav=useNavigate();
    //organisationname,email,password,confirmpassword,address,mobile,noofbeds,noofrooms

    let [organisationname,seton]=useState();
    let [email,setemail]=useState();
    let [password,setpassword]=useState();
    let [confirmpassword,setconfirmpassword]=useState();
    let [address,setaddress]=useState();
    let [mobile,setmobile]=useState();
    let [noofbeds,setnoofbeds]=useState();
    let [noofrooms,setnoofrooms]=useState();
    let [image,setimage]=useState();


    async function orgsignup(){

        
        //organisationname,email,password,confirmpassword,address,mobile,noofbeds,noofrooms,image

        let res= await axios.post("http://localhost:4000/organisationregister",{organisationname,email,password,
        confirmpassword,address,mobile,noofbeds,noofrooms,image});

         await alert(res.data);

         setaddress("")
         setconfirmpassword("");
         setemail("");
         setimage("");
         setmobile("");
         setnoofbeds("");
         setnoofrooms("");
         setpassword("");
         seton("");

    }

    return (
        <div className="userregi">
<Regiside/>

     <div className="registermain">

        <h2>Organisation signup</h2>
        <input type="text"  placeholder="name" value={organisationname} onChange={(e)=>{
            seton(e.target.value)
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

       <input type="text"  placeholder="number of rooms" value={noofrooms} onChange={(e)=>{
            setnoofrooms(e.target.value)
        }}></input>


        <input type="text"  placeholder="number of beds" value={noofbeds} onChange={(e)=>{
            setnoofbeds(e.target.value)
        }}></input>


       <input type="text"  placeholder="image url" value={image} onChange={(e)=>{
            setimage(e.target.value)
        }}></input>

       <div className="btns">
        <button  onClick={()=>{
            orgsignup()
        }}><h5>sign up</h5></button>

           <button onClick={()=>{
           nav("/organisation_login")
        }}><h5>sign in</h5></button>
       </div>


     </div>

   
     
</div>
    )
}

export default OrgRegi;
