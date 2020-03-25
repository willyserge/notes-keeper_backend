import 'regenerator-runtime/runtime';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth';

dotenv.config();


const app = express();
mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
app.use(express.json());
app.use('/', authRouter);

app.get('/test', (req, res) => {
  res.json({ message: 'pass!' });
});

export default app;
