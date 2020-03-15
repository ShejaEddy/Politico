import Joi from "@hapi/joi";
import joiError from "../../helpers/joiError";

const allSchemas = {
  POST: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required()
  }),

  PUT: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string()
  })
};

export default (req, res, next) => {
  const { method, body } = req;
  const schema = allSchemas[method];
  return joiError(body, schema, next, res);
};
