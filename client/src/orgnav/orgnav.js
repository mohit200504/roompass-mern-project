import React from "react";
import { useNavigate } from "react-router-dom";
import "./orgnav.css";

function Orgnav(){

    let nav=useNavigate();
    return (
        <div className="orgnav">
            <div className="orgslogo">
                 <h2 id="orgdashimg">Roompass</h2>
            </div>

            <div className="orgdashnav">

                  <div>
                    <h3 onClick={()=>{
                        nav("/orgroomdata")
                    }}>Bookings</h3>
                  </div>
                  <div>
                    <h3 onClick={()=>{
                        nav("/orgatepass")
                    }}>Gatepass</h3>
                  </div>
                  <div>
                    <h3>Gatepass List</h3>
                  </div>
            </div>

        </div>
    )
}

export default Orgnav;