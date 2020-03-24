import 'regenerator-runtime/runtime';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`app running on port ${port}`));
