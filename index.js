const express=require("express")

const mongoose=require("mongoose")
const { auth } = require("./AuthMiddleware/auth")

require("dotenv").config()
const {connection}=require("./Config/db")
const {userRouter}=require("./Routes/user.route")
const {postRouter}=require("./Routes/post.route")
app.use(express.json())
app.use(cors())
const app=express()
app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",auth,postRouter)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (err) {
        console.log(err)
    }
    console.log("port running on PORT")
})