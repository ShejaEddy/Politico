import db from "../../database";
import { Offices, Users } from "../../database/models";
import {
  badRequest,
  okResponse,
  notFound,
  notAuthorized
} from "../../helpers/response";
import insertQuery from "../../database/helpers/insertQuery";
import setParams from "../../database/helpers/setParams";

export default class VotesControllers {
  static async create(req, res) {
    try {
      let rowCount;
      const { office, voter, candidate } = req.body;
      ({ rowCount } = await db.query(Users.findById, [voter]));
      if (!rowCount) return notFound(res, "Voter not found");
      ({ rowCount } = await db.query(Offices.findById, [office]));
      if (!rowCount) return notFound(res, "Office not found");
      ({ rowCount } = await db.query(Users.findById, [candidate]));
      if (!rowCount) return notFound(res, "Candidate not found");
      const { rows, rowCount: created } = await db.query(
        insertQuery("vote_tb", req.body),
        setParams(req.body)
      );
      if (!created)
        return notAuthorized(
          res,
          "Vote can not be casted to the same office twice"
        );
      return okResponse(res, rows[0], 201, "Vote casted successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  },
  async get(req, res) {
    try {
      const { id } = req.params;
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
};
