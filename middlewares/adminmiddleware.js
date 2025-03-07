const isadmin=(req,res,next)=>{
    if(req.userInfo.role==='admin'){
        next();
    }else{
        return res.status(403).json({message:"Access denied. You are not an admin"})
    }
}

module.exports=isadmin;