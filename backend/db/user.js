import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //favortes: { array: Plant, reuired: true}
});

const User = mongoose.model("User", userSchema);
export default User;
