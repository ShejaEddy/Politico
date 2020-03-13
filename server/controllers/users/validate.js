import Joi from "@hapi/joi";
import joiError from "../../helpers/joiError";

export default (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  return joiError({ email, password }, schema, next, res);
};
