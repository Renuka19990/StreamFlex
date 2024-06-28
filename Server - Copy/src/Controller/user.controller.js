const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {  Blacklist } = require("../models/blacklist.model");
const { User } = require("../models/user.model");
require("dotenv").config();

const SignUp = async (req, res) => {
    const { username, email, role, password } = req.body;
    try {
        // Checking if user already exists
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(401).json({ msg: "User is already registered. Please try to login." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating the new user
        const newUser = await User.create({
            username,
            email,
            role,
            password: hashedPassword
        });

        return res.status(201).json({ msg: "User registered successfully." });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            msg: "Failed to register user. Please provide correct details."
        });
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ msg: "User not found, please provide correct credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign(
                { userID: user.id, role: user.role, username: user.username, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );
            // Send different responses or data based on the user role
            if (user.role === 'admin') {
                res.status(200).json({ token, role: user.role, msg: "Admin logged in successfully" });
            } else {
                res.status(200).json({ token, role: user.role, msg: "User logged in successfully" });
            }
        } else {
            return res.status(401).json({ msg: "Incorrect password" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "An error occurred during login" });
    }
};


const veriFyOtp = async (req, res) => {
    const { email, otp } = req.body;
    // Implementation for OTP should be added here, this is just a placeholder
    res.status(500).json({ message: "OTP verification not implemented." });
};

const forgotPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({
                message: "User not found Please try to logIn",
                verified: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.update({ password: hashedPassword }, { where: { email } });
        res.status(200).send({
            msg: "Password Updated Successfully. Try to login",
            Updated: true
        });
    } catch (error) {
        res.status(400).send({ message: "Failed to update password. Please try again later." });
    }
};

const logout = async (req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ msg: "No token provided." });
    }
  
    try {
      // Store the token in a blacklist
      await Blacklist.create({ token });
      res.status(201).send("User logged out successfully");
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };


  
module.exports = { SignUp, logIn, veriFyOtp, forgotPassword, logout };
