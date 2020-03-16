import db from "../../database";
import { Parties, Offices, Users } from "../../database/models";
import { badRequest, okResponse, notFound } from "../../helpers/response";
import insertQuery from "../../database/helpers/insertQuery";
import setParams from "../../database/helpers/setParams";

export default {
  async create(req, res) {
    try {
      let rowCount;
      const { office, party, candidate } = req.body;
      ({ rowCount } = await db.query(Parties.findById, [party]));
      if (!rowCount) return notFound(res, "Party not found");
      ({ rowCount } = await db.query(Offices.findById, [office]));
      if (!rowCount) return notFound(res, "Office not found");
      ({ rowCount } = await db.query(Users.findById, [candidate]));
      if (!rowCount) return notFound(res, "User not found");
      const { rows } = await db.query(
        insertQuery("candidate_tb", req.body),
        setParams(req.body)
      );
      return okResponse(res, rows[0], 201, "Candidate created successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }
};
