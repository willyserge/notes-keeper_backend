import 'regenerator-runtime/runtime';
import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import authRouter from './routes/auth';
import notesRouter from './routes/notes';
import auth from './middleware/auth';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api', auth, notesRouter);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'welcome to notes-keeper API'
  });
});

app.use((req, res, next) => {
  next(createError(404));
});
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    error: {
      message: error.message
    }
  });
});

export default app;
