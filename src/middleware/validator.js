import Joi from '@hapi/joi';

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
      return res.status(400).send({
        status: 400,
        error: `${result.error.details[0].message}`
      });
    }

    return next();
  }
};

export default Validate;
