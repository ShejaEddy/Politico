import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET_KEY } = process.env;

export default jwt;
export const createToken = (payload, expiryTime = "7d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: expiryTime
      },
      (error, token) => {
        if (token) {
          resolve(token);
        }
        reject(error);
      }
    );
  });
};
export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, async (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
};
