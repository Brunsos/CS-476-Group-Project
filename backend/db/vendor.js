import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  province: { type: String, required: false },
  city: { type: String, required: false },
  address: { type: String, required: false },
  isVendor: { type: Boolean, required: false },
  // inventory: { type: Array, required: false }
});

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
