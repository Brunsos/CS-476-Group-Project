import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Buyer from "../db/buyer.js";  // Import the Buyer model
import Vendor from "../db/vendor.js"; // Import the Vendor model
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Signup route
app.post("/signup", async (req, res) => {
    console.log(req.body);

    const { userName, email, password, confirmPassword, province, city, address, isVendor } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        let buyer = await Buyer.findOne({ email });
        if (buyer) return res.status(400).json({ msg: 'Buyer already exists' });
        
        let vendor = await Vendor.findOne({ email });
        if (vendor) return res.status(400).json({ msg: 'Vendor already exists' });

        // Create and save the new vendor or buyer
        if (isVendor == 'true'){
            
            vendor = new Vendor({userName, email, password, province, city, address, isVendor});
            await vendor.save();
            res.status(201).json({ msg: 'Vendor registered successfully' });
        }
        else{
            
            buyer = new Buyer({ userName, email, password, province, city, address });
            await buyer.save();
            res.status(201).json({ msg: 'Buyer registered successfully' });
        }
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
        const buyer = await Buyer.findOne({ email });
        if (!buyer) {
            return res.status(400).json({ msg: 'Invalid email' });
        }

        // Compare the provided password
        if (password !== buyer.password) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        // If successful, return a success message
        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.use((err, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;