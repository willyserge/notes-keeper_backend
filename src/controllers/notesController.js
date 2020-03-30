import createError from 'http-errors';
import Note from '../models/note';

const Notes = {
  async createNote(req, res, next) {
    const newNote = new Note(req.body);
    newNote.createdBy = req.user.id;
    try {
      const note = await newNote.save();
      res.status(201).json({
        message: 'new note created successfully',
        note
      });
    } catch (error) {
      next(createError(400));
    }
  }
};

export default Notes;
