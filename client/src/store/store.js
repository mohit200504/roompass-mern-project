import React, { act } from "react";

import {configureStore} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


let userJwt=null;

const userJwtslice=createSlice({
    name:"jwt",
    initialState:userJwt,
    reducers:{
        setuserjwt:(state,action)=>{
            return action.payload;
        }
    }
});

let userdata=null;

const userdataslice=createSlice({

    name:"userdata",
    initialState:userdata,
    reducers:{
        setuserdata:(state,action)=>{
            return action.payload;
        }
    }

});

let organisation=null;

const organisationslice=createSlice({
    name:"organiation",
    initialState:organisation,
    reducers:{
        setorganisation:(state,action)=>{
            return action.payload;
        }
    }
});

let gatepass=[];

const gatepassslice=createSlice({
    name:"gatepass",
    initialState:gatepass,
    reducers:{
        setgatepass:(state,action)=>{
            return action.payload
        }
    }
});


let organiationjwt=null;

let orgjwtslice=createSlice({
    name:"orgjwt",
    initialState:organiationjwt,
    reducers:{

        setorgjwt:(state,action)=>{
           return action.payload;
        }
    }
});


let organisationdata=null;

const orgdataslice=createSlice({
    name:"orgdata",
    initialState:organisationdata,
    reducers:{
        setorgdata:(state,action)=>{
            return action.payload;
        }
    }
})


const store=configureStore({
    reducer:{
        userjwt:userJwtslice.reducer,
        usersdata:userdataslice.reducer,
        organisationdata:organisationslice.reducer,
        gatepass:gatepassslice.reducer,
        orgjwt:orgjwtslice.reducer,
        orgdata:orgdataslice.reducer
    }
});

export default store;

export const {setorganisation}=organisationslice.actions;
export const {setuserdata}=userdataslice.actions;
export const {setuserjwt} =userJwtslice.actions;
export const {setgatepass}=gatepassslice.actions;
export const {setorgjwt}=orgjwtslice.actions;
export const {setorgdata}=orgdataslice.actions;