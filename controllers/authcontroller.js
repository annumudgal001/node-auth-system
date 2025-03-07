const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const registeruser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const checkexistinguser = await user.findOne({ $or: [{ username }, { email }] });
        if (checkexistinguser) {
            return res.status(400).json({
                message: "Username or email already exists",
                success: false
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new user({ username, email, password: hashedPassword, role });
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: savedUser
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

const loginuser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = await user.findOne({ username });

        if (!foundUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
      
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
                success: false
            });
        }

        const accesstoken = jwt.sign(
            {
                userid: foundUser._id,
                username: foundUser.username,
                role: foundUser.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '30m' }
        );

        res.status(200).json({
            message: "Logged in successfully",
            success: true,
            accesstoken: accesstoken,
            user: foundUser
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

module.exports = { loginuser, registeruser };