import Joi from "@hapi/joi";
import joiError from "../../helpers/joiError";

const allSchemas = {
  POST: Joi.object().keys({
    office: Joi.number()
      .integer()
      .positive()
      .min(1)
      .required(),
    createdBy: Joi.number()
      .integer()
      .positive()
      .min(1)
      .required(),
    body: Joi.string().required(),
    evidence: Joi.array()
      .min(1)
      .required()
      .items(Joi.string())
  }),
  PUT: Joi.object().keys({
    office: Joi.number()
      .integer()
      .positive()
      .min(1),
    body: Joi.string(),
    evidence: Joi.array()
      .min(1)
      .items(Joi.string())
  })
};

export default (req, res, next) => {
  const { method, body } = req;
  const schema = allSchemas[method];
  return joiError(body, schema, next, res);
};
