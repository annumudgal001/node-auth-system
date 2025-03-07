 const express = require('express');
 const mongoose = require('mongoose'); 
 const connecttodb=require('./database/db.js')
 const User=require('./models/user.js');
 const authroutes=require('./routes/authroutes.js')
 const homeroutes=require('./routes/homeroutes.js')
 const adminroutes=require('./routes/adminroutes.js')
const app=express();

require ('dotenv').config();
connecttodb();

app.use(express.json());

app.use('/api/auth',authroutes);
app.use('/api/home',homeroutes);
app.use('/api/admin',adminroutes);

app.get("/",(req,res)=>{
    res.json({message:"Welcome to our API"})
})



const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}/api/home  \n\n\n`)
}) 