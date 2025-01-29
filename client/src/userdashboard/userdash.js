import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./userdash.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setorganisation, setuserdata } from "../store/store";
import Usernav from "../dashnav/dashnav";
import Sidebar from "../sidebar/sidebar";
import { setgatepass } from "../store/store";

function UserDash(){
    let nav=useNavigate();
    let dispatch=useDispatch();

    let usertoken=useSelector((s)=>{
       return s.userjwt;
    })

    let user=useSelector((s)=>{
        return s.usersdata;
    })

    let orgdata=useSelector((s)=>{
        return s.organisationdata;
    })

    //console.log(orgdata)

    let gatepassdata=useSelector((s)=>{
        return s.gatepass;

    })

    console.log(gatepassdata)
          
    useEffect(()=>{
      async function getuser(){
            if(usertoken){
                let res=await axios.get("http://localhost:4000/getuser",{headers:{
                "x-token":usertoken
            }})
            await dispatch(setuserdata(res.data.user));

            let res_2=await axios.get("http://localhost:4000/getorganiastions",{headers:{
                "x-token":usertoken
            }})

           await dispatch(setorganisation(res_2.data.organisation))

           

            }
    
        }

    getuser();
        

    },[user]);

    function  organisation(id){

        console.log(id);

        return nav(`/organisation/${id}`)

    }





    if(!usertoken){
        return nav("/userlogin")
    }
    if(!user){
        return <h1>...getting user</h1>
    }
if(!orgdata){
    return <h1>...loading data</h1>
}
    
    return (
        <div className="userdash">
            <Usernav/>
            <div className="maincon">
                <Sidebar></Sidebar>
                <div className="main">

                           {
                            
                            orgdata.map((o)=>{
                               // let img="https://static.vecteezy.com/system/resources/previews/019/879/760/non_2x/hostel-icon-free-vector.jpg"
                                return (
                                    <div className="org" onClick={()=>{
                                        organisation(o._id)
                                    }}>
                                        <div className="orglogo">
                                                  
                                        </div>

                                        <div className="orgdetails">
                                            <h3>{o.organisationname}</h3>
                                            <h5>{o.address}</h5>
                                            <h5>{o.mobile}</h5>
                                        </div>

                                    </div>
                                )
                            })
                           }
                    

                </div>

            </div>

            
        </div>
    )
}

export default UserDash;
