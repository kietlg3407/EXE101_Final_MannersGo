import mongoose from 'mongoose';

const projectInterestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: String,
    default: 'mannersgo-cards',
    required: true,
    index: true,
  },
}, { timestamps: true });

projectInterestSchema.index({ user: 1, project: 1 }, { unique: true });

export default mongoose.model('ProjectInterest', projectInterestSchema);
