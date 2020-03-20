import { Users } from "../../database/models";
import db from "../../database";
import { badRequest, okResponse, notFound } from "../../helpers/response";
import { Admin, User } from "../../helpers/roles";
import bcrypt from "../../helpers/bcrypt";
import { createToken, verifyToken } from "../../helpers/jwt";
import insertQuery from "../../database/helpers/insertQuery";
import updateQuery from "../../database/helpers/updateQuery";
import setParams from "../../database/helpers/setParams";
import sendEmail from "../../helpers/verificationHelpers";

export default class UserControllers {
  static async auth(req, res) {
    try {
      const message = "Invalid Email/Password";
      const { email, password } = req.body;
      const { rowCount, rows } = await db.query(Users.findByEmail, [email]);
      if (!rowCount) throw new Error(message);
      const user = rows[0];
      const ok = await bcrypt.comparePassword(user.password, password);
      if (!ok) throw new Error(message);
      const payload = {};
      payload.id = user.id;
      payload.role = user.isadmin ? Admin : User;
      const token = await createToken(payload);
      delete user.password;
      return okResponse(res, { token, user });
    } catch (err) {
      return badRequest(res, err);
    }
  }

  static async create(req, res) {
    try {
      req.body.password = await bcrypt.hashPassword(req.body.password);
      const { rows } = await db.query(
        insertQuery("user_info", req.body),
        setParams(req.body)
      );
      const user = rows[0];
      const payload = {};
      payload.id = user.id;
      payload.role = user.isAdmin ? Admin : User;
      const token = await createToken(payload);
      delete user.password;
      return okResponse(res, { token, user }, 201, "User created successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const { rowCount, rows } = await db.query(Users.findById, [id]);
      if (!rowCount) return notFound(res, `User not found`);
      const user = rows[0];
      delete user.password;
      return okResponse(res, user);
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const { rows, rowCount } = await db.query(Users.findByEmail, [email]);
      if (!rowCount) return notFound(res, `User doesn't exist`);
      const payload = { id: rows[0].id, email };
      const token = await createToken(payload, "1d");
      return await sendEmail(res, email, { name: rows[0].firstname, token });
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async resetPassword(req, res) {
    try {
      const {
        query: { token }
      } = req.query;
      const payload = await verifyToken(token);
      const { rowCount } = await db.query(updateQuery("user_info", req.body), [
        payload.id,
        ...setParams(req.body)
      ]);
      if (!rowCount) return notFound(res, "User not found");
      return okResponse(res, undefined, 201, "Password reset successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
