const express = require('express');
const auth=require("../middlewares/authmiddleware.js")
const isadmin=require("../middlewares/adminmiddleware.js")
const app = express();
const router=express.Router();

router.get('/',auth,isadmin,(req,res)=>{
    res.json({
        message:'Welcome to admin panel',
        success:true
        
    })
})


module.exports=router;
