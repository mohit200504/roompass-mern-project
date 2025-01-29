import React, { useEffect, useState } from "react";
import "./organisation.css";
import Usernav from "../dashnav/dashnav";
import Sidebar from "../sidebar/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";






function Organisation(){


    let user=useSelector((s)=>{
        return s.usersdata;
    })




    let {id}=useParams();

    let nav=useNavigate();

    let usertoken=useSelector((s)=>{
        return s.userjwt;
    });

    //console.log(usertoken)

    //console.log(id);

    let [org,setorg]=useState();

    useEffect(()=>{

        async function getorg(){
            let res=await axios.post("http://localhost:4000/orgbyid",{id},{headers:{
                "x-token":usertoken
            }});

            await setorg(res.data.org)


        }

        getorg()

    },[org]);

    

    /* 
    "orgid":"6773b1b8f46dc72e84b8aaec",
    "orgname":"ravi in",
    "orgaddress":"kotturu , srikakulam",
    "orgmobile":"9440347699",
    "from":"31-12-2024",
    "to":"20-1-2024",
    "roomid":"6773b1b8f46dc72e84b8aafd",
    "bedid":"6773b1b8f46dc72e84b8aafe",
    "username":"jaya",
    "usermobile":"8522947699",
    "useraddress":"kotturu , srikakulam"*/ 

    
        
    
    

    let [from,setfrom]=useState();
    let [to,setto]=useState();


    async function bookbed(bedid,roomid,roomno,bedno){
                       let orgid=id;
                       let orgname=org.organisationname;
                        let orgaddress=org.address;
                        let orgmobile=org.mobile;
                        let username=user.name;
                        let usermobile=user.mobile;
                        let useraddress=user.address;

        //console.log(orgid,orgname,orgaddress,orgmobile,from,to,roomid,bedid,username,usermobile,useraddress)

        let res =await axios.post("http://localhost:4000/bookbed",{orgid,orgname,orgaddress,orgmobile,from,to,
        roomid,bedid,username,usermobile,useraddress,bedno,roomno},
         {
            headers:{
                "x-token":usertoken
            }
         } 
        )

        alert(res.data)
       

    }

    if(!org){
        return <h1>...loading</h1>
    }

let {rooms}=org;
//console.log(rooms)
    return (

        <div className="userdash">
            <Usernav/>
            <div className="maincon">
                <Sidebar></Sidebar>
                <div className="orgmain">
                   
                 
                 <div className="name">
                     <h1>{org.organisationname}</h1>
                 </div>

                 <div className="rooms">
                    {
                        
                        rooms.map((r)=>{
                            
                            let roomid=r._id;
                            let {beds}=r;
                            let roomno=r.roomno;
                            return <div  className="room">

                                <div className="roomno">
                                    <h5>R{r.roomno}</h5>
                                </div>

                                {
                                    
                                    beds.map((b)=>{
                                        let bedid=b._id;
                                        let bedno=b.bedno;
                                        if(b.bookingstatus===false){

                                            return (<div className="bed" style={{background:"lightgreen",cursor:"pointer"}} onClick={()=>{

                                                bookbed(bedid,roomid,roomno,bedno);

                                            }}>
                                                <h5>B{b.bedno}</h5>
                                            </div>)
                                        }
                                        else{
                                            return (<div className="bed" style={{background:"#CD5C5C"}}>
                                                <h5>B{b.bedno}</h5>
                                            </div>)
                                        }
                                    })

                                }
                            </div>
                        })
                    }

                </div>




                 <div className="form">
                        
                       <div>
                        <label>From</label>
                        <input type="date" class="in" onChange={(e)=>{
                               setfrom(e.target.value)
                        }}/>
                       </div>

                       <div>
                        <label>To</label>
                        <input type="date" className="in" onChange={(e)=>{
                            setto(e.target.value)
                        }}/>
                       </div>

                 </div>

              
                    

                </div>

            </div>

            
        </div>
        
    )
}

export default Organisation;