import _ from 'lodash';
import User from '../models/user';
import generateToken from '../utils';


const Auth = {
  async signup(req, res, next) {
    const {
      firstname, lastname, email, password
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).send({ error: { message: 'a user with the given email already exists' } });
    }
    const newUser = new User({
      firstname, lastname, email, password
    });

    try {
      await newUser.save();
      const token = generateToken(newUser);
      return res.status(201).json({
        message: 'user created successfully',
        token,
        user: _.pick(newUser, ['_id', 'firstname', 'email'])
      });
    } catch (error) {
      return next(new Error(error));
    }
  },

  async signin(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: { message: 'invalid email orpassword' } });
    const isValid = await user.isPasswordValid(password);
    if (!isValid) return res.status(401).json({ error: { message: 'invalid email or password' } });
    const token = generateToken(user);
    return res.status(200).json({
      message: 'User is successfully logged in',
      token,
      user: _.pick(user, ['firstname', 'email'])
    });
  }
};
export default Auth;
