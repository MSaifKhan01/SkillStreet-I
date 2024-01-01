const express=require("express");
const NoteModel=require("../Models/Notes");
const {Auth}=require("../Middleware/Auth");
const jwt=require("jsonwebtoken");
const noteRouter=express.Router();
require("dotenv").config();

// for adding a notes
noteRouter.post("/Add",Auth,async(req,res)=>{
const {title,content}=req.body;

let token=req.headers.authorization;
let decoded=jwt.verify(token,process.env.JWT_Secret);
try{
if(!title){
res.status(400).send({msg:"You need Enter Title of the Note"});
}
if(!content){
res.status(400).send({msg:"You need Enter Content of the Note"});
}
if(title.length>150){
res.status(400).send({
msg:"title must be most of 150 charcaters You need to reduce the Characters",
});
}

if(content.length>400){
res.status(400).send({
msg:"Content must be most of 400 charcaters You need to reduce the Characters",
});
}

const existingNote=await NoteModel.findOne({
userID:decoded.userID,
title,
});

if(!existingNote){
const newNote=new NoteModel({
userID:decoded.userID,
title,
content,
});

await newNote.save();

res.status(201).send({data:newNote,msg:"Note Added successfully"});
}else{
res.status(409).send({msg:"Note already exists in the DB"});
}
}catch(err){
res.status(500).send({error:err.message||"Internal Server Error"});
}
});

//For Getting All Notes
noteRouter.get("/All-Notes",Auth,async(req,res)=>{
const token=req.headers.authorization;
const decoded=jwt.verify(token,process.env.JWT_Secret);
console.log(decoded);
try{
const Notes=await NoteModel.find({userID:decoded.userID}).populate(
"userID"
);
if(Notes.length===0){
res.status(404).send({msg:"Notes not Found"});
}
//console.log(Notes)
res.status(200).send(Notes);
}catch(err){
    res.status(500).send({error:err.message||"Internal Server Error"});
}
});

//For Getting particular Note
noteRouter.get("/Single-Note/:id",Auth,async(req,res)=>{
const token=req.headers.authorization;
const decoded=jwt.verify(token,process.env.JWT_Secret);
const {id}=req.params;
try{
const Note=await NoteModel.findOne({
userID:decoded.userID,
_id:id,
}).populate("userID");

if(!Note){
res.status(404).send({msg:"Note not Found"});
}
res.status(200).send(Note);
}catch(err){
    res.status(500).send({error:err.message||"Internal Server Error"});
}
});

//For Updating a Note

noteRouter.put("/Update-Note/:id",Auth,async(req,res)=>{
const {id}=req.params;
const {title,content}=req.body;
const token=req.headers.authorization;
const decoded=jwt.verify(token,process.env.JWT_Secret);
console.log(decoded);

try{
if(!title){
res.status(400).send({msg:"You need Enter Title of the Note"});
}
if(!content){
res.status(400).send({msg:"You need Enter Content of the Note"});
}
if(title.length>150){
res.status(400).send({
msg:"title must be most of 150 charcaters You need to reduce the Characters",
});
}

if(content.length>400){
res.status(400).send({
msg:"Content must be most of 400 charcaters You need to reduce the Characters",
});
}
const NoteData=await NoteModel.findOne({userID:decoded.userID})
console.log(NoteData)
if(!NoteData){
res.status(404).send({msg:"Note Not Found"});
}
const UpdateData=await NoteModel.findByIdAndUpdate(
{_id:id},

{title,content},
{new:true}
);

if(!UpdateData){
res.status(404).send({msg:"Note Not Found"});
}

res.status(200).send({msg:"Note Data Updated",UpdateData});
}catch(err){
    res.status(500).send({error:err.message||"Internal Server Error"});
}
});

//For Deleting a Note
noteRouter.delete("/Delete-Note/:id",Auth,async(req,res)=>{
const {id}=req.params;
const token=req.headers.authorization;
const decoded=jwt.verify(token,process.env.JWT_Secret);

try{
const NoteData=await NoteModel.findOne({userID:decoded.userID})
console.log(NoteData)
if(!NoteData){
res.status(404).send({msg:"Note Not Found"});
}

const DeleteNote=await NoteModel.findByIdAndDelete({_id:id});
//console.log(DeleteUser)
if(!DeleteNote){
res.status(404).send({msg:"Note Not Found"});
}

res
.status(200)
.send({msg:"Note Deleted Successfully",DeleteNote});
}catch(err){
    res.status(500).send({error:err.message||"Internal Server Error"});
}
});

module.exports={
noteRouter,
};
