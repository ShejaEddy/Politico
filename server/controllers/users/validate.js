import Joi from "@hapi/joi";
import joiError from "../../helpers/joiError";

const allSchemas = {
  POST: Joi.object().keys({
    firstname: Joi.string()
      .trim()
      .required(),
    lastname: Joi.string()
      .trim()
      .required(),
    othername: Joi.string()
      .trim()
      .required(),
    email: Joi.string()
      .email()
      .trim()
      .required(),
    phoneNumber: Joi.string()
      .trim()
      .required(),
    passportUrl: Joi.string()
      .trim()
      .required(),
    password: Joi.string()
      .regex(/^[a-z0-9]+$/i)
      .min(6)
      .required(),
    isAdmin: Joi.boolean().required()
  }),
  PUT: Joi.object().keys({
    firstname: Joi.string()
      .trim()
      .required(),
    lastname: Joi.string()
      .trim()
      .required(),
    othername: Joi.string()
      .trim()
      .required(),
    email: Joi.string()
      .email()
      .trim()
      .required(),
    phoneNumber: Joi.string()
      .trim()
      .required(),
    passportUrl: Joi.string()
      .trim()
      .required(),
    nationalId: Joi.string()
      .trim()
      .required()
  })
};

export default (req, res, next) => {
  const { method, body } = req;
  const schema = allSchemas[method];
  return joiError(body, schema, next, res);
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  return joiError({ email, password }, schema, next, res);
};
