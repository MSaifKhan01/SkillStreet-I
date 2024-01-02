const express=require("express");

const jwt=require("jsonwebtoken");


const bcrypt=require("bcrypt");
const UserModel=require("../Models/User");

const userRouter=express.Router();
require("dotenv").config()

userRouter.post("/Signup",async(req, res)=> {
  const {email,phoneNumber,name,password}=req.body;
  try{
    if(!email && !phoneNumber){
     res
        .status(400)
        .send({msg:"You need to provide at least email or phoneNumber, or both"});
    }

    let query={};
    if(email){
      query.email= email;
    }else{
      query.phoneNumber= phoneNumber;
    }
    
    // const userFind= await UserModel.findOne({
    //   $or:[{email},{phoneNumber}],
    // });
    const userFind= await UserModel.findOne(query);




    if (userFind) {
       res
        .status(409)
        .send({msg:"User already exists. Please login directly."});
    }

    const hashedPassword=await bcrypt.hash(password, 5);

    const NewUser= new UserModel({
      email,
      phoneNumber,
      name,
      password: hashedPassword,
    });

    await NewUser.save();

    res.status(201).send({msg:"you Are Registered Successfully"});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post("/Login", async(req, res)=>{
  const { email, phoneNumber, password } = req.body;

  try{
    if(!(email||phoneNumber)){
      res
        .status(400)
        .send({msg:"You need to provide at least email or phoneNumber,"});
    }

    if(!password){
      res.status(400).send({msg:"You need to provide password"});
    }

    let query={};
    if(email){
      query.email= email;
    }else{
      query.phoneNumber= phoneNumber;
    }

    const UserPresent= await UserModel.findOne(query);
   
    if(UserPresent){

      bcrypt.compare(password, UserPresent.password, (err, result) => {
        if(result){
          const Token= jwt.sign(
            {userID:UserPresent._id},

            process.env.JWT_Secret,
            {expiresIn:"3h" }
          );

          res
            .status(201)
            .send({
              msg:"Login successfully",
              name:UserPresent.name,
              UserPresent,
              token:Token,
            });
        }else{
          return res.status(400).send({msg:"password not matched"});
        }
      });
    }else{
      res.status(404).send({msg:"You need to SignUp First"});
    }
  }catch(err){
    res.status(500).send(err.message);
  }
});

module.exports={
    userRouter
}