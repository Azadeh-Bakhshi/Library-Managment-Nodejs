
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phonenumber: { type: String },
    role: { type: String, required: true },
    active: { type: Boolean, default: true }, 
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
