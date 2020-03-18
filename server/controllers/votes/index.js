import db from "../../database";
import { Offices, Votes, Candidates } from "../../database/models";
import { badRequest, okResponse, notFound } from "../../helpers/response";
import insertQuery from "../../database/helpers/insertQuery";
import setParams from "../../database/helpers/setParams";

export default class VotesControllers {
  static async create(req, res) {
    try {
      const { office, candidate } = req.body;
      const { rowCount } = await db.query(Candidates.findOne, [
        candidate,
        office
      ]);
      if (!rowCount) return notFound(res, "Candidate not found");
      req.body.voter = req.user.id;
      const { rows } = await db.query(
        insertQuery("vote_tb", req.body),
        setParams(req.body)
      );
      return okResponse(res, rows[0], 201, "Vote casted successfully");
    } catch (error) {
      let message;
      if (error.code === "23505")
        message = "Vote can not be casted to the same office twice";
      return badRequest(res, error, message);
    }
  }

  static async get(req, res) {
    try {
      const { id } = req.params;
      const { rowCount: nberOfOffices } = await db.query(Offices.findById, [
        id
      ]);
      if (!nberOfOffices) return notFound(res, "Office not found");
      const { rows, rowCount } = await db.query(Votes.results, [id]);
      if (!rowCount)
        throw new Error(
          `Unfortunately, no results are available at the moment`
        );
      return okResponse(res, rows[0]);
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async getAll(_, res) {
    try {
      const { rows: results, rowCount: totalResults } = await db.query(
        Votes.allResults
      );
      return okResponse(res, { results, totalResults });
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
