
const express=require("express");
const { default: mongoose } = require("mongoose");
const userSchema =require("./userschema.js");
const usermiddleware=require("./usermiddleware.js");
const cors=require("cors");
require('dotenv').config(); 
const jwt =require("jsonwebtoken");
const organisationschema = require("./organisationschema.js");
const orgamiddleware=require("./organisationmiddleware.js");
const gatepassschema = require("./gatepass.js");

const MONGO_URI = process.env.MONGO_URI;


const app=express();

app.use(express.json());
app.use(cors({origin:"*"}));


mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("DB connect");

})


app.post("/userregister",async(req,res)=>{

    try{

        let {name,email,password,confirmpassword,address,mobile,image}=req.body;

      

        let user=await userSchema.findOne({email});

        if(user){
            return res.status(400).send("user already exist");
        }

        if(password!==confirmpassword){
              return res.status(400).send("confirmpassword is not matching");
        }

        if(!user){
            let newuser=await new userSchema({
                name,email,password,confirmpassword,address,mobile,image
            });

            await newuser.save();
            if(newuser){
                res.status(200).send("registered succesfully");
            }


        }

    }
    catch(err){
       res.status(500)
    }
})

app.post("/userlogin",async(req,res)=>{
    try{

        let {email,password}=req.body;

        let user=await userSchema.findOne({email});
        if(!user){
            return res.send("user notfound");
        }

        if(password!==user.password){
            return res.send("inncorrect password");
    }

    if(user){

        let payload={
            user:{
                id:user.id
            }
            
        }

        jwt.sign(payload,"usersecurity",{expiresIn:3000000},(err,token)=>{
            if(err){
                return res.status(400).send("token error");
            }
            if(token){
                return res.json({token});
            }
        })
    }

    }
    catch(err){
        console.log(err)
    }
})

app.get("/getuser",usermiddleware,async(req,res)=>{

    try{

        let {id}=req.user;
        
        let user=await userSchema.findById(id);

        if(user){
            return res.json({user});
        }

    }
    catch(err){
        console.log(err)
    }

});


app.post("/organisationregister",async(req,res)=>{

    try{

        let {organisationname,email,password,confirmpassword,address,mobile,noofbeds,noofrooms,image}=req.body;

        let bed=[];
        let rooms=[];

        for(let i=1;i<=noofbeds;i++){
            bed.push({
                bedno:i,
            bedholder:null,
            bedholdermobile:null,
            bedholderaddress:null,

            })
        }

        for(let i=1;i<=noofrooms;i++){
            rooms.push({
                roomno:i,
                beds:bed

            })
        }

      

        let organisation=await organisationschema.findOne({email});

        if(organisation){
            return res.status(400).send("organisation already exist");
        }

        if(password!==confirmpassword){
              return res.status(400).send("confirmpassword is not matching");
        }

        if(!organisation){
            let neworganisation=await new organisationschema({
                organisationname,email,password,image,confirmpassword,address,mobile,noofbeds,noofrooms,rooms
            });

            await neworganisation.save();
            if(neworganisation){
                res.status(200).send("registered succesfully");
            }


        }

    }
    catch(err){
       res.status(500)
    }
})

app.post("/organisationlogin",async(req,res)=>{
    try{

        let {email,password}=req.body;

        let user=await organisationschema.findOne({email});
        if(!user){
            return res.send("user notfound");
        }

        if(password!==user.password){
            return res.send("inncorrect password");
    }

    if(user){

        let payload={
            user:{
                id:user.id
            }
            
        }

        jwt.sign(payload,"organisationsecurity",{expiresIn:3000000},(err,token)=>{
            if(err){
                return res.status(400).send("token error");
            }
            if(token){
                return res.json({token});
            }
        })
    }

    }
    catch(err){
        console.log(err)
    }
})

app.get("/getorganisation",orgamiddleware,async(req,res)=>{

    try{

        let {id}=req.user;
        
        let user=await organisationschema.findById(id);

        if(user){
            return res.json({user});
        }

    }
    catch(err){
        console.log(err)
    }

});


