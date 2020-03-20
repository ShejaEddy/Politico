import Joi from "@hapi/joi";
import joiError from "../../helpers/joiError";

const allSchemas = {
  POST: Joi.object().keys({
    firstname: Joi.string()
      .trim()
      .required(),
    lastname: Joi.string().required(),
    othername: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    phoneNumber: Joi.string()
      .required()
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im),
    nationalId: Joi.string().required(),
    passportUrl: Joi.string().uri(),
    password: Joi.string()
      .regex(/^[a-z0-9]+$/i)
      .min(6)
      .required(),
    isAdmin: Joi.boolean().required()
  }),

  PUT: Joi.object().keys({
    firstname: Joi.string().trim(),
    lastname: Joi.string().trim(),
    othername: Joi.string().trim(),
    email: Joi.string()
      .trim()
      .email(),
    passportUrl: Joi.string().uri()
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
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  });
  return joiError({ email, password }, schema, next, res);
};

export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const schema = Joi.object().keys({
    password: Joi.string().required()
  });
  return joiError({ password }, schema, next, res);
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
  });
  return joiError({ email }, schema, next, res);
};
