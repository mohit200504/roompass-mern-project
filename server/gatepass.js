const mongoose=require("mongoose");

const gatepassschema=mongoose.Schema({

    userid:{
        type:String,
        required:true
    },

    organisationid:{
        type:String
    },

    organisationame:{
       type:String
    },

    username:{
        type:String,
        required:true
    },

    reason:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },

   permission:{
   type:String,
   default:"pending"
}
})

module.exports=mongoose.model("gatepass",gatepassschema);