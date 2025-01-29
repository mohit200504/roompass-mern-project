const mongoose=require("mongoose");

const organisationschema=mongoose.Schema({

    organisationname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true

    },


    image:{
        type:String
    },
    

    mobile:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    noofrooms:{
        type:Number,
        require:true
    },
   noofbeds:{
    type:Number,
    required:true
   },
   rooms:[
    {
        roomno:{
          type:Number
        },
       beds:[
        {
            bedno:Number,
            bedholder:String,
            bedholdermobile:String,
            bedholderaddress:String,
            from:String,
            to:String,
            bookingstatus:{
                type:Boolean,
                default:false
            }
        }
       ]
     }
   ]
    
});

module.exports =mongoose.model("organisation",organisationschema);
