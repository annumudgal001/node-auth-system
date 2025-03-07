const express = require('express');
const isadmin = require('../middlewares/adminmiddleware');
const auth = require('../middlewares/authmiddleware');
const upload = require('../middlewares/uploadmiddleware');
const { uploadimage } = require('../controllers/imagecontrollers.js');

const router = express.Router();

// Correct middleware order
router.post("/upload", auth, isadmin, upload.single('image'), uploadimage);

module.exports = router;