import React from "react";
import "./roompass.css";
import Usernav from "../dashnav/dashnav";
import Sidebar from "../sidebar/sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Roompass(){

    let nav=useNavigate()

    let user=useSelector((s)=>{
return s.usersdata;
    })

    let usertoken=useSelector((s)=>{
       return s.userjwt;
    });


    async function cancelbooking(){
        let roomid=user.roomid;
        let orgid=user.organisationid;
        let bedid=user.bedid;
        let username=user.name;
console.log(roomid,orgid,bedid,username)
        let res=await axios.post('http://localhost:4000/cancleroom',{roomid,orgid,bedid,username},{headers:{
            "x-token":usertoken
        }});

        alert(res.data);

        
    }
    
    if(!usertoken){
        return nav("/userlogin")
    }

    
    return (
        <div className="userdash">
        <Usernav/>
        <div className="maincon">
            <Sidebar></Sidebar>
            <div className="roompass">
              
              <div className="pass">
                <div>
                    <h3>{user.name}</h3>
                </div>

                <div className="roomdetails">
                     <div>
                        <h5>Room no:{user.roomno}</h5>
                       
                     </div>
                     <div>
                     <h5>Bed no:{user.bedno}</h5>
                     </div>
                </div>

               <div className="cancle" onClick={()=>{
                cancelbooking()
               }}>
                          <p>Cancel Booking</p>
               </div>

              </div>

                       

            </div>

        </div>

        
    </div>
    )
}


export default Roompass;