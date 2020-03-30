import mongoose from 'mongoose';
import User from '../../models/user';
import Note from '../../models/note';

const user = {
  firstname: 'willy',
  lastname: 'serge',
  email: 'willy@test.com',
  password: 'test123'
};
const noteId = new mongoose.Types.ObjectId();
const note = {
  _id: noteId,
  title: 'testtitle',
  category: 'general',
  description: 'test description'
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Note.deleteMany();
  await new User(user).save();
  await new Note(note).save();
};

export {
  noteId,
  user,
  note,
  setupDatabase
};
