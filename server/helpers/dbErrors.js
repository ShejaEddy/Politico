export default err => {
  const error = {};
  let path = "message";
  const { detail, code, message } = err;
  if (!detail) {
    error.message = err.message || "Bad request";
    return error;
  }
  [, path] = detail.split("(");
  [path] = path.split(")");
  switch (code) {
    case "23505":
      error[path] = `${path} is already taken`;
      break;
    default:
      error[path] = message;
      break;
  }
  return error;
};
