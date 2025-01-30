import React, { useEffect, useState } from "react";
import "./gatepass.css";
import Usernav from "../dashnav/dashnav";
import Sidebar from "../sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setgatepass } from "../store/store";

function Gatepass(){

    //userid,organisationid,username,reason,from,to, permission

    let dispatch=useDispatch();

    let usertoken=useSelector((s)=>{
        return s.userjwt;
    });

    let user=useSelector((S)=>{
        return S.usersdata;
    });

    let gatepassdata=useSelector((s)=>{
        return s.gatepass;
    })

    console.log(gatepassdata);

    

    let [from,setfrom]=useState();
    let [to,setto]=useState();
    let [reason,setreason]=useState();

    useEffect(()=>{

        async function getpass(){

            let gate=await axios.get("https://roompass-mern-project-server-by-mohit.onrender.com/getgatepassforuser",{headers:{
            "x-token":usertoken
           }});

           await dispatch(setgatepass(gate.data.gatepasses))
           

        }

getpass()
    },[gatepassdata]);

   
    
    async function apply(){

       // userid,organisationid,username,reason,from,to, permission
       let userid=user._id;
       let organisationid=user.organisationid;
       let username=user.name;
       let organisationame=user.hostel;

       //console.log(userid,organisationid,username,reason,from,to)

       let res=await axios.post("https://roompass-mern-project-server-by-mohit.onrender.com/applygatepass",{userid,organisationid,username,reason,from,to,organisationame},{headers:{
        "x-token":usertoken
       }});

       await alert(res.data);


       setfrom("");
       setreason("");
       setto("")


    }

    if(!gatepassdata){
        return <h1>...loading</h1>
    }

    return (
        <div className="userdash">
        <Usernav/>
        <div className="maincon">
            <Sidebar></Sidebar>
            <div className="gatemain">


                   
                   <div className="gateform">
                    <h2>Apply gatepass</h2>
                      <div className="f">
                      <label id="la"><h5>From</h5></label>
                      <input type="date" value={from} onChange={(e)=>{
                          setfrom(e.target.value)
                      }}/>
                      </div>

                      <div className="f">
                      <label id="la"><h5>To</h5></label>
                      <input type="date" value={to} onChange={(e)=>{
                        setto(e.target.value);
                      }} />
                      </div>

                     <div className="f">
                     <label id="la"><h5>Reason</h5></label>
                     <input type="text" placeholder="Reason" value={reason} onChange={(e)=>{
                        setreason(e.target.value);
                     }}/>
                     </div>

                     <button onClick={()=>{
                        apply()
                     }} id="bt">Apply gatepass</button>
                   </div>



                 <div className="passes">
                       
                       {
                        gatepassdata.map((s)=>{
                            return (
                                <div className="gatepass">

                                    <div>
                                        <h5>From :{s.from}</h5>
                                        <h5>To :{s.to}</h5>
                                    </div>

                                    <div>
                                        <h5>{s.organisationame}</h5>
                                    </div>

                                   {

                     s.permission === "accepted" ? (
                                  <div className="true">
                                   <h5>Accepted</h5>
                                    </div>
                              ) : s.permission === "declained" ? (
                            <div className="false">
                                  <h5>Declined</h5>
                                       </div>
                              ) : s.permission === "pending" ? (
                            <div className="pending">
                                 <h5>Pending</h5>
                                     </div>
                            ) : null  
  
                                   
                                   }
                                    



                                </div>
                            )
                        })
                       }
                      
                    
                  
                 </div>
                   
                  
                      

            </div>

        </div>

        
    </div>
    )
}

export default Gatepass;
