const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    fromdate:{
        type:String,
        default:null
    },
    todate:{
        type:String,
        default:null
    },
   
    hostel:{
        type:String,
        default:null
    },
    organisationid:{
        type:String,
        default:null
    },
    image:{
        type:String,
        required:true
    },
    bedno:{
        type:String,
        default:null
    },
    roomno:{
        type:String,
        default:null
    },
    bedid:{
        type:String,
        default:null
    },
    roomid:{
        type:String,
        default:null
    }
});

module.exports = mongoose.model("userdata",userSchema);
