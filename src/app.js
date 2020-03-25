import 'regenerator-runtime/runtime';
import express from 'express';
import authRouter from './routes/auth';

const app = express();

app.use(express.json());
app.use('/', authRouter);

app.get('/test', (req, res) => {
  res.json({ message: 'pass!' });
});

export default app;
