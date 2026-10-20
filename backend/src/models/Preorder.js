import mongoose from 'mongoose';

const preorderSchema = new mongoose.Schema({
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
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
  },
  message: {
    type: String,
    trim: true,
    maxlength: 500,
    default: '',
  },
}, { timestamps: true });

export default mongoose.model('Preorder', preorderSchema);
