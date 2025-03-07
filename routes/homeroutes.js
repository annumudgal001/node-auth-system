const express = require('express');
const auth =require(`../middlewares/authmiddleware.js`)

const app = express();
const router=express.Router();

router.get('/welcome',auth,(req,res)=>{
    const {username,userid,role}=req.userInfo;
    res.json({
        message:`Welcome ${username}, Your ID is ${userid}, Your Role is ${role}`,
        success:true
        
    }) 
})

module.exports=router;
