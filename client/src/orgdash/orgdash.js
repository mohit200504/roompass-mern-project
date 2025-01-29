import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Roomdata from "../ordroomdata/orgroom";
import Orgnav from "../orgnav/orgnav";
import Orgside from "../orgside/orgside";
import { setorgdata } from "../store/store";
import "./orgdash.css";


function Orgdash(){

    let nav=useNavigate();
    let dispatch=useDispatch();

    let orgtoken=useSelector((s)=>{
        return s.orgjwt;

    })


    let orgsdata=useSelector((s)=>{
        return s.orgdata;
    })

    

    console.log(orgsdata);


    useEffect(()=>{

       async function getorg(){

        if(orgtoken){

            let res=await axios.get("http://localhost:4000/getorganisation",{
                headers:{
                    "x-token":orgtoken
                }
            });

            dispatch(setorgdata(res.data.user));

        }
        else{
            return nav("/organisation_login")
        }

       }

       getorg()

    },[orgsdata]);

    let [booked,setbooked]=useState();
    let [available,setavailable]=useState()
    
    useEffect(() => {
        if (orgsdata && orgsdata.rooms) {
          let bookedCount = 0;
          let availableCount = 0;
    
          // Iterate over rooms and beds to count booked and available
          orgsdata.rooms.forEach((room) => {
            room.beds.forEach((bed) => {
              if (bed.bookingstatus === true) {
                bookedCount++;
              } else {
                availableCount++;
              }
            });
          });
    
          // After counting, update the state
          setbooked(bookedCount);
          setavailable(availableCount);
        }
      }, [orgsdata]);

      console.log(booked,available)


    if(!orgsdata){
       
        return <h1>...loading</h1>
    }
    

//console.log(rooms)




    return (

        <div className="orgdash ">
            <Orgnav></Orgnav>
            <div className="orgmaincon">
               <Orgside></Orgside>
               
               <div className="orgmainchange">

                  <h1>Booked : {booked}</h1>
                  <h1>Available : {available}</h1>

              
               
               </div>

            </div>

        </div>
        
    )
}


export default Orgdash;
