const mongoose = require('mongoose');


const userschema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('User',userschema)