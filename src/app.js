import 'regenerator-runtime/runtime';
import express from 'express';


const app = express();

app.get('/test', (req, res) => {
  res.json({ message: 'pass!' });
});

export default app;
