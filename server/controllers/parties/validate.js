import Joi from "@hapi/joi";
import joiError from "../../helpers/joiError";

const allSchemas = {
  POST: Joi.object().keys({
    name: Joi.string().required(),
    hqAddress: Joi.string().required(),
    logoUrl: Joi.string()
      .uri()
      .required()
  }),

  PUT: Joi.object().keys({
    name: Joi.string(),
    hqAddress: Joi.string(),
    logoUrl: Joi.string().uri()
  })
};

export default (req, res, next) => {
  const { method, body } = req;
  const schema = allSchemas[method];
  return joiError(body, schema, next, res);
};
