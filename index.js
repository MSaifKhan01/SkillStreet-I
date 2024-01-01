const express=require("express")

const app=express()
const cors=require("cors")
const { ConnectionToDB } = require("./Config/db")
const { userRouter } = require("./Routes/User")
app.use(express.json())
app.use(cors())


app.use("/User",userRouter)





app.listen(4000,async()=>{
    try {
        await ConnectionToDB
        console.log("Connected To DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Running Server on port 4000")
})