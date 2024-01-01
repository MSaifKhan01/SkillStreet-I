const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:String,
    password:String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;