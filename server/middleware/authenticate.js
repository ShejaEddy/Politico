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
      return jwt.verify(token, JWT_SECRET_KEY, async (err, payload) => {
        const {
          id,
          role: { type }
        } = payload;
        if (err) return notAuthorized(res);
<<<<<<< HEAD
        const user = await db.query(Users.findById, id);
=======
        const user = await db.query(Users.findById, [id]);
>>>>>>> feature(view-user-profile): user get profile  [Finishes #171742809]
        if (isEmpty(user)) return notFound(res, "User account not found");
        req.user = user;
        req.user.role = { type };
        return next();
      });
    }
    return notAuthorized(res);
  } catch (error) {
    return badRequest(res, error);
  }
};
