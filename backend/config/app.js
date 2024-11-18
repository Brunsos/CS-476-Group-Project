import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Buyer from "../db/buyer.js";  // Import the Buyer model
import Vendor from "../db/vendor.js"; // Import the Vendor model
import Plant from "../db/plant.js"; // Import the Plant model
import Cart from "../db/cart.js"
import cors from "cors";
import multer from 'multer';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { performance } from 'perf_hooks';



// Loads environment variables into process.env which is loading the mongodb URI string
dotenv.config();
//express() is responsible for creating the framework which handles the HTTP requests 
//and responses for all the API's in the backend.
const app = express();
//
app.use(bodyParser.json());
//
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

//*********************************************************************** */
//  app.use(session({...})) is function which sets up the user session    //                       
//  and uses mongodb as storage.                                          //                                                                                //
//*********************************************************************** */
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


//*************************************************************************** */
//  The signup route registers new users and outputs either a buyer or vendor //                      
//  data object to mongodb depending on whether the isVendor attribute is set //                                                     
//  to true or false.                                                         //
//*************************************************************************** */
app.post("/signup", async (req, res) => {
    console.log(req.body);

    // create the user object and store it in req.body
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
            

            // if the user is buyer then create new buyer
            buyer = new Buyer({ userName, email, password, province, city, address, isVendor});

            await buyer.save();
            res.status(201).json({ msg: 'Buyer registered successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Temporarily stores the image files to RAM
const storage = multer.memoryStorage();
// Sets up middleware to handle the image upload from the vendorPost form
const upload = multer({ storage });

//************************************************************************* */
// The VendorPost route creates a plant object and sends it to mongodb, it  // 
// also adds the plant ID to the vendors plantArray attribute.              //                                          
//************************************************************************* */
app.post("/vendorPost", upload.single('image'), async (req, res) => {
    const startTime = performance.now();
    console.log('Session data:', req.session);
    
    try {
        // Check if user is logged in and is a vendor
        if (!req.session?.user?.id || !req.session?.user?.isVendor) {
            return res.status(401).json({ msg: 'Unauthorized: Must be logged in as vendor' });
        }

        // Find the vendor first
        const vendor = await Vendor.findById(req.session.user.id);

        if (!vendor) {
            return res.status(404).json({ msg: 'Vendor not found' });
        }

        const { common_name, price, ecozone, description, countInStock } = req.body;
        
        // Create new plant
        const plant = new Plant({
            image: req.file.buffer,
            common_name,
            price,
            ecozone,
            description,
            countInStock,
            ratingSum: 0,
            ratingCount: 0,
            vendorId: vendor._id
        });

        // Save the plant
        const savedPlant = await plant.save();

        // Initialize plantArray if it doesn't exist
        if (!vendor.plantArray) {
            vendor.plantArray = [];
        }

        // Add plant to vendor's plantArray
        vendor.plantArray.push(savedPlant._id);
        await vendor.save();

        //Calculate how long all operations of vendorPost took and dicplay it
        const totalTime = performance.now() - startTime; 
        console.log(`Total vendorPost operation took: ${totalTime.toFixed(2)}ms`);

        console.log('Updated vendor:', vendor); 

        res.status(200).json({ 
            msg: 'Plant registered successfully',
            plantId: savedPlant._id
        });

    } catch (err) {
        console.error('Error in vendorPost:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

//************************************************************* */
// Retrieves all plant objects from mongodb and converts the    //
// plant images to base64                                       //
//************************************************************* */

app.get('/api/plants', async (req, res) => {
    console.log('GET /api/plants route called');
    console.log(req.isVendor);

    try {


        //returns all plant objects from mongodb
        const plants = await Plant.find({});

        // Creates a new plant object from each plant document 
        // that was querried above.

        const plantsImages = plants.map(plant => ({
            ...plant.toObject(),
            image: plant.image.toString('base64') //converts the binary plant image file to base64
        }));

        res.json(plantsImages);
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({ error: 'Failed to fetch plants' });
    }
});

//*********************************************************************** */
// vendor/plants route retrives the plants from the plantArray attribute  //
// of which ever vendor is logged in.                                     //
//*********************************************************************** */
app.get('/api/vendor/plants', async (req, res) => {
    const startTime = performance.now();
    try {
        if (!req.session?.user?.id || !req.session?.user?.isVendor) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        // Find the vendor and populate their plants
        const vendor = await Vendor.findById(req.session.user.id);
        if (!vendor) {
            return res.status(404).json({ msg: 'Vendor not found' });
        }

        // Initialize plantArray if it doesn't exist
        if (!vendor.plantArray) {
            vendor.plantArray = [];
            await vendor.save();
        }

        // Find all plants belonging to this vendor
        const plants = await Plant.find({ vendorId: vendor._id });

        // Convert plant images to base64 
        const plantsWithImages = plants.map(plant => ({
            ...plant.toObject(),
            image: plant.image.toString('base64')
        }));

        //Calculate how long all operations of vendor took and dicplay it
        const totalTime = performance.now() - startTime; 
        console.log(`Total vendor operation took: ${totalTime.toFixed(2)}ms`);

        res.json(plantsWithImages);
    } catch (error) {
        console.error('Error fetching vendor plants:', error);
        res.status(500).json({ error: 'Failed to fetch plants' });
    }
});

//******************************************* */
// Rertrieves all vendors from mongodb        //
//******************************************* */
app.get('/api/vendors', async (req, res) => {
    console.log('GET /api/vendor route called');
    try {
        // pull all vendor in mongodb by find
        const vendorOpt = await Vendor.find({});

        res.json(vendorOpt);
    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ error: 'Failed to fetch vendors' });
    }
});

//************************************************************* */
// Returns a plant data object by its specific ID, with all     //
// plant attributes and converts the plant image from binary    //
// to base64 because binary image files cannot be sent directly //
// in JSON responses and base64 can be used directly in HTML    //
//************************************************************* */
app.get("/product/:id", async (req, res) => {
    try {
        // find single plant by its id
        const product = await Plant.findById(req.params.id);
        console.log("this is product information: ",product);
        

        // transform each plant document to include base64 encoded image
        const productImages = {
            ...product.toObject(),
            // Convert plant images to base64
            image: product.image.toString('base64')
        };
        
        res.json(productImages);
    } catch (error) {
      res.status(500).send({ message: "Error fetching product" });
    }
});

//******************************************************* */
// Finds a plant object by its ID and deletes that plant  //                       
// from mongodb, also throws a confirmation message.      //                                                                                                      
//******************************************************* */
app.delete('/api/plants/:id', async (req, res) => {
    try {
        // find and delete the plant by its id
        const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
        if (!deletedPlant) return res.status(404).json({ message: 'Plant not found' });
            res.status(200).json({ message: 'Plant deleted successfully' });
        } catch (error) {
            console.error('Error deleting plant:', error);
        res.status(500).json({ error: 'Failed to delete plant' });
        }
});
    
//********************************************************* */
// Adds a plant to the buyers cart, it updates the quantity //                  
// in the cart if that plant is already in the cart or adds //
// a new plant in that specific plant isn't already in the  //
// cart.                                                    //                                                      
//******************************************************** */
app.post('/api/addcart', async (req, res) => {
    // check if user is login and is buyer or not
    if (!req.session.user || req.session.user.isVendor) {
        return res.status(401).json({ message: "Unauthorized: Only buyers can add to cart" });
    }

    // Destructure required fields from the request body
    const { plantId, name, price, quantity } = req.body;
    // Extract the buyer's ID from the user session
    const buyerId = req.session.user.id;
    console.log("i am in the addcart");

    try {
        console.log("trying to find the product");

        // find the plant by its id
        const plant = await Plant.findById(plantId);
        if (!plant) {
            return res.status(404).json({ message: "Plant not found" });
        }

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

            console.log("if the item exist");
        } else {
            // Create new cart item
            const item = await Cart.create({
                vendorId: plant.vendorId,
                buyerId,
                plantId,
                name,
                price,
                quantity: quantity || 1
            });
            res.status(200).json(item);
        }
    
        console.log("everything went good")
    } catch (error) {
        res.status(500).json({ message: "Error adding product to cart", error });
    }
});

//********************************************************* */
// Retrieves the logged in buyer's cart items and returns   //
// the items.                                               //
//********************************************************* */
app.get('/api/cart', async (req, res) => {
    if (!req.session.user || req.session.user.isVendor) {
        return res.status(401).json({ message: "Unauthorized: Only buyers can view cart" });
    }

    try {
        // pass the session id to buyerid
        const buyerId = req.session.user.id;
        // find the plant which contain the specific buyer id
        const cartItems = await Cart.find({ buyerId: buyerId });
        // pass the data to frontend
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart", error });
    }
});

 //**************************************************************** */
 // Retrives and sends a single plant's image from the database
 // based on the plants ID. 
 //
 //**************************************************************** */
app.get('/image/:id', async (req, res) => {
    console.log("Inside get image route, id:", req.params.id);

    try {
        // pass current id to plant
        const plant = await Plant.findById(req.params.id);

        console.log("Found plant:", plant ? "yes" : "no");

        // if the plant exist and there is image for that plant
        if (plant && plant.image) {
            // convert the image field to a Buffer
            const imageBuffer = Buffer.from(plant.image.toString('base64'), 'base64');
            //Tells the browser to treat the file as an image
            res.set('Content-Type', 'image/jpeg');
            // send the data to frontend
            res.send(imageBuffer);
            // Express sends the plant image directly in binary format to the browser
            //res.send(plant.image);
        } else {
            console.log("trying to delete item");
            // if the plant have already been deletes in plant, delete it as well in cart
            await Cart.findOneAndDelete({
                plantId: req.params.id
            });

            console.log("No plant or image found");
            res.status(404).send("Image not found");
        }
    } catch (err) {
        res.status(500).send("Server error");
    }
});

//*************************************************** */
// Deletes an item from the cart of the logged in     //
// buyer                                              //
//*************************************************** */
app.delete('/api/cart/item/:id', async (req, res) => {
    // Check if item already exists in cart for this buyer
    if (!req.session.user || req.session.user.isVendor) {
        return res.status(401).json({ message: "Unauthorized: Only buyers can view cart" });
    }

    try {
        // pass session id to buyerid
        const buyerId = req.session.user.id;
        // find and delete the plant stored in the db by the id passed from frontend and the buyerid
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

//**************************************************** */
// Authenticates the users role, determines whether    //
// they are a buyer or a vendor by querrying the       //
// isVendor attribute of the user.                     //
//**************************************************** */
app.get('/api/user-role', (req, res) => {
    try {
        console.log('Session data on /api/user-role:', req.session);
        
        if (!req.session || !req.session.user) {
            return res.status(401).json({ msg: 'No session found' });
        }
        // pass the user's isvendor and email property to frontend
        res.status(200).json({ 
            isVendor: req.session.user.isVendor,
            email: req.session.user.email 
        });
    } catch (error) {
        console.error('Error in /api/user-role:', error);
        res.status(500).json({ msg: 'Server error checking user role' });
    }
});

//******************************************************************* */
// Authenticates users by querrying the database for a user by email  //  
// and then compares the users password with the password input by    //
// the user. If the authentication passes, a session is started and   //
// returns the users details.                                         //
//******************************************************************* */
app.post("/login", async (req, res) => {
    console.log('Login attempt with:', req.body);

    let errors = {};
    
    try {
        const { email, password } = req.body;
        // error check, if there is no email and password send error
        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }
        // search the user's email in buyer and vendor db to check him/her is buyer or vendor
        const buyer = await Buyer.findOne({ email });
        const vendor = await Vendor.findOne({ email });
        
        let user = null;
        let isVendor = false;
        // if user is buyer, check his pwd and pass corresponding value
        if (buyer) {
            if(password === buyer.password){
                user = buyer;
                isVendor = false;
            } else{
                errors.password = 'Invalid password';
            }
        } else if (vendor) {
            // if user is buyer, check his pwd and pass corresponding value
            if(password === vendor.password){
                user = vendor;
                isVendor = true;
            } else{
                errors.password = 'Invalid password';
            }
        }else{
            // if the email is not found
            errors.email = 'Invalid email';
        }
        // check do we have error message to return
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        // if the user is not vendor nor buyer
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
            // return the user information
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

app.post('/logout', (req, res) => {
    try {
        req.session.destroy((err) => { //destroy the session
            if (err) {
                return res.status(500).json({ msg: 'Could not log out, please try again' }); // error message
            }
            res.clearCookie('connect.sid'); // clear the session cookie
            res.status(200).json({ msg: 'Logged out successfully' });
        });
    } catch (error) { // other errors
        console.error('Logout error:', error);
        res.status(500).json({ msg: 'Server error during logout' });
    }
});

export default app;