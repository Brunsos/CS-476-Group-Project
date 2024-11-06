import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  
  image: { type: Buffer, contentType: String, required: true}, 
  common_name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  original: { type: String, required: true },
  description: { type: String, reuired: true },
  countInStock: { type: Number, reuired: true }

});


const Plant = mongoose.model("Plant", plantSchema);
export default Plant;

