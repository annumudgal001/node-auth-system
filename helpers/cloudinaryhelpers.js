const cloudinary = require('../config/cloudinary.js');

const uploadtocloudinary = async (filepath) => {
    try {
        const result = await cloudinary.uploader.upload(filepath, {
            folder: 'auth_images',
            public_id: Date.now().toString(),
        });
        return {
            url: result.secure_url,
            public_id: result.public_id, // Correct: Uses public_id
        };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error.message);
        return null;
    }
};

module.exports = {
    uploadtocloudinary,
};