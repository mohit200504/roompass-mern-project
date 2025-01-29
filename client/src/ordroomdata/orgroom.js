import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Orgnav from "../orgnav/orgnav";
import { useEffect } from "react";
import { setorgdata } from "../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Roomdata() {

    let dispatch=useDispatch();
    let nav=useNavigate();
  
    let orgsdata=useSelector((s)=>{
        return s.orgdata;
    })

    let orgtoken=useSelector((s)=>{
        return s.orgjwt
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



  
  if (!orgsdata || !orgsdata.rooms || orgsdata.rooms.length === 0) {
    return <h1>Loading...</h1>; 
  }

  return (
    <>
     <Orgnav></Orgnav>
      <div>
        <h2>Room and Bed Details</h2>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Room No</th>
              <th>Bed No</th>
              <th>Bedholder</th>
              <th>Bedholder Mobile</th>
              <th>Bedholder Address</th>
              <th>Booking Status</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate over rooms and beds */}
            {orgsdata.rooms.map((room) => {
              return room.beds.map((bed) => (
                <tr key={bed._id}>
                  <td>{room.roomno}</td>
                  <td>{bed.bedno}</td>
                  <td>{bed.bedholder || "N/A"}</td>
                  <td>{bed.bedholdermobile || "N/A"}</td>
                  <td>{bed.bedholderaddress || "N/A"}</td>
                  <td>{bed.bookingstatus ? "Booked" : "Available"}</td>
                  <td>{bed.from || "N/A"}</td>
                  <td>{bed.to || "N/A"}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Roomdata;
