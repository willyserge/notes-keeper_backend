import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true

  },

  lastname: {
    type: String,
    required: true

  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date

});

// eslint-disable-next-line func-names
userSchema.pre('save', async function () {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);
});

// eslint-disable-next-line func-names
userSchema.methods.isPasswordValid = async function (value) {
  try {
    return await bcrypt.compare(value, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema);
export default User;
