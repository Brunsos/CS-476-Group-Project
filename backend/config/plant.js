import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  
  //id: {type: int, required: false },
  // sp_name: { type: String, required: false, unique: false },
  // eco_region: { type: String, required: false },
  image: { type: Buffer, contentType: String, required: true}, 
  // sun: {type: Int, required: false},
  common_name: { type: String, required: true },
  // moisture: {type: int, required: false},
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  original: { type: String, required: true },
  description: { type: String, reuired: true },
  countInStock: { type: Number, reuired: true }

});


const Plant = mongoose.model("Plant", plantSchema);
export default Plant;

