import Joi from '@hapi/joi';
import createError from 'http-errors';

const Validate = {
  signup: (req, res, next) => {
    const schema = Joi.object({
      firstname: Joi.string().min(2).required(),
      lastname: Joi.string().min(2).required(),
      email: Joi.string().email().min(10).required(),
      password: Joi.string().min(3).required()

    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw createError(400, result.error.details[0].message);
    }

    return next();
  },

  signin: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().min(10).required(),
      password: Joi.required()

    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw createError(400, result.error.details[0].message);
    }

    return next();
  }
};

export default Validate;
