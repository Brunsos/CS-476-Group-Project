import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./user.js";  // Import the User model
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());  // Add this line to enable cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define routes (e.g., for sign-up)
app.post("/signup", async (req, res) => {
    console.log(req.body); // Log the received data

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Create and save the new user
        user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email' });
        }

        // Compare the provided password
        if (password !== user.password) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        // If successful, return a success message (or token in a real app)
        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;