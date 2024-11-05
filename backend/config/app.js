import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Buyer from "../db/buyer.js";  // Import the Buyer model
import Vendor from "../db/vendor.js"; // Import the Vendor model
import Plant from "./plant.js";
import cors from "cors";
import multer from 'multer';


dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// store image from vendor ******************************************


// ****************************************************************************

// Signup route
app.post("/signup", async (req, res) => {
    console.log(req.body);

    const { userName, email, password, confirmPassword, province, city, address, isVendor } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    
    try {
        // Check if passwords match
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

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
    let errors = {};

    try {
        // Find the user by email
        const buyer = await Buyer.findOne({ email });
        const vendor = await Vendor.findOne({ email });

        if (!buyer || !vendor) {
            errors.email = 'Invalid email';
        }

        // Compare the provided password
        if (password !== buyer.password || password !== vendor.password) {
            errors.password = 'Invalid password';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        // If successful, return a success message
        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});


// Vender route

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/vendorPost", upload.single('image'), async (req, res) => {
    console.log(req.body);
    
    try{
        const { image, common_name, price, quantity, original, description, countInStock } = req.body;
        
        let plant = new Plant({ image, common_name, price, quantity, original, description, countInStock });
        await plant.save();
        res.status(200).json({ msg: 'Plant registered successfully' });
       //console.log(res.status(202));

    }catch(err){
        console.error(err);
        res.status(500).send({ msg: 'Server error' });
    }

});
app.use((err, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
export default app;
