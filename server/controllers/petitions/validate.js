import Joi from "@hapi/joi";
import joiError from "../../helpers/joiError";

const allSchemas = {
  POST: Joi.object().keys({
    office: Joi.string()
      .number()
      .integer()
      .required(),
    createdBy: Joi.string().required(),
    body: Joi.string()
      .email()
      .required(),
    evidence: Joi.array()
      .min(1)
      .required()
      .items(Joi.string())
  })
};

export default (req, res, next) => {
  const { method, body } = req;
  const schema = allSchemas[method];
  return joiError(body, schema, next, res);
};
