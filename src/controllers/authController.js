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
      return res.status(409).send({
        error: {
          message: 'a user with the given email already exists'
        }
      });
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
  }
};
export default Auth;
