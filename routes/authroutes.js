const express = require('express');
const {loginuser,registeruser}=require('../controllers/authcontroller.js')
const router = express.Router();


// router.get("",loginuser)
// router.get("",registeruser)

router.post("/login",loginuser)
router.post("/register",registeruser)


module.exports = router;
