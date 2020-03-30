import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['general', 'professional']
  },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
