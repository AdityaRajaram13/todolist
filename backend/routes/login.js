const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/User");

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ status: "failed", error: "Username and password are required" });
    }
    try {
        const user = await User.findOne({ username });
        console.log("user",user);
        if (!user) {
            return res.status(400).json({ status: "failed", error: "Invalid user credentials" });
        }
        const isPasswordValid = await user.comparePassword(password);
        console.log(user.password,"user.password");
        if (!isPasswordValid) {
            return res.status(400).json({ status: "failed", error: "Invalid password credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });
        return res.json({ status: 'success', message: 'User authentication successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'failed', error: 'Internal server error' });
    }
});
module.exports = router;
