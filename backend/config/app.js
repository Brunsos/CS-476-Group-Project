import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Buyer from "../db/buyer.js";  // Import the Buyer model
import Vendor from "../db/vendor.js"; // Import the Vendor model
import Plant from "../db/plant.js";
import Cart from "../db/cart.js"
import cors from "cors";
import multer from 'multer';


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


// Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let errors = {};

    try {
        // Find the user by email
        const buyer = await Buyer.findOne({ email });
        const vendor = await Vendor.findOne({ email });
        
        // If a buyer account was found proceeed to the next step
        if (buyer) {
            // Compare the provided password
            if (password !== buyer.password ) {
                errors.password = 'Invalid password';
            }
        }
        
        // If a vendor account was found proceeed to the next step
        if(vendor){
            // Compare the provided password
            if(password !== vendor.password){
                errors.password = 'Invalid password';
            }
        }

        if (!buyer && !vendor){
            errors.email = 'Invalid email';
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
    const { plantId, name, price, quantity } = req.body;
    console.log("i am in the addcart");
    
    try {
        const item = await Cart.create({
            plantId,
            name,
            price
        });
        await item.save();
        console.log("this is item content: ",item);
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: "Error adding product to cart", error });
    }
});

app.get('/api/cart', async (req, res) => {
    try {
        console.log("inside the cart");
        const cartItems = await Cart.find({});
    
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
    try {
        const deletedItem = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Plant not found' });
            res.status(200).json({ message: 'Plant deleted successfully' });
        } catch (error) {
            console.error('Error deleting plant:', error);
        res.status(500).json({ error: 'Failed to delete plant' });
        }
});

app.use((err, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
export default app;
