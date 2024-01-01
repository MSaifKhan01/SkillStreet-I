const express=require("express")
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app=express()
const cors=require("cors")
const { ConnectionToDB } = require("./Config/db")
const { userRouter } = require("./Routes/User")
const { noteRouter } = require("./Routes/Notes")
app.use(express.json())
app.use(cors())




// --------->>>>>> Swagger <<<<<<---------\\

const options={
    definition: {
      openapi:'3.0.0',
      info: {
        title:'SkillStreet-Backend',
        version:'1.0.0',
        description:"This project is a Node.js application "
      },
      servers: [
        {
          url:"https://skillstreet-i.onrender.com/",
        },
      ],
      
    },
    apis:["./ApiDocs/RoutesDoc.js"]
  };
  
  const openapiSpecification=swaggerJsDoc(options);
  app.use("/docs",swaggerUI.serve,swaggerUI.setup(openapiSpecification));



app.use("/User",userRouter)

app.use("/Note",noteRouter)



app.listen(4000,async()=>{
    try {
        await ConnectionToDB
        console.log("Connected To DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Running Server on port 4000")
})


module.exports={
    app
}