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
  },

  async getNotes(req, res, next) {
    try {
      const notes = await Note.find({ createdBy: req.user.id });
      res.status(200).json({ notes });
    } catch (error) {
      next(createError(500));
    }
  },
  async getSingleNote(req, res, next) {
    const { noteId } = req.params;
    try {
      const note = await Note.findById(noteId);
      res.status(200).json({ note });
    } catch (error) {
      next(createError(400, 'note with given id was not found'));
    }
  },
  async updateNote(req, res, next) {
    const { noteId } = req.params;
    try {
      const note = await Note.findByIdAndUpdate(noteId, req.body);
      res.status(200).json({
        message: 'note updated successfully',
        note
      });
    } catch (error) {
      next(createError(400, 'note with given id was not found'));
    }
  }

};

export default Notes;
