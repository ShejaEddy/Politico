import moment from "moment";
import { Users } from "../../database/models";
import db from "../../database";
import { badRequest, okResponse } from "../../helpers/response";
import { Admin, User } from "../../helpers/roles";
import bcrypt from "../../helpers/bcrypt";
import { createToken } from "../../helpers/jwt";

export default {
  async auth(req, res) {
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
      payload.role = user.isAdmin ? Admin : User;
      const token = await createToken(payload);
      delete user.password;
      return okResponse(res, { token, user });
    } catch (err) {
      return badRequest(res, err);
    }
  },
  async create(req, res) {
    try {
      req.body.password = await bcrypt.hashPassword(req.body.password);
      const {
        firstname,
        lastname,
        othername,
        email,
        phoneNumber,
        nationalId,
        passportUrl,
        password,
        isAdmin
      } = req.body;
      const { rows } = await db.query(Users.create, [
        firstname,
        lastname,
        othername,
        email,
        phoneNumber,
        nationalId,
        passportUrl,
        password,
        isAdmin,
        moment(new Date())
      ]);
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
};
