import 'regenerator-runtime/runtime';
import express from 'express';
import createError from 'http-errors';
import authRouter from './routes/auth';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);

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
