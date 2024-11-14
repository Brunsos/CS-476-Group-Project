import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Buyer from "../db/buyer.js";  // Import the Buyer model
import Vendor from "../db/vendor.js"; // Import the Vendor model
import Plant from "../db/plant.js"; // Import the Plant model
import Payment from "../db/paymentInfo.js"; // Import the Credit/Debit card model
import Cart from "../db/cart.js"
import cors from "cors";
import multer from 'multer';
import session from 'express-session';
import MongoStore from 'connect-mongo';


dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(session({
    secret: 'U_of_R_Secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI,
        ttl: 24 * 60 * 60 // Session TTL in seconds (1 day)
    }),
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // Cookie TTL in milliseconds (1 day)
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true
    }
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

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
            

            buyer = new Buyer({ userName, email, password, province, city, address, isVendor});

            await buyer.save();
            res.status(201).json({ msg: 'Buyer registered successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/vendorPost", upload.single('image'), async (req, res) => {
    console.log(req.body);
    
    try{
        const { common_name, price, ecozone, description, countInStock, ratingSum, ratingCount } = req.body;
        
        const plant = new Plant({
            image: req.file.buffer,
            common_name,
            price,
            ecozone,
            description,
            countInStock,
            ratingSum,
            ratingCount,
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
    console.log(req.isVendor);
    try {
        const plants = await Plant.find({});

        const plantsImages = plants.map(plant => ({
            ...plant.toObject(),
            image: plant.image.toString('base64')
        }));

        res.json(plantsImages);
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({ error: 'Failed to fetch plants' });
    }
});


app.get('/api/vendors', async (req, res) => {
    console.log('GET /api/vendor route called');
    try {
        const vendorOpt = await Vendor.find({});

        res.json(vendorOpt);
    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ error: 'Failed to fetch vendors' });
    }
});


// retrieve image
app.get("/product/:id", async (req, res) => {
    try {
        const product = await Plant.findById(req.params.id);
        console.log("this is product information: ",product);

        const productImages = {
            ...product.toObject(),
            image: product.image.toString('base64')
        };
        
        res.json(productImages);
    } catch (error) {
      res.status(500).send({ message: "Error fetching product" });
    }
  });

app.delete('/api/plants/:id', async (req, res) => {
    try {
        const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
        if (!deletedPlant) return res.status(404).json({ message: 'Plant not found' });
            res.status(200).json({ message: 'Plant deleted successfully' });
        } catch (error) {
            console.error('Error deleting plant:', error);
        res.status(500).json({ error: 'Failed to delete plant' });
        }
});
    
app.post('/api/addcart', async (req, res) => {
    // check if user is login and is buyer or not
    if (!req.session.user || req.session.user.isVendor) {
        return res.status(401).json({ message: "Unauthorized: Only buyers can add to cart" });
    }

    const { plantId, name, price, quantity } = req.body;
    const buyerId = req.session.user.id;
    console.log("i am in the addcart");

    try {
        // Check if item already exists in cart for this buyer
        const existingItem = await Cart.findOne({ 
            buyerId: buyerId,
            plantId: plantId 
        });

        if (existingItem) {
            // Update quantity if item exists
            existingItem.quantity += quantity || 1;
            await existingItem.save();
            res.status(200).json(existingItem);
        } else {
            // Create new cart item
            const item = await Cart.create({
                buyerId,
                plantId,
                name,
                price,
                quantity: quantity || 1
            });
            res.status(200).json(item);
        }
    } catch (error) {
        res.status(500).json({ message: "Error adding product to cart", error });
    }
});

app.get('/api/cart', async (req, res) => {
    // Check if item already exists in cart for this buyer
    if (!req.session.user || req.session.user.isVendor) {
        return res.status(401).json({ message: "Unauthorized: Only buyers can view cart" });
    }

    try {
        const buyerId = req.session.user.id;
        const cartItems = await Cart.find({ buyerId: buyerId });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart", error });
    }
});

    // retrieve single image
app.get('/image/:id', async (req, res) => {
    console.log("Inside get image route, id:", req.params.id);

    try {
        const plant = await Plant.findById(req.params.id);

        console.log("Found plant:", plant ? "yes" : "no");

        if (plant && plant.image) {
            const imageBuffer = Buffer.from(plant.image.toString('base64'), 'base64');
            res.set('Content-Type', 'image/jpeg');
            res.send(imageBuffer);
        } else {
            console.log("No plant or image found");
            res.status(404).send("Image not found");
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});


app.delete('/api/cart/item/:id', async (req, res) => {
    // Check if item already exists in cart for this buyer
    if (!req.session.user || req.session.user.isVendor) {
        return res.status(401).json({ message: "Unauthorized: Only buyers can view cart" });
    }

    try {
        const buyerId = req.session.user.id;
        const deletedItem = await Cart.findOneAndDelete({
            _id: req.params.id,
            buyerId: buyerId
        });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found or unauthorized' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

  app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ msg: err.message || 'Internal server error' });
});

app.get('/api/user-role', (req, res) => {
    try {
        console.log('Session data on /api/user-role:', req.session);
        
        if (!req.session || !req.session.user) {
            return res.status(401).json({ msg: 'No session found' });
        }

        res.status(200).json({ 
            isVendor: req.session.user.isVendor,
            email: req.session.user.email 
        });
    } catch (error) {
        console.error('Error in /api/user-role:', error);
        res.status(500).json({ msg: 'Server error checking user role' });
    }
});

// Gets the specific users shipping info
app.get('/api/specific-user', async (req, res) => {
    try {
        console.log('Session data on /api/specific-user:', req.session);
        
        // Confirms that the user is logged in
        if (!req.session || !req.session.user) {
            return res.status(401).json({ msg: 'No session found' });
        }
        
        // Find the specific user using their unique ID
        const userInfo = await Buyer.findOne(req.session.user._id);
        
        // Send the sought after shipping results back as a JSON object
        res.status(200).json({ 
            id: userInfo.id,
            province: userInfo.province,
            city: userInfo.city,
            address: userInfo.address 
        });
    } catch (error) {
        console.error('Error in /api/specific-user', error);
        res.status(500).json({ msg: 'Server error checking for specific user' });
    }
});

app.post('/api/save-payment', async (req, res) => {
    let errors = {};

    const {cardNumber, expDate, cvc, nameOnCard, nickname} = req.body;

    try {
        if(req.session.user.savedCards.contains(cardNumber)){
            res.status(400).json({msg: "The card is already registered"});
        }
        else{
            let addCard = new Payment({cardNumber, expDate, cvc, nameOnCard, nickname});
            await addCard.save();
            res.status(201).json({msg: "Card added successfully"});
            req.session.user.savedCards.push(addCard)
        }
    } catch (error){
        console.log(error);
        res.status(500).json({msg: 'Server error adding card'})
    }
})

app.post("/login", async (req, res) => {
    console.log('Login attempt with:', req.body);

    let errors = {};
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const buyer = await Buyer.findOne({ email });
        const vendor = await Vendor.findOne({ email });
        
        let user = null;
        let isVendor = false;

        if (buyer) {
            if(password === buyer.password){
                user = buyer;
                isVendor = false;
            } else{
                errors.password = 'Invalid password';
            }
        } else if (vendor) {
            if(password === vendor.password){
                user = vendor;
                isVendor = true;
            } else{
                errors.password = 'Invalid password';
            }
        }else{
            errors.email = 'Invalid email';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        // Set session data with consistent structure
        req.session.user = {
            id: user._id,
            email: user.email,
            isVendor: isVendor
        };

        // Save session explicitly
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ msg: 'Session error' });
            }

            console.log('Session saved successfully:', req.session);
            res.status(200).json({
                msg: 'Login successful',
                user: {
                    email: user.email,
                    isVendor: isVendor
                }
            });
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Server error during login' });
    }
});

export default app;