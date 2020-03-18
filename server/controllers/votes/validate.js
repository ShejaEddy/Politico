import Joi from "@hapi/joi";
import joiError from "../../helpers/joiError";

const allSchemas = {
  POST: Joi.object().keys({
    office: Joi.number()
      .integer()
      .positive()
      .min(1)
      .required(),
    candidate: Joi.number()
      .integer()
      .positive()
      .min(1)
      .required()
  })
};

export default (req, res, next) => {
  const { method, body } = req;
  const schema = allSchemas[method];
  return joiError(body, schema, next, res);
};
