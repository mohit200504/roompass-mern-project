import React from "react";
import { useSelector } from "react-redux";
import Usernav from "../dashnav/dashnav";
import Sidebar from "../sidebar/sidebar";
import "./messcard.css";

function Messcard(){

    let user=useSelector((s)=>{
        return s.usersdata;

    })
    return (
        <div className="userdash">
        <Usernav/>
        <div className="maincon">
            <Sidebar></Sidebar>
            <div className="messpass">

                    <div className="card">
                        <div className="photo" >
                               <img src={user.image} style={{height:"100%",width:"100%"}}/>
                        </div>

                        <div className="userdetails">
                            <table>
                            <tr>
                                    <th>messId</th>
                                    <td>{user._id}</td>
                                    
                                </tr>
                                <tr>
                                    <th>name</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>hostel</th>
                                    <td>{user.hostel}</td>
                                    
                                </tr>
                                <tr>
                                    <th>from-</th>
                                    <td>{user.fromdate}</td>
                                    
                                </tr>
                                <tr>
                                    <th>to-</th>
                                    <td>{user.todate}</td>
                                    
                                </tr>
                                

                            </table>

                        </div>

                    </div>

            </div>

        </div>

        
    </div>
    )
}

export default Messcard;