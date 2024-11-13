import mongoose from 'mongoose';
import Vendor from '../db/vendor.js';
import dotenv from 'dotenv';

dotenv.config();

// Function to update existing vendors
async function updateVendors() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Add plantArray to all existing vendors that don't have it
        const result = await Vendor.updateMany(
            { plantArray: { $exists: false } },
            { $set: { plantArray: [] } }
        );

        console.log(`Updated ${result.modifiedCount} vendors`);
        process.exit(0);
    } catch (error) {
        console.error('Error updating vendors:', error);
        process.exit(1);
    }
}

// Run the migration
updateVendors();
