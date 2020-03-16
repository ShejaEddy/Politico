import { Petitions } from "../../database/models";
import db from "../../database";
import { badRequest, okResponse } from "../../helpers/response";
import bcrypt from "../../helpers/bcrypt";
import insertQuery from "../../database/helpers/insertQuery";
import setParams from "../../database/helpers/setParams";

export default {
  async create(req, res) {
    try {
      req.body.password = await bcrypt.hashPassword(req.body.password);
      const { rows } = await db.query(
        insertQuery("petition_tb", req.body),
        setParams(req.body)
      );
      return okResponse(res, rows[0], 201, "Petition Filed successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }
};
