const jwt=require("jsonwebtoken")


const auth=(req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,"saif")
        if(decoded){
            req.body.userID=decoded.userID
            next()
        }else{
            res.status(400).send({"msg":"plz login first"})
        }
    }else{
        res.status(400).send({"msg":"Did't Login"})
    }
}

module.exports={auth}