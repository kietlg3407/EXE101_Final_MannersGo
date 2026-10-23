import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 254,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 30,
    default: '',
  },
  passwordHash: {
    type: String,
    select: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
