const jwt=require("jsonwebtoken");

orgamiddleware=(req,res,next)=>{
    try{
         let token=req.header("x-token");

         if(!token){
            return res.status(400).send("token error")
            
         }

         if(token){
         let decode =   jwt.verify(token,"organisationsecurity")
          
         req.user=decode.user;
         next()

         }
    }
    catch(err){
        //res.send("token error").status(400)
        console.log(err)
    }
}

module.exports =orgamiddleware;
