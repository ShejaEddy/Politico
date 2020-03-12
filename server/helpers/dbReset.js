import { pool } from "../models";
const query = `DROP TABLE IF EXISTS 
                      user_info, office_tb, party_tb, petition_tb, vote_tb, candidate_tb`;

export default async () => await pool.query(query);
