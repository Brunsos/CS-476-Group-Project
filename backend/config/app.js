import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./db/user.js";
import Plant from "./db/plant.js";
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

    const { userName, email, password, confirmPassword } = req.body;
    let errors = {};

    
    try {
        // Check if passwords match
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) errors.email = 'User already exist'

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        else{
            user = new User({ userName, email, password });
            await user.save();
            res.status(201).json({ msg: 'User registered successfully' });
        }
        // Create and save the new user
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
        const user = await User.findOne({ email });
        if (!user) {
            errors.email = 'Invalid email';
        }

        // Compare the provided password
        if (password !== user.password) {
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
        const { common_name, price, quantity, original, description, countInStock } = req.body;
        
        const plant = new Plant({
            image: req.file.buffer,
            common_name,
            price,
            quantity,
            original,
            description,
            countInStock,
        });

        await plant.save();
        res.status(200).json({ msg: 'Plant registered successfully' });
       //console.log(res.status(202));

    }catch(err){
        console.error(err);
        res.status(500).send({ msg: 'Server error' });
    }

});

app.get('/api/plants', async (req, res) => {
    console.log('GET /api/plants route called');
    try {
        const plants = await Plant.find({});

        const plant = await Plant.findOne({});
        console.log('Image data:', plant.image.toString('base64'));

        const plantsWithImages = plants.map(plant => ({
            //return {
                // ...plant._doc,
                ...plant.toObject(),
                image: plant.image.toString('base64')
                //image: plant.image ? plant.image.toString('base64') : null
            //};
        }));

        res.json(plantsWithImages);
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({ error: 'Failed to fetch plants' });
    }
});

app.use((err, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
export default app;