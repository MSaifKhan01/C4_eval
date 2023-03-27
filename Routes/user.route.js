const express=require("express")

const jwt=require("jsonwebtoken")
const {userModel}=require("../Models/user.model")
const bcrypt=require("bcrypt")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try {
        bcrypt.hash(password,3,async(err,hash)=>{
            const user=new userModel({name,email,gender,password: hash,age,city,is_married})
            await user.save()
            res.status(200).send({"msg":"Registerition Done"})
        })
    } catch (err) {
        res.status(400).send({"msg":"Registerition not Done"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"login Done","token":jwt.sign({"userID":user._id},"saif",{expiresIn:'3h'})})
                }else{
                    res.status(400).send({"msg":"login not Done"})
                }
            })
        }
    } catch (err) {
        res.status(400).send({"msg":err.massage})
    }
})

module.exports={userRouter}