import jwt from "jsonwebtoken";
import db from "../database";
import { Users } from "../database/models";
import { notAuthorized, badRequest, notFound } from "../helpers/response";

const { JWT_SECRET_KEY } = process.env;

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      return jwt.verify(token, JWT_SECRET_KEY, async (err, payload) => {
        if (err) return notAuthorized(res);
        const {
          id,
          role: { type }
        } = payload;
        const { rows, rowCount } = await db.query(Users.findById, [id]);
        if (!rowCount) return notFound(res, "User account not found");
        [req.user] = rows;
        req.user.role = { type };
        return next();
      });
    }
    return notAuthorized(res);
  } catch (error) {
    return badRequest(res, error);
  }
};
