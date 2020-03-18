import db from "../../database";
import { Parties, Offices, Users, Candidates } from "../../database/models";
import { badRequest, okResponse, notFound } from "../../helpers/response";
import insertQuery from "../../database/helpers/insertQuery";
import setParams from "../../database/helpers/setParams";

export default class CandidatesControllers {
  static async create(req, res) {
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
      let message;
      if (error.code === "23505") message = "Candidate already exists";
      return badRequest(res, error, message);
    }
  }

  static async getAll(_req, res) {
    try {
      const { rows: candidates, rowCount: totalCandidates } = await db.query(
        Candidates.findAll
      );
      return okResponse(res, { candidates, totalCandidates });
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