app.post("/bookbed",usermiddleware,async(req,res)=>{

    let {id}=req.user;
     let userid=id;
    

    let {orgid,orgname,orgaddress,orgmobile,from,to,roomid,bedid,username,usermobile,useraddress,bedno,roomno}=req.body;


    let user=await userSchema.findOneAndUpdate({_id:userid} ,
        {
            $set:{
                organisationid:orgid,
                hostel:orgname,
                fromdate:from,
                todate:to,
                roomno,
                bedno,
                 bedid,
                 roomid
              }
    })

    let bookbed = await organisationschema.findOneAndUpdate(
        { 
            _id: orgid,
            "rooms._id": roomid 
          },
        {
            $set: {
                "rooms.$[room].beds.$[bed].bedholder": username,
            "rooms.$[room].beds.$[bed].bedholdermobile": usermobile,
                "rooms.$[room].beds.$[bed].bedholderaddress": useraddress,
            "rooms.$[room].beds.$[bed].from":from,
                "rooms.$[room].beds.$[bed].to":to,
                "rooms.$[room].beds.$[bed].bookingstatus": true
                      }
              },
        {
            arrayFilters: [
                { "room._id": roomid }, 
                { "bed._id": bedid }    
            ],
            new: true
        }
    );
    
    if(bookbed){
        return res.send(`room booked ${username}`)
    }
    
    
})

app.post("/cancleroom",usermiddleware,async(req,res)=>{

    let {id}=req.user;
     let userid=id;
    

    let {orgid,roomid,bedid,username}=req.body;


    let user=await userSchema.findOneAndUpdate({_id:userid} ,
        {
            $set:{
                organisationid:null,
                hostel:null,
                fromdate:null,
                todate:null,
                roomno:null,
                bedno:null,
                 bedid:null,
                 roomid:null
                 
              }
    })

    let bookbed = await organisationschema.findOneAndUpdate(
        { 
            _id: orgid,
            "rooms._id": roomid 
          },
        {
            $set: {
                "rooms.$[room].beds.$[bed].bedholder": null,
            "rooms.$[room].beds.$[bed].bedholdermobile": null,
                "rooms.$[room].beds.$[bed].bedholderaddress": null,
            "rooms.$[room].beds.$[bed].from":null,
                "rooms.$[room].beds.$[bed].to":null,
                "rooms.$[room].beds.$[bed].bookingstatus":false
                      }
              },
        {
            arrayFilters: [
                { "room._id": roomid }, 
                { "bed._id": bedid }    
            ],
            new: true
        }
    );
    
    if(bookbed){
        return res.send(`booking canceld ${username}`)
    }
    
    
})


app.post("/applygatepass",usermiddleware,async(req,res)=>{

    try{

     let {userid,organisationid,organisationame,username,reason,from,to, permission}= req.body;

     let newgate=await new gatepassschema({

        userid,organisationid,organisationame,username,reason,from,to
     });

     await newgate.save();

     res.send(`gatepass applyed ${username} `)

     
        
    }
    catch(err){
        console.log(err);
    }
})


app.get("/getgatepassforuser",usermiddleware,async(req,res)=>{
    try{
             let {id}=req.user;
             let userid=id;

             let gatepasses=await gatepassschema.find({userid});
              
             if(gatepasses){
                res.json({gatepasses});
             }
    }
    catch(err){
        console.log(err)
    }
});

app.get("/getgatepassfororganisation",orgamiddleware,async(req,res)=>{
    try{
             let {id}=req.user;
             let organisationid=id;

             let gatepasses=await gatepassschema.find({organisationid});
              
             if(gatepasses){
                res.json({gatepasses});
             }
    }
    catch(err){
        console.log(err)
    }
});

app.get("/getorganiastions",usermiddleware,async(req,res)=>{
    let organisation=await organisationschema.find({});

    res.json({organisation});
});


app.post("/orgbyid",usermiddleware,async(req,res)=>{
    let {id}=req.body;

    let org=await organisationschema.findById(id);
    res.json({org})
})


app.post("/permissionAccept",orgamiddleware,async(req,res)=>{

     let {_id}=req.body;

    let per=await gatepassschema.findOneAndUpdate({_id},{$set:{
        permission:"accepted"
    },
}, { new: true } )

    if(per){
        return res.send("permission granted");
    }
})


app.post("/permissiondeclain",orgamiddleware,async(req,res)=>{

    let {_id}=req.body;

   let per=await gatepassschema.findOneAndUpdate({_id},{$set:{
       permission:"declained"
   },
}, { new: true } )

   if(per){
       return res.send("permission declained");
   }
})




app.listen(4000,()=>{
    console.log("port running on 4000")
})