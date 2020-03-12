import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";
import db from "../database";
import { Users } from "../database/models";
import { notAuthorized, badRequest, notFound } from "../helpers/response";

const { JWT_SECRET_KEY } = process.env;
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
        const { id } = payload;
        if (err) return notAuthorized(res);
        const user = await db.query(Users.findById, id);
        if(isEmpty(user)) return notFound(res, 'User account not found');
        return next();
      });
    }
    return notAuthorized(res);
  } catch (error) {
      badRequest(res);
  }
};
