import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    cardNumber: {type: Number, required: true},
    expDate: {type: Date, required: true},
    cvc: {type: Number, required: true}, 
    nameOnCard: {type: String, required: true},
    nickname: {type: String}
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;