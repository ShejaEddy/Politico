import { Offices } from "../../database/models";
import db from "../../database";
import { badRequest, okResponse, notFound } from "../../helpers/response";
import updateQuery from "../../database/helpers/updateQuery";
import insertQuery from "../../database/helpers/insertQuery";
import setParams from "../../database/helpers/setParams";

export default class OfficesControllers {
  static async create(req, res) {
    try {
      const { rows } = await db.query(
        insertQuery("office_tb", req.body),
        setParams(req.body)
      );
      return okResponse(res, rows[0], 201, "Office created successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const { rowCount, rows } = await db.query(Offices.findById, [id]);
      if (!rowCount) return notFound(res, `office not found`);
      return okResponse(res, rows[0]);
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async getAll(_req, res) {
    try {
      const { rows } = await db.query(Offices.findAll);
      return okResponse(res, { Offices: rows });
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { rows, rowCount } = await db.query(
        updateQuery("office_tb", req.body),
        [id, ...setParams(req.body, true)]
      );
      if (!rowCount) return notFound(res, `Office not found`);
      return okResponse(res, rows[0], 200, "Office updated successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const { rowCount } = await db.query(Offices.deleteOne, [id]);
      if (!rowCount) return notFound(res, `Office not found`);
      return okResponse(res, undefined, 200, "Office deleted successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
