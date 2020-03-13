import dbErrors from "./dbErrors";

const badRequest = (res, err, message) => {
  const error = dbErrors(err);
  return res.status(400).json({ status: res.statusCode, message, error });
};
const notFound = (res, message = "Record not found") =>
  res.status(404).json({ status: res.statusCode, error: { message } });

const okResponse = (res, data, code = 200, message = "Success") =>
  res.status(code).json({ status: res.statusCode, message, data });

const notAuthorized = (res, message = "Unauthorized to perform this action") =>
  res.status(401).json({ status: res.statusCode, message });

module.exports = { badRequest, notFound, okResponse, notAuthorized };
