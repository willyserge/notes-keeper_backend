import express from 'express';
import Auth from '../controllers/authController';
import Validate from '../middleware/validator';


const authRouter = express.Router();
authRouter.post('/signup', Validate.signup, Auth.signup);
authRouter.post('/signin', Validate.signin, Auth.signin);

export default authRouter;
