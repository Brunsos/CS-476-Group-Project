import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
    name: String,
    price: Number,
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
