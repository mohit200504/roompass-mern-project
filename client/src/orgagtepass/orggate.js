import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Orgnav from "../orgnav/orgnav";
import Orgside from "../orgside/orgside";
import "./orggate.css";

function Gatepassorg(){

    let nav=useNavigate();

    let orgtoken=useSelector((s)=>{
        return s.orgjwt;
    })

    let [gatepass,setpass]=useState();



useEffect(()=>{

 async function getgatepass(){
    if(orgtoken){
        let res=await axios.get("http://localhost:4000/getgatepassfororganisation",{headers:{
        "x-token":orgtoken
    }})

    

    setpass(res.data.gatepasses);
    }
    else{
        return nav("/organisation_login")
    }
 }

 getgatepass()

},[gatepass]);


async function accept(_id){
    //console.log(id)
    //console.log(orgtoken)
     
    let res=await axios.post("http://localhost:4000/permissionAccept",{_id},{
        headers:{
            "x-token":orgtoken
        }
    })

    alert(res.data);



}

async function declain(_id){
     //console.log(id)
    //console.log(orgtoken)
     
    let res=await axios.post("http://localhost:4000/permissiondeclain",{_id},{
        headers:{
            "x-token":orgtoken
        }
    })

    alert(res.data);
}



console.log(gatepass)

if(!gatepass){
    return <h1>...loading</h1>
}


    return (
        <div className="orgdash ">
            <Orgnav></Orgnav>
            <div className="orgmaincon">
               <Orgside></Orgside>
               
               <div className="orgatepass">

                   
                   {

                    gatepass.map((g)=>{
                        return (<div className="orgpass">
                            
                            <h6>{g.username}:   {g.from} to {g.to}</h6>
                           
                                
                           
                          
                           <h6>Reason : {g.reason}</h6>
                          

                            <div className="btn">
                                <button className="a" onClick={()=>{
                                    accept(g._id)
                                }}>accept</button>
                                <button className="d"  onClick={()=>{
                                    declain(g._id)
                                }} >declain</button>
                            </div>

                            </div>)
                    })
                   }

                  
               
               </div>

            </div>

        </div>
        

    )
}

export default Gatepassorg;