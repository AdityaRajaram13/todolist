const express = require("express");
const User = require("../model/User");

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
        return res.status(400).json({ status: "failed", error: "Username, email, and password are required" });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ status: "failed", error: "Invalid email format" });
    }
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }
        const newUser = await User.create({ name, username, email, password }); 
        res.json({ status: 'success', message: 'User registration successful' });
    } catch (error) {
        console.error("Error creating user", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
