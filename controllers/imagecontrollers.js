const image = require("../models/image.js");
const { uploadtocloudinary } = require('../helpers/cloudinaryhelpers.js');
const fs=require('fs')


const uploadimage = async (req, res) => {
    try {
        console.log('Request file:', req.file); // Debugging line

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
                success: false
            });
        }

        console.log('File path:', req.file.path); // Debugging line

        // Upload the file to Cloudinary
        const cloudinaryResponse = await uploadtocloudinary(req.file.path);
        console.log('Cloudinary response:', cloudinaryResponse); // Debugging line

        // Use the correct property name: public_id
        const { url, public_id } = cloudinaryResponse;

        if (!url || !public_id) {
            return res.status(500).json({
                message: "Failed to upload image to Cloudinary",
                success: false
            });
        }

        // Save the image details to the database
        const newlyuploadedimage = new image({
            url,
            publicid: public_id, // Map public_id to publicid
            uploadedby: req.userInfo.userid
        });

        await newlyuploadedimage.save();
        console.log('Image saved to database:', newlyuploadedimage); // Debugging line
        fs.unlinkSync(req.file.path); // Delete the temporary file after upload to Cloudinary


        return res.status(201).json({
            message: "Image uploaded successfully",
            success: true,
            image: newlyuploadedimage
        });

    } catch (error) {
        console.error('Error uploading image:', error); // Debugging line
        return res.status(500).json({
            message: "Something went wrong, please try again",
            success: false
        });
    }
};

const fetchimagescontroller=async(req,res)=>{
    try {
        
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({
            message: "Something went wrong, please try again",
            success: false
        });
    }
}

module.exports = {
    uploadimage
};