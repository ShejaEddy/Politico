import { some } from "lodash";
import { notAuthorized } from "../helpers/response";

export default (...roles) => {
  const isAllowed = role => some(roles, role);
  return (req, res, next) => {
    const { type } = req.user.role;
    if (req.user && isAllowed(type)) return next();
    return notAuthorized(res);
  };
};
