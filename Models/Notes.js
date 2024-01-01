const mongoose=require('mongoose');

const NoteSchema= new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title:{
        type:String,
        required:true,
        maxlength:150
    }, 
    content:{
        type:String,
        required:true,
        maxlength:400
    },
    CreatedAt:{
        type:Date,
        default:Date.now()
    },
    LastModificationAt:{
        type:Date,
        default:Date.now()
    }
});

const NoteModel=mongoose.model("Note",NoteSchema);

module.exports=NoteModel;