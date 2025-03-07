const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const checkfilefilter = (req, file, cb) => {
    console.log('File being processed:', file); // Debugging line
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPG and PNG images are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: checkfilefilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});

module.exports = upload;