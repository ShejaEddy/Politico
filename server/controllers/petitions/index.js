import { Petitions, Users } from "../../database/models";
import db from "../../database";
import { badRequest, okResponse, notFound } from "../../helpers/response";
import bcrypt from "../../helpers/bcrypt";
import updateQuery from "../../database/helpers/updateQuery";
import insertQuery from "../../database/helpers/insertQuery";
import setParams from "../../database/helpers/setParams";

export default class PetitionsControllers {
  static async create(req, res) {
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

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const { rowCount, rows } = await db.query(Petitions.findById, [id]);
      if (!rowCount) return notFound(res, `Petition not found`);
      return okResponse(res, rows[0]);
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async getUserPetitions(req, res) {
    try {
      const { id } = req.params;
      const { rowCount: user } = await db.query(Users.findById, [id]);
      if (!user) return notFound(res, "User not found");
      const { rowCount, rows } = await db.query(Petitions.findByUser, [id]);
      if (!rowCount) return notFound(res, `Petition not found`);
      return okResponse(res, rows[0]);
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async getAll(_req, res) {
    try {
      const { rows: petitions, rowCount: totalPetitions } = await db.query(
        Petitions.findAll
      );
      return okResponse(res, { petitions, totalPetitions });
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async update(req, res) {
    try {
      const {
        params: { id },
        user: { id: createdBy }
      } = req;
      const { rows, rowCount } = await db.query(
        updateQuery("petition_tb", req.body),
        [id, createdBy, ...setParams(req.body, true)]
      );
      if (!rowCount) return notFound(res, "Petition not found");
      return okResponse(res, rows[0], 200, "Petition updated successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }

  static async deleteOne(req, res) {
    try {
      const {
        params: { id },
        user: { id: createdBy }
      } = req;
      const { rowCount } = await db.query(Petitions.findByUserPetition, [
        id,
        createdBy
      ]);
      if (!rowCount) return notFound(res, `Petition not found`);
      return okResponse(res, undefined, 200, "Petition deleted successfully");
    } catch (error) {
      return badRequest(res, error);
    }
  }
}
