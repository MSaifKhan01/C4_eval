const express=require("express")



const postRouter=express.Router()
const {postModel}=require("../Models/post.model")

const jwt=require("jsonwebtoken")

postRouter.post("/add",async(req,res)=>{
    try {
        const post=new postModel(req.body)
        await post.save()
        res.status(200).send({"msg":"post added"})
    } catch (err) {
        res.status(400).send({"msg":err.massage})
    }
})


postRouter.get("/",async(req,res)=>{
   
    const { page=1, userID, minComments=0, maxComments=Number.MAX_SAFE_INTEGER, device } = req.query
    const limit = 3
    const skip = (page - 1) * limit
    try{
      
            query.comments = { $gte: minComments, $lte: maxComments }
            if (device) {
                query.device = { $in: device.split(",") }
            }
            const count = await postModel.countDocuments(query)
            const posts=await postModel.find(query).limit(limit).skip(skip)
            res.status(200).send({posts, totalPages: Math.ceil(count / limit)})
    
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})


postRouter.get("/top",async(req,res)=>{

    const { page=1, limit=3 } = req.query
    try{
    
            const posts=await postModel.aggregate([
                { $match: { userID: decoded.userID } },
                { $sort: { comments: -1 } },
                { $limit: parseInt(limit) },
                { $skip: (page - 1) * limit },
            ])
            res.status(200).send(posts)

    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

postRouter.put("/update/:Id",async(req,res)=>{
    let {Id}=req.params
    let newbody=req.body
    try {
        await postModel.findByIdAndUpdate({_id:Id},newbody)
        res.status(200).send({"msg":"post updated"})
    } catch (err) {
        res.status(400).send({"msg":err.massage})
    }
})
postRouter.delete("/delete/:Id",async(req,res)=>{
    let {Id}=req.params

    try {
        await postModel.findByIdAndDelete({_id:Id})
        res.status(200).send({"msg":"post deleted"})
    } catch (err) {
        res.status(400).send({"msg":err.massage})
    }
})

module.exports={postRouter}