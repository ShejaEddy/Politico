import Joi from "@hapi/joi";

export default (payload, schema, next, res) => {
  return Joi.validate(payload, schema, { abortEarly: false }, err => {
    if (err) {
      const error = {};
      const { details } = err;
      details.forEach(element => {
        const {
          message,
          context: { key }
        } = element;
        error[key] = message.split('"').join("");
      });
      return res
        .status(400)
        .json({ status: 400, message: "Validation error", error });
    }
    return next();
  });
};
