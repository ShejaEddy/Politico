import { Parties } from "../../database/models";
import db from "../../database";
import { badRequest, okResponse, notFound } from "../../helpers/response";
import updateQuery from "../../database/helpers/updateQuery";
import insertQuery from "../../database/helpers/insertQuery";
import setParams from "../../database/helpers/setParams";

export default class PartyControllers {
  static async create(req, res) {
    try {
      const { rows } = await db.query(
        insertQuery("party_tb", req.body),
        setParams(req.body)
      );
      return okResponse(res, rows[0], 201, "Party created successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const { rowCount, rows } = await db.query(Parties.findById, [id]);
      if (!rowCount) return notFound(res, `Party not found`);
      return okResponse(res, rows[0]);
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async getAll(_req, res) {
    try {
      const { rows } = await db.query(Parties.findAll);
      return okResponse(res, { parties: rows });
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query(updateQuery("party_tb", req.body), [
        id,
        ...setParams(req.body, true)
      ]);
      return okResponse(res, rows[0], 200, "Party updated successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const { rowCount } = await db.query(Parties.deleteOne, [id]);
      if (!rowCount) return notFound(res, `Party not found`);
      return okResponse(res, undefined, 200, "Party deleted successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
