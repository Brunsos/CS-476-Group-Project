import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  
  image: { type: Buffer, contentType: String, required: true}, 
  common_name: { type: String, required: true },
  price: { type: Number, required: true },
  ecozone: { type: String, required: true },
  description: { type: String, reqquired: true },
  countInStock: { type: Number, reqquired: true },
  ratingSum: {type: Number, required: false},
  ratingCount: {type: Number, required: false}

});


const Plant = mongoose.model("Plant", plantSchema);
export default Plant;

