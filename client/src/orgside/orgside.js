import React from "react";
import { useSelector } from "react-redux";
import "./orgside.css";


function Orgside(){


    let org=useSelector((s)=>{
        return s.orgdata;
    })

let orgimage=org.image;

    return (
        <div className="orgside">

            <div className="orgimage">

              <img src={orgimage} id="orgimg"/>
            </div>

            <h3>{org.organisationname}</h3>
            <h5>{org.email}</h5>

        </div>
    )
}

export default Orgside;