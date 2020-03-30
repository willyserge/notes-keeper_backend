import express from 'express';
import Validate from '../middleware/validator';
import Notes from '../controllers/notesController';

const notesRouter = express.Router();
notesRouter.post('/note', Validate.createNote, Notes.createNote);
notesRouter.get('/note', Notes.getNotes);
notesRouter.get('/note/:noteId', Notes.getSingleNote);
export default notesRouter;
