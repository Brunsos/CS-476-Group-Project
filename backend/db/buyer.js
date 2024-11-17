import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  isVendor: { type: Boolean, required: false},
  savedCards: {type: Array}
});

const Buyer = mongoose.model("Buyer", buyerSchema);
export default Buyer;
