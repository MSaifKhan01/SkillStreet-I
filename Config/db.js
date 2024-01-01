const mongoose=require("mongoose")
require("dotenv").config()

const ConnectionToDB= mongoose.connect(process.env.mongoUrl)



module.exports={
    ConnectionToDB
}